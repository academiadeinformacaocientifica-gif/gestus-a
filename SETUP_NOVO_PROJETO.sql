-- ============================================================
-- SQL SETUP COMPLETO - NOVO PROJETO SUPABASE
-- Projeto: mmwdewtfvvggpgoisabl
-- Cria: 1 Utilizador, 44 Produtos, 30 Transações, 40 Vendas
-- ============================================================

-- ⚠️ IMPORTANTE: Substitua 'REPLACE_WITH_USER_ID' pelo UUID real!
-- O UUID será gerado quando criar o utilizador no Auth

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

-- ===== STEP 2: INSERT DATA =====

-- Insert Profile
INSERT INTO profiles (id, user_id, nome, nome_negocio, created_at, updated_at)
VALUES (gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Demo', 'Somiles - Retalhista', NOW(), NOW())
ON CONFLICT (user_id) DO NOTHING;

-- ===== PRODUCTS: ALIMENTOS (15) =====
INSERT INTO stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Arroz Integral 1kg', 'AR-001', 50, 2.50, 'Arroz integral de qualidade', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Feijão Preto 1kg', 'FJ-001', 35, 1.80, 'Feijão preto seco', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Azeite Extra Virgem 500ml', 'AZ-001', 25, 8.50, 'Azeite premium', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sal 1kg', 'SL-001', 100, 0.80, 'Sal de cozinha', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Açúcar 1kg', 'AC-001', 60, 1.20, 'Açúcar branco', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Farinha Trigo 1kg', 'FR-001', 45, 0.95, 'Farinha de trigo', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Massa Esparguete 500g', 'MS-001', 80, 0.85, 'Massa de qualidade', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Leite Integral 1L', 'LT-001', 70, 1.10, 'Leite fresco', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Queijo Meia Cura 250g', 'QJ-001', 30, 3.50, 'Queijo português', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Iogurte Natural 500g', 'YG-001', 45, 2.20, 'Iogurte natural', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Manteiga 250g', 'MB-001', 35, 4.50, 'Manteiga pura', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Pão Integral 400g', 'PÃ-001', 60, 1.85, 'Pão de qualidade', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Ovos Cartonagem 10', 'OV-001', 120, 1.50, 'Ovos frescos', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Chocolate 100g', 'CL-001', 55, 1.95, 'Chocolate negro', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Café em Grão 500g', 'CF-001', 40, 6.50, 'Café premium', NOW(), NOW());

-- ===== PRODUCTS: BEBIDAS (10) =====
INSERT INTO stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Água Mineral 1.5L', 'AG-001', 200, 0.55, 'Água mineral', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sumo Natural 1L', 'SJ-001', 50, 2.30, 'Sumo de laranja', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Leite Chocolate 1L', 'LH-001', 40, 1.85, 'Leite com chocolate', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Refrigerante 2L', 'RF-001', 80, 2.10, 'Refrigerante diverso', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Chá Preto 20 saquetas', 'CH-001', 30, 2.50, 'Chá premium', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Vinho Tinto 750ml', 'VN-001', 45, 7.50, 'Vinho regional', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Cerveja Premium 330ml', 'CV-001', 120, 1.20, 'Cerveja artesanal', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sumo Polpa 1L', 'SP-001', 35, 3.20, 'Sumo com polpa', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Café Solúvel 200g', 'CS-001', 25, 5.80, 'Café instantâneo', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Xarope Sabores 500ml', 'XR-001', 20, 4.50, 'Xarope variado', NOW(), NOW());

