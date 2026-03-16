import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { TrendingUp, TrendingDown, Package, Zap, ShoppingCart, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  tipo: string;
  valor: number;
  categoria: string;
  descricao: string | null;
  data: string;
}

const categoryIcons: Record<string, any> = {
  vendas: ShoppingCart,
  fixos: Zap,
  variaveis: Package,
  insumos: Wrench,
};

const categoryLabels: Record<string, string> = {
  vendas: "Vendas",
  fixos: "Custos Fixos",
  variaveis: "Custos Variáveis",
  insumos: "Insumos",
};

interface TransactionListProps {
  transactions: Transaction[];
  compact?: boolean;
}

export function TransactionList({ transactions, compact = false }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground text-sm">Ainda não há movimentos.</p>
        <p className="text-xs text-muted-foreground mt-1">O seu primeiro ganho começa aqui.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-0.5", compact && "space-y-0")}>
      {transactions.map((t) => {
        const Icon = categoryIcons[t.categoria] || (t.tipo === "ganho" ? TrendingUp : TrendingDown);
        const isGanho = t.tipo === "ganho";

        return (
          <div
            key={t.id}
            className={cn(
              "flex items-center px-3 rounded-xl hover:bg-muted/50 transition-colors",
              compact ? "h-14" : "h-16 px-4"
            )}
          >
            <div className={cn(
              "rounded-xl flex items-center justify-center mr-3 shrink-0",
              compact ? "h-8 w-8" : "h-10 w-10",
              isGanho ? "bg-ganho-bg" : "bg-despesa-bg"
            )}>
              <Icon className={cn(
                isGanho ? "text-ganho" : "text-despesa",
                compact ? "h-3.5 w-3.5" : "h-4 w-4"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium text-foreground truncate",
                compact ? "text-xs" : "text-sm"
              )}>
                {t.descricao || categoryLabels[t.categoria] || t.categoria}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {format(new Date(t.data), "d MMM yyyy", { locale: pt })}
              </p>
            </div>
            <span className={cn(
              "font-semibold tabular-nums",
              compact ? "text-xs" : "text-sm",
              isGanho ? "text-ganho" : "text-despesa"
            )}>
              {isGanho ? "+" : "-"}{Number(t.valor).toFixed(2)}€
            </span>
          </div>
        );
      })}
    </div>
  );
}
