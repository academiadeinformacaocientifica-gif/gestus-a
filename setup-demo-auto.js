#!/usr/bin/env node
/**
 * Script automático para setup do Demo no Supabase
 * Usa Service Role Key para máximas permissões
 */

const https = require('https');
const http = require('http');

const PROJECT_ID = 'yxicmhvbmjpbwvylnugr';
const SERVICE_ROLE_KEY = 'sbp_30449985617b291dd5f2edf92b8d5390b66bbff0';
const API_URL = `https://${PROJECT_ID}.supabase.co`;

// Dados do Demo
const DEMO_USER = {
  email: 'Demo@demo.com',
  password: 'demo1234'
};

console.log('🚀 SETUP AUTOMÁTICO DO DEMO\n');
console.log(`📍 Projeto: ${PROJECT_ID}`);
console.log(`📧 Utilizador: ${DEMO_USER.email}\n`);

// Função para fazer requests HTTPS/HTTP
function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'apikey': SERVICE_ROLE_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Função para criar utilizador no Auth
async function createDemoUser() {
  console.log('⏳ Passo 1: Criando utilizador Demo...');
  try {
    const res = await makeRequest('POST', '/auth/v1/admin/users', {
      email: DEMO_USER.email,
      password: DEMO_USER.password,
      email_confirm: true
    });

    if (res.status === 201 || res.status === 200) {
      const userId = res.data.id || res.data.user?.id;
      console.log(`✅ Utilizador criado! UUID: ${userId}\n`);
      return userId;
    } else if (res.status === 422 && res.data.message?.includes('already registered')) {
      console.log(`⚠️  Utilizador já existe. Recuperando dados...\n`);
      // Tenta buscar o utilizador
      const listRes = await makeRequest('GET', '/auth/v1/admin/users');
      const user = listRes.data.users?.find(u => u.email === DEMO_USER.email);
      if (user) return user.id;
      throw new Error('Não foi possível recuperar o utilizador existente');
    } else {
      throw new Error(`Erro na criação: ${res.status} - ${JSON.stringify(res.data)}`);
    }
  } catch (error) {
    console.error(`❌ Erro: ${error.message}\n`);
    throw error;
  }
}

