# 📋 Checklist de Mudanças - Novo Projeto Supabase

## 🎯 O que vai mudar

Quando mudar para um novo projeto Supabase, **APENAS** isto precisa ser atualizado:

---

## 1️⃣ ARQUIVO: `.env` (CRÍTICO!)

### Antes:
```env
VITE_SUPABASE_PROJECT_ID="yxicmhvbmjpbwvylnugr"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_URL="https://yxicmhvbmjpbwvylnugr.supabase.co"
```

### Depois:
```env
VITE_SUPABASE_PROJECT_ID="seu-novo-project-id"
VITE_SUPABASE_PUBLISHABLE_KEY="sua-nova-anon-key"
VITE_SUPABASE_URL="https://seu-novo-project-id.supabase.co"

# Opcional para scripts automáticos:
SUPABASE_SERVICE_ROLE_KEY="sua-nova-service-role-key"
```

### 🎯 Como obter:
1. Novo projeto Supabase → Settings → API
2. Copie URL, Anon Key, Project ID
3. Cole no .env

---

## 2️⃣ ARQUIVO: `.env.example` (Documentação)

### Atualizar para:
```env
VITE_SUPABASE_PROJECT_ID=""
VITE_SUPABASE_PUBLISHABLE_KEY=""
VITE_SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""
```

**Isso:** Apenas para servir de template

---

## 3️⃣ ARQUIVO: `supabase/config.toml` (Se existir)

### Antes:
```toml
project_id = "yxicmhvbmjpbwvylnugr"
```

### Depois:
```toml
project_id = "seu-novo-project-id"
```

**Nota:** Se não existe, não precisa criar (é opcional)

---

## 4️⃣ ARQUIVO: `src/integrations/supabase/client.ts`

### ⚠️ NÃO ALTERAR!
Este ficheiro é **auto-gerado** e pega as variáveis do `.env`

Já tem:
```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
```

Quando mudar o `.env`, isto **automaticamente** aponta para o novo projeto.

---

## 5️⃣ ARQUIVO: `src/integrations/supabase/types.ts`

### Opção A: Deixar como está ✅ (Recomendado)
Os tipos existentes são genéricos e funcionam com qualquer projeto.

### Opção B: Regenerar ⚙️ (Avançado)
Se quer tipos mais específicos (não necessário):

```bash
# Requer Supabase CLI instalado:
supabase gen types typescript --project-id seu-novo-project-id > src/integrations/supabase/types.ts
```

**Recomendação:** Deixe como está (Opção A)

---

## 6️⃣ ARQUIVO: `DEMO_DATA_COMPLETE.sql`

### ✅ NÃO PRECISA ALTERAR
Este ficheiro é genérico. Apenas:

1. Crie novo utilizador Demo@demo.com no novo projeto
2. Copie o UUID
3. Substitua `REPLACE_WITH_USER_ID` no SQL
4. Execute

Mesmo procedimento de sempre.

---

## 7️⃣ ARQUIVOS: Documentação (Opcional)

Estes ficheiros podem ser atualizados se quiser reflectir o novo projeto:

```
SETUP_DEMO_MANUAL.sql          ← Remover ou atualizar
GUIA_PRATICO_SUPABASE.md       ← Atualizar Project ID
QUICK_START.md                 ← Atualizar Project ID
README_DEMO.md                 ← Atualizar Project ID
DEMO_ACCOUNT_SETUP.md          ← Atualizar Project ID
```

**Mas:** Não são CRÍTICOS para funcionamento

---

## 8️⃣ ARQUIVOS: NÃO ALTERAR

Estes ficheiros **não precisam mudar**:

```
✅ src/App.tsx
✅ src/pages/
✅ src/components/
✅ src/hooks/
✅ src/services/
✅ src/lib/
✅ src/types/
✅ src/utils/
✅ tailwind.config.ts
✅ vite.config.ts
✅ tsconfig.json
✅ package.json
✅ ... (todos os outros)
```

**Porquê?** Pegam tudo através da variável de ambiente `VITE_SUPABASE_URL`

---

## 🚀 RESUMO: APENAS 3 PASSOS!

```
1. Crie novo projeto no Supabase
2. Atualize variáveis em .env
3. Reinicie dev server (bun dev)

PRONTO! 🎉
```

---

## ✅ PASSO A PASSO

### 1️⃣ Novo Projeto (5 min)
```
https://app.supabase.com → New Project
```

### 2️⃣ Obter Credenciais (2 min)
```
Settings → API → Copie URL, Anon Key, Project ID
```

### 3️⃣ Atualizar .env (1 min)
```
Abra .env
Substitua valores antigos pelos novos
Guarde
```

### 4️⃣ Criar Tabelas (5 min)
```
Novo projeto → SQL Editor
Cole SQL de NOVO_PROJETO_SUPABASE.md
Execute
```

### 5️⃣ Reiniciar Dev Server (1 min)
```
Terminal: Ctrl+C (parar anterior)
Terminal: bun dev (iniciar novo)
```

### 6️⃣ Criar Conta Demo (2 min)
```
Siga: ULTRA_RÁPIDO.md
```

### 7️⃣ Testar (1 min)
```
http://localhost:5173
Login: Demo@demo.com / demo1234
Verifycar dados
```

**TOTAL: ~16 minutos de início ao fim** ⏱️

---

## 🔍 Verificação Rápida

Depois de tudo pronto, verifique:

```javascript
// No browser console (F12):
fetch('https://seu-novo-project-id.supabase.co/rest/v1/')
  .then(r => r.json())
  .then(d => console.log('✅ Ligado!', d))
  .catch(e => console.error('❌ Erro:', e))
```

Se vir "✅ Ligado!", está tudo certo!

---

## 📞 Dúvidas Frequentes

**P: Preciso de backup do projeto antigo?**
R: Sim, se tem dados importantes! Faça export no Supabase antigo.

**P: Posso manter os dois projetos?**
R: Sim! Mas use ambiente variables para trocar (criar .env.local, .env.production, etc)

**P: E os dados de teste?**
R: Criar facilmente com o SQL de ULTRA_RÁPIDO.md ou DEMO_DATA_COMPLETE.sql

**P: Preciso de alterar código?**
R: NÃO! Apenas variáveis de ambiente.

---

## 🎯 Referência Rápida

| Ficheiro | Mudar? | O Quê | Tempo |
|----------|--------|-------|-------|
| .env | ✅ SIM | Credenciais | 1 min |
| .env.example | ⚠️ OPC | Template | 1 min |
| supabase/config.toml | ⚠️ OPC | Project ID | 1 min |
| client.ts | ❌ NÃO | (auto) | 0 min |
| types.ts | ⚠️ OPC | (regenerar) | 2 min |
| Resto do código | ❌ NÃO | (nada) | 0 min |

---

## 🎉 Resultado Final

```
Antes:
├── Projeto Supabase: yxicmhvbmjpbwvylnugr
└── Aplicação aponta para esse projeto

Depois:
├── Projeto Supabase: seu-novo-project-id ✨
└── Aplicação aponta para NOVO projeto ✨
```

---

**Pronto para começar?** 👉 [`NOVO_PROJETO_SUPABASE.md`](./NOVO_PROJETO_SUPABASE.md)
