import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, TrendingUp, TrendingDown, PieChart, BarChart3, Calendar, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval } from "date-fns";
import { pt } from "date-fns/locale";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

type ReportPeriod = "this_month" | "last_month" | "last_3_months" | "this_year" | "all_time";

function Relatorios() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<ReportPeriod>("this_month");

  const getDateRange = (period: ReportPeriod) => {
    const now = new Date();
    switch (period) {
      case "this_month":
        return { start: startOfMonth(now), end: now };
      case "last_month":
        return { start: startOfMonth(subMonths(now, 1)), end: endOfMonth(subMonths(now, 1)) };
      case "last_3_months":
        return { start: startOfMonth(subMonths(now, 2)), end: now };
      case "this_year":
        return { start: new Date(now.getFullYear(), 0, 1), end: now };
      case "all_time":
        return { start: new Date(2020, 0, 1), end: now };
      default:
        return { start: startOfMonth(now), end: now };
    }
  };

  const { start, end } = getDateRange(period);

  const { data: transactions = [] } = useQuery({
    queryKey: ["transacoes", user?.id, period],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .gte("data", format(start, "yyyy-MM-dd"))
        .lte("data", format(end, "yyyy-MM-dd"))
        .order("data", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: allTransactions = [] } = useQuery({
    queryKey: ["transacoes", user?.id, "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .order("data", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const totalGanhos = transactions
    .filter((t) => t.tipo === "ganho")
    .reduce((sum, t) => sum + Number(t.valor), 0);

  const totalDespesas = transactions
    .filter((t) => t.tipo === "despesa")
    .reduce((sum, t) => sum + Number(t.valor), 0);

  const lucro = totalGanhos - totalDespesas;
  const margemLucro = totalGanhos > 0 ? ((lucro / totalGanhos) * 100).toFixed(1) : "0";

  const gastosPorCategoria = transactions
    .filter((t) => t.tipo === "despesa")
    .reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + Number(t.valor);
      return acc;
    }, {} as Record<string, number>);

  const topCategorias = Object.entries(gastosPorCategoria)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const ganhosPorCategoria = transactions
    .filter((t) => t.tipo === "ganho")
    .reduce((acc, t) => {
      acc[t.categoria] = (acc[t.categoria] || 0) + Number(t.valor);
      return acc;
    }, {} as Record<string, number>);

  const meses = eachMonthOfInterval({
    start: startOfMonth(subMonths(new Date(), 5)),
    end: new Date(),
  });

  const monthlyData = meses.map((mes) => {
    const mesTransacoes = allTransactions.filter((t) => {
      const data = new Date(t.data);
      return data >= startOfMonth(mes) && data <= endOfMonth(mes);
    });
    return {
      mes: format(mes, "MMM", { locale: pt }),
      ganhos: mesTransacoes.filter((t) => t.tipo === "ganho").reduce((sum, t) => sum + Number(t.valor), 0),
      despesas: mesTransacoes.filter((t) => t.tipo === "despesa").reduce((sum, t) => sum + Number(t.valor), 0),
    };
  });

  const maxValue = Math.max(...monthlyData.flatMap((m) => [m.ganhos, m.despesas]), 1);

  return (
    <motion.div 
      initial="hidden" 
      animate="show" 
      variants={{ show: { transition: { staggerChildren: 0.06 } } }} 
      className="space-y-6"
    >
      <motion.div variants={fadeUp}>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 mb-4 pl-0 hover:pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Relatórios
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Análise financeira detalhada
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Select value={period} onValueChange={(v) => setPeriod(v as ReportPeriod)}>
          <SelectTrigger className="w-[180px] rounded-lg h-9">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this_month">Este mês</SelectItem>
            <SelectItem value="last_month">Mês passado</SelectItem>
            <SelectItem value="last_3_months">Últimos 3 meses</SelectItem>
            <SelectItem value="this_year">Este ano</SelectItem>
            <SelectItem value="all_time">Todo o tempo</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-3 w-3 text-ganho" />
              Total Ganhos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-ganho">+{totalGanhos.toFixed(2)}Kz</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <TrendingDown className="h-3 w-3 text-despesa" />
              Total Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-despesa">-{totalDespesas.toFixed(2)}Kz</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-3 w-3 text-destaque" />
              Lucro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold tabular-nums ${lucro >= 0 ? "text-ganho" : "text-despesa"}`}>
              {lucro >= 0 ? "+" : ""}{lucro.toFixed(2)}Kz
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <PieChart className="h-3 w-3 text-info" />
              Margem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold tabular-nums ${Number(margemLucro) >= 0 ? "text-foreground" : "text-despesa"}`}>
              {margemLucro}%
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Tabs defaultValue="categorias" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="categorias">Por Categoria</TabsTrigger>
            <TabsTrigger value="mensal">Evolução Mensal</TabsTrigger>
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
          </TabsList>

          <TabsContent value="categorias" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Ganhos por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(ganhosPorCategoria).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Sem dados</p>
                  ) : (
                    Object.entries(ganhosPorCategoria)
                      .sort((a, b) => b[1] - a[1])
                      .map(([cat, valor]) => (
                        <div key={cat} className="flex items-center justify-between">
                          <span className="text-sm text-foreground">{cat}</span>
                          <span className="text-sm font-medium text-ganho">+{valor.toFixed(2)}Kz</span>
                        </div>
                      ))
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Despesas por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topCategorias.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Sem dados</p>
                  ) : (
                    topCategorias.map(([cat, valor]) => (
                      <div key={cat} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{cat}</span>
                        <span className="text-sm font-medium text-despesa">-{valor.toFixed(2)}Kz</span>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mensal">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Evolução Financeira (Últimos 6 meses)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((mes, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground capitalize">{mes.mes}</span>
                        <span className="text-muted-foreground">
                          +{mes.ganhos.toFixed(0)}Kz / -{mes.despesas.toFixed(0)}Kz
                        </span>
                      </div>
                      <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                        <div 
                          className="bg-ganho" 
                          style={{ width: `${(mes.ganhos / maxValue) * 100}%` }}
                        />
                        <div 
                          className="bg-despesa" 
                          style={{ width: `${(mes.despesas / maxValue) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-ganho" />
                    <span className="text-muted-foreground">Ganhos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-despesa" />
                    <span className="text-muted-foreground">Despesas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resumo">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Resumo do Período</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Total de Transações</span>
                  <span className="text-sm font-medium text-foreground">{transactions.length}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Ganhos</span>
                  <span className="text-sm font-medium text-ganho">+{totalGanhos.toFixed(2)}Kz</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Despesas</span>
                  <span className="text-sm font-medium text-despesa">-{totalDespesas.toFixed(2)}Kz</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Lucro Líquido</span>
                  <span className={`text-sm font-medium ${lucro >= 0 ? "text-ganho" : "text-despesa"}`}>
                    {lucro >= 0 ? "+" : ""}{lucro.toFixed(2)}Kz
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">Margem de Lucro</span>
                  <span className={`text-sm font-medium ${Number(margemLucro) >= 0 ? "text-foreground" : "text-despesa"}`}>
                    {margemLucro}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

function RelatoriosWithAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">A carregar...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AppLayout>
      <Relatorios />
    </AppLayout>
  );
}

export default RelatoriosWithAuth;
