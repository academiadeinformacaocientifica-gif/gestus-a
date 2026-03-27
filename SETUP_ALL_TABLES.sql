-- ============================================================
-- CRIAR TODAS AS TABELAS NECESSÁRIAS NO SUPABASE
-- ============================================================
-- Execute este SQL no Supabase SQL Editor
-- https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/sql

-- ============================================================
-- 0. FUNÇÃO UPDATED_AT (compartilhada)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. TABELA TRANSACOES (se não existir)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.transacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('ganho', 'despesa')),
  categoria TEXT NOT NULL,
  descricao TEXT,
  valor NUMERIC(12,2) NOT NULL,
  data DATE NOT NULL,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own transacoes" ON public.transacoes;
DROP POLICY IF EXISTS "Users can insert their own transacoes" ON public.transacoes;
DROP POLICY IF EXISTS "Users can update their own transacoes" ON public.transacoes;
DROP POLICY IF EXISTS "Users can delete their own transacoes" ON public.transacoes;

CREATE POLICY "Users can view their own transacoes" ON public.transacoes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own transacoes" ON public.transacoes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own transacoes" ON public.transacoes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own transacoes" ON public.transacoes FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_transacoes_updated_at ON public.transacoes;
CREATE TRIGGER update_transacoes_updated_at BEFORE UPDATE ON public.transacoes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_transacoes_user ON public.transacoes(user_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_user_data ON public.transacoes(user_id, data DESC);
CREATE INDEX IF NOT EXISTS idx_transacoes_tipo ON public.transacoes(user_id, tipo);

-- ============================================================
-- 2. TABELA VENDAS (se não existir)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.vendas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cliente_nome TEXT,
  valor_total NUMERIC(12,2) NOT NULL,
  descricao TEXT,
  data DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'concluida', 'cancelada')),
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own vendas" ON public.vendas;
DROP POLICY IF EXISTS "Users can insert their own vendas" ON public.vendas;
DROP POLICY IF EXISTS "Users can update their own vendas" ON public.vendas;
DROP POLICY IF EXISTS "Users can delete their own vendas" ON public.vendas;

CREATE POLICY "Users can view their own vendas" ON public.vendas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own vendas" ON public.vendas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own vendas" ON public.vendas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own vendas" ON public.vendas FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_vendas_updated_at ON public.vendas;
CREATE TRIGGER update_vendas_updated_at BEFORE UPDATE ON public.vendas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_vendas_user ON public.vendas(user_id);
CREATE INDEX IF NOT EXISTS idx_vendas_data ON public.vendas(user_id, data DESC);

-- ============================================================
-- 3. TABELA STOCK (se não existir)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.stock (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_produto TEXT NOT NULL,
  sku TEXT,
  quantidade INTEGER NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
  preco_unitario NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (preco_unitario >= 0),
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can insert their own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can update their own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can delete their own stock" ON public.stock;

CREATE POLICY "Users can view their own stock" ON public.stock FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own stock" ON public.stock FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own stock" ON public.stock FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own stock" ON public.stock FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_stock_updated_at ON public.stock;
CREATE TRIGGER update_stock_updated_at BEFORE UPDATE ON public.stock FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_stock_user ON public.stock(user_id);
CREATE INDEX IF NOT EXISTS idx_stock_nome ON public.stock(user_id, nome_produto);

-- ============================================================
-- 4. TABELA DESPESAS (Nova - campos extras)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.despesas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  categoria TEXT NOT NULL,
  descricao TEXT,
  valor NUMERIC(12,2) NOT NULL,
  data DATE NOT NULL,
  fornecedor TEXT,
  metodo_pagamento TEXT,
  num_comprovativo TEXT,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own despesas" ON public.despesas;
DROP POLICY IF EXISTS "Users can insert their own despesas" ON public.despesas;
DROP POLICY IF EXISTS "Users can update their own despesas" ON public.despesas;
DROP POLICY IF EXISTS "Users can delete their own despesas" ON public.despesas;

CREATE POLICY "Users can view their own despesas" ON public.despesas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own despesas" ON public.despesas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own despesas" ON public.despesas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own despesas" ON public.despesas FOR DELETE USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_despesas_updated_at ON public.despesas;
CREATE TRIGGER update_despesas_updated_at BEFORE UPDATE ON public.despesas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_despesas_user ON public.despesas(user_id);
CREATE INDEX IF NOT EXISTS idx_despesas_data ON public.despesas(user_id, data DESC);
CREATE INDEX IF NOT EXISTS idx_despesas_categoria ON public.despesas(user_id, categoria);

-- ============================================================
-- ✅ TODAS AS TABELAS CRIADAS COM SUCESSO!
-- ============================================================
--
-- Execute: SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- Para verificar todas as tabelas criadas
