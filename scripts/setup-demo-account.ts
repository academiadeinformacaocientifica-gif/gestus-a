import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://yxicmhvbmjpbwvylnugr.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aWNtaHZibWpwYnd2eWxudWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2Njg4MzIsImV4cCI6MjA4OTI0NDgzMn0.OJ1VE87-guE91AueWC4-8UFJVA2zK28DWnxbX5zgbA0';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Variáveis de ambiente Supabase não configuradas!');
  console.error('Certifique-se de que o ficheiro .env contém VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY');
  process.exit(1);
}

// Use service role key if available, otherwise use public key
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY || SUPABASE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});

const demoEmail = 'Demo@demo.com';
const demoPassword = 'demo1234';
const demoNome = 'Demo';
const demoNegocio = 'Somiles - Retalhista';

// Product data
const products = [
  // ALIMENTOS
  { nome: 'Arroz Integral 1kg', sku: 'ARR-INT-001', quantidade: 150, preco: 2.50 },
  { nome: 'Açúcar Branco 1kg', sku: 'AÇU-BRA-001', quantidade: 200, preco: 1.20 },
  { nome: 'Sal Fino 1kg', sku: 'SAL-FIN-001', quantidade: 300, preco: 0.80 },
  { nome: 'Pão Francês', sku: 'PAO-FRA-001', quantidade: 80, preco: 0.45 },
  { nome: 'Queijo Meia Cura 500g', sku: 'QUE-MEC-001', quantidade: 45, preco: 8.99 },
  { nome: 'Presunto Serrano 200g', sku: 'PNT-SER-001', quantidade: 60, preco: 12.50 },
  { nome: 'Azeite Extra Virgem 500ml', sku: 'AZE-VIR-001', quantidade: 85, preco: 6.50 },
  { nome: 'Leite UHT 1L', sku: 'LEI-UHT-001', quantidade: 250, preco: 1.05 },
  { nome: 'Ovos (Dúzia)', sku: 'OVO-DUZ-001', quantidade: 120, preco: 2.99 },
  { nome: 'Manteiga 250g', sku: 'MAN-250-001', quantidade: 70, preco: 4.50 },
  
  // BEBIDAS
  { nome: 'Água Mineral 1.5L', sku: 'AGU-MIN-001', quantidade: 400, preco: 0.65 },
  { nome: 'Sumo Laranja 1L', sku: 'SUJ-LAR-001', quantidade: 120, preco: 2.10 },
  { nome: 'Refrigerante Cola 330ml', sku: 'REF-COL-001', quantidade: 250, preco: 1.50 },
  { nome: 'Vinho Tinto Douro 750ml', sku: 'VIN-TIN-001', quantidade: 90, preco: 9.99 },
  { nome: 'Cerveja Artesanal 500ml', sku: 'CER-ART-001', quantidade: 180, preco: 3.50 },
  
  // ROUPAS
  { nome: 'T-Shirt Básica Branca M', sku: 'TXH-BAS-001', quantidade: 150, preco: 12.99 },
  { nome: 'Calças Jeans Azul M', sku: 'CAL-JEA-001', quantidade: 85, preco: 49.99 },
  { nome: 'Hoodie Cinzento G', sku: 'HOO-CIN-001', quantidade: 60, preco: 34.99 },
  { nome: 'Saia Comprida Preta P', sku: 'SAI-COM-001', quantidade: 40, preco: 44.99 },
  { nome: 'Camisola de Lã Cinza M', sku: 'CAM-LAN-001', quantidade: 70, preco: 29.99 },
  
  // HIGIENE
  { nome: 'Sabonete Líquido 250ml', sku: 'SAB-LIQ-001', quantidade: 120, preco: 2.99 },
  { nome: 'Detergente Louça 500ml', sku: 'DET-LOU-001', quantidade: 150, preco: 1.99 },
  { nome: 'Champô Neutro 200ml', sku: 'CHA-NEU-001', quantidade: 80, preco: 5.99 },
  { nome: 'Dentífrico Branco 75ml', sku: 'DEN-BRA-001', quantidade: 100, preco: 3.50 },
  { nome: 'Papel Higiênico 12 rolos', sku: 'PAP-HIG-001', quantidade: 200, preco: 6.99 },
];