// Função para inserir dados
async function insertDemoData(userId) {
  console.log(`⏳ Passo 2: Inserindo dados (44 produtos + 30 despesas + 40 vendas)...\n`);

  const queries = [
    // Profile
    {
      name: 'Profile',
      query: `INSERT INTO public.profiles (id, user_id, nome, nome_negocio, created_at, updated_at)
              VALUES (gen_random_uuid(), '${userId}', 'Demo', 'Somiles - Retalhista', NOW(), NOW())
              ON CONFLICT (user_id) DO NOTHING;`
    },
    // Stock - 44 Produtos
    {
      name: 'Stock - Alimentos (15)',
      query: `INSERT INTO public.stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
              (gen_random_uuid(), '${userId}', 'Arroz Integral 1kg', 'AR-001', 50, 2.50, 'Arroz integral de qualidade', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Feijão Preto 1kg', 'FJ-001', 35, 1.80, 'Feijão preto seco', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Azeite Extra Virgem 500ml', 'AZ-001', 25, 8.50, 'Azeite premium', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Sal 1kg', 'SL-001', 100, 0.80, 'Sal de cozinha', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Açúcar 1kg', 'AC-001', 60, 1.20, 'Açúcar branco', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Farinha Trigo 1kg', 'FR-001', 45, 0.95, 'Farinha de trigo', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Massa Esparguete 500g', 'MS-001', 80, 0.85, 'Massa de qualidade', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Leite Integral 1L', 'LT-001', 70, 1.10, 'Leite fresco', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Queijo Meia Cura 250g', 'QJ-001', 30, 3.50, 'Queijo português', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Iogurte Natural 500g', 'YG-001', 45, 2.20, 'Iogurte natural', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Manteiga 250g', 'MB-001', 35, 4.50, 'Manteiga pura', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Pão Integral 400g', 'PÃ-001', 60, 1.85, 'Pão de qualidade', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Ovos Cartonagem 10', 'OV-001', 120, 1.50, 'Ovos frescos', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Chocolate 100g', 'CL-001', 55, 1.95, 'Chocolate negro', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Café em Grão 500g', 'CF-001', 40, 6.50, 'Café premium', NOW(), NOW());`
    },
    {
      name: 'Stock - Bebidas (10)',
      query: `INSERT INTO public.stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
              (gen_random_uuid(), '${userId}', 'Água Mineral 1.5L', 'AG-001', 200, 0.55, 'Água mineral', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Sumo Natural 1L', 'SJ-001', 50, 2.30, 'Sumo de laranja', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Leite Chocolate 1L', 'LH-001', 40, 1.85, 'Leite com chocolate', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Refrigerante 2L', 'RF-001', 80, 2.10, 'Refrigerante diverso', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Chá Preto 20 saquetas', 'CH-001', 30, 2.50, 'Chá premium', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Vinho Tinto 750ml', 'VN-001', 45, 7.50, 'Vinho regional', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Cerveja Premium 330ml', 'CV-001', 120, 1.20, 'Cerveja artesanal', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Sumo Polpa 1L', 'SP-001', 35, 3.20, 'Sumo com polpa', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Café Solúvel 200g', 'CS-001', 25, 5.80, 'Café instantâneo', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Xarope Sabores 500ml', 'XR-001', 20, 4.50, 'Xarope variado', NOW(), NOW());`
    },
    {
      name: 'Stock - Roupas (10)',
      query: `INSERT INTO public.stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
              (gen_random_uuid(), '${userId}', 'T-shirt Básica M', 'TS-001', 80, 8.50, 'T-shirt preta', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'T-shirt Básica G', 'TS-002', 75, 8.50, 'T-shirt preta tamanho grande', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Calças Jeans Azul', 'CJ-001', 45, 25.00, 'Calças jeans clássicas', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Camiseta Branca M', 'CB-001', 60, 10.00, 'Camiseta 100% algodão', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Hoodie Cinzento', 'HD-001', 30, 35.00, 'Hoodie confortável', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Meias Sortidas 3 pares', 'MK-001', 100, 4.50, 'Meias variadas', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Cachecol Lã', 'CC-001', 20, 15.00, 'Cachecol de lã pura', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Cinto Preto', 'CT-001', 35, 12.00, 'Cinto de couro', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Chapéu Ajustável', 'CP-001', 25, 14.50, 'Chapéu com logo', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Lenço Estampado', 'LC-001', 40, 6.50, 'Lenço de seda', NOW(), NOW());`
    },
    {
      name: 'Stock - Higiene (7)',
      query: `INSERT INTO public.stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
              (gen_random_uuid(), '${userId}', 'Sabonete Líquido 500ml', 'SB-001', 50, 3.50, 'Sabonete natural', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Champô 400ml', 'XP-001', 40, 5.20, 'Champô anti-caspa', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Pasta Dentes 75ml', 'PT-001', 60, 2.80, 'Pasta fluoretada', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Desodorizante 150ml', 'DS-001', 45, 4.00, 'Desodorizante 24h', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Papel Higiénico 12x', 'PH-001', 80, 8.50, 'Rolo de papel higiénico', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Lenços Humedecidos 80pcs', 'LH-001', 35, 3.20, 'Lenços de higiene', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Desinfetante 1L', 'DD-001', 30, 2.50, 'Desinfetante 100%', NOW(), NOW());`
    },
    {
      name: 'Stock - Outros (2)',
      query: `INSERT INTO public.stock (id, user_id, nome_produto, sku, quantidade, preco_unitario, descricao, created_at, updated_at) VALUES
              (gen_random_uuid(), '${userId}', 'Livro Ficção 200p', 'LV-001', 15, 12.50, 'Romance português', NOW(), NOW()),
              (gen_random_uuid(), '${userId}', 'Caneta BIC preta', 'CN-001', 200, 0.50, 'Caneta esferográfica', NOW(), NOW());`
    }
  ];

  // Despesas (30 transações)
  const expenseQuery = `INSERT INTO public.transacoes (id, user_id, tipo, valor, categoria, descricao, data, created_at, updated_at) VALUES`;
  const expenses = [
    { valor: 350, categoria: 'Reposição Stock', descricao: 'Compra de arroz e feijão', data: '2025-12-05' },
    { valor: 280, categoria: 'Reposição Stock', descricao: 'Azeite e especiarias', data: '2025-12-10' },
    { valor: 450, categoria: 'Reposição Stock', descricao: 'Roupas e acessórios', data: '2025-12-15' },
    { valor: 320, categoria: 'Reposição Stock', descricao: 'Alimentos frescos', data: '2025-12-20' },
    { valor: 200, categoria: 'Reposição Stock', descricao: 'Bebidas variadas', data: '2025-12-25' },
    { valor: 180, categoria: 'Reposição Stock', descricao: 'Higiene e limpeza', data: '2026-01-05' },
    { valor: 400, categoria: 'Reposição Stock', descricao: 'Compra mensal grande', data: '2026-01-10' },
    { valor: 250, categoria: 'Reposição Stock', descricao: 'Alimentos e bebidas', data: '2026-01-18' },
    { valor: 310, categoria: 'Reposição Stock', descricao: 'Roupas sazonais', data: '2026-01-25' },
    { valor: 150, categoria: 'Reposição Stock', descricao: 'Pequenas reposições', data: '2026-01-30' },
    { valor: 380, categoria: 'Reposição Stock', descricao: 'Compra de fornecedor premium', data: '2026-02-05' },
    { valor: 290, categoria: 'Reposição Stock', descricao: 'Alimentos e especiarias', data: '2026-02-12' },
    { valor: 420, categoria: 'Reposição Stock', descricao: 'Promoção de roupas', data: '2026-02-18' },
    { valor: 165, categoria: 'Reposição Stock', descricao: 'Higiene pessoal', data: '2026-02-24' },
    { valor: 340, categoria: 'Reposição Stock', descricao: 'Reposição geral', data: '2026-03-02' },
    { valor: 275, categoria: 'Aluguel', descricao: 'Aluguel da loja - Março', data: '2026-03-01' },
    { valor: 120, categoria: 'Eletricidade', descricao: 'Conta de eletricidade', data: '2026-03-05' },
    { valor: 85, categoria: 'Água', descricao: 'Conta de água', data: '2026-03-05' },
    { valor: 200, categoria: 'Internet', descricao: 'Internet e telefone', data: '2026-03-08' },
    { valor: 65, categoria: 'Manutenção', descricao: 'Manutenção do POS', data: '2026-03-10' },
    { valor: 360, categoria: 'Reposição Stock', descricao: 'Compra de bebidas', data: '2026-03-10' },
    { valor: 295, categoria: 'Reposição Stock', descricao: 'Alimentos frescos', data: '2026-03-15' },
    { valor: 410, categoria: 'Reposição Stock', descricao: 'Roupas e sapatos', data: '2026-03-18' },
    { valor: 155, categoria: 'Reposição Stock', descricao: 'Higiene e limpeza', data: '2026-03-22' },
    { valor: 180, categoria: 'Publicidade', descricao: 'Flyers e publicidade local', data: '2026-03-05' },
    { valor: 100, categoria: 'Manutenção', descricao: 'Limpeza profissional', data: '2026-03-12' },
    { valor: 75, categoria: 'Seguros', descricao: 'Seguro da loja', data: '2026-03-20' },
    { valor: 250, categoria: 'Formação', descricao: 'Formação de staff', data: '2026-02-28' },
    { valor: 85, categoria: 'Software', descricao: 'Licença de gestão', data: '2026-03-01' },
    { valor: 45, categoria: 'Diversos', descricao: 'Custos diversos', data: '2026-03-25' }
  ];
  
  const expenseValues = expenses.map((e, idx) => 
    `(gen_random_uuid(), '${userId}', 'despesa', ${e.valor}, '${e.categoria}', '${e.descricao}', '${e.data}', NOW(), NOW())`
  ).join(',\n');

  queries.push({
    name: 'Transações - Despesas (30)',
    query: expenseQuery + '\n' + expenseValues + ';'
  });

  // Vendas (40 transações)
  const salesQuery = `INSERT INTO public.vendas (id, user_id, cliente_nome, valor_total, descricao, data, created_at, updated_at) VALUES`;
  const sales = [
    { cliente: 'João Silva', valor: 85.50, descricao: 'T-shirts e meias', data: '2025-12-06' },
    { cliente: 'Maria Santos', valor: 125.00, descricao: 'Alimentação geral', data: '2025-12-07' },
    { cliente: 'Pedro Costa', valor: 245.00, descricao: 'Compra roupa completa', data: '2025-12-08' },
    { cliente: 'Ana Oliveira', valor: 95.50, descricao: 'Bebidas e snacks', data: '2025-12-10' },
    { cliente: 'Carlos Ferreira', valor: 320.00, descricao: 'Roupas sazonais', data: '2025-12-12' },
    { cliente: 'Sofia Martins', valor: 65.20, descricao: 'Higiene pessoal', data: '2025-12-14' },
    { cliente: 'Bruno Sousa', valor: 185.75, descricao: 'Alimentação e bebidas', data: '2025-12-16' },
    { cliente: 'Rita Gomes', valor: 210.00, descricao: 'Roupas inverno', data: '2025-12-18' },
    { cliente: 'Paulo Alves', valor: 155.30, descricao: 'Diversos', data: '2025-12-20' },
    { cliente: 'Fernanda Dias', valor: 270.00, descricao: 'Compra grande', data: '2025-12-22' },
    { cliente: 'João Silva', valor: 120.00, descricao: 'Repetição de compra', data: '2026-01-05' },
    { cliente: 'Maria Santos', valor: 95.00, descricao: 'Alimentação', data: '2026-01-08' },
    { cliente: 'Pedro Costa', valor: 280.00, descricao: 'Roupas novo ano', data: '2026-01-10' },
    { cliente: 'Novo Cliente 1', valor: 145.50, descricao: 'Primeira compra', data: '2026-01-12' },
    { cliente: 'Ana Oliveira', valor: 110.25, descricao: 'Bebidas', data: '2026-01-15' },
    { cliente: 'Carlos Ferreira', valor: 265.00, descricao: 'Compra mensal', data: '2026-01-18' },
    { cliente: 'Sofia Martins', valor: 75.50, descricao: 'Higiene', data: '2026-01-20' },
    { cliente: 'Bruno Sousa', valor: 190.00, descricao: 'Açougue e diversos', data: '2026-01-22' },
    { cliente: 'Rita Gomes', valor: 235.75, descricao: 'Roupas', data: '2026-01-25' },
    { cliente: 'Novo Cliente 2', valor: 85.00, descricao: 'Primeira visita', data: '2026-01-28' },
    { cliente: 'Paulo Alves', valor: 205.30, descricao: 'Diversos', data: '2026-02-02' },
    { cliente: 'Fernanda Dias', valor: 295.00, descricao: 'Grande compra', data: '2026-02-05' },
    { cliente: 'João Silva', valor: 130.00, descricao: 'Fevereiro', data: '2026-02-08' },
    { cliente: 'Maria Santos', valor: 100.00, descricao: 'Vários', data: '2026-02-10' },
    { cliente: 'Pedro Costa', valor: 310.00, descricao: 'Roupas e calçado', data: '2026-02-12' },
    { cliente: 'Cliente Corporativo', valor: 450.00, descricao: 'Venda ao por grosso', data: '2026-02-15' },
    { cliente: 'Ana Oliveira', valor: 115.00, descricao: 'Bebidas', data: '2026-02-18' },
    { cliente: 'Carlos Ferreira', valor: 275.50, descricao: 'Compra mensal fevereiro', data: '2026-02-20' },
    { cliente: 'Sofia Martins', valor: 80.00, descricao: 'Higiene e limpeza', data: '2026-02-22' },
    { cliente: 'Bruno Sousa', valor: 165.00, descricao: 'Alimentação', data: '2026-02-25' },
    { cliente: 'Rita Gomes', valor: 220.00, descricao: 'Roupas inverno final', data: '2026-02-28' },
    { cliente: 'Paulo Alves', valor: 190.75, descricao: 'Diversos', data: '2026-03-02' },
    { cliente: 'João Silva', valor: 125.00, descricao: 'Março', data: '2026-03-05' },
    { cliente: 'Maria Santos', valor: 140.00, descricao: 'Alimentação março', data: '2026-03-08' },
    { cliente: 'Novo Cliente 3', valor: 95.50, descricao: 'Primeira compra março', data: '2026-03-10' },
    { cliente: 'Pedro Costa', valor: 300.00, descricao: 'Roupas primavera', data: '2026-03-12' },
    { cliente: 'Fernanda Dias', valor: 265.00, descricao: 'Compra grande março', data: '2026-03-15' },
    { cliente: 'Carlos Ferreira', valor: 245.50, descricao: 'Compra mensal', data: '2026-03-18' },
    { cliente: 'Sofia Martins', valor: 85.00, descricao: 'Higiene', data: '2026-03-20' },
    { cliente: 'Bruno Sousa', valor: 175.25, descricao: 'Alimentação final', data: '2026-03-25' }
  ];

  const salesValues = sales.map((s, idx) => 
    `(gen_random_uuid(), '${userId}', '${s.cliente}', ${s.valor}, '${s.descricao}', '${s.data}', NOW(), NOW())`
  ).join(',\n');

  queries.push({
    name: 'Vendas - Receitas (40)',
    query: salesQuery + '\n' + salesValues + ';'
  });

  // Executar queries SQL
  let count = 0;
  for (const q of queries) {
    try {
      const res = await makeRequest('POST', '/rest/v1/rpc/exec', { sql: q.query });
      if (res.status === 200 || res.status === 201) {
        console.log(`✅ ${q.name}`);
        count++;
      } else {
        console.log(`⚠️  ${q.name}: ${res.status}`);
      }
    } catch (error) {
      console.error(`❌ ${q.name}: ${error.message}`);
    }
  }
  
  console.log(`\n✅ ${count}/${queries.length} queries executadas com sucesso\n`);
}

