# 🚀 GUIA PRÁTICO: Setup Completo do Demo no Supabase (10 min)

## 📍 Você está aqui:
```
PC (VS Code) ← Ficheiro SQL pronto
     ↓
Browser (Supabase) ← Vamos usar isto
     ↓
Aplicação (Login) ← Resultado final
```

---

## ⏱️ PASSO 1: CRIAR UTILIZADOR (3 minutos)

### 1️⃣ Abra o Supabase

```
🌐 URL: https://app.supabase.com
📁 Projeto: https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/sql/new
```

### 2️⃣ Navegue até Authentication

```
Menu esquerdo:
  └─ Authentication
      └─ Users
          └─ [Vê lista de utilizadores]
```

### 3️⃣ Crie novo utilizador

```
1. Botão azul: "Add User" (canto superior direito)
2. Preencha:
   
   Email:              Demo@demo.com
   Password:           demo1234
   Confirm Password:   demo1234
   
3. Clique: "Create User"
```

### 4️⃣ Copie o UUID

```
⭐ IMPORTANTE!
   
Aparecerá uma linha com a novo utilizador.
Tem um UUID (número longo com hífens).

Exemplo:
550e8400-e29b-41d4-a716-446655440000

Copie e guarde num bloco de notas → VAI PRECISAR DISTO!
```

---

## ⏱️ PASSO 2: PREPARAR SQL (2 minutos)

### 1️⃣ Abra o ficheiro SQL

```
Ficheiro: SUPABASE_SETUP_MANUAL.sql
(Está na raiz do projeto)
```

### 2️⃣ Substitua o UUID

```
No ficheiro:
1. Procure: REPLACE_WITH_USER_ID
2. Substitua por: 'seu-uuid-copiado'

⚠️ IMPORTANTE:
   - NÃO ESQUEÇA AS ASPAS SIMPLES!
   - Formato correto: '550e8400-e29b-41d4-a716-446655440000'
   - Formato errado: 550e8400-e29b-41d4-a716-446655440000
   
🛠️ Use Find/Replace: Ctrl+H
   Find:    REPLACE_WITH_USER_ID
   Replace: 'seu-uuid'
   Click:   Replace All
```

### 3️⃣ Copie todo o SQL

```
Keyboard: Ctrl+A (Select All)
Keyboard: Ctrl+C (Copy)

✅ SQL está na clipboard
```

---

## ⏱️ PASSO 3: EXECUTAR NO SUPABASE (5 minutos)

### 1️⃣ Vá para SQL Editor

```
Menu esquerdo:
  └─ SQL Editor
      └─ New Query
```

### 2️⃣ Cole o SQL

```
Keyboard: Ctrl+V (Paste)

✅ Todo o SQL aparece no editor
```

### 3️⃣ Execute

```
Opção A: Clique botão "Run" (azul, lado direito)
Opção B: Keyboard shortcut: Ctrl+Enter

⏳ AGUARDE 3-5 SEGUNDOS
```

### 4️⃣ Verifique se correu bem

```
📍 Procure:
   
   ✅ NO FINAL DEVE VER:
      "Success. No rows returned"
   
   ❌ NÃO DEVE TER:
      - Erros em vermelho
      - "Permission denied"
      - "invalid input"
```

---

## ⏱️ PASSO 4: VERIFICAR DADOS (Opcional, 2 minutos)

### Para ter CERTEZA que funcionou:

```
SQL Editor → New Query

Copie e cole isto:
─────────────────────────────────────
SELECT 
  (SELECT COUNT(*) FROM profiles WHERE nome = 'Demo') as profiles,
  (SELECT COUNT(*) FROM stock WHERE nome_produto LIKE '%Arroz%') as produtos,
  (SELECT COUNT(*) FROM transacoes WHERE categoria = 'Reposição Stock') as transacoes,
  (SELECT COUNT(*) FROM vendas WHERE cliente_nome LIKE '%João%') as vendas;
─────────────────────────────────────

Execute (Ctrl+Enter)

Deve ver:
profiles | produtos | transacoes | vendas
    1    |    1     |     15     |   1
```

