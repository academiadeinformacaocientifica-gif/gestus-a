# 📁 Estrutura do Projeto - Documentação

## Organização de Pastas

```
src/
├── components/              # Componentes React
│   ├── common/             # Componentes reutilizáveis (headers, footers, cards)
│   ├── dashboard/          # Componentes específicos do dashboard
│   ├── forms/              # Componentes de formulários
│   ├── ui/                 # Componentes shadcn/ui (NÃO EDITAR)
│   ├── AppLayout.tsx       # Layout principal
│   ├── AppSidebar.tsx      # Sidebar da aplicação
│   ├── ErrorBoundary.tsx   # Error boundary para tratamento de erros
│   └── ...outros.tsx       # Outros componentes únicos
│
├── pages/                  # Páginas da aplicação (rotas)
│   ├── Index.tsx          # Página raiz
│   ├── Auth.tsx           # Página de autenticação
│   ├── Dashboard.tsx      # Dashboard principal
│   ├── Financeiro.tsx     # Gestão financeira
│   ├── Vendas.tsx         # Gestão de vendas
│   ├── FinanceiroPage.tsx # Página expandida financeiro
│   ├── VendasPage.tsx     # Página expandida vendas
│   └── NotFound.tsx       # Página 404
│
├── hooks/                 # Custom React hooks
│   ├── useAuth.tsx        # Hook de autenticação
│   ├── useProfile.tsx     # Hook de perfil
│   ├── use-mobile.tsx     # Hook para detecção mobile
│   ├── use-toast.ts       # Hook de notificações
│   ├── useAuth.test.tsx   # Testes do hook
│   └── useProfile.test.tsx# Testes do hook
│
├── services/              # Serviços e lógica de negócio
│   ├── transactions.ts    # Serviço de transações
│   ├── vendas.ts          # Serviço de vendas
│   ├── profile.ts         # Serviço de perfil
│   └── auth.ts            # Serviço de autenticação
│
├── integrations/          # Integrações externas
│   └── supabase/
│       ├── client.ts      # Cliente Supabase
│       └── types.ts       # Tipos gerados do Supabase
│
├── utils/                 # Utilitários e helpers
│   ├── format.ts          # Formatação (moeda, data, etc)
│   ├── validation.ts      # Validação de inputs
│   └── helpers.ts         # Funções auxiliares
│
├── lib/                   # Bibliotecas e utilitários
│   ├── constants.ts       # Constantes globais
│   └── utils.ts           # Utilitários gerais
│
├── types/                 # Tipos TypeScript
│   └── index.ts          # Interfaces e types da aplicação
│
├── config/                # Configurações da aplicação
│   ├── queryClient.ts     # Configuração React Query
│   └── env.ts             # Variáveis de ambiente
│
├── test/                  # Testes gerais
│   ├── setup.ts           # Setup dos testes
│   └── example.test.ts    # Exemplos de testes
│
├── App.tsx                # Componente raiz
├── main.tsx               # Entry point
├── index.css              # Estilos globais
├── App.css                # Estilos da aplicação
└── vite-env.d.ts          # Tipos Vite
```

## Convenções de Naming

### Arquivos
- **Componentes React**: PascalCase (ex: `DashboardChart.tsx`)
- **Hooks customizados**: camelCase com prefixo "use" (ex: `useProfile.tsx`)
- **Serviços/Utilidades**: camelCase (ex: `transactions.ts`)
- **Tipos**: camelCase em pasta `/types` (ex: `types/index.ts`)
- **Testes**: mesmo nome do arquivo + `.test.tsx` (ex: `hooks/useAuth.test.tsx`)

### Componentes
```tsx
// ✅ BOM
export default function DashboardChart() { }

// ✅ BOM (com export nomeado)
export function DashboardChart() { }

// ❌ EVITAR
const DashboardChart = () => { }
```

### Hooks
```tsx
// ✅ BOM
export function useAuth() { }
export const useAuth = () => { }

// ❌ EVITAR
export default function useAuth() { }
```

## Importações

### Path Aliases
O projeto está configurado com alias `@` para `/src`:

