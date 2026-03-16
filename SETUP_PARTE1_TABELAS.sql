-- ============================================================
-- SQL SETUP PARTE 1: CRIAR TABELAS E RLS
-- Projeto: mmwdewtfvvggpgoisabl
-- ============================================================

-- ===== STEP 1: CREATE TABLES (if they don't exist) =====

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT,
  nome_negocio TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create stock table
CREATE TABLE IF NOT EXISTS stock (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_produto TEXT NOT NULL,
  sku TEXT,
  quantidade INT DEFAULT 0,
  preco_unitario DECIMAL(10, 2),
  descricao TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create transacoes table
CREATE TABLE IF NOT EXISTS transacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT,
  valor DECIMAL(10, 2),
  categoria TEXT,
  descricao TEXT,
  data DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create vendas table
CREATE TABLE IF NOT EXISTS vendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cliente_nome TEXT,
  valor_total DECIMAL(10, 2),
  descricao TEXT,
  data DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for stock
DROP POLICY IF EXISTS "Users can view own stock" ON stock;
CREATE POLICY "Users can view own stock" ON stock
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own stock" ON stock;
CREATE POLICY "Users can manage own stock" ON stock
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for transacoes
DROP POLICY IF EXISTS "Users can view own transacoes" ON transacoes;
CREATE POLICY "Users can view own transacoes" ON transacoes
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own transacoes" ON transacoes;
CREATE POLICY "Users can manage own transacoes" ON transacoes
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for vendas
DROP POLICY IF EXISTS "Users can view own vendas" ON vendas;
CREATE POLICY "Users can view own vendas" ON vendas
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own vendas" ON vendas;
CREATE POLICY "Users can manage own vendas" ON vendas
  FOR ALL USING (auth.uid() = user_id);

-- ===== FIM PARTE 1 =====
-- Próximo passo: Criar utilizador Demo no Supabase Auth
