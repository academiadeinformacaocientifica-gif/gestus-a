/**
 * Configuração do React Query (TanStack Query)
 * Configura opções globais para todas as queries
 */

import { QueryClient } from "@tanstack/react-query";
import { API_CONFIG } from "@/lib/constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: API_CONFIG.QUERY_STALE_TIME,
      gcTime: 10 * 60 * 1000, // 10 minutos (antes era cacheTime)
      retry: API_CONFIG.QUERY_RETRY_COUNT,
      refetchOnWindowFocus: "stale",
      refetchOnReconnect: "stale",
      refetchOnMount: "stale",
    },
    mutations: {
      retry: 1,
      throwOnError: false,
    },
  },
});
