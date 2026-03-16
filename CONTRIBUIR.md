# 💻 Guia de Contribuição

Obrigado por querer contribuir para o Gestus AO! Este guia ajudará você a começar.

## 📋 Antes de Começar

- Leia o [README.md](README.md) para entender o projeto
- Leia [ESTRUTURA.md](ESTRUTURA.md) para conhecer a organização do código
- Leia [SEGURANCA.md](SEGURANCA.md) para entender segurança

## 🔄 Workflow de Contribuição

### 1. Fork e Clone

```bash
# Fork no GitHub (clique em Fork)

# Clone seu fork
git clone https://github.com/SEU-USUARIO/gestus-ao.git
cd gestus-ao

# Adicionar repositório original como remote
git remote add upstream https://github.com/ORIGINAL/gestus-ao.git
```

### 2. Criar Branch

```bash
# Atualize main
git fetch upstream
git checkout main
git merge upstream/main

# Criar nova branch
git checkout -b feature/sua-feature
# ou para bugfix
git checkout -b bugfix/seu-bug
```

**Convenção de naming:**
- `feature/nome-da-feature` - Nova funcionalidade
- `bugfix/nome-do-bug` - Correção de bug
- `refactor/nome-do-refactor` - Refatoração
- `docs/nome-da-doc` - Documentação

### 3. Fazer as Mudanças

```bash
# Instale dependências
npm install

# Inicie desenvolvimento
npm run dev

# Faça suas mudanças e teste localmente
```

### 4. Verificar Qualidade

```bash
# Verifique linting
npm run lint

# Corrija erros automaticamente
npm run lint:fix

# Execute testes
npm run test

# Verifique erros TypeScript
npm run lint
```

### 5. Commit

```bash
# Stage suas mudanças
git add .

# Commit com mensagem clara
git commit -m "feat: adicionar nova funcionalidade X"

# ou
git commit -m "fix: corrigir bug em componente Y"
```

**Convenção de commits (Conventional Commits):**
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração sem funcionalidade nova
- `test:` - Testes
- `chore:` - Tarefas diversas

### 6. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/sua-feature

# Vá para GitHub e clique em "New Pull Request"
```

## 📝 Linhas de Código

Antes de escrever código, pergunte-se:

- Isto segue as convenções em [ESTRUTURA.md](ESTRUTURA.md)?
- Isto tem tipos TypeScript claros?
- Isto precisa de um teste?
- Isto está bem documentado?

### Exemplo de Código Bom

```tsx
/**
 * Componente para exibir métrica no dashboard
 * @param label - Rótulo da métrica
 * @param value - Valor a exibir
 * @param icon - Ícone opcional
 */
export function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-4 border rounded-lg">
      {icon && <div className="mb-2">{icon}</div>}
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
```

## 🧪 Testes

### Escrever Testes

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricCard } from "@/components/MetricCard";

describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Total" value={1000} />);
    
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText(1000)).toBeInTheDocument();
  });
});
```

### Executar Testes

```bash
# Rodar todos os testes
npm run test

# Modo watch (ideal durante desenvolvimento)
npm run test:watch

# Com cobertura
npm run test -- --coverage
```

## 📚 Documentação

### Documentar Código

```tsx
/**
 * Formata um valor em euros
 * @param valor - Valor a formatar
 * @returns String formatada: "1.234,56 €"
 * @example
 * formatarMoeda(1234.56) // "1.234,56 €"
 */
export function formatarMoeda(valor: number): string {
  // ...
}
```

### Documentar Features

Se adicionar uma funcionalidade maior, atualize:
- `README.md` - Adicione à seção "Funcionalidades"
- `ESTRUTURA.md` - Se criar nova estrutura
- Comentários no código

## 🐛 Reportar Bugs

1. Procure por issue existente (não duplique)
2. Abra uma nova issue com:
   - Título claro
   - Descrição do problema
   - Passos para reproduzir
   - Comportamento esperado
   - Screenshots se relevante

Exemplo:
```
Título: Login falha com email contendo +

Descrição:
Quando uso um email com "+" (ex: user+tag@gmail.com), o login falha.

Passos:
1. Vá para página de login
2. Digite: test+tag@gmail.com
3. Digite senha
4. Clique em Login

Esperado: Login bem-sucedido
Real: Erro "Email inválido"
```

## 💡 Sugestões de Feature

1. Procure se existe discussão aberta
2. Abra uma discussão (não issue) com:
   - Título da feature
   - Caso de uso
   - Benefícios
   - Possível implementação

## ✅ Checklist Antes de Fazer PR

- [ ] Code segue as convenções do projeto
- [ ] TypeScript strict mode (sem `any`)
- [ ] Componentes têm JSDoc comments
- [ ] Testes escritos e passando
- [ ] `npm run lint:fix` executado
- [ ] Sem consoles.log em código final
- [ ] Mensagens de commit são claras
- [ ] Branch atualizada com upstream/main

## 🚀 Depois do PR

1. **Code Review**: Alguém do time revisará
2. **Feedback**: Podem pedir mudanças
3. **Merge**: Após aprovação, seu PR é merged
4. **Cleanup**: Delete sua branch local e remota

```bash
# Delete branch local
git branch -d feature/sua-feature

# Delete branch remoto
git push origin --delete feature/sua-feature
```

## 🎓 Dicas

### Estrutura de Commits

Bons commits têm pequenos pedaços lógicos:

```bash
# ✅ BOM: Commits pequenos e focados
git commit -m "feat: adicionar componente MetricCard"
git commit -m "test: escrever testes para MetricCard"
git commit -m "docs: documentar MetricCard no README"

# ❌ MAU: Grande commit com tudo junto
git commit -m "adicionar feature X"  # Inclui componente, teste, docs
```

### Rebase vs Merge

Para manter histórico limpo, usar rebase:

```bash
# Antes de fazer PR, rebase na main
git fetch upstream
git rebase upstream/main

# Se houver conflitos, resolva e continue
git add .
git rebase --continue
```

### Debugging

```tsx
// Para debugar em desenvolvimento
import { logger } from "@/lib/logger";

logger.debug("Estado atual:", { dados });
logger.info("Evento importante");
logger.error("Erro capturado", error);
```

## 🤔 Perguntas Frequentes

**P: Onde coloco meu componente novo?**
R: Veja [ESTRUTURA.md](ESTRUTURA.md). Geralmente em `/components/common/` se reutilizável.

**P: Preciso de testes para tudo?**
R: Não tudo, mas testes são esperados para:
- Hooks customizados
- Funções de utilidade
- Lógica crítica

**P: Posso usar `any` em TypeScript?**
R: Tente evitar. Se necessário, use TypeScript strict mode e considere `unknown`.

**P: Como reportar segurança?**
R: Não abra issue pública. Envie email para seu-email@example.com com detalhes.

## 📞 Suporte

Dúvidas? Abra uma discussão no GitHub ou envie email.

---

**Obrigado por contribuir! 🎉**
