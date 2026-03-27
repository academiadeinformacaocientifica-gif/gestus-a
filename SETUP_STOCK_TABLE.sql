-- ============================================================
-- CRIAR TABELA STOCK NO SUPABASE
-- ============================================================
-- Execute este SQL no Supabase SQL Editor
-- https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/sql

-- ============================================================
-- 1. CRIAR TABELA STOCK
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

-- ============================================================
-- 2. ATIVAR RLS (ROW LEVEL SECURITY)
-- ============================================================

ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 3. CRIAR POLÍTICAS DE ACESSO
-- ============================================================

DROP POLICY IF EXISTS "Users can view their own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can insert their own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can update their own stock" ON public.stock;
DROP POLICY IF EXISTS "Users can delete their own stock" ON public.stock;

CREATE POLICY "Users can view their own stock" ON public.stock 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stock" ON public.stock 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stock" ON public.stock 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stock" ON public.stock 
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 4. CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_stock_user ON public.stock(user_id);
CREATE INDEX IF NOT EXISTS idx_stock_nome ON public.stock(user_id, nome_produto);

-- ============================================================
-- 5. CRIAR TRIGGER PARA UPDATED_AT (se não existir)
-- ============================================================

-- Primeiro, verificar se a função existe
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ✅ TABELA STOCK CRIADA COM SUCESSO!
-- ============================================================
--
-- Execute: SELECT * FROM public.stock LIMIT 10;
-- Para verificar se a tabela foi criada corretamente
