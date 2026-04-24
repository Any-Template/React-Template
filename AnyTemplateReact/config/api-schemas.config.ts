// ─────────────────────────────────────────────────────────────────────────────
// API SCHEMAS CONFIG  –  Define the shape of every request & response body
// ─────────────────────────────────────────────────────────────────────────────

import { z } from 'zod'
import type { ApiSchemasConfig } from './types'

// ── Reusable field definitions ────────────────────────────────────────────────

const emailField    = z.string().email('Must be a valid email address')
const passwordField = z.string().min(8, 'Password must be at least 8 characters')
const idField       = z.union([z.string(), z.number()])

// ── Reusable response shapes ──────────────────────────────────────────────────

const paginatedMeta = z.object({
  page:       z.number(),
  perPage:    z.number(),
  total:      z.number(),
  totalPages: z.number(),
})

export const userSchema = z.object({
  id:        idField,
  name:      z.string(),
  email:     emailField,
  username:  z.string().optional(),
  phone:     z.string().optional(),
  website:   z.string().optional(),
  role:      z.enum(['admin', 'editor', 'viewer']).default('viewer'),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const postSchema = z.object({
  id:     idField,
  userId: idField,
  title:  z.string(),
  body:   z.string(),
})

// ── Schema definitions ────────────────────────────────────────────────────────

export const apiSchemas: ApiSchemasConfig = {
  // ── Auth ───────────────────────────────────────────────────────────────────
  auth: {
    login: {
      request: z.object({
        email:    emailField,
        password: passwordField,
      }),
      response: z.object({
        token:        z.string(),
        refreshToken: z.string().optional(),
        expiresIn:    z.number().optional(),
        user:         userSchema,
      }),
    },
    me: {
      response: userSchema,
    },
    refresh: {
      request: z.object({ refreshToken: z.string() }),
      response: z.object({
        token:     z.string(),
        expiresIn: z.number().optional(),
      }),
    },
  },

  // ── Users ──────────────────────────────────────────────────────────────────
  users: {
    list: {
      response: z.union([
        z.array(userSchema),
        z.object({ data: z.array(userSchema), meta: paginatedMeta.optional() }),
      ]),
    },
    get: {
      response: userSchema,
    },
    create: {
      request: z.object({
        name:     z.string().min(1, 'Name is required'),
        email:    emailField,
        password: passwordField,
        role:     z.enum(['admin', 'editor', 'viewer']).default('viewer'),
      }),
      response: userSchema,
    },
    update: {
      request: z.object({
        name:  z.string().min(1).optional(),
        email: emailField.optional(),
        role:  z.enum(['admin', 'editor', 'viewer']).optional(),
      }),
      response: userSchema,
    },
  },

  // ── Posts ──────────────────────────────────────────────────────────────────
  posts: {
    list: {
      response: z.array(postSchema),
    },
    get: {
      response: postSchema,
    },
    create: {
      request: z.object({
        title:  z.string().min(1, 'Title is required'),
        body:   z.string().min(1, 'Body is required'),
        userId: idField,
      }),
      response: postSchema,
    },
  },
}

// ── Infer TypeScript types from schemas ───────────────────────────────────────

export type LoginRequest      = z.infer<typeof apiSchemas.auth.login.request>
export type AuthResponse      = z.infer<typeof apiSchemas.auth.login.response>
export type User              = z.infer<typeof userSchema>
export type Post              = z.infer<typeof postSchema>
export type CreateUserRequest = z.infer<typeof apiSchemas.users.create.request>
export type UpdateUserRequest = z.infer<typeof apiSchemas.users.update.request>
export type CreatePostRequest = z.infer<typeof apiSchemas.posts.create.request>