```tsx
// ✅ BOM
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { formatarMoeda } from "@/utils/format";
import { ROUTES } from "@/lib/constants";

// ❌ EVITAR
import { Button } from "../../../../components/ui/button";
import { useAuth } from "../../../hooks/useAuth";
```

## Estrutura de Componentes

### Componente Simples
```tsx
import { ComponentProps } from "react";

interface MyComponentProps extends ComponentProps<"div"> {
  label: string;
  value?: string;
}

export function MyComponent({ label, value, ...props }: MyComponentProps) {
  return (
    <div {...props}>
      <span>{label}</span>
      {value && <p>{value}</p>}
    </div>
  );
}
```

### Componente com Lógica
```tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MyContainerProps {
  userId: string;
}

export function MyContainer({ userId }: MyContainerProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["myData", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("table")
        .select("*")
        .eq("user_id", userId);
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar</div>;

  return <div>{/* conteúdo */}</div>;
}
```

## Onde Colocar Cada Coisa

### Constantes Globais → `/lib/constants.ts`
```tsx
export const ROUTES = { ... }
export const MESSAGES = { ... }
```

### Tipos Compartilhados → `/types/index.ts`
```tsx
export interface User { ... }
export interface Transaction { ... }
```

### Lógica de Autenticação → `/services/auth.ts`
```tsx
export async function signIn(email: string, password: string) { ... }
export async function signUp(email: string, password: string) { ... }
```

### Componentes Reutilizáveis → `/components/common/`
```tsx
// MyCard.tsx - usado em múltiplos lugares
// MyButton.tsx - botão customizado
// MyHeader.tsx - cabeçalho customizado
```

### Componentes Específicos → `/components/dashboard/`
```tsx
// DashboardChart.tsx - gráfico do dashboard
// DashboardMetrics.tsx - métricas do dashboard
```

### Formatação → `/utils/format.ts`
```tsx
export const formatarMoeda = (valor: number) => { ... }
export const formatarData = (data: string) => { ... }
```

### Validação → `/utils/validation.ts`
```tsx
export const validarEmail = (email: string) => { ... }
export const validarLogin = (email: string, senha: string) => { ... }
```

## Boas Práticas

### 1. Type Safety
```tsx
// ✅ BOM - tipos claros
const formatarMoeda = (valor: number): string => { ... }

// ❌ EVITAR - tipos implícitos
const formatarMoeda = (valor) => { ... }
```

### 2. Componentes Puros
```tsx
// ✅ BOM - componente puro
export function Card({ title, children }: CardProps) {
  return <div><h2>{title}</h2>{children}</div>;
}

// ⚠️ CUIDADO - efeitos colaterais
export function Card({ title, children }: CardProps) {
  useEffect(() => { fetchData(); }, []); // Move para hook ou container
  return <div><h2>{title}</h2>{children}</div>;
}
```

### 3. Query Keys Consistentes
```tsx
// ✅ BOM
queryKey: ["dashboard", userId]
queryKey: ["transactions", userId, filters]

// ❌ EVITAR
queryKey: ["data"]
queryKey: ["stuff", Math.random()]
```

### 4. Erros e Loading
```tsx
// ✅ BOM
const { data, isLoading, error } = useQuery({ ... });

if (isLoading) return <LoadingState />;
if (error) return <ErrorState error={error} />;
return <Content data={data} />;

// ❌ EVITAR
if (isLoading) return "Loading...";
if (error) return "Error";
```

## Scripts Úteis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor dev

# Build
npm run build        # Build para produção
npm run preview      # Pré-visualiza build

# Testes
npm run test         # Executa testes
npm run test:watch   # Testes em modo watch

# Lint
npm run lint         # Verifica linting
```

## Próximos Passos

1. ✅ Estrutura de pastas criada
2. ✅ Tipos TypeScript centralizados
3. ✅ Constantes globais
4. ⏭️ Criar serviços para lógica de negócio
5. ⏭️ Mover componentes para estrutura
6. ⏭️ Adicionar testes para componentes críticos
