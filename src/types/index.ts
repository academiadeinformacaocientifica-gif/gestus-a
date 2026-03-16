/**
 * Tipos e Interfaces TypeScript
 * Centraliza todas as definições de tipos da aplicação
 */

// ============ AUTENTICAÇÃO ============

export interface User {
  id: string;
  email: string;
  aud?: string;
  role?: string;
  created_at?: string;
}

export interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at?: number;
  refresh_token?: string;
  user: User;
}

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// ============ PERFIL ============

export interface Profile {
  id?: string;
  user_id: string;
  nome: string;
  nome_negocio?: string;
  email?: string;
  telefone?: string;
  morada?: string;
  nif?: string;
  foto_url?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileFormData {
  nome: string;
  nome_negocio?: string;
  telefone?: string;
  morada?: string;
  nif?: string;
  bio?: string;
}

// ============ TRANSAÇÕES ============

export interface Transaction {
  id: string;
  user_id: string;
  tipo: "ganho" | "despesa";
  categoria: string;
  descricao: string;
  valor: number;
  data: string; // ISO date string
  created_at: string;
  updated_at?: string;
  notas?: string;
}

export interface TransactionFormData {
  tipo: "ganho" | "despesa";
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
  notas?: string;
}

export interface TransactionFilters {
  tipo?: "ganho" | "despesa";
  dataInicio?: string;
  dataFim?: string;
  categoria?: string;
  minValor?: number;
  maxValor?: number;
}

// ============ VENDAS ============

export interface Venda {
  id: string;
  user_id: string;
  cliente: string;
  descricao: string;
  valor_total: number;
  quantidade?: number;
  preco_unitario?: number;
  data: string; // ISO date string
  status: "pendente" | "concluida" | "cancelada";
  created_at: string;
  updated_at?: string;
  notas?: string;
}

export interface VendaFormData {
  cliente: string;
  descricao: string;
  valor_total: number;
  quantidade?: number;
  preco_unitario?: number;
  data: string;
  status: "pendente" | "concluida" | "cancelada";
  notas?: string;
}

export interface VendaFilters {
  status?: "pendente" | "concluida" | "cancelada";
  dataInicio?: string;
  dataFim?: string;
  cliente?: string;
  minValor?: number;
  maxValor?: number;
}

// ============ DASHBOARD ============

export interface DashboardMetrics {
  faturamento: number;
  despesas: number;
  lucro: number;
  totalVendas: number;
  percentualMudanca: number;
}

export interface ChartDataPoint {
  data: string;
  valor: number;
  tipo: "ganho" | "despesa";
}

// ============ ERROS E RESPOSTAS ============

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

// ============ COMPONENTES ============

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "ganho" | "despesa" | "info" | "destaque";
  trend?: {
    direction: "up" | "down";
    percentage: number;
  };
}

export interface TransactionListProps {
  transactions: Transaction[];
  compact?: boolean;
  onTransactionClick?: (transaction: Transaction) => void;
}

export interface QuickAddFABProps {
  onAddTransaction?: () => void;
  onAddVenda?: () => void;
}

// ============ FORMULÁRIOS ============

export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface ValidationRule<T> {
  field: keyof T;
  validate: (value: any) => boolean | string;
  message: string;
}

// ============ UTILIDADES ============

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;
