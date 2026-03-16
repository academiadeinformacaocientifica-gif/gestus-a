/**
 * Hook de API Genérico
 * Simplifica queries repetidas com tratamento de erros e loading
 */

import React from "react";
import {
  UseQueryResult,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ApiError, ApiResponse } from "@/types";
import { toast } from "sonner";

interface UseApiOptions<T> extends Omit<UseQueryOptions<T>, "queryKey"> {
  showErrorToast?: boolean;
  errorMessage?: string;
}

/**
 * Hook genérico para queries de API
 * @param queryKey - Chave da query para cache
 * @param queryFn - Função async que faz a query
 * @param options - Opções do useQuery
 * @returns Resultado da query com dados, loading, erro
 */
export function useApi<T>(
  queryKey: (string | number | undefined | null)[],
  queryFn: () => Promise<T>,
  options?: UseApiOptions<T>
): UseQueryResult<T> {
  const {
    showErrorToast = true,
    errorMessage,
    ...queryOptions
  } = options || {};

  return useQuery({
    queryKey: queryKey.filter(
      (key): key is string | number => key !== undefined && key !== null
    ),
    queryFn,
    ...queryOptions,
    enabled: options?.enabled !== false,
  });
}

/**
 * Hook genérico para queries com resposta de API formatada
 * @param queryKey - Chave da query para cache
 * @param queryFn - Função que retorna ApiResponse<T>
 * @param options - Opções customizadas
 */
export function useApiResponse<T>(
  queryKey: (string | number | undefined | null)[],
  queryFn: () => Promise<ApiResponse<T>>,
  options?: UseApiOptions<T>
): UseQueryResult<T | undefined> {
  const { showErrorToast = true, errorMessage, ...queryOptions } = options || {};

  return useQuery({
    queryKey: queryKey.filter(
      (key): key is string | number => key !== undefined && key !== null
    ),
    queryFn: async () => {
      try {
        const response = await queryFn();
        if (!response.success && response.error) {
          throw new Error(response.error.message);
        }
        return response.data;
      } catch (error) {
        if (showErrorToast) {
          const message =
            errorMessage ||
            (error instanceof Error ? error.message : "Erro ao carregar dados");
          toast.error(message);
        }
        throw error;
      }
    },
    ...queryOptions,
    enabled: options?.enabled !== false,
  });
}

/**
 * Hook para queries paginadas
 * @param queryKey - Chave base da query
 * @param queryFn - Função que faz a query
 * @param options - Opções customizadas
 */
export function usePaginatedApi<T>(
  queryKey: (string | number | undefined | null)[],
  queryFn: (page: number) => Promise<T[]>,
  options?: UseApiOptions<T[]> & { initialPage?: number }
): UseQueryResult<T[]> & { page: number; nextPage: () => void; prevPage: () => void } {
  const { initialPage = 1, ...queryOptions } = options || {};
  const [page, setPage] = React.useState(initialPage);

  const query = useQuery({
    queryKey: [...queryKey.filter(
      (key): key is string | number => key !== undefined && key !== null
    ), page],
    queryFn: () => queryFn(page),
    ...queryOptions,
  });

  return {
    ...query,
    page,
    nextPage: () => setPage((p) => p + 1),
    prevPage: () => setPage((p) => Math.max(1, p - 1)),
  };
}
