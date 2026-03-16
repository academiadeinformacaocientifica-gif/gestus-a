# 🚀 SETUP NOVO PROJETO SUPABASE - GUIA RÁPIDO

## Projeto Novo
- **URL:** https://mmwdewtfvvggpgoisabl.supabase.co
- **ID:** mmwdewtfvvggpgoisabl
- **Dados:** 1 Utilizador Demo + 44 Produtos + 30 Despesas + 40 Vendas

---

## 📋 PASSO 1️⃣ - CRIAR UTILIZADOR (2 min)

### Abra o Supabase
```
🌐 URL: https://app.supabase.com
📁 Projeto: https://app.supabase.com/project/mmwdewtfvvggpgoisabl/auth/users
```

### Crie o utilizador Demo
1. Clique em **"Add User"** (botão azul)
2. Preencha:
   ```
   Email:    Demo@demo.com
   Password: demo1234
   ```
3. Clique **"Create User"**
4. **COPIE O UUID** da linha criada
   - Parece assim: `550e8400-e29b-41d4-a716-446655440000`

---

## 📋 PASSO 2️⃣ - PREPARAR SQL (1 min)

### Substitua o UUID no SQL

1. Abra o ficheiro: **`SETUP_NOVO_PROJETO.sql`** (na raiz do projeto)
2. Use **Find & Replace** (Ctrl+H):
   ```
   Find:    'REPLACE_WITH_USER_ID'
   Replace: 'SEU_UUID_COPIADO'
   
   Exemplo:
   Find:    'REPLACE_WITH_USER_ID'
   Replace: '550e8400-e29b-41d4-a716-446655440000'
   ```
3. Clique **"Replace All"**
4. Copie todo o SQL (Ctrl+A → Ctrl+C)

---

## 📋 PASSO 3️⃣ - EXECUTAR SQL (2 min)

### Cole no Supabase SQL Editor

1. Abra: https://app.supabase.com/project/mmwdewtfvvggpgoisabl/sql/new
2. Cole o SQL (Ctrl+V)
3. Clique **"Run"** ou pressione **Ctrl+Enter**
4. ⏳ Aguarde 3-5 segundos

### Verifique se correu bem
```
✅ Deve ver: "Success. No rows returned"
❌ Não deve ter: Erros em vermelho
```

---

## 📋 PASSO 4️⃣ - ATUALIZAR `.env` (1 min)

Abra o arquivo `.env` na raiz do projeto e atualize:

```env
VITE_SUPABASE_URL=https://mmwdewtfvvggpgoisabl.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_tHaNZbvgmX1quBKnQTX0_w_1GM7DAXQ
VITE_SUPABASE_PROJECT_ID=mmwdewtfvvggpgoisabl
```

---

## 📋 PASSO 5️⃣ - TESTAR LOGIN (2 min)

1. Abra a aplicação: **http://localhost:5173**
2. Clique: **"Sign In"**
3. Preencha:
   ```
   Email:    Demo@demo.com
   Password: demo1234
   ```
4. Clique: **"Sign In"**

### Navegue pelos dados
```
📊 Dashboard
   → Verá gráficos com receitas/despesas

📦 Stock
   → Verá 44 produtos listados

💸 Transações
   → Verá 30 registos de despesas

🛒 Vendas
   → Verá 40 registos de vendas
```

---

## 💰 RESUMO DOS DADOS

```
✅ 44 Produtos em Stock
   🍎 Alimentos (15)
   🥤 Bebidas (10)
   👕 Roupas (10)
   🧴 Higiene (7)
   📚 Outros (2)

✅ 30 Transações (Despesas) - 3 meses

✅ 40 Vendas (Receitas) - 3 meses

💰 FINANCEIRO:
   Total Receitas: 16.795€
   Total Despesas: 9.410€
   Lucro Líquido: 7.385€
```

---

## ⚠️ SEGURANÇA

**APÓS TERMINAR O SETUP:**

Regenere a chave de API no Supabase para segurança:

1. Abra: https://app.supabase.com/project/mmwdewtfvvggpgoisabl/settings/api
2. Procure: **"Service Role Key"**
3. Clique: **"Rotate"**
4. A chave antiga fica desativada automaticamente ✅

---

## 🆘 PROBLEMAS?

### ❌ "Email já existe"
→ A conta Demo@demo.com já foi criada. Faça login normal.

### ❌ "syntax error" no SQL
→ Verifique que substituiu TODOS os `REPLACE_WITH_USER_ID` pelo UUID correto.
→ UUID deve ter aspas simples: `'550e8400-e29b-41d4-a716-446655440000'`

### ❌ Nenhum dado aparece após login
→ Aguarde 10 segundos (replicação de BD)
→ Atualize a página (F5)
→ Verifique o `.env` está correto

---

## ✅ CHECKLIST FINAL

```
☐ Criei conta Demo@demo.com no Auth
☐ Copiei o UUID do utilizador
☐ Abri SETUP_NOVO_PROJETO.sql
☐ Substitui REPLACE_WITH_USER_ID pelo UUID real
☐ Executei o SQL no Supabase (sem erros)
☐ Atualizei o arquivo .env
☐ Consegui fazer login com Demo@demo.com
☐ Vi dados no Dashboard/Stock/Transações/Vendas
```

---

## 🎯 FICHEIROS

```
📋 SETUP_NOVO_PROJETO.sql  ← SQL pronto (substitua UUID)
📝 setup-novo-projeto.js   ← Script Node.js (alternativa)
📖 Este guia               ← Instruções passo a passo
```

---

## ⏱️ TEMPO TOTAL

```
Passo 1 (Utilizador):   2 minutos
Passo 2 (SQL):          1 minuto
Passo 3 (Executar):     2 minutos
Passo 4 (.env):         1 minuto
Passo 5 (Login):        2 minutos
────────────────────────────────
TOTAL:                 ~8 minutos
```

---

## 🚀 COMECE AGORA!

1. Abra: https://app.supabase.com/project/mmwdewtfvvggpgoisabl/auth/users
2. Clique em "Add User"
3. Siga os passos acima
4. Quando terminar o Passo 5, terá tudo pronto! 🎉

**Boa sorte! 👍**
