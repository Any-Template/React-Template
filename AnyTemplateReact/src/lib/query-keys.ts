// Centralised React Query key factory — prevents key collisions
export const queryKeys = {
  posts: {
    all:      () => ['posts'] as const,
    list:     () => ['posts', 'list'] as const,
    detail:   (id: string | number) => ['posts', 'detail', id] as const,
    comments: (id: string | number) => ['posts', 'comments', id] as const,
  },
  users: {
    all:    () => ['users'] as const,
    list:   () => ['users', 'list'] as const,
    detail: (id: string | number) => ['users', 'detail', id] as const,
  },
  auth: {
    me: () => ['auth', 'me'] as const,
  },
}
