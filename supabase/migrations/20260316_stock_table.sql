-- Stock table
CREATE TABLE public.stock (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_produto TEXT NOT NULL,
  sku TEXT,
  quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
  preco_unitario NUMERIC(12,2) NOT NULL CHECK (preco_unitario >= 0),
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stock ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stock" ON public.stock FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own stock" ON public.stock FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own stock" ON public.stock FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own stock" ON public.stock FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER update_stock_updated_at BEFORE UPDATE ON public.stock FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_stock_user ON public.stock(user_id);
CREATE INDEX idx_stock_nome ON public.stock(user_id, nome_produto);