---

## ⏱️ PASSO 5: FAZER LOGIN (2 minutos)

### 1️⃣ Abra a aplicação

```
URL: http://localhost:5173
(ou similar, conforme o seu dev server)
```

### 2️⃣ Se não estiver logado, clique "Sign In"

### 3️⃣ Preencha:

```
Email:    Demo@demo.com
Password: demo1234

Clique: "Sign In"
```

### 4️⃣ Verifique os dados

```
🎯 Navegue pelas abas:

Dashboard
  └─ Verá gráficos com receitas/despesas

Stock  
  └─ Verá 44 produtos listados

Transações
  └─ Verá 30 registos de despesas

Vendas
  └─ Verá 40 registos de vendas
```

---

## ✅ CHECKLIST FINAL

```
☐ Criei o utilizador Demo@demo.com
☐ Copiei o UUID do utilizador
☐ Abri SUPABASE_SETUP_MANUAL.sql
☐ Substitui REPLACE_WITH_USER_ID pelo UUID correto
☐ Executei o SQL no Supabase (sem erros)
☐ Consegui fazer login com Demo@demo.com
☐ Vi dados no Dashboard/Stock/Transações/Vendas
```

---

## 🆘 PROBLEMAS?

### Erro: "Email Demo@demo.com já existe"
```
→ Significa que a conta já foi criada
→ Faça login normal
→ Ou crie com email diferente (Debug@debug.com)
```

### Erro SQL: "syntax error" ou "permission denied"
```
→ Verifique que o UUID tem aspas simples
→ Exemplo correto: '550e8400-e29b-41d4-a716-446655440000'
→ Tente copiar novamente o SQL e colar
```

### Nenhum dado aparece após login
```
→ Aguarde 10 segundos (replicação de BD)
→ Atualize a página (F5)
→ Faça logout e login novamente
→ Verifique no SQL que os dados foram realmente inseridos
```

### Erro: "RLS policies não permitem"
```
→ Verifique que o user_id está correto no SQL
→ Veja o seguinte comando SQL:
   SELECT COUNT(*) FROM profiles WHERE user_id = 'seu-uuid';
```

---

## 📊 RESUMO DO QUE VAI CRIAR

```
✅ 44 Produtos em Stock
   🍎 Alimentos (15)
   🥤 Bebidas (10)
   👕 Roupas (10)
   🧴 Higiene (7)
   📚 Outros (2)

✅ 30 Transações (Despesas)
   └─ 3 meses de histórico

✅ 40 Vendas (Receitas)
   └─ 3 meses de histórico

💰 Resumo financeiro:
   Total Receitas: 16.795€
   Total Despesas: 9.410€
   Lucro Líquido: 7.385€
```

---

## 🎯 FICHEIROS IMPORTANTES

```
📋 SUPABASE_SETUP_MANUAL.sql     ← Use ESTE ficheiro
   (Contém todo o SQL pronto)

📖 QUICK_START.md                ← Se preferir resumo
   (Versão concisa deste guia)

📚 DEMO_DATA_PREVIEW.md          ← Para ver os dados
   (Tabelas e exemplos)
```

---

## ⏱️ TEMPO TOTAL

```
Passo 1 (Utilizador):   3 minutos
Passo 2 (SQL):          2 minutos
Passo 3 (Executar):     5 minutos
Passo 4 (Verificar):    2 minutos (opcional)
Passo 5 (Login):        2 minutos
────────────────────────────────
TOTAL:                 ~13 minutos
```

---

## 🚀 COMECE AGORA!

1. Abra: https://app.supabase.com
2. Siga o Passo 1
3. Quando terminar cada passo, avance para o próximo
4. Quando chegar ao Passo 5, terá tudo pronto! 🎉

---

**Precisa de ajuda?**
- Leia: SETUP_DEMO_MANUAL.md (guia super detalhado)
- Ou: DEMO_ACCOUNT_SETUP.md (referência completa)

**Boa sorte! 👍**
