/**
 * Serviço de Stock
 * Centraliza toda a lógica relacionada com gestão de stock
 */

import { supabase } from "@/integrations/supabase/client";
import { ProdutoStock, ProdutoStockFormData, StockFilters } from "@/types";

/**
 * Fetch de todos os produtos do stock
 */
export async function fetchStock(
  userId: string,
  filtros?: StockFilters
): Promise<ProdutoStock[]> {
  let query = supabase
    .from("stock")
    .select("*")
    .eq("user_id", userId);

  // Aplicar filtros se existirem
  if (filtros?.nome) {
    query = query.ilike("nome_produto", `%${filtros.nome}%`);
  }

  if (filtros?.sku) {
    query = query.eq("sku", filtros.sku);
  }

  if (filtros?.quantidade?.min !== undefined) {
    query = query.gte("quantidade", filtros.quantidade.min);
  }

  if (filtros?.quantidade?.max !== undefined) {
    query = query.lte("quantidade", filtros.quantidade.max);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch de um produto específico
 */
export async function fetchProduto(produtoId: string): Promise<ProdutoStock | null> {
  const { data, error } = await supabase
    .from("stock")
    .select("*")
    .eq("id", produtoId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned
    throw error;
  }

  return data || null;
}

/**
 * Criar um novo produto no stock
 */
export async function criarProduto(
  userId: string,
  dados: ProdutoStockFormData
): Promise<ProdutoStock> {
  const { data, error } = await supabase
    .from("stock")
    .insert({
      user_id: userId,
      ...dados,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Atualizar um produto existente
 */
export async function atualizarProduto(
  produtoId: string,
  dados: Partial<ProdutoStockFormData>
): Promise<ProdutoStock> {
  const { data, error } = await supabase
    .from("stock")
    .update(dados)
    .eq("id", produtoId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Eliminar um produto do stock
 */
export async function eliminarProduto(produtoId: string): Promise<void> {
  const { error } = await supabase
    .from("stock")
    .delete()
    .eq("id", produtoId);

  if (error) throw error;
}

/**
 * Atualizar quantidade de um produto
 */
export async function atualizarQuantidade(
  produtoId: string,
  novaQuantidade: number
): Promise<ProdutoStock> {
  return atualizarProduto(produtoId, { quantidade: novaQuantidade });
}

/**
 * Obter estatísticas do stock
 */
export async function getEstatisticasStock(userId: string): Promise<{
  totalProdutos: number;
  quantidadeTotalUnidades: number;
  valorTotalStock: number;
  valorMedioPorProduto: number;
}> {
  const produtos = await fetchStock(userId);

  const totalProdutos = produtos.length;
  const quantidadeTotalUnidades = produtos.reduce((sum, p) => sum + p.quantidade, 0);
  const valorTotalStock = produtos.reduce(
    (sum, p) => sum + p.quantidade * p.preco_unitario,
    0
  );
  const valorMedioPorProduto = totalProdutos > 0 ? valorTotalStock / totalProdutos : 0;

  return {
    totalProdutos,
    quantidadeTotalUnidades,
    valorTotalStock,
    valorMedioPorProduto,
  };
}

/**
 * Buscar produtos com baixo stock
 */
export async function getProdutosBaixoStock(
  userId: string,
  limiteMinimo: number = 10
): Promise<ProdutoStock[]> {
  return fetchStock(userId, {
    quantidade: {
      max: limiteMinimo,
    },
  });
}