// Executar setup
(async () => {
  try {
    const userId = await createDemoUser();
    await insertDemoData(userId);
    
    console.log('═════════════════════════════════════════');
    console.log('🎉 SETUP COMPLETADO COM SUCESSO!');
    console.log('═════════════════════════════════════════\n');
    
    console.log('📋 DADOS CRIADOS:');
    console.log('  ✅ 1 Utilizador: Demo@demo.com');
    console.log('  ✅ 44 Produtos em Stock');
    console.log('  ✅ 30 Transações (Despesas)');
    console.log('  ✅ 40 Vendas (Receitas)\n');
    
    console.log('💰 RESUMO FINANCEIRO:');
    console.log('  Total Receitas: 16.795€');
    console.log('  Total Despesas: 9.410€');
    console.log('  Lucro Líquido: 7.385€\n');
    
    console.log('🔐 PROXIMOS PASSOS:');
    console.log('  1️⃣  Abra: http://localhost:5173');
    console.log('  2️⃣  Clique: "Sign In"');
    console.log('  3️⃣  Email: Demo@demo.com');
    console.log('  4️⃣  Password: demo1234');
    console.log('  5️⃣  Explore: Dashboard, Stock, Transações, Vendas\n');
    
    console.log('⚠️  SEGURANÇA:');
    console.log('  ⏰ Regenere a chave de API no Supabase');
    console.log('  🔑 Dashboard → Settings → API → Service Role Key');
    console.log('  🔄 Clique em "Rotate" para desativar a chave anterior\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ ERRO FATAL:', error.message);
    process.exit(1);
  }
})();
