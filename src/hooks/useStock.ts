/**
 * Hook para gestão de Stock
 * Centraliza estado e operações relacionadas com stock
 */

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import {
  fetchStock,
  fetchProduto,
  criarProduto,
  atualizarProduto,
  eliminarProduto,
  getEstatisticasStock,
  getProdutosBaixoStock,
} from "@/services/stock";
import { ProdutoStock, ProdutoStockFormData, StockFilters } from "@/types";
import { toast } from "sonner";

/**
 * Hook para fetch de todos os produtos do stock
 */
export function useStockProdutos(filtros?: StockFilters) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["stock", user?.id, filtros],
    queryFn: () => (user ? fetchStock(user.id, filtros) : Promise.resolve([])),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/**
 * Hook para fetch de um produto específico
 */
export function useProduto(produtoId: string | null) {
  return useQuery({
    queryKey: ["produto", produtoId],
    queryFn: () => (produtoId ? fetchProduto(produtoId) : Promise.resolve(null)),
    enabled: !!produtoId,
  });
}

/**
 * Hook para criar um novo produto
 */
export function useCreateProduto() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dados: ProdutoStockFormData) => {
      if (!user) throw new Error("Utilizador não autenticado");
      return criarProduto(user.id, dados);
    },
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao criar produto: ${error.message}`);
    },
  });
}

/**
 * Hook para atualizar um produto
 */
export function useUpdateProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: Partial<ProdutoStockFormData> }) =>
      atualizarProduto(id, dados),
    onSuccess: () => {
      toast.success("Produto atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao atualizar produto: ${error.message}`);
    },
  });
}

/**
 * Hook para eliminar um produto
 */
export function useDeleteProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (produtoId: string) => eliminarProduto(produtoId),
    onSuccess: () => {
      toast.success("Produto eliminado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
    onError: (error: any) => {
      toast.error(`Erro ao eliminar produto: ${error.message}`);
    },
  });
}

/**
 * Hook para obter estatísticas do stock
 */
export function useStockEstatisticas() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["stock-stats", user?.id],
    queryFn: () => (user ? getEstatisticasStock(user.id) : Promise.resolve(null)),
    enabled: !!user,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}

/**
 * Hook para obter produtos com baixo stock
 */
export function useProdutosBaixoStock(limiteMinimo: number = 10) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["stock-baixo", user?.id, limiteMinimo],
    queryFn: () =>
      user ? getProdutosBaixoStock(user.id, limiteMinimo) : Promise.resolve([]),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