// Transaction data (purchases/expenses) - 3 months
const transactions = [
  // December 2025
  { tipo: 'despesa', valor: 450.00, categoria: 'Reposição Stock', descricao: 'Compra lote alimentos fornecedor A', data: '2025-12-01' },
  { tipo: 'despesa', valor: 320.50, categoria: 'Reposição Stock', descricao: 'Compra bebidas distribuidor B', data: '2025-12-02' },
  { tipo: 'despesa', valor: 1200.00, categoria: 'Reposição Stock', descricao: 'Compra roupas fornecedor C', data: '2025-12-03' },
  { tipo: 'despesa', valor: 150.00, categoria: 'Renda/Aluguel', descricao: 'Aluguel loja dezembro', data: '2025-12-10' },
  { tipo: 'despesa', valor: 120.00, categoria: 'Utilitários', descricao: 'Eletricidade dezembro', data: '2025-12-20' },
  
  // January 2026
  { tipo: 'despesa', valor: 520.00, categoria: 'Reposição Stock', descricao: 'Alimentos ano novo fornecedor A', data: '2026-01-02' },
  { tipo: 'despesa', valor: 400.25, categoria: 'Reposição Stock', descricao: 'Bebidas fornecedor B', data: '2026-01-03' },
  { tipo: 'despesa', valor: 150.00, categoria: 'Renda/Aluguel', descricao: 'Aluguel loja janeiro', data: '2026-01-10' },
  { tipo: 'despesa', valor: 280.50, categoria: 'Reposição Stock', descricao: 'Roupas fornecedor C', data: '2026-01-12' },
  { tipo: 'despesa', valor: 125.00, categoria: 'Utilitários', descricao: 'Eletricidade janeiro', data: '2026-01-20' },
  
  // February 2026
  { tipo: 'despesa', valor: 480.00, categoria: 'Reposição Stock', descricao: 'Alimentos fevereiro fornecedor A', data: '2026-02-01' },
  { tipo: 'despesa', valor: 320.50, categoria: 'Reposição Stock', descricao: 'Bebidas fornecedor B', data: '2026-02-03' },
  { tipo: 'despesa', valor: 150.00, categoria: 'Renda/Aluguel', descricao: 'Aluguel loja fevereiro', data: '2026-02-10' },
  { tipo: 'despesa', valor: 600.00, categoria: 'Reposição Stock', descricao: 'Coleção primavera roupas C', data: '2026-02-12' },
  { tipo: 'despesa', valor: 110.00, categoria: 'Utilitários', descricao: 'Eletricidade fevereiro', data: '2026-02-20' },
];

// Sales data (ganhos/vendas) - sample sales over 3 months
const vendas = [
  // December 2025
  { cliente_nome: 'João Silva', valor_total: 245.50, descricao: 'Alimentos variados', data: '2025-12-01' },
  { cliente_nome: 'Maria Santos', valor_total: 89.99, descricao: 'Bebidas e snacks', data: '2025-12-01' },
  { cliente_nome: 'Cliente Anónimo', valor_total: 320.00, descricao: 'Roupas (2 camisetas, 1 hoodie)', data: '2025-12-02' },
  { cliente_nome: 'Rita Costa', valor_total: 156.75, descricao: 'Produtos higiene e alimentos', data: '2025-12-02' },
  { cliente_nome: 'Empresa ABC', valor_total: 1200.00, descricao: 'Fornecimento corporativo alimentos', data: '2025-12-06' },
  { cliente_nome: 'Carlos Mendes', valor_total: 350.00, descricao: 'Roupas e acessórios', data: '2025-12-08' },
  { cliente_nome: 'Sofia Gomes', valor_total: 412.25, descricao: 'Alimentos premium e bebidas', data: '2025-12-11' },
  { cliente_nome: 'Roberto Dias', valor_total: 520.00, descricao: 'Roupas lote (trabalho)', data: '2025-12-12' },
  { cliente_nome: 'Loja Parceira X', valor_total: 800.00, descricao: 'Fornecimento alimentos grossista', data: '2025-12-13' },
  { cliente_nome: 'Empresa XYZ', valor_total: 950.00, descricao: 'Fornecimento para evento corporativo', data: '2025-12-19' },

  // January 2026
  { cliente_nome: 'Diana Marques', valor_total: 320.00, descricao: 'Roupas ano novo', data: '2026-01-02' },
  { cliente_nome: 'Gonçalo Lima', valor_total: 285.50, descricao: 'Alimentos frescos lote', data: '2026-01-04' },
  { cliente_nome: 'Isadora Costa', valor_total: 540.00, descricao: 'Compra grande roupas e acessórios', data: '2026-01-07' },
  { cliente_nome: 'José Mendes', valor_total: 380.00, descricao: 'Alimentos e bebidas lote', data: '2026-01-09' },
  { cliente_nome: 'Luís Barbosa', valor_total: 420.00, descricao: 'Alimentos frescos fornecimento', data: '2026-01-13' },
  { cliente_nome: 'Nata Ferreira', valor_total: 510.75, descricao: 'Alimentos premium e bebidas', data: '2026-01-17' },

  // February 2026
  { cliente_nome: 'Paulo Costa', valor_total: 295.75, descricao: 'Bebidas e alimentos', data: '2026-02-02' },
  { cliente_nome: 'Quique Monteiro', valor_total: 210.25, descricao: 'Higiene e cuidados', data: '2026-02-04' },
  { cliente_nome: 'Rita Pereira', valor_total: 520.00, descricao: 'Roupas desporto e acessórios', data: '2026-02-06' },
  { cliente_nome: 'Sérgio Alves', valor_total: 340.00, descricao: 'Alimentos variados fornecimento', data: '2026-02-08' },
  { cliente_nome: 'Telma Roxo', valor_total: 360.50, descricao: 'Roupas de marca', data: '2026-02-10' },
  { cliente_nome: 'Ulisses Gamas', valor_total: 420.00, descricao: 'Alimentos gourmet e bebidas premium', data: '2026-02-12' },
  { cliente_nome: 'Vera Nunes', valor_total: 480.00, descricao: 'Roupa completa estação primavera', data: '2026-02-14' },

  // March 2026
  { cliente_nome: 'Zóe Costa', valor_total: 285.75, descricao: 'Bebidas e café premium', data: '2026-03-02' },
  { cliente_nome: 'Acácio Neves', valor_total: 215.25, descricao: 'Higiene pessoal lote', data: '2026-03-04' },
  { cliente_nome: 'Benedita Sousa', valor_total: 510.00, descricao: 'Roupas variadas descontos', data: '2026-03-06' },
  { cliente_nome: 'Custódio Veiga', valor_total: 360.00, descricao: 'Alimentos e bebidas lote', data: '2026-03-08' },
  { cliente_nome: 'Delfina Bastos', valor_total: 420.00, descricao: 'Roupas e sapatos primavera', data: '2026-03-10' },
  { cliente_nome: 'Evaristo Lima', valor_total: 485.25, descricao: 'Alimentos premium e bebidas', data: '2026-03-12' },
  { cliente_nome: 'Florinda Reis', valor_total: 380.00, descricao: 'Roupas lote primavera', data: '2026-03-14' },
  { cliente_nome: 'Gaspar Teles', valor_total: 420.00, descricao: 'Alimentos variados e bebidas', data: '2026-03-16' },
];

