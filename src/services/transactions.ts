/**
 * Serviço de Transações
 * Centraliza toda a lógica relacionada com transações
 */

import { supabase } from "@/integrations/supabase/client";
import { Transaction, TransactionFormData, TransactionFilters } from "@/types";

/**
 * Fetch de todas as transações do utilizador
 */
export async function fetchTransacoes(
  userId: string,
  filtros?: TransactionFilters
): Promise<Transaction[]> {
  let query = supabase
    .from("transacoes")
    .select("*")
    .eq("user_id", userId);

  // Aplicar filtros se existirem
  if (filtros?.tipo) {
    query = query.eq("tipo", filtros.tipo);
  }

  if (filtros?.dataInicio) {
    query = query.gte("data", filtros.dataInicio);
  }

  if (filtros?.dataFim) {
    query = query.lte("data", filtros.dataFim);
  }

  if (filtros?.categoria) {
    query = query.eq("categoria", filtros.categoria);
  }

  if (filtros?.minValor !== undefined) {
    query = query.gte("valor", filtros.minValor);
  }

  if (filtros?.maxValor !== undefined) {
    query = query.lte("valor", filtros.maxValor);
  }

  const { data, error } = await query.order("data", { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Fetch de uma transação específica
 */
export async function fetchTransacao(
  transacaoId: string
): Promise<Transaction | null> {
  const { data, error } = await supabase
    .from("transacoes")
    .select("*")
    .eq("id", transacaoId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned
    throw error;
  }

  return data || null;
}

/**
 * Criar uma nova transação
 */
export async function criarTransacao(
  userId: string,
  dados: TransactionFormData
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transacoes")
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
 * Atualizar uma transação existente
 */
export async function atualizarTransacao(
  transacaoId: string,
  dados: Partial<TransactionFormData>
): Promise<Transaction> {
  const { data, error } = await supabase
    .from("transacoes")
    .update(dados)
    .eq("id", transacaoId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Eliminar uma transação
 */
export async function eliminarTransacao(transacaoId: string): Promise<void> {
  const { error } = await supabase
    .from("transacoes")
    .delete()
    .eq("id", transacaoId);

  if (error) throw error;
}

/**
 * Obter estatísticas de transações
 */
export async function getEstatisticasTransacoes(
  userId: string,
  dataInicio: string,
  dataFim: string
): Promise<{
  totalGanhos: number;
  totalDespesas: number;
  lucroLiquido: number;
}> {
  const transacoes = await fetchTransacoes(userId, {
    dataInicio,
    dataFim,
  });

  const totalGanhos = transacoes
    .filter((t) => t.tipo === "ganho")
    .reduce((sum, t) => sum + Number(t.valor), 0);

  const totalDespesas = transacoes
    .filter((t) => t.tipo === "despesa")
    .reduce((sum, t) => sum + Number(t.valor), 0);

  return {
    totalGanhos,
    totalDespesas,
    lucroLiquido: totalGanhos - totalDespesas,
  };
}
