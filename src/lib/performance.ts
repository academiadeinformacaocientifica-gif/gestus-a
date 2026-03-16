/**
 * Configuração de Performance e Code Splitting
 * Lazy loading de páginas e componentes
 */

import { lazy, Suspense } from "react";
import { LoadingState } from "@/components/common/Loading";

// ============ LAZY LOADED PAGES ============

// Fazer lazy loading das páginas para reduzir bundle inicial
export const DashboardPage = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.default }))
);

export const FinanceiroPage = lazy(() =>
  import("@/pages/FinanceiroPage").then((m) => ({ default: m.default }))
);

export const VendasPage = lazy(() =>
  import("@/pages/VendasPage").then((m) => ({ default: m.default }))
);

export const AuthPage = lazy(() =>
  import("@/pages/Auth").then((m) => ({ default: m.default }))
);

export const NotFoundPage = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.default }))
);

// ============ LAZY LOADED COMPONENTS ============

export const QuickAddFAB = lazy(() =>
  import("@/components/QuickAddFAB").then((m) => ({ default: m.QuickAddFAB }))
);

export const TransactionSheet = lazy(() =>
  import("@/components/TransactionSheet").then((m) => ({ default: m.TransactionSheet }))
);

export const DashboardChart = lazy(() =>
  import("@/components/DashboardChart").then((m) => ({ default: m.DashboardChart }))
);

// ============ SUSPENSE WRAPPER ============

/**
 * Wrapper para componentes lazy loaded
 * @param children - Componentes lazy
 * @param fallback - Fallback enquanto carrega (opcional)
 */
export function LazyComponent({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense fallback={fallback || <LoadingState message="Carregando..." />}>
      {children}
    </Suspense>
  );
}

// ============ PERFORMANCE HINTS ============

/**
 * Prefetch um link (para melhorar UX)
 */
export function prefetchLink(href: string): void {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Prefetch múltiplos links
 */
export function prefetchLinks(hrefs: string[]): void {
  hrefs.forEach(prefetchLink);
}

/**
 * Preload de componentes (para routes críticas)
 */
export function preloadComponent(
  importFn: () => Promise<{ default: React.ComponentType<any> }>
): void {
  importFn().catch((err) => console.error("Erro ao preload componente:", err));
}

// ============ WEB VITALS MONITORING ============

/**
 * Monitorar Web Vitals (LCP, FID, CLS)
 * Para enviar para analytics/monitoring
 */
export function monitorWebVitals(
  callback: (metric: {
    name: string;
    value: number;
    rating: string;
  }) => void
): void {
  if ("web-vital" in window && typeof (window as any)["web-vital"] === "function") {
    (window as any)["web-vital"](callback);
  }
}

// ============ IMAGE OPTIMIZATION ============

/**
 * Gerar srcSet otimizado para imagem responsiva
 */
export function generateImageSrcSet(
  imagePath: string,
  sizes: number[] = [320, 640, 960, 1280]
): string {
  return sizes
    .map((size) => `${imagePath}?w=${size}&q=80 ${size}w`)
    .join(", ");
}

/**
 * Componente de imagem otimizada
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      className="w-full h-auto"
    />
  );
}

// ============ SCRIPT DEFERRING ============

/**
 * Carregar script de forma otimizada
 */
export function loadScript(
  src: string,
  options?: {
    async?: boolean;
    defer?: boolean;
    module?: boolean;
  }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;

    if (options?.async) script.async = true;
    if (options?.defer) script.defer = true;
    if (options?.module) script.type = "module";

    script.onload = () => resolve();
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

// ============ DEBOUNCE & THROTTLE ============

/**
 * Debounce função (espera X ms antes de executar)
 * Útil para search, resize, etc
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle função (executa no máximo 1x a cada X ms)
 * Útil para scroll, resize, etc
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ============ MEMORY OPTIMIZATION ============

/**
 * Limpar cache de images da browser
 * Útil quando troca de utilizador
 */
export function clearImageCache(): void {
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }
}

/**
 * Limpar localStorage de dados desnecessários
 */
export function clearLocalStorageCache(keys: string[]): void {
  keys.forEach((key) => localStorage.removeItem(key));
}