async function setupDemoAccount() {
  console.log('🚀 Iniciando configuração da conta Demo...\n');

  try {
    // Step 1: Create user account
    console.log(`📝 Criando conta com email: ${demoEmail}`);
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: demoEmail,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        nome: demoNome,
        nome_negocio: demoNegocio,
      }
    });

    if (authError) {
      console.error('❌ Erro ao criar conta:', authError.message);
      process.exit(1);
    }

    const userId = authData.user?.id;
    console.log(`✅ Conta criada com sucesso! ID: ${userId}\n`);

    // Step 2: Create profile
    console.log('👤 Criando perfil do utilizador...');
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        user_id: userId,
        nome: demoNome,
        nome_negocio: demoNegocio,
      });

    if (profileError) {
      console.error('❌ Erro ao criar perfil:', profileError.message);
    } else {
      console.log('✅ Perfil criado com sucesso!\n');
    }

    // Step 3: Insert products
    console.log(`📦 Inserindo ${products.length} produtos no stock...`);
    const productsToInsert = products.map(p => ({
      user_id: userId,
      nome_produto: p.nome,
      sku: p.sku,
      quantidade: p.quantidade,
      preco_unitario: p.preco,
      descricao: `Produto de qualidade`,
    }));

    const { error: productsError } = await supabaseAdmin
      .from('stock')
      .insert(productsToInsert);

    if (productsError) {
      console.error('❌ Erro ao inserir produtos:', productsError.message);
    } else {
      console.log(`✅ ${products.length} produtos inseridos com sucesso!\n`);
    }

    // Step 4: Insert transactions (expenses)
    console.log(`💰 Inserindo ${transactions.length} transações (despesas)...`);
    const transactionsToInsert = transactions.map(t => ({
      user_id: userId,
      tipo: t.tipo,
      valor: t.valor,
      categoria: t.categoria,
      descricao: t.descricao,
      data: t.data,
    }));

    const { error: transError } = await supabaseAdmin
      .from('transacoes')
      .insert(transactionsToInsert);

    if (transError) {
      console.error('❌ Erro ao inserir transações:', transError.message);
    } else {
      console.log(`✅ ${transactions.length} transações inseridas com sucesso!\n`);
    }

    // Step 5: Insert sales
    console.log(`🛒 Inserindo ${vendas.length} vendas...`);
    const vendasToInsert = vendas.map(v => ({
      user_id: userId,
      cliente_nome: v.cliente_nome,
      valor_total: v.valor_total,
      descricao: v.descricao,
      data: v.data,
    }));

    const { error: vendError } = await supabaseAdmin
      .from('vendas')
      .insert(vendasToInsert);

    if (vendError) {
      console.error('❌ Erro ao inserir vendas:', vendError.message);
    } else {
      console.log(`✅ ${vendas.length} vendas inseridas com sucesso!\n`);
    }

    // Summary
    console.log('═════════════════════════════════════════════════════════');
    console.log('✅ CONTA DE TESTE CRIADA COM SUCESSO!');
    console.log('═════════════════════════════════════════════════════════');
    console.log(`\n📧 Email: ${demoEmail}`);
    console.log(`🔐 Senha: ${demoPassword}`);
    console.log(`\n📊 Dados preenchidos:`);
    console.log(`   • Perfil: ${demoNegocio}`);
    console.log(`   • ${products.length} produtos no stock`);
    console.log(`   • ${transactions.length} transações/despesas`);
    console.log(`   • ${vendas.length} vendas`);
    console.log(`\n💡 Período de dados: Dezembro 2025 - Março 2026`);
    console.log('')
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error);
    process.exit(1);
  }
}

// Run the setup
setupDemoAccount();
