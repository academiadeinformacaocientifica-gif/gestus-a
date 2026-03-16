# ⚡ Guia de Performance

Otimizações e boas práticas para manter a aplicação rápida.

## 📊 Métricas de Performance

### Web Vitals (Google)

- **LCP (Largest Contentful Paint)**: < 2.5s ✅
- **FID (First Input Delay)**: < 100ms ✅
- **CLS (Cumulative Layout Shift)**: < 0.1 ✅

Monitorar em: [PageSpeed Insights](https://pagespeed.web.dev/)

## 🎯 Code Splitting

### Lazy Loading de Páginas

```tsx
// ✅ BOM: Páginas carregadas sob demanda
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Financeiro = lazy(() => import("@/pages/FinanceiroPage"));

// ❌ EVITAR: Importar tudo no App.tsx
import Dashboard from "@/pages/Dashboard";
```

## 🖼️ Imagens Otimizadas

### Usar Formatos Modernos

```tsx
// ✅ BOM: WebP com fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Descrição" />
</picture>

// ✅ BOM: Lazy loading
<img src="image.jpg" loading="lazy" alt="Descrição" />

// ❌ EVITAR: Imagens grandes sem lazy load
<img src="image.jpg" alt="Descrição" />  // Carrega logo
```

### Tamanhos de Imagem

```bash
# Comprimir imagens
npm install -g imagemin-cli
imagemin src/assets/images --out-dir=src/assets/images

# Ou usar ferramentas online
# https://imagemin.online/
# https://tinypng.com/
```

## 🔄 React Query Optimization

### Cache Inteligente

```tsx
// ✅ BOM: Configurar staleTime
const { data } = useQuery({
  queryKey: ["transactions", userId],
  queryFn: () => fetchTransactions(userId),
  staleTime: 5 * 60 * 1000,  // 5 minutos
  cacheTime: 10 * 60 * 1000, // 10 minutos
});

// ❌ EVITAR: Refetch constante
const { data } = useQuery({
  queryKey: ["transactions"],
  queryFn: fetchTransactions,
  // staleTime e cacheTime no mínimo
});
```

### Deduplicação

```tsx
// React Query automaticamente deduplica queries
// Múltiplos componentes pedindo "transactions"
// Apenas 1 request é feito ✅

useQuery({
  queryKey: ["transactions"],
  queryFn: fetchTransactions,
});
```

## 🧠 Memoization

### Quando Usar useMemo

```tsx
// ✅ BOM: Cálculos pesados
const totalGastos = useMemo(() => {
  return transacoes
    .filter(t => t.tipo === "despesa")
    .reduce((sum, t) => sum + t.valor, 0);
}, [transacoes]);

// ❌ EVITAR: useMemo em tudo
const name = useMemo(() => "João", []); // Desnecessário
```

### Componentes Memoizados

```tsx
// ✅ BOM: Componentes que renderizam frequentemente
export const MetricCard = memo(function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return <div>{label}: {value}</div>;
});

// ❌ EVITAR: Memoizar componentes simples
const Badge = memo(function Badge({ text }) {
  return <span>{text}</span>;
});
```

## ⚡ Callback Otimizados

```tsx
// ✅ BOM: Usar useCallback para funções passadas como props
const handleClick = useCallback(() => {
  handleSubmit(data);
}, [data, handleSubmit]);

// ❌ EVITAR: Função inline em cada render
function Parent() {
  return <Child onClick={() => handleClick()} />;
}
```

## 🔍 Virtualization

Para listas muito longas:

```tsx
import { FixedSizeList } from "react-window";

// ✅ BOM: Renderizar apenas itens visíveis
<FixedSizeList
  height={600}
  itemCount={1000}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      Item {index}
    </div>
  )}
</FixedSizeList>

// ❌ EVITAR: Renderizar 1000 itens no DOM
{transacoes.map(t => <TransactionItem key={t.id} {...t} />)}
```

## 📦 Bundle Size

### Verificar Tamanho

```bash
# Verificar tamanho do bundle
npm run build

# Análise detalhada
npm install -g vite-plugin-visualizer
# Configurar no vite.config.ts
```

### Reduzir Tamanho

```tsx
// ✅ BOM: Importar apenas o que precisa
import { format } from "date-fns";  // ≈ 13KB
import { formatISO } from "date-fns";

// ❌ EVITAR: Importar toda a biblioteca
import * as dateFns from "date-fns";  // Maior bundl
```

## 🌐 Network Performance

### Compressão

```bash
# Vercel/Netlify comprimem automaticamente
# Mas verificar headers (Gzip, Brotli)
```

### Prefetching

```tsx
// ✅ BOM: Prefetch rotas críticas
import { prefetchLinks } from "@/lib/performance";

// Em componente principal
useEffect(() => {
  prefetchLinks(["/financeiro", "/vendas"]);
}, []);
```

### API Requests

```tsx
// ✅ BOM: Batch múltiplas requests
Promise.all([
  fetchTransactions(),
  fetchVendas(),
  fetchProfile(),
]);

// ✅ BOM: Cancelar requests não usadas
const { isLoading, cancel } = useQuery({
  // ...
});

useEffect(() => {
  return () => cancel();  // Cleanup
}, [cancel]);
```

## 🎨 CSS Optimization

### Usar CSS Modules/Tailwind

```tsx
// ✅ BOM: Tailwind purga classes não usadas
<div className="p-4 rounded-lg bg-card">

// ❌ EVITAR: CSS inline grande
<style>{`
  .container { ... }
  .item { ... }
`}</style>
```

### Animações Performáticas

```tsx
// ✅ BOM: Usar transform/opacity (GPU accelerated)
className="transition-opacity duration-300 opacity-0 md:opacity-100"

// ❌ EVITAR: Animar width/height (CPU intensive)
<style>{`
  @keyframes expand {
    from { width: 0; }
    to { width: 100%; }
  }
`}</style>
```

## 📱 Mobile Performance

### Viewport Meta Tag

```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1.0" />
```

### Media Queries

```tsx
// ✅ BOM: Diferentes assets para mobile
<picture>
  <source media="(max-width: 640px)" srcSet="image-sm.webp" />
  <source media="(min-width: 641px)" srcSet="image-lg.webp" />
  <img src="image.jpg" alt="" />
</picture>
```

## 🔧 Monitoring de Performance

### Usar DevTools

```JavaScript
// Chrome DevTools > Performance
// 1. Abrir DevTools
// 2. Ir para aba "Performance"
// 3. Clicar em "Record"
// 4. Interagir com app
// 5. Visualizar gráfico

// Procurar por:
// - Long tasks (> 50ms)
// - Layout thrashing
// - Unnecessary renders
```

### Lighthouse

```bash
# No Chrome DevTools
# 1. Abrir DevTools
# 2. Ir para "Lighthouse"
# 3. Selecionar "Desktop" ou "Mobile"
# 4. Clicar "Analyze page load"

# Scores:
# > 90: Excelente ✅
# 50-90: Pode melhorar ⚠️
# < 50: Crítico ❌
```

## ✅ Checklist de Performance

- [ ] Lazy loading de páginas implementado
- [ ] Imagens otimizadas (WebP, lazy loading)
- [ ] React Query com staleTime configurado
- [ ] useMemo/useCallback onde necessário
- [ ] Componentes memoizados quando apropriado
- [ ] Lista virtualizadas se > 100 itens
- [ ] Bundle size < 200KB (gzipped)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] Sem console.logs em produção

## 📚 Recursos

- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/features.html)

---

**Performance é um recurso! Meça, otimize, repita.** ⚡
