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
import { Plus, Package, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function Stock() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [sku, setSku] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: produtos = [] } = useQuery({
    queryKey: ["stock", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stock")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!nomeProduto || !quantidade || !precoUnitario) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        const { error } = await supabase
          .from("stock")
          .update({
            nome_produto: nomeProduto,
            quantidade: parseInt(quantidade),
            preco_unitario: parseFloat(precoUnitario),
            sku: sku || null,
            descricao: descricao || null,
          })
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Produto atualizado!");
      } else {
        const { error } = await supabase.from("stock").insert({
          user_id: user.id,
          nome_produto: nomeProduto,
          quantidade: parseInt(quantidade),
          preco_unitario: parseFloat(precoUnitario),
          sku: sku || null,
          descricao: descricao || null,
        });
        if (error) throw error;
        toast.success("Produto adicionado ao stock!");
      }
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      setOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNomeProduto("");
    setQuantidade("");
    setPrecoUnitario("");
    setSku("");
    setDescricao("");
    setEditingId(null);
  };

  const handleEdit = (produto: any) => {
    setNomeProduto(produto.nome_produto);
    setQuantidade(produto.quantidade.toString());
    setPrecoUnitario(produto.preco_unitario.toString());
    setSku(produto.sku || "");
    setDescricao(produto.descricao || "");
    setEditingId(produto.id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem a certeza que quer eliminar este produto?")) return;
    try {
      const { error } = await supabase.from("stock").delete().eq("id", id);
      if (error) throw error;
      toast.success("Produto eliminado!");
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const totalValorStock = produtos.reduce(
    (sum, p) => sum + p.quantidade * p.preco_unitario,
    0
  );
  const totalQuantidade = produtos.reduce((sum, p) => sum + p.quantidade, 0);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      className="space-y-6"
    >
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Stock</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Inventário de produtos</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="gap-2 rounded-lg h-9"
        >
          <Plus className="h-4 w-4" /> Adicionar
        </Button>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs font-medium text-muted-foreground">Valor Total</p>
          <p className="text-xl font-semibold tabular-nums text-foreground mt-1">
            {totalValorStock.toFixed(2)}Kz
          </p>
          <p className="text-xs text-muted-foreground mt-1">{produtos.length} produtos</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs font-medium text-muted-foreground">Quantidade</p>
          <p className="text-xl font-semibold tabular-nums text-foreground mt-1">
            {totalQuantidade} unidades
          </p>
          <p className="text-xs text-muted-foreground mt-1">Em stock</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-border shadow-card">
        {produtos.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Ainda não existem produtos no stock.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-foreground">
                    Produto
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-foreground">
                    SKU
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-foreground">
                    Quantidade
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-foreground">
                    Preço Unit.
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-foreground">
                    Valor Total
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-foreground">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {produtos.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-destaque-bg flex items-center justify-center shrink-0">
                          <Package className="h-4 w-4 text-destaque" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{p.nome_produto}</p>
                          {p.descricao && (
                            <p className="text-xs text-muted-foreground truncate">
                              {p.descricao}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-sm text-muted-foreground">{p.sku || "-"}</p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-sm font-medium text-foreground">{p.quantidade}</p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-sm text-foreground">{p.preco_unitario.toFixed(2)}Kz</p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="text-sm font-medium text-foreground">
                        {(p.quantidade * p.preco_unitario).toFixed(2)}Kz
                      </p>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 hover:bg-despesa-bg rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4 text-despesa hover:text-despesa-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editingId ? "Editar Produto" : "Adicionar Produto ao Stock"}
            </SheetTitle>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Produto *</Label>
              <Input
                id="nome"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                placeholder="Ex: Camiseta Preta"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Ex: SKU-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade *</Label>
              <Input
                id="quantidade"
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="0"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco">Preço Unitário (Kz) *</Label>
              <Input
                id="preco"
                type="number"
                value={precoUnitario}
                onChange={(e) => setPrecoUnitario(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Qualidade premium"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "A guardar..." : editingId ? "Atualizar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}

function StockWithAuth() {
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
      <Stock />
    </AppLayout>
  );
}

export default StockWithAuth;
