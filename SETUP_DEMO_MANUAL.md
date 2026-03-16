# 🎯 Guia Passo a Passo: Criar Conta Demo

## Método 1: Via Supabase Console (Recomendado - Mais Fácil)

### Passo 1: Aceder ao Supabase

1. Vá a https://app.supabase.com
2. Faça login com sua conta
3. Selecione o projeto **yxicmhvbmjpbwvylnugr**

### Passo 2: Criar o Utilizador (Conta Auth)

1. No menu esquerdo, clique em **Authentication**
2. Clique em **Users**
3. Clique no botão **Add User** (canto superior direito)
4. Preencha:
   - **Email**: `Demo@demo.com`
   - **Password**: `demo1234`
   - **Confirm Password**: `demo1234`
5. Clique em **Create User**

### Passo 3: Copiar o User ID

1. Na tabela de users, procure pela linha com `Demo@demo.com`
2. Clique no email para ver os detalhes
3. **Copie o ID** (formato UUID) - vamos precisar dele
4. Guarde num bloco de notas: `USER_ID = xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Passo 4: Preparar o SQL

1. Abra o ficheiro `supabase/migrations/20260316_demo_data.sql`
2. Faça **Ctrl+H** (Find and Replace)
3. Procure: `DEMO_USER_ID`
4. Substitua por: `'seu-user-id-copiado'` (incluindo as aspas simples)
5. Clique em **Replace All**
6. **Guarde o ficheiro** (Ctrl+S)

### Passo 5: Executar o SQL

1. No Supabase Console, clique em **SQL Editor**
2. Clique em **New Query**
3. **Copie todo o conteúdo** do ficheiro SQL (que já tem o user ID substituído)
4. **Cole no editor SQL** do Supabase
5. Clique em **Run** (Ctrl+Enter)

✅ Pronto! Os dados foram inseridos.

---

## Método 2: Via Terminal (Mais Avançado)

Se tiver Node.js/Bun instalado:

### Passo 1: Adicione a Service Role Key

1. No Supabase Console, vá a **Settings** > **API**
2. Copie o **Service Role Secret Key** (tem cuidado - é secreto!)
3. Abra o ficheiro `.env` na raiz do projeto
4. Adicione a linha:
   ```
   SUPABASE_SERVICE_ROLE_KEY=sua-service-key-copiada
   ```
5. Guarde o ficheiro

### Passo 2: Execute o Script

1. Abra o terminal na pasta do projeto
2. Execute:
   ```bash
   bun run scripts/setup-demo-account.ts
   ```

3. Verá mensagens confirmando cada operação ✅

---

## Verificar se Funcionou

### Via Aplicação

1. Abra a aplicação (rodando em dev)
2. Clique em **Sign In** (se estiver deslogado)
3. Faça login com:
   - Email: `Demo@demo.com`
   - Senha: `demo1234`

4. Verifique os dados em cada página:
   - **Dashboard**: Gráficos preenchidos
   - **Stock**: 44 produtos
   - **Transações**: 30 registos
   - **Vendas**: 40 registos

### Via SQL (Supabase Console)

1. Vá a **SQL Editor**
2. Crie uma nova query
3. Cole e execute:

```sql
-- Verificar dados da conta Demo
SELECT COUNT(*) as total_profiles FROM profiles WHERE nome = 'Demo';
SELECT COUNT(*) as total_stock FROM stock WHERE user_id = 'seu-user-id';
SELECT COUNT(*) as total_transacoes FROM transacoes WHERE user_id = 'seu-user-id';
SELECT COUNT(*) as total_vendas FROM vendas WHERE user_id = 'seu-user-id';
```

Deve ver:
- 1 profile (Demo)
- 44 produtos no stock
- 30 transações
- 40 vendas

---

## 📊 Dados Resumo

| Categoria | Quantidade | Descrição |
|-----------|-----------|-----------|
| **Stock** | 44 produtos | Alimentos, bebidas, roupas, higiene |
| **Transações** | 30 registos | Despesas: reposição, aluguel, utilitários |
| **Vendas** | 40 registos | Vendas a clientes variados |
| **Período** | 3 meses | Dezembro 2025 - Março 2026 |

---

## ❓ Troubleshooting

### "Email já existe"
- A conta já foi criada anteriormente
- Faça login com `Demo@demo.com` / `demo1234`
- Ou crie uma conta com email diferente

### "DEMO_USER_ID not defined" no SQL
- Certifique-se que substituiu `DEMO_USER_ID` pelo UUID real
- Exemplo correto: `'550e8400-e29b-41d4-a716-446655440000'` (com aspas)

### Nenhum dado aparece após login
1. Verifique que o SQL foi executado sem erros
2. Verifique que o user_id está correto
3. Aguarde alguns segundos (cache)
4. Atualize a página (F5)

### Erro SQL: "permission denied"
- Verifique as RLS policies
- Certifique-se que o user_id nos INSERT é válido

---

## 🔍 Referência de Dados

### Categorias de Produtos
- 🍎 Alimentos: 15 produtos
- 🥤 Bebidas: 10 produtos  
- 👕 Roupas: 10 produtos
- 🧴 Higiene: 7 produtos
- 📚 Outros: 2 produtos

### Categorias de Transações
- Reposição Stock (compras)
- Renda/Aluguel
- Serviços
- Utilitários (eletricidade, água)
- Publicidade

### Clientes nas Vendas
**Dezembro 2025**: João Silva, Maria Santos, Rita Costa, Pedro Oliveira, Ana Martins, etc.
**Janeiro 2026**: Diana Marques, Gonçalo Lima, Isadora Costa, José Mendes, etc.
**Fevereiro 2026**: Paulo Costa, Quique Monteiro, Rita Pereira, Sérgio Alves, etc.
**Março 2026**: Zóe Costa, Acácio Neves, Benedita Sousa, Custódio Veiga, etc.

---

**Última atualização**: 16 de Março de 2026