-- ===== PRODUCTS: ROUPAS (10) =====
INSERT INTO stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'T-shirt Básica M', 'TS-001', 80, 8.50, 'T-shirt preta', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'T-shirt Básica G', 'TS-002', 75, 8.50, 'T-shirt preta tamanho grande', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Calças Jeans Azul', 'CJ-001', 45, 25.00, 'Calças jeans clássicas', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Camiseta Branca M', 'CB-001', 60, 10.00, 'Camiseta 100% algodão', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Hoodie Cinzento', 'HD-001', 30, 35.00, 'Hoodie confortável', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Meias Sortidas 3 pares', 'MK-001', 100, 4.50, 'Meias variadas', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Cachecol Lã', 'CC-001', 20, 15.00, 'Cachecol de lã pura', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Cinto Preto', 'CT-001', 35, 12.00, 'Cinto de couro', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Chapéu Ajustável', 'CP-001', 25, 14.50, 'Chapéu com logo', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Lenço Estampado', 'LC-001', 40, 6.50, 'Lenço de seda', NOW(), NOW());

-- ===== PRODUCTS: HIGIENE (7) =====
INSERT INTO stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sabonete Líquido 500ml', 'SB-001', 50, 3.50, 'Sabonete natural', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Champô 400ml', 'XP-001', 40, 5.20, 'Champô anti-caspa', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Pasta Dentes 75ml', 'PT-001', 60, 2.80, 'Pasta fluoretada', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Desodorizante 150ml', 'DS-001', 45, 4.00, 'Desodorizante 24h', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Papel Higiénico 12x', 'PH-001', 80, 8.50, 'Rolo de papel higiénico', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Lenços Humedecidos 80pcs', 'LH-001', 35, 3.20, 'Lenços de higiene', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Desinfetante 1L', 'DD-001', 30, 2.50, 'Desinfetante 100%', NOW(), NOW());

-- ===== PRODUCTS: OUTROS (2) =====
INSERT INTO stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Livro Ficção 200p', 'LV-001', 15, 12.50, 'Romance português', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Caneta BIC preta', 'CN-001', 200, 0.50, 'Caneta esferográfica', NOW(), NOW());

-- ===== TRANSAÇÕES: DESPESAS (30) =====
INSERT INTO transacoes (id, user_id, tipo, valor, categoria, descricao, data, created_at, updated_at) VALUES
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 350, 'Reposição Stock', 'Compra de arroz e feijão', '2025-12-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 280, 'Reposição Stock', 'Azeite e especiarias', '2025-12-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 450, 'Reposição Stock', 'Roupas e acessórios', '2025-12-15', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 320, 'Reposição Stock', 'Alimentos frescos', '2025-12-20', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 200, 'Reposição Stock', 'Bebidas variadas', '2025-12-25', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 180, 'Reposição Stock', 'Higiene e limpeza', '2026-01-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 400, 'Reposição Stock', 'Compra mensal grande', '2026-01-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 250, 'Reposição Stock', 'Alimentos e bebidas', '2026-01-18', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 310, 'Reposição Stock', 'Roupas sazonais', '2026-01-25', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 150, 'Reposição Stock', 'Pequenas reposições', '2026-01-30', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 380, 'Reposição Stock', 'Compra de fornecedor premium', '2026-02-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 290, 'Reposição Stock', 'Alimentos e especiarias', '2026-02-12', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 420, 'Reposição Stock', 'Promoção de roupas', '2026-02-18', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 165, 'Reposição Stock', 'Higiene pessoal', '2026-02-24', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 340, 'Reposição Stock', 'Reposição geral', '2026-03-02', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 275, 'Aluguel', 'Aluguel da loja - Março', '2026-03-01', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 120, 'Eletricidade', 'Conta de eletricidade', '2026-03-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 85, 'Água', 'Conta de água', '2026-03-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 200, 'Internet', 'Internet e telefone', '2026-03-08', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 65, 'Manutenção', 'Manutenção do POS', '2026-03-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 360, 'Reposição Stock', 'Compra de bebidas', '2026-03-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 295, 'Reposição Stock', 'Alimentos frescos', '2026-03-15', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 410, 'Reposição Stock', 'Roupas e sapatos', '2026-03-18', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 155, 'Reposição Stock', 'Higiene e limpeza', '2026-03-22', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 180, 'Publicidade', 'Flyers e publicidade local', '2026-03-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 100, 'Manutenção', 'Limpeza profissional', '2026-03-12', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 75, 'Seguros', 'Seguro da loja', '2026-03-20', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 250, 'Formação', 'Formação de staff', '2026-02-28', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 85, 'Software', 'Licença de gestão', '2026-03-01', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'despesa', 45, 'Diversos', 'Custos diversos', '2026-03-25', NOW(), NOW());

