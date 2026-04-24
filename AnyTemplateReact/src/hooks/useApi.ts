import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query'
import { apiCall, type CallOptions } from '@/lib/api-client'

/** Generic typed useQuery wrapper over apiCall */
export function useApiQuery<T = unknown>(
  queryKey: readonly unknown[],
  group: string,
  endpoint: string,
  options?: CallOptions,
  queryOptions?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: () => apiCall<T>(group, endpoint, options),
    ...queryOptions,
  })
}

/** Generic typed useMutation wrapper over apiCall */
export function useApiMutation<TData = unknown, TVariables = CallOptions>(
  group: string,
  endpoint: string,
  mutationOptions?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (variables) => apiCall<TData>(group, endpoint, variables as CallOptions),
    ...mutationOptions,
  })
}

/** Direct access to the query client for manual cache management */
export function useApiClient() {
  return useQueryClient()
}
