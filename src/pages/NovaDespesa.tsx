import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Receipt, Calculator, Calendar, FileText } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CATEGORIAS_DESPESA = [
  { value: "Reposição Stock", label: "Reposição Stock" },
  { value: "Renda/Aluguel", label: "Renda / Aluguel" },
  { value: "Utilitários", label: "Utilitários" },
  { value: "Salários", label: "Salários" },
  { value: "Marketing", label: "Marketing" },
  { value: "Manutenção", label: "Manutenção" },
  { value: "Transporte", label: "Transporte" },
  { value: "Impostos", label: "Impostos" },
  { value: "Seguros", label: "Seguros" },
  { value: "Material Escritório", label: "Material Escritório" },
  { value: "Serviços", label: "Serviços" },
  { value: "Outras", label: "Outras" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function NovaDespesa() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [notas, setNotas] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (!valor || parseFloat(valor) <= 0) {
      toast.error("Por favor, insira um valor válido.");
      return;
    }
    if (!categoria) {
      toast.error("Por favor, selecione uma categoria.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("transacoes").insert({
        user_id: user.id,
        tipo: "despesa",
        valor: parseFloat(valor),
        categoria,
        descricao: descricao || null,
        data,
        notas: notas || null,
      });

      if (error) throw error;

      toast.success("Despesa registada com sucesso!");
      
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["financeiro"] });
      
      navigate("/financeiro");
    } catch (error: any) {
      toast.error(error.message || "Erro ao registar despesa.");
    } finally {
      setLoading(false);
    }
  };

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
              Nova Despesa
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Registe uma nova despesa
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border shadow-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="valor" className="text-xs font-medium flex items-center gap-2">
                <Calculator className="h-3 w-3" />
                Valor (Kz)
              </Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                min="0.01"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0.00"
                required
                className="text-2xl font-bold tabular-nums h-14 rounded-xl border-2 focus:border-despesa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria" className="text-xs font-medium flex items-center gap-2">
                <Receipt className="h-3 w-3" />
                Categoria
              </Label>
              <Select value={categoria} onValueChange={setCategoria} required>
                <SelectTrigger className="h-14 rounded-xl">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS_DESPESA.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-xs font-medium flex items-center gap-2">
              <FileText className="h-3 w-3" />
              Descrição
            </Label>
            <Input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Compra de mercadoria para stock"
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data" className="text-xs font-medium flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Data
            </Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notas" className="text-xs font-medium">
              Notas (opcional)
            </Label>
            <Textarea
              id="notas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Notas adicionais sobre esta despesa..."
              className="rounded-xl min-h-[100px] resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1 h-12 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 rounded-xl bg-despesa hover:bg-despesa/90"
              disabled={loading}
            >
              {loading ? "A guardar..." : "Registar Despesa"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function NovaDespesaWithAuth() {
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
      <NovaDespesa />
    </AppLayout>
  );
}

export default NovaDespesaWithAuth;
