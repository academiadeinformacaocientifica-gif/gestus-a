/**
 * Utilitários de Validação
 * Funções para validar inputs, emails, etc.
 */

import { VALIDATION, MESSAGES } from "@/lib/constants";

/**
 * Valida se um email é válido
 * @param email - Email a validar
 * @returns true se válido, false caso contrário
 */
export const validarEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Valida se uma senha atende aos requisitos
 * @param senha - Senha a validar
 * @returns Objeto com validação e mensagem de erro
 */
export const validarSenha = (
  senha: string
): { valida: boolean; erro?: string } => {
  if (!senha) {
    return { valida: false, erro: MESSAGES.AUTH.PASSWORD_REQUIRED };
  }

  if (senha.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return {
      valida: false,
      erro: MESSAGES.AUTH.PASSWORD_MIN_LENGTH,
    };
  }

  return { valida: true };
};

/**
 * Valida se um número de telefone é válido
 * @param telefone - Telefone a validar
 * @returns true se válido, false caso contrário
 */
export const validarTelefone = (telefone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(telefone);
};

/**
 * Valida um formulário de login
 * @param email - Email do formulário
 * @param senha - Senha do formulário
 * @returns Objeto com erros (vazio se válido)
 */
export const validarLogin = (
  email: string,
  senha: string
): Record<string, string> => {
  const erros: Record<string, string> = {};

  if (!email) {
    erros.email = MESSAGES.AUTH.EMAIL_REQUIRED;
  } else if (!validarEmail(email)) {
    erros.email = MESSAGES.AUTH.INVALID_EMAIL;
  }

  const validacaoSenha = validarSenha(senha);
  if (!validacaoSenha.valida) {
    erros.senha = validacaoSenha.erro || MESSAGES.AUTH.PASSWORD_REQUIRED;
  }

  return erros;
};

/**
 * Valida um formulário de registo
 * @param email - Email do formulário
 * @param senha - Senha do formulário
 * @param confirmaSenha - Confirmação de senha
 * @param nome - Nome do utilizador
 * @returns Objeto com erros (vazio se válido)
 */
export const validarRegisto = (
  email: string,
  senha: string,
  confirmaSenha: string,
  nome: string
): Record<string, string> => {
  const erros = validarLogin(email, senha);

  if (!nome || nome.trim().length === 0) {
    erros.nome = "Nome é obrigatório.";
  }

  if (senha !== confirmaSenha) {
    erros.confirmaSenha = "As senhas não coincidem.";
  }

  return erros;
};

/**
 * Valida se um valor é um número positivo
 * @param valor - Valor a validar
 * @returns true se válido, false caso contrário
 */
export const validarValorPositivo = (valor: number | string): boolean => {
  const num = typeof valor === "string" ? parseFloat(valor) : valor;
  return !isNaN(num) && num >= 0;
};

/**
 * Valida se uma data é válida
 * @param data - Data a validar (formato ISO: YYYY-MM-DD)
 * @returns true se válida, false caso contrário
 */
export const validarData = (data: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(data)) return false;

  const date = new Date(data);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Valida um NIF português/angolano
 * @param nif - NIF a validar
 * @returns true se válido, false caso contrário
 */
export const validarNIF = (nif: string): boolean => {
  // NIF deve ter 12 dígitos (Angola) ou entre 9-12 dígitos
  const apenasNumeros = nif.replace(/\D/g, "");
  return apenasNumeros.length >= 9 && apenasNumeros.length <= 12;
};

/**
 * Valida um campo se não está vazio
 * @param valor - Valor a validar
 * @returns true se válido, false caso contrário
 */
export const validarObrigatorio = (valor: any): boolean => {
  if (typeof valor === "string") {
    return valor.trim().length > 0;
  }
  return valor !== null && valor !== undefined;
};

/**
 * Valida o comprimento mínimo de uma string
 * @param texto - Texto a validar
 * @param minimo - Comprimento mínimo
 * @returns true se válido, false caso contrário
 */
export const validarComprimentoMinimo = (
  texto: string,
  minimo: number
): boolean => {
  return texto && texto.trim().length >= minimo;
};

/**
 * Valida o comprimento máximo de uma string
 * @param texto - Texto a validar
 * @param maximo - Comprimento máximo
 * @returns true se válido, false caso contrário
 */
export const validarComprimentoMaximo = (
  texto: string,
  maximo: number
): boolean => {
  return !texto || texto.length <= maximo;
};
