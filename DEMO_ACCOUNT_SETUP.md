# 🎯 Setup da Conta Demo - Guia Completo

Este guia explica como criar uma conta de teste (Demo) com dados preenchidos no Supabase.

## 📋 Informações da Conta

- **Email**: Demo@demo.com
- **Senha**: demo1234
- **Negócio**: Somiles - Retalhista
- **Dados preenchidos**: 3 meses de histórico (Dezembro 2025 - Março 2026)

## 📦 O que será criado

Quando ejecutar o script, serão inseridos:

### Stock (Produtos)
- **44 produtos** em 5 categorias:
  - 🍎 Alimentos (arroz, açúcar, pão, queijo, presunto, azeite, leite, ovos, manteiga)
  - 🥤 Bebidas (água, sumo, refrigerante, vinho, cerveja, café, chá)
  - 👕 Roupas (t-shirts, jeans, hoodies, saias, camisolas, casacos, meias, lenços, cintos, chapéus)
  - 🧴 Higiene (sabonete, detergente, champô, dentífrico, papel higiênico)
  - 📚 Outros (livros, gadgets, velas, almofadas, canetas)

### Transações (Despesas - 3 meses)
- **30 registos** de despesas realistas:
  - Reposição de stock
  - Aluguel da loja
  - Utilitários (eletricidade)
  - Serviços
  - Publicidade

### Vendas (Ganhos - 3 meses)
- **40 vendas** com nomes de clientes variados
- Valores realistas entre €88 e €1.200
- Descrições de produtos vendidos

## 🚀 Como Executar

### Opção 1: Usar TypeScript/Node.js

#### Pré-requisitos
1. **Node.js** instalado (v16+)
2. **Variáveis de ambiente configuradas** em `.env.local`:
   ```
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-servico
   ```

#### Passos

1. **Instale as dependências** (se não estiverem instaladas):
   ```bash
   bun install
   ```

2. **Execute o script**:
   ```bash
   bun run scripts/setup-demo-account.ts
   ```

   Ou com npx:
   ```bash
   npx tsx scripts/setup-demo-account.ts
   ```

3. **Confirme a criação**:
   - Verá mensagens `✅` para cada operação bem-sucedida
   - No final, um resumo com a conta criada

### Opção 2: Usar SQL Direto (Supabase Console)

1. **Aceda ao Supabase Console**:
   - Vá a https://app.supabase.com
   - Selecione seu projeto
   - Vá a **SQL Editor**

2. **Crie o utilizador** (manualmente via Auth):
   - Vá a **Authentication** > **Users**
   - Clique em **Add User**
   - Email: `Demo@demo.com`
   - Password: `demo1234`

3. **Copie o User ID** da tabela de utilizadores

4. **Execute o SQL de dados**:
   - Abra o ficheiro: `supabase/migrations/20260316_demo_data.sql`
   - Substitua `DEMO_USER_ID` pelo ID copiado
   - Copie e cole o conteúdo no SQL Editor
   - Execute o script

## 🔍 Verificar se Funcionou

### Via Aplicação
1. Abra a aplicação
2. Login com:
   - Email: `Demo@demo.com`
   - Senha: `demo1234`
3. Navegue pelos menus:
   - **Dashboard**: Verá gráficos com os dados
   - **Stock**: 44 produtos listados
   - **Transações**: 30 registos de despesas
   - **Vendas**: 40 registos de vendas

### Via Supabase Console
1. Vá a **SQL Editor**
2. Execute:
   ```sql
   SELECT COUNT(*) FROM profiles WHERE user_id = 'seu-user-id';
   SELECT COUNT(*) FROM stock WHERE user_id = 'seu-user-id';
   SELECT COUNT(*) FROM transacoes WHERE user_id = 'seu-user-id';
   SELECT COUNT(*) FROM vendas WHERE user_id = 'seu-user-id';
   ```

## 🛠️ Troubleshooting

### Erro: "Variáveis de ambiente não configuradas"
- Certifique-se que o ficheiro `.env.local` existe na raiz do projeto
- Verifique que tem `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`

### Erro: "SUPABASE_SERVICE_ROLE_KEY not found"
- O script tenta usar a service role key para operações admin
- Se não tiver, pode usar a chave de teste (menos seguro para produção)
- Para usar apenas a chave pública:
  ```bash
  # Edite o script e comente a linha da service role key
  # Depois rode normalmente
  ```

### Erro: "Email já existe"
- Significa que a conta Demo@demo.com já foi criada anteriormente
- Pode fazer login com essa conta
- Ou crie outra conta com email diferente (edite o script)

### Nenhum dado aparece após login
- Verifique que o SQL foi executado corretamente
- Confirme que o user_id está correto nas tabelas
- Revise os Row Level Security (RLS) policies:
  ```sql
  SELECT COUNT(*) FROM public.stock;
  ```

## 📝 Customização

Para adicionar mais produtos, transações ou vendas:

1. **Edite** `scripts/setup-demo-account.ts`
2. **Adicione elementos** aos arrays:
   - `products`
   - `transactions`
   - `vendas`
3. **Execute novamente** o script

### Exemplo: Adicionar novo produto
```typescript
{ 
  nome: 'Frango Congelado 1kg', 
  sku: 'FRA-CON-001', 
  quantidade: 100, 
  preco: 7.99 
}
```

## 🔐 Segurança

⚠️ **Aviso**: Esta é uma conta de TESTE. Para produção:
- Use senhas fortes
- Não exponha SUPABASE_SERVICE_ROLE_KEY
- Configure RLS policies adequadamente
- Use autenticação segura

## ❓ Dúvidas?

- Verifique os logs da aplicação
- Consulte o Supabase Dashboard
- Revise as policies de RLS

---

**Versão**: 1.0  
**Data**: 16 de Março de 2026
