/**
 * Componentes de Loading
 * Spinners, loaders e indicadores de carregamento
 */

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Spinner circular
 */
export function LoadingSpinner({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <Loader2 className={cn("animate-spin text-primary", sizeMap[size], className)} />
  );
}

/**
 * Loading overlay (cobre a página/componente)
 */
export function LoadingOverlay({
  isLoading,
  message = "Carregando...",
}: {
  isLoading: boolean;
  message?: string;
}) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-8 flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

/**
 * Loading state para containers/seções
 */
export function LoadingState({
  message = "Carregando...",
  fullHeight = false,
}: {
  message?: string;
  fullHeight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-8",
        fullHeight && "min-h-screen"
      )}
    >
      <LoadingSpinner size="md" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}

/**
 * Progress bar indeterminado (tipo loading)
 */
export function ProgressLoading() {
  return (
    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
      <div className="h-full w-1/2 bg-primary animate-pulse" />
    </div>
  );
}

/**
 * Skeleton text (múltiplas linhas)
 */
export function SkeletonText({
  lines = 3,
  highestLine = false,
}: {
  lines?: number;
  highestLine?: boolean;
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => {
        const isLastLine = i === lines - 1;
        const width = isLastLine ? "w-2/3" : highestLine && i === 0 ? "w-1/3" : "w-full";

        return <div key={i} className={`h-4 bg-muted rounded ${width}`} />;
      })}
    </div>
  );
}

/**
 * Loading button (com spinner dentro do botão)
 */
export function LoadingButton({
  isLoading,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading: boolean }) {
  return (
    <button {...props} disabled={isLoading || props.disabled} className={props.className}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          <span>Carregando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * Skeleton avatar (círculo)
 */
export function SkeletonAvatar({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return <div className={cn("bg-muted rounded-full", sizeMap[size])} />;
}

/**
 * Content loader (skeleton para conteúdo principal)
 */
export function ContentLoader({
  lines = 4,
  showAvatar = false,
}: {
  lines?: number;
  showAvatar?: boolean;
}) {
  return (
    <div className="space-y-4">
      {showAvatar && (
        <div className="flex gap-3">
          <SkeletonAvatar size="lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-3 bg-muted rounded w-1/4" />
          </div>
        </div>
      )}
      <SkeletonText lines={lines} highestLine={!showAvatar} />
    </div>
  );
}
