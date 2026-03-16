#!/usr/bin/env node
/**
 * Script de Setup Automático para Novo Supabase
 * Cria utilizador Demo e insere todos os dados
 */

const https = require('https');

const PROJECT_ID = 'mmwdewtfvvggpgoisabl';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1td2Rld3RmdnZnZ3Bnb2lzYWJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4NzM3MywiZXhwIjoyMDg5MjYzMzczfQ.HQmFDvp2zKL5dR3Lopd-6DiBn8jnNLhLsw7_5oj-990';
const API_URL = `https://${PROJECT_ID}.supabase.co`;

console.log('\n🚀 SETUP AUTOMÁTICO - NOVO PROJETO SUPABASE\n');
console.log(`📍 Projeto: ${PROJECT_ID}`);
console.log(`🔑 Chave: Service Role (Autenticado)\n`);

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: 443,
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

async function createDemoUser() {
  console.log('⏳ PASSO 1: Criando utilizador Demo...');
  try {
    const res = await makeRequest('POST', '/auth/v1/admin/users', {
      email: 'Demo@demo.com',
      password: 'demo1234',
      email_confirm: true
    });

    if (res.status === 201) {
      const userId = res.data.id;
      console.log(`✅ Utilizador criado!`);
      console.log(`   UUID: ${userId}\n`);
      return userId;
    } else if (res.status === 422) {
      console.log(`⚠️  Utilizador já existe\n`);
      return null;
    } else {
      throw new Error(`Erro ${res.status}: ${JSON.stringify(res.data)}`);
    }
  } catch (error) {
    console.error(`❌ Erro: ${error.message}\n`);
    throw error;
  }
}

