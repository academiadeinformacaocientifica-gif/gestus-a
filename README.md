# Gestus AO - Sistema de Gestão Empresarial

Plataforma de gestão financeira e vendas para pequenas e médias empresas em Angola.

## 🎯 Funcionalidades

- **Dashboard Inteligente**: Visualização em tempo real de métricas financeiras
- **Gestão Financeira**: Rastreamento de receitas e despesas
- **Gestão de Vendas**: Registro e acompanhamento de vendas
- **Autenticação Segura**: Sistema de autenticação com Supabase
- **Interface Responsiva**: Design adaptável para todos os dispositivos
- **Relatórios**: Análise de dados com gráficos interativos

## 🛠️ Stack Tecnológico

| Categoria | Tecnologia |
|-----------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Build** | Vite |
| **UI** | Shadcn UI + Tailwind CSS |
| **Backend** | Supabase (PostgreSQL) |
| **State** | React Query (TanStack Query) |
| **Animações** | Framer Motion |
| **Ícones** | Lucide React |
| **Notificações** | Sonner |
| **Testes** | Vitest + Playwright |

## 📋 Pré-requisitos

- Node.js 16+ ou Bun
- npm/yarn/bun
- Conta Supabase (para desenvolvimento)
- Git

## 🚀 Instalação e Setup

### 1. Clone e Instale

```bash
# Clone o repositório
git clone <YOUR_GIT_URL>
cd gestus-ao

# Instale as dependências
npm install
# ou com bun:
bun install
```

### 2. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite o arquivo com suas credenciais Supabase
# Edite .env.local com:
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
```

### 3. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# Abre automaticamente em http://localhost:8080
```

## 💻 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot reload
npm run dev:build        # Build para teste

# Build
npm run build            # Build otimizado para produção
npm run build:dev        # Build com variáveis de desenvolvimento
npm run preview          # Pré-visualiza o build produção

# Testes
npm run test             # Executa testes unitários
npm run test:watch       # Testes em modo watch

# Qualidade de Código
npm run lint             # Verifica erros de lint
npm run lint:fix         # Corrige erros de lint automaticamente
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── common/          # Componentes reutilizáveis
│   ├── dashboard/       # Componentes do dashboard
│   ├── forms/           # Componentes de formulários
│   ├── ui/              # Shadcn UI (não editar)
│   └── ...outros.tsx    # Componentes únicos
│
├── pages/               # Páginas (rotas)
├── hooks/               # Custom React hooks
├── services/            # Lógica de negócio
├── integrations/        # Integrações externas (Supabase)
├── types/               # Definições TypeScript
├── lib/                 # Utilitários e constantes
├── utils/               # Funções auxiliares
├── config/              # Configurações da app
└── test/                # Testes
```

Veja [ESTRUTURA.md](ESTRUTURA.md) para documentação detalhada.

## 🔐 Variáveis de Ambiente

```env
# Supabase
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...
```

**Nunca commit `.env.local`!** Está configurado em `.gitignore`.

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Testes em modo watch (ideal para desenvolvimento)
npm run test:watch

# Testes com cobertura
npm run test -- --coverage

# Testes end-to-end com Playwright
npm run test:e2e
```

### Estrutura de Testes

```
src/
├── hooks/
│   ├── useAuth.tsx
│   └── useAuth.test.tsx
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
└── test/
    ├── setup.ts         # Configuração global
    └── example.test.ts  # Exemplo de teste
```

## 🌍 Deploy

### Deploy em Vercel (Recomendado)

```bash
# 1. Push para GitHub
git push origin main

# 2. Vá para vercel.com e conecte o repositório
# 3. Configure as env vars no painel Vercel
# 4. Deploy automático em cada push
```

### Deploy em Netlify

```bash
# 1. Instale Netlify CLI
npm install -g netlify-cli

# 2. Deploy
netlify deploy --prod

# Configure env vars em: Site settings → Build & deploy → Environment
```

### Deploy Manual em Servidor VPS

