-- ============================================================
-- CRIAR TABELA DESPESAS NO SUPABASE
-- ============================================================
-- Execute este SQL no Supabase SQL Editor
-- https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/sql

-- ============================================================
-- 1. CRIAR TABELA DESPESAS
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

-- ============================================================
-- 2. ATIVAR RLS (ROW LEVEL SECURITY)
-- ============================================================

ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 3. CRIAR POLÍTICAS DE ACESSO
-- ============================================================

DROP POLICY IF EXISTS "Users can view their own despesas" ON public.despesas;
DROP POLICY IF EXISTS "Users can insert their own despesas" ON public.despesas;
DROP POLICY IF EXISTS "Users can update their own despesas" ON public.despesas;
DROP POLICY IF EXISTS "Users can delete their own despesas" ON public.despesas;

CREATE POLICY "Users can view their own despesas" ON public.despesas 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own despesas" ON public.despesas 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own despesas" ON public.despesas 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own despesas" ON public.despesas 
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- 4. CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_despesas_user ON public.despesas(user_id);
CREATE INDEX IF NOT EXISTS idx_despesas_data ON public.despesas(user_id, data DESC);
CREATE INDEX IF NOT EXISTS idx_despesas_categoria ON public.despesas(user_id, categoria);

-- ============================================================
-- 5. CRIAR TRIGGER PARA UPDATED_AT
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_despesas_updated_at 
  BEFORE UPDATE ON public.despesas 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ✅ TABELA DESPESAS CRIADA COM SUCESSO!
-- ============================================================
--
-- Execute: SELECT * FROM public.despesas LIMIT 10;
-- Para verificar se a tabela foi criada corretamente
