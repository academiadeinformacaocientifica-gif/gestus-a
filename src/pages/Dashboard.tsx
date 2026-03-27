import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { MetricCard } from "@/components/MetricCard";
import { TransactionList } from "@/components/TransactionList";
import { DashboardChart } from "@/components/DashboardChart";
import { QuickAddFAB } from "@/components/QuickAddFAB";
import { TrendingUp, TrendingDown, Sparkles, DollarSign, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { subDays, format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = useProfile();

  const thirtyDaysAgo = format(subDays(new Date(), 30), "yyyy-MM-dd");

  const { data: transactions = [], isLoading: transactionsLoading, error: transactionsError } = useQuery({
    queryKey: ["dashboard", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .gte("data", thirtyDaysAgo)
        .order("data", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: vendas = [], isLoading: vendasLoading, error: vendasError } = useQuery({
    queryKey: ["vendas-count", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vendas")
        .select("*")
        .gte("data", thirtyDaysAgo);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const faturamento = transactions
    .filter((t) => t.tipo === "ganho")
    .reduce((sum, t) => sum + Number(t.valor), 0);
  const despesas = transactions
    .filter((t) => t.tipo === "despesa")
    .reduce((sum, t) => sum + Number(t.valor), 0);
  const lucro = faturamento - despesas;

  const nome = profile?.nome || "Empreendedor";
  const negocio = profile?.nome_negocio;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Bom dia, {nome}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {negocio ? `Resumo financeiro de ${negocio}` : "Resumo dos últimos 30 dias"}
        </p>
      </motion.div>

      {/* Error Alert */}
      {(transactionsError || vendasError) && (
        <motion.div variants={fadeUp}>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Loading State */}
      {(transactionsLoading || vendasLoading) && (
        <motion.div variants={fadeUp}>
          <div className="text-center py-8 text-muted-foreground">
            A carregar dados...
          </div>
        </motion.div>
      )}

      {/* Metric Cards - inspired by reference: colorful tinted backgrounds */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Faturamento total"
          value={`${faturamento.toFixed(2)}Kz`}
          subtitle="últimos 30 dias"
          icon={<TrendingUp className="h-5 w-5" />}
          variant="ganho"
        />
        <MetricCard
          label="Despesas totais"
          value={`${despesas.toFixed(2)}Kz`}
          subtitle="últimos 30 dias"
          icon={<TrendingDown className="h-5 w-5" />}
          variant="despesa"
        />
        <MetricCard
          label="Vendas do período"
          value={vendas.length > 0 ? `${vendas.reduce((s, v) => s + Number(v.valor_total), 0).toFixed(2)}Kz` : "--"}
          subtitle={`${vendas.length} vendas`}
          icon={<DollarSign className="h-5 w-5" />}
          variant="info"
        />
        <MetricCard
          label="Lucro líquido"
          value={faturamento > 0 || despesas > 0 ? `${lucro.toFixed(2)}Kz` : "--"}
          subtitle="últimos 30 dias"
          icon={<Sparkles className="h-5 w-5" />}
          variant="destaque"
        />
      </motion.div>

      {/* Chart + Recent Transactions side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div variants={fadeUp} className="lg:col-span-3">
          <DashboardChart transactions={transactions} />
        </motion.div>

        <motion.div variants={fadeUp} className="lg:col-span-2">
          <div className="bg-card rounded-2xl border border-border p-5 shadow-card h-full">
            <h3 className="text-sm font-semibold text-foreground mb-4">Últimas transações</h3>
            <TransactionList transactions={transactions.slice(0, 5)} compact />
          </div>
        </motion.div>
      </div>

      <QuickAddFAB />
    </motion.div>
  );
}
