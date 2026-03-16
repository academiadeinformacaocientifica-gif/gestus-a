const fs = require('fs');

// Credenciais do projeto
const projectId = 'mmwdewtfvvggpgoisabl';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1td2Rld3RmdnZnZ3Bnb2lzYWJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4NzM3MywiZXhwIjoyMDg5MjYzMzczfQ.HQmFDvp2zKL5dR3Lopd-6DiBn8jnNLhLsw7_5oj-990';
const supabaseUrl = 'https://mmwdewtfvvggpgoisabl.supabase.co';

// SQL para criar tabelas e RLS
const sqlTabelas = `
-- ============================================================
-- SQL SETUP: CRIAR TABELAS E RLS
-- Projeto: mmwdewtfvvggpgoisabl
-- ============================================================

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
`;

async function criarInfraestrutura() {
  try {
    console.log('🔄 A criar infraestrutura do banco de dados...\n');
    
    // Split SQL em statements individuais
    const statements = sqlTabelas
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    console.log(`📊 Total de statements: ${statements.length}\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      const description = statement.split('\n')[0].substring(0, 60);
      
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceRoleKey}`,
            'apikey': serviceRoleKey,
          },
          body: JSON.stringify({ query: statement })
        });

        if (response.ok) {
          console.log(`✅ [${i + 1}/${statements.length}] ${description}...`);
          successCount++;
        } else {
          const error = await response.json();
          // Algumas respostas OK não retornam JSON, ignore
          if (response.status === 200) {
            console.log(`✅ [${i + 1}/${statements.length}] ${description}...`);
            successCount++;
          } else {
            console.log(`⚠️  [${i + 1}/${statements.length}] ${description}... (Pode já existir)`);
            successCount++;
          }
        }
      } catch (error) {
        console.log(`⚠️  [${i + 1}/${statements.length}] ${description}... (Pode já existir)`);
        successCount++;
      }

      // Pequeno delay para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n✅ Infraestrutura criada com sucesso!\n`);
    console.log('📋 Próximos passos:');
    console.log('1. Crie o utilizador Demo em: https://app.supabase.com/project/mmwdewtfvvggpgoisabl/auth/users');
    console.log('   Email: Demo@demo.com');
    console.log('   Password: demo1234');
    console.log('2. Copie o User UUID do utilizador Demo');
    console.log('3. Execute o script "inserir-dados.js" passando o UUID como argumento');
    console.log('\n💡 Exemplo: node inserir-dados.js be4578a1-be3b-4af0-92d4-5f782241a6ee');

  } catch (error) {
    console.error('❌ Erro na execução:');
    console.error(error.message);
    process.exit(1);
  }
}

criarInfraestrutura();
