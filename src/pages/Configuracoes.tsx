import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, Building, Bell, Shield, Save, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function Configuracoes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  const [nome, setNome] = useState("");
  const [nomeNegocio, setNomeNegocio] = useState("");
  const [telefone, setTelefone] = useState("");
  const [morada, setMorada] = useState("");
  const [nif, setNif] = useState("");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (profile && !nome && !isLoading) {
    setNome(profile.nome || "");
    setNomeNegocio(profile.nome_negocio || "");
    setTelefone(profile.telefone || "");
    setMorada(profile.morada || "");
    setNif(profile.nif || "");
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSavingProfile(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          nome,
          nome_negocio: nomeNegocio,
          telefone: telefone || null,
          morada: morada || null,
          nif: nif || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar perfil.");
    } finally {
      setSavingProfile(false);
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
        
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Configurações
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie as suas configurações
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Tabs defaultValue="perfil" className="space-y-4">
          <TabsList className="bg-muted grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="perfil" className="gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="negocio" className="gap-2">
              <Building className="h-4 w-4" />
              Negócio
            </TabsTrigger>
            <TabsTrigger value="conta" className="gap-2">
              <Shield className="h-4 w-4" />
              Conta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize as suas informações pessoais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="O seu nome"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="+244 900 000 000"
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="morada">Morada</Label>
                    <Textarea
                      id="morada"
                      value={morada}
                      onChange={(e) => setMorada(e.target.value)}
                      placeholder="A sua morada"
                      className="rounded-xl resize-none"
                      rows={2}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="gap-2 rounded-xl"
                    disabled={savingProfile}
                  >
                    {savingProfile ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Guardar Alterações
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="negocio">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Informações do Negócio</CardTitle>
                <CardDescription>
                  Configure as informações da sua empresa ou negócio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeNegocio">Nome do Negócio</Label>
                    <Input
                      id="nomeNegocio"
                      value={nomeNegocio}
                      onChange={(e) => setNomeNegocio(e.target.value)}
                      placeholder="Nome da sua empresa"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nif">NIF (Número de Identificação Fiscal)</Label>
                    <Input
                      id="nif"
                      value={nif}
                      onChange={(e) => setNif(e.target.value)}
                      placeholder="123456789"
                      className="rounded-xl"
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Dica</h4>
                    <p className="text-sm text-muted-foreground">
                      Manter as informações do negócio atualizadas ajuda a gerar relatórios mais precisos e profissionais.
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="gap-2 rounded-xl"
                    disabled={savingProfile}
                  >
                    {savingProfile ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Guardar Alterações
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conta">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Configurações da Conta</CardTitle>
                <CardDescription>
                  Gerencie as configurações da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Período de Dados</h4>
                    <p className="text-xs text-muted-foreground">
                      Os seus dados são armazenados de forma segura na cloud.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-destructive">Zona危险</h4>
                    <p className="text-xs text-muted-foreground">
                      Estas ações são irreversíveis. Proceda com cuidado.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground rounded-xl">
                        Exportar Dados
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}

function ConfiguracoesWithAuth() {
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
      <Configuracoes />
    </AppLayout>
  );
}

export default ConfiguracoesWithAuth;
