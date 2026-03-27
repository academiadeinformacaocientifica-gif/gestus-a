import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const categorias = [
  { value: "vendas", label: "Vendas" },
  { value: "fixos", label: "Custos Fixos" },
  { value: "variaveis", label: "Custos Variáveis" },
  { value: "insumos", label: "Insumos" },
];

interface TransactionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionSheet({ open, onOpenChange }: TransactionSheetProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [tipo, setTipo] = useState<"ganho" | "despesa">("ganho");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("transacoes").insert({
        user_id: user.id,
        tipo,
        valor: parseFloat(valor),
        categoria,
        descricao: descricao || null,
        data,
      });

      if (error) throw error;

      toast.success(tipo === "ganho" ? "Ganho registado!" : "Despesa registada!");
      queryClient.invalidateQueries({ queryKey: ["transacoes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTipo("ganho");
    setValor("");
    setCategoria("");
    setDescricao("");
    setData(new Date().toISOString().split("T")[0]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Nova transação</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTipo("ganho")}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border",
                tipo === "ganho"
                  ? "bg-ganho text-ganho-foreground border-ganho"
                  : "bg-card text-muted-foreground border-border hover:bg-muted"
              )}
            >
              Ganho
            </button>
            <button
              type="button"
              onClick={() => setTipo("despesa")}
              className={cn(
                "flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors border",
                tipo === "despesa"
                  ? "bg-despesa text-despesa-foreground border-despesa"
                  : "bg-card text-muted-foreground border-border hover:bg-muted"
              )}
            >
              Despesa
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="valor">Valor (Kz)</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              min="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0.00"
              required
              className="text-2xl font-bold tabular-nums h-14"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={categoria} onValueChange={setCategoria} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição (opcional)</Label>
            <Input
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Breve descrição"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Data</Label>
            <Input
              id="data"
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading || !categoria}>
            {loading ? "A guardar..." : tipo === "ganho" ? "Registar Ganho" : "Registar Despesa"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
