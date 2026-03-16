# 🚀 Conta Demo - Instruções Rápidas

## TL;DR (5 minutos)

### Passo 1️⃣: Criar Utilizador
1. Vá a https://app.supabase.com → Seu Projeto
2. **Authentication** → **Users** → **Add User**
3. Email: `Demo@demo.com` | Senha: `demo1234`
4. Copie o **UUID** do utilizador criado

### Passo 2️⃣: Executar SQL
1. Abra [`DEMO_DATA_COMPLETE.sql`](./DEMO_DATA_COMPLETE.sql)
2. **Ctrl+H** → Procure: `REPLACE_WITH_USER_ID` → Substitua: `'seu-uuid-copiado'`
3. Copie todo o conteúdo
4. Supabase → **SQL Editor** → Nova query
5. Cole e execute (Ctrl+Enter)

### Passo 3️⃣: Fazer Login
1. Aplicação → **Sign In**
2. Email: `Demo@demo.com` | Senha: `demo1234`
3. Veja os dados em cada aba! ✅

---

## 📊 Dados Criados

| O quê | Quantidade |
|-------|-----------|
| Produtos | 44 |
| Despesas | 30 |
| Vendas | 40 |
| Período | Dec 2025 - Mar 2026 |

**Categorias de Produtos:**
- 🍎 Alimentos (15)
- 🥤 Bebidas (10)
- 👕 Roupas (10)
- 🧴 Higiene (7)
- 📚 Outros (2)

---

## 🔧 Arquivos Criados

| Ficheiro | Descrição |
|----------|-----------|
| [`DEMO_DATA_COMPLETE.sql`](./DEMO_DATA_COMPLETE.sql) | **SQL pronto para copiar-colar** no Supabase |
| [`SETUP_DEMO_MANUAL.md`](./SETUP_DEMO_MANUAL.md) | Guia detalhado com screenshots |
| [`DEMO_ACCOUNT_SETUP.md`](./DEMO_ACCOUNT_SETUP.md) | Guia completo com troubleshooting |
| `scripts/setup-demo-account.ts` | Script Node.js (opcional) |

---

## ✅ Checklist

- [ ] Criei o utilizador Demo no Supabase
- [ ] Copiei o UUID
- [ ] Executei o SQL com a substituição
- [ ] Consegui fazer login (Demo@demo.com)
- [ ] Vejo dados no Dashboard/Stock/Transações/Vendas

---

## ❓ Problema?

### "Email já existe"
→ Use a conta existente

### "UUID não funciona"
→ Certifique-se de incluir as aspas simples: `'seu-uuid'`

### "Nenhum dado aparece"
→ Aguarde 5 segundos e atualize a página

### "Erro SQL"
→ Verifique que o UUID está correto e o SQL não foi truncado

---

## 📞 Precisa de Ajuda?

Veja o ficheiro [`SETUP_DEMO_MANUAL.md`](./SETUP_DEMO_MANUAL.md) para guia passo a passo com mais detalhes!

---

**👉 Comece agora:** Abra [`DEMO_DATA_COMPLETE.sql`](./DEMO_DATA_COMPLETE.sql)
