const fs = require('fs');

// Credenciais do projeto
const projectId = 'mmwdewtfvvggpgoisabl';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1td2Rld3RmdnZnZ3Bnb2lzYWJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzY4NzM3MywiZXhwIjoyMDg5MjYzMzczfQ.HQmFDvp2zKL5dR3Lopd-6DiBn8jnNLhLsw7_5oj-990';
const supabaseUrl = 'https://mmwdewtfvvggpgoisabl.supabase.co';

// Lê o SQL da Parte 1 (apenas tabelas e RLS)
const sqlTabelas = fs.readFileSync('./SETUP_PARTE1_TABELAS.sql', 'utf8');

async function criarTabelas() {
  try {
    console.log('🔄 A criar tabelas no Supabase...');
    
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/sql_query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey,
      },
      body: JSON.stringify({
        query: sqlTabelas
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Tabelas criadas com sucesso!');
      console.log('Próximos passos:');
      console.log('1. Crie o utilizador Demo em: https://app.supabase.com/project/mmwdewtfvvggpgoisabl/auth/users');
      console.log('   Email: Demo@demo.com');
      console.log('   Password: demo1234');
      console.log('2. Copie o User UID do utilizador Demo');
      console.log('3. Execute o script "inserir-dados.js" com o UUID');
    } else {
      console.error('❌ Erro ao criar tabelas:');
      console.error(data);
    }
  } catch (error) {
    console.error('❌ Erro na execução:');
    console.error(error.message);
  }
}

criarTabelas();