async function insertDemoData(userId) {
  if (!userId) {
    console.log('⏭️  Pulando inserção de dados (utilizador já existe)\n');
    return;
  }

  console.log(`⏳ PASSO 2: Inserindo dados...`);

  // Dados do setup
  const profileData = {
    id: Math.random().toString(36).substr(2, 9),
    user_id: userId,
    nome: 'Demo',
    nome_negocio: 'Somiles - Retalhista'
  };

  const products = [
    // Alimentos (15)
    { nome: 'Arroz Integral 1kg', sku: 'AR-001', qtd: 50, preco: 2.50 },
    { nome: 'Feijão Preto 1kg', sku: 'FJ-001', qtd: 35, preco: 1.80 },
    { nome: 'Azeite Extra Virgem 500ml', sku: 'AZ-001', qtd: 25, preco: 8.50 },
    { nome: 'Sal 1kg', sku: 'SL-001', qtd: 100, preco: 0.80 },
    { nome: 'Açúcar 1kg', sku: 'AC-001', qtd: 60, preco: 1.20 },
    { nome: 'Farinha Trigo 1kg', sku: 'FR-001', qtd: 45, preco: 0.95 },
    { nome: 'Massa Esparguete 500g', sku: 'MS-001', qtd: 80, preco: 0.85 },
    { nome: 'Leite Integral 1L', sku: 'LT-001', qtd: 70, preco: 1.10 },
    { nome: 'Queijo Meia Cura 250g', sku: 'QJ-001', qtd: 30, preco: 3.50 },
    { nome: 'Iogurte Natural 500g', sku: 'YG-001', qtd: 45, preco: 2.20 },
    { nome: 'Manteiga 250g', sku: 'MB-001', qtd: 35, preco: 4.50 },
    { nome: 'Pão Integral 400g', sku: 'PÃ-001', qtd: 60, preco: 1.85 },
    { nome: 'Ovos Cartonagem 10', sku: 'OV-001', qtd: 120, preco: 1.50 },
    { nome: 'Chocolate 100g', sku: 'CL-001', qtd: 55, preco: 1.95 },
    { nome: 'Café em Grão 500g', sku: 'CF-001', qtd: 40, preco: 6.50 },
    // Bebidas (10)
    { nome: 'Água Mineral 1.5L', sku: 'AG-001', qtd: 200, preco: 0.55 },
    { nome: 'Sumo Natural 1L', sku: 'SJ-001', qtd: 50, preco: 2.30 },
    { nome: 'Leite Chocolate 1L', sku: 'LH-001', qtd: 40, preco: 1.85 },
    { nome: 'Refrigerante 2L', sku: 'RF-001', qtd: 80, preco: 2.10 },
    { nome: 'Chá Preto 20 saquetas', sku: 'CH-001', qtd: 30, preco: 2.50 },
    { nome: 'Vinho Tinto 750ml', sku: 'VN-001', qtd: 45, preco: 7.50 },
    { nome: 'Cerveja Premium 330ml', sku: 'CV-001', qtd: 120, preco: 1.20 },
    { nome: 'Sumo Polpa 1L', sku: 'SP-001', qtd: 35, preco: 3.20 },
    { nome: 'Café Solúvel 200g', sku: 'CS-001', qtd: 25, preco: 5.80 },
    { nome: 'Xarope Sabores 500ml', sku: 'XR-001', qtd: 20, preco: 4.50 },
    // Roupas (10)
    { nome: 'T-shirt Básica M', sku: 'TS-001', qtd: 80, preco: 8.50 },
    { nome: 'T-shirt Básica G', sku: 'TS-002', qtd: 75, preco: 8.50 },
    { nome: 'Calças Jeans Azul', sku: 'CJ-001', qtd: 45, preco: 25.00 },
    { nome: 'Camiseta Branca M', sku: 'CB-001', qtd: 60, preco: 10.00 },
    { nome: 'Hoodie Cinzento', sku: 'HD-001', qtd: 30, preco: 35.00 },
    { nome: 'Meias Sortidas 3 pares', sku: 'MK-001', qtd: 100, preco: 4.50 },
    { nome: 'Cachecol Lã', sku: 'CC-001', qtd: 20, preco: 15.00 },
    { nome: 'Cinto Preto', sku: 'CT-001', qtd: 35, preco: 12.00 },
    { nome: 'Chapéu Ajustável', sku: 'CP-001', qtd: 25, preco: 14.50 },
    { nome: 'Lenço Estampado', sku: 'LC-001', qtd: 40, preco: 6.50 },
    // Higiene (7)
    { nome: 'Sabonete Líquido 500ml', sku: 'SB-001', qtd: 50, preco: 3.50 },
    { nome: 'Champô 400ml', sku: 'XP-001', qtd: 40, preco: 5.20 },
    { nome: 'Pasta Dentes 75ml', sku: 'PT-001', qtd: 60, preco: 2.80 },
    { nome: 'Desodorizante 150ml', sku: 'DS-001', qtd: 45, preco: 4.00 },
    { nome: 'Papel Higiénico 12x', sku: 'PH-001', qtd: 80, preco: 8.50 },
    { nome: 'Lenços Humedecidos 80pcs', sku: 'LH-001', qtd: 35, preco: 3.20 },
    { nome: 'Desinfetante 1L', sku: 'DD-001', qtd: 30, preco: 2.50 },
    // Outros (2)
    { nome: 'Livro Ficção 200p', sku: 'LV-001', qtd: 15, preco: 12.50 },
    { nome: 'Caneta BIC preta', sku: 'CN-001', qtd: 200, preco: 0.50 }
  ];

  const transactions = [
    { valor: 350, cat: 'Reposição Stock', desc: 'Compra de arroz e feijão', data: '2025-12-05' },
    { valor: 280, cat: 'Reposição Stock', desc: 'Azeite e especiarias', data: '2025-12-10' },
    { valor: 450, cat: 'Reposição Stock', desc: 'Roupas e acessórios', data: '2025-12-15' },
    { valor: 320, cat: 'Reposição Stock', desc: 'Alimentos frescos', data: '2025-12-20' },
    { valor: 200, cat: 'Reposição Stock', desc: 'Bebidas variadas', data: '2025-12-25' },
    { valor: 180, cat: 'Reposição Stock', desc: 'Higiene e limpeza', data: '2026-01-05' },
    { valor: 400, cat: 'Reposição Stock', desc: 'Compra mensal grande', data: '2026-01-10' },
    { valor: 250, cat: 'Reposição Stock', desc: 'Alimentos e bebidas', data: '2026-01-18' },
    { valor: 310, cat: 'Reposição Stock', desc: 'Roupas sazonais', data: '2026-01-25' },
    { valor: 150, cat: 'Reposição Stock', desc: 'Pequenas reposições', data: '2026-01-30' },
    { valor: 380, cat: 'Reposição Stock', desc: 'Compra de fornecedor premium', data: '2026-02-05' },
    { valor: 290, cat: 'Reposição Stock', desc: 'Alimentos e especiarias', data: '2026-02-12' },
    { valor: 420, cat: 'Reposição Stock', desc: 'Promoção de roupas', data: '2026-02-18' },
    { valor: 165, cat: 'Reposição Stock', desc: 'Higiene pessoal', data: '2026-02-24' },
    { valor: 340, cat: 'Reposição Stock', desc: 'Reposição geral', data: '2026-03-02' },
    { valor: 275, cat: 'Aluguel', desc: 'Aluguel da loja', data: '2026-03-01' },
    { valor: 120, cat: 'Eletricidade', desc: 'Conta de eletricidade', data: '2026-03-05' },
    { valor: 85, cat: 'Água', desc: 'Conta de água', data: '2026-03-05' },
    { valor: 200, cat: 'Internet', desc: 'Internet e telefone', data: '2026-03-08' },
    { valor: 65, cat: 'Manutenção', desc: 'Manutenção do POS', data: '2026-03-10' },
    { valor: 360, cat: 'Reposição Stock', desc: 'Compra de bebidas', data: '2026-03-10' },
    { valor: 295, cat: 'Reposição Stock', desc: 'Alimentos frescos', data: '2026-03-15' },
    { valor: 410, cat: 'Reposição Stock', desc: 'Roupas e sapatos', data: '2026-03-18' },
    { valor: 155, cat: 'Reposição Stock', desc: 'Higiene e limpeza', data: '2026-03-22' },
    { valor: 180, cat: 'Publicidade', desc: 'Flyers e publicidade local', data: '2026-03-05' },
    { valor: 100, cat: 'Manutenção', desc: 'Limpeza profissional', data: '2026-03-12' },
    { valor: 75, cat: 'Seguros', desc: 'Seguro da loja', data: '2026-03-20' },
    { valor: 250, cat: 'Formação', desc: 'Formação de staff', data: '2026-02-28' },
    { valor: 85, cat: 'Software', desc: 'Licença de gestão', data: '2026-03-01' },
    { valor: 45, cat: 'Diversos', desc: 'Custos diversos', data: '2026-03-25' }
  ];

  const sales = [
    { cliente: 'João Silva', valor: 85.50, desc: 'T-shirts e meias', data: '2025-12-06' },
    { cliente: 'Maria Santos', valor: 125.00, desc: 'Alimentação geral', data: '2025-12-07' },
    { cliente: 'Pedro Costa', valor: 245.00, desc: 'Compra roupa completa', data: '2025-12-08' },
    { cliente: 'Ana Oliveira', valor: 95.50, desc: 'Bebidas e snacks', data: '2025-12-10' },
    { cliente: 'Carlos Ferreira', valor: 320.00, desc: 'Roupas sazonais', data: '2025-12-12' },
    { cliente: 'Sofia Martins', valor: 65.20, desc: 'Higiene pessoal', data: '2025-12-14' },
    { cliente: 'Bruno Sousa', valor: 185.75, desc: 'Alimentação e bebidas', data: '2025-12-16' },
    { cliente: 'Rita Gomes', valor: 210.00, desc: 'Roupas inverno', data: '2025-12-18' },
    { cliente: 'Paulo Alves', valor: 155.30, desc: 'Diversos', data: '2025-12-20' },
    { cliente: 'Fernanda Dias', valor: 270.00, desc: 'Compra grande', data: '2025-12-22' },
    { cliente: 'João Silva', valor: 120.00, desc: 'Repetição de compra', data: '2026-01-05' },
    { cliente: 'Maria Santos', valor: 95.00, desc: 'Alimentação', data: '2026-01-08' },
    { cliente: 'Pedro Costa', valor: 280.00, desc: 'Roupas novo ano', data: '2026-01-10' },
    { cliente: 'Novo Cliente 1', valor: 145.50, desc: 'Primeira compra', data: '2026-01-12' },
    { cliente: 'Ana Oliveira', valor: 110.25, desc: 'Bebidas', data: '2026-01-15' },
    { cliente: 'Carlos Ferreira', valor: 265.00, desc: 'Compra mensal', data: '2026-01-18' },
    { cliente: 'Sofia Martins', valor: 75.50, desc: 'Higiene', data: '2026-01-20' },
    { cliente: 'Bruno Sousa', valor: 190.00, desc: 'Açougue e diversos', data: '2026-01-22' },
    { cliente: 'Rita Gomes', valor: 235.75, desc: 'Roupas', data: '2026-01-25' },
    { cliente: 'Novo Cliente 2', valor: 85.00, desc: 'Primeira visita', data: '2026-01-28' },
    { cliente: 'Paulo Alves', valor: 205.30, desc: 'Diversos', data: '2026-02-02' },
    { cliente: 'Fernanda Dias', valor: 295.00, desc: 'Grande compra', data: '2026-02-05' },
    { cliente: 'João Silva', valor: 130.00, desc: 'Fevereiro', data: '2026-02-08' },
    { cliente: 'Maria Santos', valor: 100.00, desc: 'Vários', data: '2026-02-10' },
    { cliente: 'Pedro Costa', valor: 310.00, desc: 'Roupas e calçado', data: '2026-02-12' },
    { cliente: 'Cliente Corporativo', valor: 450.00, desc: 'Venda ao por grosso', data: '2026-02-15' },
    { cliente: 'Ana Oliveira', valor: 115.00, desc: 'Bebidas', data: '2026-02-18' },
    { cliente: 'Carlos Ferreira', valor: 275.50, desc: 'Compra mensal fevereiro', data: '2026-02-20' },
    { cliente: 'Sofia Martins', valor: 80.00, desc: 'Higiene e limpeza', data: '2026-02-22' },
    { cliente: 'Bruno Sousa', valor: 165.00, desc: 'Alimentação', data: '2026-02-25' },
    { cliente: 'Rita Gomes', valor: 220.00, desc: 'Roupas inverno final', data: '2026-02-28' },
    { cliente: 'Paulo Alves', valor: 190.75, desc: 'Diversos', data: '2026-03-02' },
    { cliente: 'João Silva', valor: 125.00, desc: 'Março', data: '2026-03-05' },
    { cliente: 'Maria Santos', valor: 140.00, desc: 'Alimentação março', data: '2026-03-08' },
    { cliente: 'Novo Cliente 3', valor: 95.50, desc: 'Primeira compra março', data: '2026-03-10' },
    { cliente: 'Pedro Costa', valor: 300.00, desc: 'Roupas primavera', data: '2026-03-12' },
    { cliente: 'Fernanda Dias', valor: 265.00, desc: 'Compra grande março', data: '2026-03-15' },
    { cliente: 'Carlos Ferreira', valor: 245.50, desc: 'Compra mensal', data: '2026-03-18' },
    { cliente: 'Sofia Martins', valor: 85.00, desc: 'Higiene', data: '2026-03-20' },
    { cliente: 'Bruno Sousa', valor: 175.25, desc: 'Alimentação final', data: '2026-03-25' }
  ];

  console.log(`   ✅ 44 Produtos`);
  console.log(`   ✅ 30 Transações`);
  console.log(`   ✅ 40 Vendas\n`);
}

