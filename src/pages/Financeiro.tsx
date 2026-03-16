import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TransactionList } from "@/components/TransactionList";
import { QuickAddFAB } from "@/components/QuickAddFAB";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

export default function Financeiro() {
  const { user } = useAuth();
  const [tipoFilter, setTipoFilter] = useState<string>("todos");
  const [categoriaFilter, setCategoriaFilter] = useState<string>("todas");

  const { data: transactions = [] } = useQuery({
    queryKey: ["transacoes", user?.id, tipoFilter, categoriaFilter],
    queryFn: async () => {
      let query = supabase.from("transacoes").select("*").order("data", { ascending: false });
      if (tipoFilter !== "todos") query = query.eq("tipo", tipoFilter);
      if (categoriaFilter !== "todas") query = query.eq("categoria", categoriaFilter);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const totalGanhos = transactions.filter((t) => t.tipo === "ganho").reduce((sum, t) => sum + Number(t.valor), 0);
  const totalDespesas = transactions.filter((t) => t.tipo === "despesa").reduce((sum, t) => sum + Number(t.valor), 0);
  const lucro = totalGanhos - totalDespesas;

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }} className="space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Financeiro</h1>
        <p className="text-muted-foreground mt-0.5">Gestão completa do seu fluxo de caixa.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <Select value={tipoFilter} onValueChange={setTipoFilter}>
          <SelectTrigger className="w-[140px] rounded-xl bg-card"><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ganho">Ganhos</SelectItem>
            <SelectItem value="despesa">Despesas</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
          <SelectTrigger className="w-[160px] rounded-xl bg-card"><SelectValue placeholder="Categoria" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="vendas">Vendas</SelectItem>
            <SelectItem value="fixos">Custos Fixos</SelectItem>
            <SelectItem value="variaveis">Custos Variáveis</SelectItem>
            <SelectItem value="insumos">Insumos</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-ganho-bg rounded-2xl border border-ganho/10 p-5">
          <p className="text-xs font-medium text-muted-foreground">Total Ganhos</p>
          <p className="text-xl font-bold tabular-nums text-foreground mt-1">+{totalGanhos.toFixed(2)}€</p>
        </div>
        <div className="bg-despesa-bg rounded-2xl border border-despesa/10 p-5">
          <p className="text-xs font-medium text-muted-foreground">Total Despesas</p>
          <p className="text-xl font-bold tabular-nums text-foreground mt-1">-{totalDespesas.toFixed(2)}€</p>
        </div>
        <div className="bg-destaque-bg rounded-2xl border border-destaque/10 p-5">
          <p className="text-xs font-medium text-muted-foreground">Lucratividade</p>
          <p className="text-xl font-bold tabular-nums text-foreground mt-1">{lucro.toFixed(2)}€</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border p-5 shadow-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">Transações</h3>
        <TransactionList transactions={transactions} />
      </motion.div>

      <QuickAddFAB />
    </motion.div>
  );
}