-- ===== VENDAS: RECEITAS (40) =====
INSERT INTO vendas (id, user_id, cliente_nome, valor_total, descricao, data, created_at, updated_at) VALUES
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'João Silva', 85.50, 'T-shirts e meias', '2025-12-06', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Maria Santos', 125.00, 'Alimentação geral', '2025-12-07', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Pedro Costa', 245.00, 'Compra roupa completa', '2025-12-08', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Ana Oliveira', 95.50, 'Bebidas e snacks', '2025-12-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Carlos Ferreira', 320.00, 'Roupas sazonais', '2025-12-12', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sofia Martins', 65.20, 'Higiene pessoal', '2025-12-14', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Bruno Sousa', 185.75, 'Alimentação e bebidas', '2025-12-16', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Rita Gomes', 210.00, 'Roupas inverno', '2025-12-18', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Paulo Alves', 155.30, 'Diversos', '2025-12-20', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Fernanda Dias', 270.00, 'Compra grande', '2025-12-22', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'João Silva', 120.00, 'Repetição de compra', '2026-01-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Maria Santos', 95.00, 'Alimentação', '2026-01-08', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Pedro Costa', 280.00, 'Roupas novo ano', '2026-01-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Novo Cliente 1', 145.50, 'Primeira compra', '2026-01-12', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Ana Oliveira', 110.25, 'Bebidas', '2026-01-15', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Carlos Ferreira', 265.00, 'Compra mensal', '2026-01-18', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sofia Martins', 75.50, 'Higiene', '2026-01-20', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Bruno Sousa', 190.00, 'Açougue e diversos', '2026-01-22', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Rita Gomes', 235.75, 'Roupas', '2026-01-25', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Novo Cliente 2', 85.00, 'Primeira visita', '2026-01-28', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Paulo Alves', 205.30, 'Diversos', '2026-02-02', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Fernanda Dias', 295.00, 'Grande compra', '2026-02-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'João Silva', 130.00, 'Fevereiro', '2026-02-08', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Maria Santos', 100.00, 'Vários', '2026-02-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Pedro Costa', 310.00, 'Roupas e calçado', '2026-02-12', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Cliente Corporativo', 450.00, 'Venda ao por grosso', '2026-02-15', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Ana Oliveira', 115.00, 'Bebidas', '2026-02-18', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Carlos Ferreira', 275.50, 'Compra mensal fevereiro', '2026-02-20', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sofia Martins', 80.00, 'Higiene e limpeza', '2026-02-22', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Bruno Sousa', 165.00, 'Alimentação', '2026-02-25', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Rita Gomes', 220.00, 'Roupas inverno final', '2026-02-28', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Paulo Alves', 190.75, 'Diversos', '2026-03-02', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'João Silva', 125.00, 'Março', '2026-03-05', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Maria Santos', 140.00, 'Alimentação março', '2026-03-08', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Novo Cliente 3', 95.50, 'Primeira compra março', '2026-03-10', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Pedro Costa', 300.00, 'Roupas primavera', '2026-03-12', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Fernanda Dias', 265.00, 'Compra grande março', '2026-03-15', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Carlos Ferreira', 245.50, 'Compra mensal', '2026-03-18', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Sofia Martins', 85.00, 'Higiene', '2026-03-20', NOW(), NOW()),
(gen_random_uuid(), 'REPLACE_WITH_USER_ID', 'Bruno Sousa', 175.25, 'Alimentação final', '2026-03-25', NOW(), NOW());

-- ===== FIM DO SETUP =====
-- Se tudo correr bem, verá: "Success. No rows returned"
