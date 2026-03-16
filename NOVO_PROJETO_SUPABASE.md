# 🚀 Criar Novo Projeto Supabase - Guia Completo

## PASSO 1: Criar Novo Projeto no Supabase (5 minutos)

### 1️⃣ Vá para https://app.supabase.com

### 2️⃣ Clique em "New Project"

```
Preencha:
┌─────────────────────────────────────┐
│ Organization:  [Sua organização]    │
│ Name:          gestus-ao-prod       │
│ Database Pwd:  [gere uma senha]     │
│ Region:        Europe (Portugal)    │
│ Plan:          Free (ou Pro)        │
└─────────────────────────────────────┘

Clique: "Create new project"
```

### 3️⃣ Aguarde criação (~ 2-3 minutos)

```
✅ Verá:
   - Project ID (UUID)
   - Supabase URL
   - Anon Key (Publishable)
   - Service Role Key (Secret)
```

### 4️⃣ COPIE e GUARDE as credenciais:

```
📍 Vá a: Settings → API → Project API Keys

Copie:
□ URL (tipo: https://xxxxx.supabase.co)
□ Anon Key (tipo: eyJhbGci...)
□ Service Role Key (tipo: eyJhbGci... - SECRETO!)
□ Project ID (tipo: xxxxx-xxxxx-xxxxx)
```

---

## PASSO 2: Criar Tabelas (Migrations)

Na SQL Editor do novo projeto, execute ISTO:

```sql
-- ============================================================
-- CREATE UPDATED_AT TRIGGER FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- ============================================================
-- PROFILES TABLE
-- ============================================================

CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL DEFAULT '',
  nome_negocio TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nome, nome_negocio)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', ''),
    COALESCE(NEW.raw_user_meta_data->>'nome_negocio', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRANSACOES TABLE
-- ============================================================

CREATE TABLE public.transacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('ganho', 'despesa')),
  valor NUMERIC(12,2) NOT NULL CHECK (valor > 0),
  categoria TEXT NOT NULL,
  descricao TEXT,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions" ON public.transacoes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own transactions" ON public.transacoes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own transactions" ON public.transacoes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own transactions" ON public.transacoes FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_transacoes_updated_at BEFORE UPDATE ON public.transacoes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_transacoes_user_data ON public.transacoes(user_id, data DESC);
CREATE INDEX idx_transacoes_tipo ON public.transacoes(user_id, tipo);

-- ============================================================
-- VENDAS TABLE
-- ============================================================

CREATE TABLE public.vendas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cliente_nome TEXT,
  valor_total NUMERIC(12,2) NOT NULL CHECK (valor_total > 0),
  descricao TEXT,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own sales" ON public.vendas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own sales" ON public.vendas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sales" ON public.vendas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sales" ON public.vendas FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_vendas_updated_at BEFORE UPDATE ON public.vendas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_vendas_user_data ON public.vendas(user_id, data DESC);

-- ============================================================
-- STOCK TABLE
-- ============================================================

CREATE TABLE public.stock (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_produto TEXT NOT NULL,
  sku TEXT,
  quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
  preco_unitario NUMERIC(12,2) NOT NULL CHECK (preco_unitario >= 0),
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stock" ON public.stock FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own stock" ON public.stock FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own stock" ON public.stock FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own stock" ON public.stock FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_stock_updated_at BEFORE UPDATE ON public.stock FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_stock_user ON public.stock(user_id);
CREATE INDEX idx_stock_nome ON public.stock(user_id, nome_produto);
```

---

## PASSO 3: Atualizar Variáveis de Ambiente

Edite o ficheiro `.env` na raiz do projeto:

```env
# APAGUE AS ANTIGAS:
# (Remove todas as variáveis VITE_SUPABASE_* antigas)

# ADICIONE AS NOVAS:
VITE_SUPABASE_URL=https://seu-novo-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-anon-key-copiada
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-copiada
```

---

## PASSO 4: Regenerar Tipos TypeScript (Opcional)

Se quer atualizar os tipos gerados:

```bash
# Se tiver Supabase CLI instalado:
supabase gen types typescript --project-id seu-novo-project-id > src/integrations/supabase/types.ts
```

Se não tiver CLI, os tipos existentes funcionam (são genéricos o suficiente).

---

## PASSO 5: Criar Conta Demo

Siga o guia: `ULTRA_RÁPIDO.md`

```
1. Criar utilizador Demo@demo.com
2. Copiar UUID
3. Executar SQL com dados de teste
4. Login na aplicação
```

---

## PASSO 6: Testar a Ligação

```bash
# Terminal na pasta do projeto:
bun dev

# Abra: http://localhost:5173
# Tente fazer login com Demo@demo.com
```

---

## ✅ CHECKLIST FINAL

```
☐ Criei novo projeto no Supabase
☐ Copiei URL e Anon Key
☐ Executei SQL para criar tabelas
☐ Atualizei .env com novas credenciais
☐ Reiniciei dev server (bun dev)
☐ Criei conta Demo no novo projeto
☐ Consegui fazer login
☐ Vejo dados na aplicação
```

---

## 🆘 Problemas?

### "Cannot find module '@supabase/supabase-js'"
```
→ Execute: bun install
```

### "Variáveis de ambiente não carregam"
```
→ Aguarde alguns segundos e atualize (F5)
→ Verifique que __não há espaços__ no .env
```

### "Email já existe"
```
→ Use outro email ou delete a conta demo anterior
```

### "Type errors" no TypeScript
```
→ Execute: bun run build
→ Ou regenere tipos (veja PASSO 4)
```

---

## 📊 Resumo

| Ação | Tempo | Dificuldade |
|------|-------|-------------|
| Criar projeto | 5 min | ⭐ Fácil |
| Criar tabelas | 5 min | ⭐ Fácil |
| Atualizar .env | 2 min | ⭐ Fácil |
| Popular dados | 2 min | ⭐ Fácil |
| Testar | 2 min | ⭐ Fácil |
| **TOTAL** | **~16 min** | **⭐ Muito Fácil** |

---

## 🎂 Próximo Passo

Depois de fazer isto tudo:

1. A aplicação estará ligada ao **novo projeto Supabase**
2. Terá uma conta **Demo** com dados de teste
3. Poderá testar **toda a funcionalidade**

---

**Ficou com dúvidas? Avise!** 👇
