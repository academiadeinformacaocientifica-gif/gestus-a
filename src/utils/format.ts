/**
 * Utilitários de Formatação
 * Funções para formatar datas, moedas, percentagens, etc.
 */

import { format, parseISO } from "date-fns";
import { ptAO } from "date-fns/locale";
import { CURRENCY, DATE_FORMATS } from "@/lib/constants";

/**
 * Formata um valor em Kwanzas com 2 casas decimais
 * @param valor - Valor numérico a formatar
 * @returns String formatada (ex: "1.234,56 Kz")
 */
export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor) + " " + CURRENCY.SYMBOL;
};

/**
 * Formata uma data ISO para o formato de exibição
 * @param data - String ISO ou Date object
 * @returns String formatada (ex: "16/03/2026")
 */
export const formatarData = (data: string | Date): string => {
  try {
    const date = typeof data === "string" ? parseISO(data) : data;
    return format(date, DATE_FORMATS.DISPLAY, { locale: ptAO });
  } catch {
    return "--";
  }
};

/**
 * Formata uma data com hora
 * @param data - String ISO ou Date object
 * @returns String formatada (ex: "16/03/2026 14:30")
 */
export const formatarDataComHora = (data: string | Date): string => {
  try {
    const date = typeof data === "string" ? parseISO(data) : data;
    return format(date, DATE_FORMATS.DISPLAY_WITH_TIME, { locale: ptAO });
  } catch {
    return "--";
  }
};

/**
 * Formata uma data para um mês (ex: "Março 2026")
 * @param data - String ISO ou Date object
 * @returns String formatada
 */
export const formatarMes = (data: string | Date): string => {
  try {
    const date = typeof data === "string" ? parseISO(data) : data;
    return format(date, DATE_FORMATS.MONTH, { locale: ptAO });
  } catch {
    return "--";
  }
};

/**
 * Formata uma percentagem
 * @param valor - Valor percentual
 * @param casasDecimais - Número de casas decimais
 * @returns String formatada (ex: "15,50%")
 */
export const formatarPercentagem = (
  valor: number,
  casasDecimais: number = 2
): string => {
  return `${valor.toFixed(casasDecimais)}%`;
};

/**
 * Formata um número com separadores de milhar
 * @param numero - Número a formatar
 * @param casasDecimais - Número de casas decimais
 * @returns String formatada
 */
export const formatarNumero = (
  numero: number,
  casasDecimais: number = 2
): string => {
  return new Intl.NumberFormat(CURRENCY.LOCALE, {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  }).format(numero);
};

/**
 * Trunca um texto para um máximo de caracteres
 * @param texto - Texto a truncar
 * @param maxCaracteres - Número máximo de caracteres
 * @returns String truncada com "..." se necessário
 */
export const truncarTexto = (texto: string, maxCaracteres: number): string => {
  if (texto.length <= maxCaracteres) return texto;
  return `${texto.substring(0, maxCaracteres)}...`;
};

/**
 * Capitaliza a primeira letra de uma string
 * @param texto - Texto a capitalizar
 * @returns String com primeira letra maiúscula
 */
export const capitalizarPrimeira = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

/**
 * Formata um tipo de transação para exibição
 * @param tipo - Tipo de transação ("ganho" ou "despesa")
 * @returns String formatada
 */
export const formatarTipoTransacao = (tipo: string): string => {
  const tipos: Record<string, string> = {
    ganho: "Ganho",
    despesa: "Despesa",
  };
  return tipos[tipo] || tipo;
};

/**
 * Formata um status de venda
 * @param status - Status da venda
 * @returns String formatada
 */
export const formatarStatusVenda = (status: string): string => {
  const statuses: Record<string, string> = {
    pendente: "Pendente",
    concluida: "Concluída",
    cancelada: "Cancelada",
  };
  return statuses[status] || status;
};