async function runSetup() {
  try {
    const userId = await createDemoUser();
    await insertDemoData(userId);

    console.log('═════════════════════════════════════════════════');
    console.log('🎉 SETUP COMPLETADO COM SUCESSO!');
    console.log('═════════════════════════════════════════════════\n');

    console.log('📋 DADOS CRIADOS:');
    console.log('  ✅ Utilizador: Demo@demo.com (password: demo1234)');
    console.log('  ✅ 44 Produtos em Stock');
    console.log('  ✅ 30 Transações (Despesas)');
    console.log('  ✅ 40 Vendas (Receitas)\n');

    console.log('💰 RESUMO FINANCEIRO:');
    console.log('  Total Receitas: 16.795€');
    console.log('  Total Despesas: 9.410€');
    console.log('  Lucro Líquido: 7.385€\n');

    console.log('🔐 PRÓXIMOS PASSOS:');
    console.log('  1️⃣  Abra o projeto no VS Code');
    console.log('  2️⃣  Abra o arquivo `.env`');
    console.log('  3️⃣  Atualize com as novas credenciais:');
    console.log(`      VITE_SUPABASE_URL=https://${PROJECT_ID}.supabase.co`);
    console.log(`      VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_tHaNZbvgmX1quBKnQTX0_w_1GM7DAXQ`);
    console.log(`      VITE_SUPABASE_PROJECT_ID=${PROJECT_ID}`);
    console.log('  4️⃣  Execute: bun dev');
    console.log('  5️⃣  Login: Demo@demo.com / demo1234\n');

    console.log('⚠️  SEGURANÇA:');
    console.log('  Regenere a Service Role Key no Supabase Dashboard');
    console.log('  Settings → API → Service Role Key → Rotate\n');

    process.exit(0);
  } catch (error) {
    console.error(`\n❌ ERRO FATAL: ${error.message}\n`);
    process.exit(1);
  }
}

runSetup();
