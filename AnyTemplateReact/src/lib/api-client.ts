import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { apiConfig } from '@config/api.config'
import { apiSchemas } from '@config/api-schemas.config'
import type { HttpMethod } from '@config/types'

// ── Build axios instance ───────────────────────────────────────────────────────

const baseURL = [
  apiConfig.baseUrl.replace(/\/$/, ''),
  apiConfig.version ? `/${apiConfig.version}` : '',
].join('')

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.defaultHeaders,
})

// ── Auth interceptor ──────────────────────────────────────────────────────────

axiosInstance.interceptors.request.use((config) => {
  if (apiConfig.auth.type !== 'none') {
    const token = localStorage.getItem(apiConfig.auth.storageKey)
    if (token) {
      const prefix = apiConfig.auth.tokenPrefix ? `${apiConfig.auth.tokenPrefix} ` : ''
      config.headers[apiConfig.auth.headerName] = `${prefix}${token}`
    }
  }
  return config
})

// ── Dev logging interceptor ───────────────────────────────────────────────────

if (apiConfig.devLogging && import.meta.env.DEV) {
  axiosInstance.interceptors.request.use((config) => {
    console.groupCollapsed(`[API] ${config.method?.toUpperCase()} ${config.url}`)
    if (config.data) console.log('→ body', config.data)
    console.groupEnd()
    return config
  })

  axiosInstance.interceptors.response.use(
    (res) => {
      console.groupCollapsed(`[API] ✓ ${res.status} ${res.config.url}`)
      console.log('← data', res.data)
      console.groupEnd()
      return res
    },
    (err) => {
      console.error(`[API] ✗ ${err.response?.status} ${err.config?.url}`, err.response?.data)
      return Promise.reject(err)
    }
  )
}

// ── In-memory response cache ──────────────────────────────────────────────────

interface CacheEntry { data: unknown; expiresAt: number }
const cache = new Map<string, CacheEntry>()

function getCached(key: string): unknown | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null }
  return entry.data
}

function setCache(key: string, data: unknown, ttl: number) {
  cache.set(key, { data, expiresAt: Date.now() + ttl })
}

export function clearCache() { cache.clear() }

// ── Path param interpolation ──────────────────────────────────────────────────

function interpolatePath(path: string, params: Record<string, string | number> = {}): string {
  return path.replace(/:([a-zA-Z]+)/g, (_, key) => {
    const val = params[key]
    if (val === undefined) throw new Error(`Missing path param: ${key}`)
    return String(val)
  })
}

// ── Call options ──────────────────────────────────────────────────────────────

export interface CallOptions {
  /** Path params, e.g. { id: '42' } for /users/:id */
  params?: Record<string, string | number>
  /** Query string params */
  query?: Record<string, string | number | boolean>
  /** Request body (POST/PUT/PATCH) */
  body?: unknown
  /** Override axios config */
  axiosConfig?: AxiosRequestConfig
  /** Skip response schema validation */
  skipValidation?: boolean
}

// ── Core call function ────────────────────────────────────────────────────────

export async function apiCall<T = unknown>(
  group: string,
  endpoint: string,
  options: CallOptions = {}
): Promise<T> {
  const endpointDef = apiConfig.endpoints[group]?.[endpoint]
  if (!endpointDef) throw new Error(`Unknown endpoint: ${group}.${endpoint}`)

  const { method, path, authenticated, cache: cacheTtl, timeout } = endpointDef
  const { params, query, body, axiosConfig, skipValidation } = options

  const resolvedPath = interpolatePath(path, params)
  const cacheKey = `${method}:${resolvedPath}:${JSON.stringify(query)}`

  // Serve from cache for GET endpoints with cache TTL
  if (method === 'GET' && cacheTtl && cacheTtl > 0) {
    const cached = getCached(cacheKey)
    if (cached !== null) return cached as T
  }

  // Validate request body against schema
  type ZodLike = { safeParse: (v: unknown) => { success: boolean; data?: unknown; error?: { errors: { path: (string|number)[]; message: string }[] } } }
  type SchemaEntry = { request?: ZodLike; response?: ZodLike }
  const schemaMap = apiSchemas as Record<string, Record<string, SchemaEntry> | undefined>
  const schema: SchemaEntry | undefined = schemaMap[group]?.[endpoint]

  if (body && schema?.request && !skipValidation) {
    const result = schema.request.safeParse(body)
    if (!result.success) {
      const msg = result.error?.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      throw new Error(`[Schema] Request validation failed for ${group}.${endpoint}: ${msg}`)
    }
  }

  // Auth check
  if (authenticated && apiConfig.auth.type !== 'none') {
    const token = localStorage.getItem(apiConfig.auth.storageKey)
    if (!token) console.warn(`[API] ${group}.${endpoint} requires auth but no token found`)
  }

  // Execute request (with retry)
  let lastError: unknown
  const attempts = (apiConfig.retries ?? 0) + 1

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await axiosInstance.request({
        method: method as HttpMethod,
        url: resolvedPath,
        params: query,
        data: body,
        timeout: timeout ?? apiConfig.timeout,
        ...axiosConfig,
      })

      let data = res.data

      // Validate response against schema
      if (schema?.response && !skipValidation) {
        const result = schema.response.safeParse(data)
        if (!result.success) {
          console.warn(`[Schema] Response mismatch for ${group}.${endpoint}:`, result.error?.errors)
        } else {
          data = result.data
        }
      }

      // Cache successful GET responses
      if (method === 'GET' && cacheTtl && cacheTtl > 0) {
        setCache(cacheKey, data, cacheTtl)
      }

      return data as T
    } catch (err) {
      lastError = err
      if (attempt < attempts) await new Promise(r => setTimeout(r, 300 * attempt))
    }
  }

  throw lastError
}

// ── Typed proxy (group → endpoint → function) ─────────────────────────────────
// Usage:  api.posts.list()  api.users.get({ params: { id: '1' } })

type EndpointFn = (options?: CallOptions) => Promise<unknown>

type ApiProxy = {
  [group: string]: {
    [endpoint: string]: EndpointFn
  }
}

export const api: ApiProxy = new Proxy({} as ApiProxy, {
  get(_, group: string) {
    return new Proxy({} as { [k: string]: EndpointFn }, {
      get(_, endpoint: string) {
        return (options?: CallOptions) => apiCall(group, endpoint, options)
      },
    })
  },
})
