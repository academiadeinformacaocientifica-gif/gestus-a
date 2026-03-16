# 🔐 Guia de Segurança

Este documento descreve as melhores práticas de segurança para o projeto Gestus AO.

## 🔒 Variáveis de Ambiente

### Configuração

```bash
# 1. Copie o arquivo de exemplo
cp .env.example .env.local

# 2. Preencha com seus valores reais
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica

# 3. NUNCA faça commit de .env.local
# Já está em .gitignore, mas verifique sempre!
```

### O que Não Fazer

```bash
# ❌ NUNCA exponha credenciais direto no código
const API_KEY = "sk_live_1234567890"; // MAU!

# ❌ NUNCA faça commit de .env.local
git add .env.local  # NÃO FAÇA ISTO!

# ❌ NUNCA use credenciais em URLs públicas
https://api.example.com?key=sk_live_1234567890  # MAU!

# ❌ NUNCA compartilhe credenciais em comentários/issues
// Use esta chave para testes: sk_test_123456  // MAU!
```

## 🔑 Chaves do Supabase

### Tipos de Chaves

1. **Chave Pública (VITE_SUPABASE_PUBLISHABLE_KEY)** ✅ OK expor
   - Usada no frontend para RLS queries
   - Segura pois limitada apenas aos dados permittidos

2. **Chave de Serviço (SERVICE_KEY)** ⚠️ SECRETO
   - Nunca coloque no frontend
   - Apenas em backend/scripts
   - Tem acesso a TODOS os dados

### Como Obter Chaves Seguras

```
Supabase Dashboard → Project → Settings → API
- Anon public key: Use em frontend (VITE_SUPABASE_PUBLISHABLE_KEY)
- Service role key: Guarde secreto (nunca em .env.local criptografado em .env)
```

## 🛡️ RLS (Row Level Security)

A segurança do Supabase é baseada em **RLS**. Sempre habilite:

```sql
-- Exemplo: Tabela de transações
CREATE TABLE transacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  valor DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE transacoes ENABLE ROW LEVEL SECURITY;

-- Policy: Utilizador vê apenas suas próprias transações
CREATE POLICY "Users can view own transactions"
  ON transacoes FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Utilizador insere apenas para si
CREATE POLICY "Users can insert own transactions"
  ON transacoes FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 🔐 Autenticação

### Boas Práticas

```tsx
// ✅ BOM: Usar hook customizado
const { user, loading } = useAuth();

if (!user) return <Navigate to="/auth" />;

// ❌ EVITAR: Guardar token no localStorage manualmente
localStorage.setItem('token', token); // Supabase já faz isto!

// ✅ BOM: Deixar Supabase gerenciar sessão
// Supabase cuida de refresh automático
```

### Proteção de Rotas

```tsx
// Sempre proteja rotas que requerem autenticação
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingState />;
  if (!user) return <Navigate to="/auth" />;

  return children;
}
```

## 📊 Dados Sensíveis

### O que Não Guardar

```tsx
// ❌ NUNCA guarde no localStorage/sessionStorage
localStorage.setItem('password', password);
localStorage.setItem('token', token);  // Supabase faz isto!
localStorage.setItem('creditCard', cardNumber);

// ✅ OK guardar (não sensível)
localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'pt');
localStorage.setItem('userId', userId);  // OK pois é público
```

## 🚨 Tratamento de Erros

### Nunca Exponha Informações Sensíveis em Mensagens de Erro

```tsx
// ❌ MAU: Expõe detalhes técnicos
throw new Error("Database error: Connection refused to 192.168.1.1");

// ✅ BOM: Mensagem genérica para utilizador
logger.error("Database connection failed", error, { 
  userId: user.id,
  timestamp: new Date()
});
toast.error("Ocorreu um erro ao carregar dados. Tente novamente.");
```

## 🔗 HTTPS e CORS

### Em Produção

```tsx
// ✅ SEMPRE use HTTPS em produção
// Vercel/Netlify automaticamente forçam HTTPS

// Configurar CORS no Supabase
// Dashboard → Settings → API → CORS allowed origins
// Adicionar seu domínio: https://seu-dominio.com
```

## 🧪 Testes e Sandbox

### Dados de Teste

```bash
# Use contas de teste distintas
# Nunca use dados reais em testes

# ✅ BOM
test_user@example.com + password123456

# ❌ MAU
seu_email_real@gmail.com em testes públicos
```

## 📱 Segurança em Dispositivos

### Logout em Dispositivos Públicos

```tsx
// Sempre logout ao terminar
async function handleLogout() {
  await supabase.auth.signOut();
  // Limpar caches
  localStorage.removeItem('auth_token');
  window.location.href = '/auth';
}
```

### Dados Sensíveis em Sessão

```tsx
// ❌ Guardar dados sensíveis em sessionStorage é melhor que localStorage
// mas ainda pode ser acessado via DevTools

// ✅ MELHOR: Usar variáveis em memória (Component State)
const [creditCard, setCreditCard] = useState('');
// Perdido ao recarregar página (é o objetivo!)
```

## 🔐 2FA (Two-Factor Authentication)

Supabase suporta 2FA:

```tsx
// Implementar 2FA para contas administrativas
// Dashboard → Authentication → User Management
// Ativar MFA por utilizador
```

## 🕵️ Auditoria e Logs

### Monitorar Acessos

```tsx
// Log de acessos importantes
logger.event('user_login', { userId, timestamp });
logger.event('sensitive_data_accessed', { userId, resource });
logger.event('permission_denied', { userId, action });
```

### Revisar Logs

```bash
# Supabase Database → Run custom query
SELECT * FROM auth.audit_log_entries 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## 🔄 Atualizações de Segurança

### Manter Dependências Atualizadas

```bash
# Verificar vulnerabilidades
npm audit

# Atualizar pacotes
npm update
npm install

# Usar dependências seguras
npm ci  # vs npm install (garante versões exatas)
```

## 🚀 Deploy Seguro

### Variáveis no Hosting

#### Vercel
```
Project Settings → Environment Variables
Adicionar: VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY
```

#### Netlify
```
Site settings → Build & deploy → Environment
Adicionar as variáveis acima
```

### Headers de Segurança

Em `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
```

## 📋 Checklist de Segurança

- [ ] `.env.local` está em `.gitignore`
- [ ] Nenhuma credencial em código/comentários
- [ ] RLS ativado em todas as tabelas Supabase
- [ ] Rotas protegidas requerem autenticação
- [ ] Erros não expõem detalhes técnicos
- [ ] HTTPS em produção
- [ ] CORS configurado corretamente
- [ ] Dependências atualizadas (`npm audit`)
- [ ] Chaves de produção são diferentes das de teste
- [ ] Logs registram atividades sensíveis

## 🆘 Resposta a Incidentes

Se acidentalmente expuser uma credencial:

```bash
# 1. Revogar a chave imediatamente
# Supabase Dashboard → Settings → API → Regenerate key

# 2. Fazer git rebase para remover commit
git rebase -i HEAD~1
# ou git filter-branch para histórico completo

# 3. Force push (com cuidado!)
git push --force origin main  # APENAS se autorizado

# 4. Informar time
# Comunicar o incidente para toda a equipe

# 5. Monitorar
# Se possível, monitorar logs para uso não autorizado
```

---

**Lembre-se: Segurança é responsabilidade de todos! 🔐**

Dúvidas? Abra uma issue no repositório.
