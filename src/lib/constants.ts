/**
 * Aplicação de Constantes Globais
 * Centraliza todos os valores constantes da aplicação
 */

// URLs e Endpoints
export const API_CONFIG = {
  SUPABASE_TIMEOUT: 10000, // 10 segundos
  QUERY_RETRY_COUNT: 3,
  QUERY_STALE_TIME: 5 * 60 * 1000, // 5 minutos
} as const;

// Rotas da Aplicação
export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  FINANCEIRO: "/financeiro",
  VENDAS: "/vendas",
  DASHBOARD: "/",
  NOT_FOUND: "/404",
} as const;

// Mensagens da Aplicação
export const MESSAGES = {
  // Autenticação
  AUTH: {
    LOGIN_SUCCESS: "Login realizado com sucesso!",
    SIGNUP_SUCCESS: "Conta criada com sucesso! Verifique o seu email.",
    LOGOUT_SUCCESS: "Desconectado com sucesso.",
    EMAIL_REQUIRED: "Email é obrigatório.",
    PASSWORD_REQUIRED: "Senha é obrigatória.",
    PASSWORD_MIN_LENGTH: "Senha deve ter no mínimo 6 caracteres.",
    INVALID_EMAIL: "Email inválido.",
    ACCOUNT_EXISTS: "Esta conta já existe.",
    INVALID_CREDENTIALS: "Email ou senha incorretos.",
  },
  // Erros Gerais
  ERROR: {
    GENERIC: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    NETWORK: "Erro de conexão. Verifique sua conectividade.",
    DATABASE: "Erro ao carregar dados. Tente novamente.",
    PERMISSION_DENIED: "Não tem permissão para realizar esta ação.",
  },
  // Sucesso
  SUCCESS: {
    SAVED: "Guardado com sucesso!",
    UPDATED: "Atualizado com sucesso!",
    DELETED: "Eliminado com sucesso!",
  },
  // Carregamento
  LOADING: {
    LOADING_DATA: "A carregar dados...",
    PROCESSING: "A processar...",
  },
} as const;

// Tipos de Transações
export const TRANSACTION_TYPES = {
  INCOME: "ganho",
  EXPENSE: "despesa",
} as const;

// Períodos de Filtro
export const FILTER_PERIODS = {
  TODAY: "hoje",
  THIS_WEEK: "esta_semana",
  THIS_MONTH: "este_mês",
  LAST_30_DAYS: "últimos_30_dias",
  THIS_YEAR: "este_ano",
  ALL_TIME: "todo_tempo",
} as const;

// Cores e Temas
export const THEME_COLORS = {
  INCOME: "#10B981", // Verde
  EXPENSE: "#EF4444", // Vermelho
  NEUTRAL: "#6B7280", // Cinzento
  HIGHLIGHT: "#8B5CF6", // Roxo
} as const;

// Limites e Configurações
export const LIMITS = {
  MAX_TRANSACTIONS_PER_PAGE: 50,
  MAX_SALES_PER_PAGE: 50,
  DEBOUNCE_DELAY: 300, // ms
  TOAST_DURATION: 3000, // ms
} as const;

// Formato de Datas
export const DATE_FORMATS = {
  DISPLAY: "dd/MM/yyyy",
  DISPLAY_WITH_TIME: "dd/MM/yyyy HH:mm",
  API: "yyyy-MM-dd",
  MONTH: "MMMM yyyy",
} as const;

// Moeda
export const CURRENCY = {
  SYMBOL: "€",
  CODE: "EUR",
  LOCALE: "pt-AO",
} as const;

// Validação
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^\+?[\d\s\-()]+$/,
} as const;
