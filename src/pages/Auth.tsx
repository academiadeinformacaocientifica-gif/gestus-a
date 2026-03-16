import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [nomeNegocio, setNomeNegocio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { nome, nome_negocio: nomeNegocio },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Conta criada com sucesso! Verifique o seu email.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-destaque-bg items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">gestus</h1>
          <p className="text-xl font-medium text-foreground/80 leading-relaxed">
            O caos não escala.{" "}
            <span className="text-destaque font-bold">A organização sim.</span>
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            A plataforma de gestão financeira para microempreendedores portugueses. 
            Simples, clara e construída para quem trabalha.
          </p>
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full max-w-sm"
        >
          <div className="lg:hidden mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">gestus</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              O caos não escala. A organização sim.
            </p>
          </div>

          <h2 className="text-xl font-semibold tracking-tight text-foreground mb-1">
            {isLogin ? "Bem-vindo de volta" : "Criar conta"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {isLogin ? "Insira os seus dados para continuar." : "Comece a organizar o seu negócio."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-1.5">
                  <Label htmlFor="nome" className="text-xs font-medium">Nome</Label>
                  <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="O seu nome" required={!isLogin} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nomeNegocio" className="text-xs font-medium">Nome do negócio</Label>
                  <Input id="nomeNegocio" value={nomeNegocio} onChange={(e) => setNomeNegocio(e.target.value)} placeholder="O nome do seu negócio" required={!isLogin} />
                </div>
              </>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium">Palavra-passe</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl" disabled={loading}>
              {loading ? "A processar..." : isLogin ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Não tem conta? " : "Já tem conta? "}
              <span className="font-medium text-destaque">{isLogin ? "Criar conta" : "Entrar"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
