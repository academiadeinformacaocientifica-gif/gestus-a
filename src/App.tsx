import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { queryClient } from "@/config/queryClient";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Financeiro from "./pages/Financeiro";
import Vendas from "./pages/Vendas";
import Stock from "./pages/Stock";
import NovaDespesa from "./pages/NovaDespesa";
import NovaVenda from "./pages/NovaVenda";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/despesas/nova" element={<NovaDespesa />} />
              <Route path="/vendas/nova" element={<NovaVenda />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
