# 🎬 Guia Rápido: 5 Minutos para Ter Dados de Teste

## ⏱️ Passo 1: Criar Utilizador (1 minuto)

### No Supabase Console:

```
1. Vá a: https://app.supabase.com
2. Selecione seu projeto (yxicmhvbmjpbwvylnugr)
3. No menu esquerdo: Authentication → Users
4. Botão azul: "Add User"
5. Preencha:
   ├─ Email:    Demo@demo.com
   ├─ Password: demo1234
   └─ Confirm:  demo1234
6. Clique: "Create User"
7. ⭐ COPIE O NÚMERO (UUID) QUE APARECE
   └─ Exemplo: 550e8400-e29b-41d4-a716-446655440000
```

---

## ⏱️ Passo 2: Preparar SQL (2 minutos)

### No seu Editor (VS Code):

```
1. Abra o ficheiro: DEMO_DATA_COMPLETE.sql
2. Keyboard shortcut: Ctrl+H (Find and Replace)
3. Em "Find":        REPLACE_WITH_USER_ID
4. Em "Replace":     'seu-uuid-copiado'
   ├─ Exemplo: '550e8400-e29b-41d4-a716-446655440000'
   └─ ⚠️ NÃO ESQUEÇA AS ASPAS!
5. Clique: "Replace All"
6. Keyboard shortcut: Ctrl+A (Select All)
7. Keyboard shortcut: Ctrl+C (Copy)
```

---

## ⏱️ Passo 3: Executar SQL (1 minuto)

### No Supabase Console:

```
1. Vá a: SQL Editor
2. Clique: "New Query"
3. Keyboard shortcut: Ctrl+V (Paste)
4. Clique: "Run" (botão azul no canto)
   OU Keyboard shortcut: Ctrl+Enter
5. Aguarde 3-5 segundos...
6. ✅ Se não houver erro em vermelho, funcionou!
```

---

## ⏱️ Passo 4: Fazer Login (1 minuto)

### Na Aplicação:

```
1. Abra a sua app (localhost:5173 ou similar)
2. Se não estiver logado, clique "Sign In"
3. Preencha:
   ├─ Email:    Demo@demo.com
   └─ Password: demo1234
4. Clique: "Sign In"
5. ✅ Se conseguir entrar, os dados estão lá!
```

---

## ✅ Confirmação: Donde Ver os Dados?

```
Dashboard        → Gráficos com receitas/despesas
   ↓
Stock           → 44 produtos listados
   ↓
Transações      → 30 registos de despesas
   ↓
Vendas          → 40 registos de vendas
```

---

## 🆘 Se Algo Correr Mal

### Erro: "Email já existe"
```
→ Significa que a conta Demo@demo.com já foi criada
→ Faça login normal com Demo@demo.com / demo1234
```

### Erro SQL: "syntax error"
```
→ Verificar se copiou tudo do ficheiro corretamente
→ Verificar se substituiu TODOS os REPLACE_WITH_USER_ID
```

### Erro SQL: "permission denied"
```
→ Verificar se o UUID está correto (com aspas simples)
→ Experimentar com um valida UUID
```

### Nenhum dado aparece após login
```
→ Aguardar 10 segundos (replicação de dados)
→ Atualizar a página (F5)
→ Fazer logout e login novamente
```

---

## 📋 Checklist Final

```
□ Criei a conta Demo@demo.com no Supabase
□ Copiei o UUID (número com hífens)
□ Abri DEMO_DATA_COMPLETE.sql
□ Substitui REPLACE_WITH_USER_ID pelo UUID
□ Executei o SQL no Supabase (sem erros)
□ Consegui fazer login com Demo@demo.com
□ Vi dados nas abas (Stock, Transações, Vendas)
```

---

## 🎉 Pronto!

Se chegou até aqui, tem uma conta de teste completamente funcional com:
- **44 produtos** em stock
- **30 despesas** registadas
- **40 vendas** realizadas
- **3 meses** de dados (Dec 2025 - Mar 2026)

Pode agora testar a aplicação com dados realistas! 🚀

---

## 📞 Precisa de Mais Ajuda?

Veja os ficheiros:
- `README_DEMO.md` → TL;DR resumido
- `SETUP_DEMO_MANUAL.md` → Explicação detalhada
- `DEMO_DATA_PREVIEW.md` → Ver exemplo dos dados
- `DEMO_ACCOUNT_SETUP.md` → Guia completo com troubleshooting

---

**Tempo total: ~5 minutos ⏱️**

Começar: Abra `DEMO_DATA_COMPLETE.sql` →
