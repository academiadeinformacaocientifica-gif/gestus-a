import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function Vendas() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [clienteNome, setClienteNome] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const { data: vendas = [] } = useQuery({
    queryKey: ["vendas", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("vendas").select("*").order("data", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("vendas").insert({
        user_id: user.id, cliente_nome: clienteNome || null,
        valor_total: parseFloat(valorTotal), descricao: descricao || null, data,
      });
      if (error) throw error;
      await supabase.from("transacoes").insert({
        user_id: user.id, tipo: "ganho", valor: parseFloat(valorTotal),
        categoria: "vendas", descricao: descricao || `Venda${clienteNome ? ` - ${clienteNome}` : ""}`, data,
      });
      toast.success("Venda registada!");
      queryClient.invalidateQueries({ queryKey: ["vendas"] });
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setOpen(false);
      setClienteNome(""); setValorTotal(""); setDescricao("");
      setData(new Date().toISOString().split("T")[0]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalVendas = vendas.reduce((sum, v) => sum + Number(v.valor_total), 0);

  return (
    <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.06 } } }} className="space-y-6">
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Vendas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Registo de vendas</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-2 rounded-lg h-9">
          <Plus className="h-4 w-4" /> Nova Venda
        </Button>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-card rounded-xl border border-border p-4">
        <p className="text-xs font-medium text-muted-foreground">Total</p>
        <p className="text-xl font-semibold tabular-nums text-foreground mt-1">{totalVendas.toFixed(2)}€</p>
        <p className="text-xs text-muted-foreground mt-1">{vendas.length} vendas</p>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border shadow-card">
        {vendas.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">Ainda não há vendas registadas.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {vendas.map((v) => (
              <div key={v.id} className="flex items-center h-16 px-5">
                <div className="h-10 w-10 rounded-xl bg-ganho-bg flex items-center justify-center mr-3 shrink-0">
                  <ShoppingBag className="h-4 w-4 text-ganho" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {v.descricao || "Venda"} {v.cliente_nome && `— ${v.cliente_nome}`}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {format(new Date(v.data), "d MMM yyyy", { locale: pt })}
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-ganho">
                  +{Number(v.valor_total).toFixed(2)}€
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader><SheetTitle>Nova venda</SheetTitle></SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <div className="space-y-1.5">
              <Label htmlFor="valorTotal" className="text-xs font-medium">Valor total (€)</Label>
              <Input id="valorTotal" type="number" step="0.01" min="0.01" value={valorTotal} onChange={(e) => setValorTotal(e.target.value)} placeholder="0.00" required className="text-2xl font-bold tabular-nums h-14 rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="clienteNome" className="text-xs font-medium">Cliente (opcional)</Label>
              <Input id="clienteNome" value={clienteNome} onChange={(e) => setClienteNome(e.target.value)} placeholder="Nome do cliente" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="descricaoVenda" className="text-xs font-medium">Descrição (opcional)</Label>
              <Input id="descricaoVenda" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Produtos ou serviço" className="rounded-xl" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dataVenda" className="text-xs font-medium">Data</Label>
              <Input id="dataVenda" type="date" value={data} onChange={(e) => setData(e.target.value)} required className="rounded-xl" />
            </div>
            <Button type="submit" className="w-full h-11 rounded-xl" disabled={loading}>
              {loading ? "A guardar..." : "Registar Venda"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}

function VendasWithAuth() {
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
      <Vendas />
    </AppLayout>
  );
}

export default VendasWithAuth;