```bash
# 1. Build
npm run build

# 2. Upload a pasta `dist/` para seu servidor
# 3. Configure um webserver (Nginx/Apache)
# 4. Aponte o domínio para o servidor

# Exemplo Nginx:
# server {
#   listen 80;
#   server_name seu-dominio.com;
#   root /var/www/seu-app/dist;
#   index index.html;
#   
#   location / {
#     try_files $uri $uri/ /index.html;
#   }
# }
```

## 🔧 Troubleshooting

### "Cannot find module '@/...'"

- Certifique-se de que o import está correto
- Restart VS Code Language Server: `Cmd+Shift+P → TypeScript: Restart TS Server`

### Erro: "VITE_SUPABASE_URL is not defined"

```bash
# Certifique-se de que:
# 1. Arquivo .env.local existe
# 2. Variáveis estão corretas
# 3. Reinicie o servidor de desenvolvimento (npm run dev)
```

### "Supabase connection refused"

- Verifique se a URL do Supabase está correta
- Verifique conexão de internet
- Verifique se o projeto Supabase está ativo

### Build falha com "TypeScript errors"

```bash
# Verifique erros de TypeScript
npm run lint

# Corrija erros de lint
npm run lint:fix
```

### Port 8080 já em uso

```bash
# Localize o processo usando a porta
lsof -i :8080

# Ou inicie em outra porta
npm run dev -- --port 3000
```

### Performance lenta em desenvolvimento

```bash
# Limpe cache
rm -rf node_modules/.vite

# Reinstale dependencies
npm install

# Ou use --force flag
npm run dev -- --force
```

## 📊 Monitoramento e Logs

A aplicação inclui sistema de logging automático:

```tsx
import { logger } from "@/lib/logger";

// Logging
logger.info("Evento", { data: "valor" });
logger.warn("Aviso", { detalhe: "valor" });
logger.error("Erro", new Error("mensagem"), { contexto: "valor" });

// Eventos personalizados
logger.event("user_login", { userId: "123" });
```

Logs são enviados em batch para `/api/logs` em produção.

## 🎨 Customização de Tema

O projeto usa Tailwind CSS com variáveis CSS. Para customizar:

```tsx
// src/index.css
:root {
  --primary: 212 100% 50%;      /* Mude para sua cor */
  --secondary: 217 33% 17%;
  --destaque: 147 51% 34%;
}
```

## 🔐 Segurança

- ✅ Variáveis sensíveis em `.env.local` (não commitadas)
- ✅ TypeScript strict mode para type safety
- ✅ Validação de inputs
- ✅ Error Boundary para tratamento de erros
- ✅ HTTPS em produção (enforçado automaticamente em Vercel/Netlify)
- ✅ CSP headers configurados

## 📈 Performance

A aplicação está otimizada para:

- ✅ Code splitting automático com Vite
- ✅ Lazy loading de páginas
- ✅ Caching de queries com React Query
- ✅ Imagens otimizadas (Vite)
- ✅ Bundle pequeno (~150KB gzipped)

## 🤝 Contribuição

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feature/MelhoriaX`
3. Commit suas mudanças: `git commit -m "Add feature X"`
4. Push para a branch: `git push origin feature/MelhoriaX`
5. Abra um Pull Request

### Guia de Código

- Use TypeScript com types explícitos
- Siga as convenções em [ESTRUTURA.md](ESTRUTURA.md)
- Adicione testes para novas funcionalidades
- Corra `npm run lint:fix` antes de fazer commit

## 📝 Licença

MIT License - veja arquivo LICENSE

## 🆘 Suporte e Feedback

- 🐛 **Bug Reports**: Abra uma issue no GitHub
- 💡 **Feature Requests**: Discussões no GitHub
- 📧 **Email**: seu-email@example.com

## 📚 Documentação Adicional

- [ESTRUTURA.md](ESTRUTURA.md) - Guia de estrutura de pastas
- [Documentação Supabase](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [Vite](https://vitejs.dev/guide/)

## 🚀 Roadmap

- [ ] Exportar dados (PDF/Excel)
- [ ] Dashboard customizável
- [ ] Funcionalidade offline
- [ ] App mobile (React Native)
- [ ] Integração com APIs bancárias
- [ ] Suporte multi-language

---

**Última atualização**: 16/03/2026

