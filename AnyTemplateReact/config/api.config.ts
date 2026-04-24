// ─────────────────────────────────────────────────────────────────────────────
// API CONFIG  –  Define every endpoint your app talks to
// ─────────────────────────────────────────────────────────────────────────────
//
//  HOW TO ADD AN ENDPOINT:
//
//    endpoints: {
//      myResource: {
//        list:   { method: 'GET',    path: '/my-resource',     authenticated: true },
//        get:    { method: 'GET',    path: '/my-resource/:id', authenticated: true },
//        create: { method: 'POST',   path: '/my-resource',     authenticated: true },
//        update: { method: 'PUT',    path: '/my-resource/:id', authenticated: true },
//        delete: { method: 'DELETE', path: '/my-resource/:id', authenticated: true },
//      },
//    }
//
//  Then in components:
//    const api = useApi()
//    const items = await api.call('myResource', 'list')
//    const item  = await api.call('myResource', 'get', { params: { id: '42' } })
//    await api.call('myResource', 'create', { body: { name: 'thing' } })
//
// ─────────────────────────────────────────────────────────────────────────────

import type { ApiConfig } from './types'

export const apiConfig: ApiConfig = {
  // ── Base URL ───────────────────────────────────────────────────────────────
  // Use import.meta.env.VITE_API_URL in your .env file to override per-environment.
  baseUrl: import.meta.env.VITE_API_URL ?? 'https://jsonplaceholder.typicode.com',
  version: '',  // Set to 'v1' to prefix all paths with /v1

  // ── Timeout ───────────────────────────────────────────────────────────────
  timeout: 10_000,  // ms

  // ── Authentication ────────────────────────────────────────────────────────
  auth: {
    // 'bearer'  → Authorization: Bearer <token>
    // 'apikey'  → X-Api-Key: <token>
    // 'basic'   → Authorization: Basic <base64>
    // 'none'    → no auth header
    type: 'bearer',
    headerName: 'Authorization',
    tokenPrefix: 'Bearer',
    storageKey: 'auth_token',  // localStorage key
  },

  // ── Default headers ───────────────────────────────────────────────────────
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  // ── Retry behaviour ───────────────────────────────────────────────────────
  retries: 1,  // Retry failed requests once (0 = no retry)

  // ── Dev logging ───────────────────────────────────────────────────────────
  devLogging: true,  // Log every request/response in development

  // ── Endpoints ─────────────────────────────────────────────────────────────
  endpoints: {
    // ── Auth ─────────────────────────────────────────────────────────────────
    auth: {
      login:   { method: 'POST', path: '/auth/login',   authenticated: false, description: 'Log in and receive a token' },
      logout:  { method: 'POST', path: '/auth/logout',  authenticated: true,  description: 'Invalidate the current token' },
      refresh: { method: 'POST', path: '/auth/refresh', authenticated: true,  description: 'Obtain a fresh access token' },
      me:      { method: 'GET',  path: '/auth/me',      authenticated: true,  description: 'Fetch the authenticated user profile' },
    },

    // ── Users ─────────────────────────────────────────────────────────────────
    users: {
      list:   { method: 'GET',    path: '/users',     authenticated: true, cache: 30_000, description: 'Paginated user list' },
      get:    { method: 'GET',    path: '/users/:id', authenticated: true, cache: 30_000 },
      create: { method: 'POST',   path: '/users',     authenticated: true },
      update: { method: 'PUT',    path: '/users/:id', authenticated: true },
      patch:  { method: 'PATCH',  path: '/users/:id', authenticated: true },
      delete: { method: 'DELETE', path: '/users/:id', authenticated: true },
    },

    // ── Posts (demo – mirrors jsonplaceholder.typicode.com) ───────────────────
    posts: {
      list:     { method: 'GET',    path: '/posts',              authenticated: false, cache: 60_000 },
      get:      { method: 'GET',    path: '/posts/:id',          authenticated: false, cache: 60_000 },
      create:   { method: 'POST',   path: '/posts',              authenticated: true },
      update:   { method: 'PUT',    path: '/posts/:id',          authenticated: true },
      delete:   { method: 'DELETE', path: '/posts/:id',          authenticated: true },
      comments: { method: 'GET',    path: '/posts/:id/comments', authenticated: false, cache: 60_000 },
    },

    // ── Add your own endpoint groups below ────────────────────────────────────
    // products: {
    //   list:   { method: 'GET',  path: '/products',     authenticated: false, cache: 120_000 },
    //   get:    { method: 'GET',  path: '/products/:id', authenticated: false },
    //   create: { method: 'POST', path: '/products',     authenticated: true },
    // },
  },
}
