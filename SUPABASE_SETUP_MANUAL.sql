#!/usr/bin/env bash
# Script de Configuração - Execute manualmente no Supabase Console

# ============================================================
# INSTRUÇÕES: EXECUTAR NO SUPABASE CONSOLE
# ============================================================
# 
# Link: https://app.supabase.com
# Projeto: yxicmhvbmjpbwvylnugr
#

# PASSO 1: CRIAR UTILIZADOR
# ============================================================
# 
# 1. Vá a: Authentication → Users
# 2. Clique: "Add User" (botão azul)
# 3. Preencha:
#    Email: Demo@demo.com
#    Password: demo1234
#    Confirm Password: demo1234
# 4. Clique: "Create User"
# 5. COPIE O UUID QUE APARECE
#    Formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
#    Guarde numa variável: UUID_DEMO
#

# PASSO 2: IR PARA SQL EDITOR
# ============================================================
# 
# 1. No menu esquerdo: SQL Editor
# 2. Clique: "New Query"
#

# PASSO 3: COPIAR TODO O SQL ABAIXO E COLAR NO SUPABASE
# ============================================================

-- SUBSTITUA ISTO PELO SEU UUID =>  REPLACE_WITH_USER_ID
-- Formato correto com aspas: 'seu-uuid-aqui'
-- 
-- Exemplo válido: '550e8400-e29b-41d4-a716-446655440000'

-- ============================================================
-- STEP 1: CREATE PROFILE
-- ============================================================

INSERT INTO public.profiles (user_id, nome, nome_negocio)
VALUES ('REPLACE_WITH_USER_ID', 'Demo', 'Somiles - Retalhista')
ON CONFLICT (user_id) DO UPDATE 
SET nome = 'Demo', nome_negocio = 'Somiles - Retalhista';

-- ============================================================
-- STEP 2: INSERT PRODUCTS (44 ITEMS)
-- ============================================================

-- ALIMENTOS (15 produtos)
INSERT INTO public.stock (user_id, nome_produto, sku, quantidade, preco_unitario, descricao) VALUES
('REPLACE_WITH_USER_ID', 'Arroz Integral 1kg', 'ARR-INT-001', 150, 2.50, 'Arroz integral de alta qualidade'),
('REPLACE_WITH_USER_ID', 'Açúcar Branco 1kg', 'AÇU-BRA-001', 200, 1.20, 'Açúcar cristal refinado'),
('REPLACE_WITH_USER_ID', 'Sal Fino 1kg', 'SAL-FIN-001', 300, 0.80, 'Sal alimentar fino'),
('REPLACE_WITH_USER_ID', 'Pão Francês', 'PAO-FRA-001', 80, 0.45, 'Pão francês fresco'),
('REPLACE_WITH_USER_ID', 'Queijo Meia Cura 500g', 'QUE-MEC-001', 45, 8.99, 'Queijo meia cura premium'),
('REPLACE_WITH_USER_ID', 'Presunto Serrano 200g', 'PNT-SER-001', 60, 12.50, 'Presunto serrano ibérico'),
('REPLACE_WITH_USER_ID', 'Azeite Extra Virgem 500ml', 'AZE-VIR-001', 85, 6.50, 'Azeite português extra virgem'),
('REPLACE_WITH_USER_ID', 'Leite UHT 1L', 'LEI-UHT-001', 250, 1.05, 'Leite integral UHT'),
('REPLACE_WITH_USER_ID', 'Ovos (Dúzia)', 'OVO-DUZ-001', 120, 2.99, 'Ovos frescos de galinhas livres'),
('REPLACE_WITH_USER_ID', 'Manteiga 250g', 'MAN-250-001', 70, 4.50, 'Manteiga fresca de qualidade'),
('REPLACE_WITH_USER_ID', 'Iogurte Natural 500ml', 'IOG-NAT-001', 100, 2.20, 'Iogurte natural sem açúcar'),
('REPLACE_WITH_USER_ID', 'Fiambre Vila Franca 200g', 'FIA-VIL-001', 55, 5.99, 'Fiambre português tradicional'),
('REPLACE_WITH_USER_ID', 'Massa Penne 500g', 'MAS-PEN-001', 180, 0.95, 'Pasta italiana tipo penne'),
('REPLACE_WITH_USER_ID', 'Molho Tomate 400g', 'MOL-TOM-001', 140, 1.30, 'Molho de tomate natural'),
('REPLACE_WITH_USER_ID', 'Castanha-do-Pará 200g', 'CAS-PAR-001', 35, 14.99, 'Castanha-do-pará premium');

-- BEBIDAS (10 produtos)
INSERT INTO public.stock (user_id, nome_produto, sku, quantidade, preco_unitario, descricao) VALUES
('REPLACE_WITH_USER_ID', 'Água Mineral 1.5L', 'AGU-MIN-001', 400, 0.65, 'Água mineral natural'),
('REPLACE_WITH_USER_ID', 'Sumo Laranja 1L', 'SUJ-LAR-001', 120, 2.10, 'Sumo natural de laranja'),
('REPLACE_WITH_USER_ID', 'Refrigerante Cola 330ml', 'REF-COL-001', 250, 1.50, 'Refrigerante cola lata'),
('REPLACE_WITH_USER_ID', 'Vinho Tinto Douro 750ml', 'VIN-TIN-001', 90, 9.99, 'Vinho tinto Douro DOC'),
('REPLACE_WITH_USER_ID', 'Cerveja Artesanal 500ml', 'CER-ART-001', 180, 3.50, 'Cerveja artesanal portuguesa'),
('REPLACE_WITH_USER_ID', 'Café Moído 250g', 'CAF-MOI-001', 150, 5.99, 'Café moído premium'),
('REPLACE_WITH_USER_ID', 'Chá Preto Assam 100g', 'CHA-ASS-001', 45, 8.50, 'Chá assam de qualidade'),
('REPLACE_WITH_USER_ID', 'Sumo Multifrutas 1L', 'SUJ-MUL-001', 100, 1.99, 'Sumo multifrutas natural'),
('REPLACE_WITH_USER_ID', 'Leite Achocolatado 1L', 'LEI-ACH-001', 85, 2.49, 'Leite com achocolatado'),
('REPLACE_WITH_USER_ID', 'Whisky Escocês 700ml', 'WHI-ESC-001', 35, 45.99, 'Whisky escocês premium');

-- ROUPAS (10 produtos)
INSERT INTO public.stock (user_id, nome_produto, sku, quantidade, preco_unitario, descricao) VALUES
('REPLACE_WITH_USER_ID', 'T-Shirt Básica Branca M', 'TXH-BAS-001', 150, 12.99, 'Camiseta básica branca algodão'),
('REPLACE_WITH_USER_ID', 'Calças Jeans Azul M', 'CAL-JEA-001', 85, 49.99, 'Calças jeans clássicas azul'),
('REPLACE_WITH_USER_ID', 'Hoodie Cinzento G', 'HOO-CIN-001', 60, 34.99, 'Hoodie cinzento algodão'),
('REPLACE_WITH_USER_ID', 'Saia Comprida Preta P', 'SAI-COM-001', 40, 44.99, 'Saia comprida preta elegante'),
('REPLACE_WITH_USER_ID', 'Camisola de Lã Cinza M', 'CAM-LAN-001', 70, 29.99, 'Camisola de lã merino'),
('REPLACE_WITH_USER_ID', 'Casaco Invernoso Preto G', 'CAS-INV-001', 45, 89.99, 'Casaco invernoso preto'),
('REPLACE_WITH_USER_ID', 'Meias Algodão 3 pares', 'MEI-ALG-001', 200, 8.99, 'Meias de algodão pack 3'),
('REPLACE_WITH_USER_ID', 'Lenço Seda Estampado', 'LEN-SEI-001', 55, 18.50, 'Lenço de seda estampado'),
('REPLACE_WITH_USER_ID', 'Cinto Couro Preto', 'CIN-COU-001', 80, 24.99, 'Cinto de couro genuíno'),
('REPLACE_WITH_USER_ID', 'Chapéu Malha Inverno', 'CHA-MAL-001', 95, 14.99, 'Chapéu de malha para inverno');

-- HIGIENE (7 produtos)
INSERT INTO public.stock (user_id, nome_produto, sku, quantidade, preco_unitario, descricao) VALUES
('REPLACE_WITH_USER_ID', 'Sabonete Líquido 250ml', 'SAB-LIQ-001', 120, 2.99, 'Sabonete líquido natural'),
('REPLACE_WITH_USER_ID', 'Detergente Louça 500ml', 'DET-LOU-001', 150, 1.99, 'Detergente para louça'),
('REPLACE_WITH_USER_ID', 'Champô Neutro 200ml', 'CHA-NEU-001', 80, 5.99, 'Champô neutro hipoalergénico'),
('REPLACE_WITH_USER_ID', 'Dentífrico Branco 75ml', 'DEN-BRA-001', 100, 3.50, 'Pasta de dentes whitening'),
('REPLACE_WITH_USER_ID', 'Papel Higienico 12 rolos', 'PAP-HIG-001', 200, 6.99, 'Papel higiênico premium'),
('REPLACE_WITH_USER_ID', 'Desinfectante Neutro 750ml', 'DES-NEU-001', 110, 3.20, 'Desinfectante multiusos'),
('REPLACE_WITH_USER_ID', 'Toalhas Banho Brancas', 'TOA-BAN-001', 50, 19.99, 'Jogo 2 toalhas banho');

-- OUTROS (2 produtos)
INSERT INTO public.stock (user_id, nome_produto, sku, quantidade, preco_unitario, descricao) VALUES
('REPLACE_WITH_USER_ID', 'Livro de Ficção Bestseller', 'LIV-FIC-001', 35, 15.99, 'Livro de ficção bestseller'),
('REPLACE_WITH_USER_ID', 'Gadget Smartphone Case', 'GAD-PHO-001', 120, 12.50, 'Capa para smartphone');

-- ============================================================
-- STEP 3: INSERT TRANSACTIONS (30 EXPENSES)
-- ============================================================

INSERT INTO public.transacoes (user_id, tipo, valor, categoria, descricao, data) VALUES
-- Dezembro 2025
('REPLACE_WITH_USER_ID', 'despesa', 450.00, 'Reposição Stock', 'Compra lote alimentos fornecedor A', '2025-12-01'),
('REPLACE_WITH_USER_ID', 'despesa', 320.50, 'Reposição Stock', 'Compra bebidas distribuidor B', '2025-12-02'),
('REPLACE_WITH_USER_ID', 'despesa', 1200.00, 'Reposição Stock', 'Compra roupas fornecedor C', '2025-12-03'),
('REPLACE_WITH_USER_ID', 'despesa', 180.75, 'Reposição Stock', 'Produtos higiene fornecedor D', '2025-12-05'),
('REPLACE_WITH_USER_ID', 'despesa', 280.00, 'Reposição Stock', 'Alimentos frescos fornecedor A', '2025-12-08'),
('REPLACE_WITH_USER_ID', 'despesa', 150.25, 'Renda/Aluguel', 'Aluguel loja dezembro', '2025-12-10'),
('REPLACE_WITH_USER_ID', 'despesa', 320.00, 'Reposição Stock', 'Bebidas premium distribuidor E', '2025-12-12'),
('REPLACE_WITH_USER_ID', 'despesa', 200.50, 'Serviços', 'Limpeza e manutenção loja', '2025-12-15'),
('REPLACE_WITH_USER_ID', 'despesa', 890.00, 'Reposição Stock', 'Compra roupas inverno C', '2025-12-18'),
('REPLACE_WITH_USER_ID', 'despesa', 120.00, 'Utilitários', 'Eletricidade dezembro', '2025-12-20'),
('REPLACE_WITH_USER_ID', 'despesa', 85.50, 'Publicidade', 'Anúncio online Facebook', '2025-12-22'),
('REPLACE_WITH_USER_ID', 'despesa', 350.00, 'Reposição Stock', 'Alimentos e bebidas fornecedor A', '2025-12-24'),
('REPLACE_WITH_USER_ID', 'despesa', 195.75, 'Serviços', 'Caixa registadora manutenção', '2025-12-28'),
-- Janeiro 2026
('REPLACE_WITH_USER_ID', 'despesa', 520.00, 'Reposição Stock', 'Alimentos ano novo fornecedor A', '2026-01-02'),
('REPLACE_WITH_USER_ID', 'despesa', 400.25, 'Reposição Stock', 'Bebidas fornecedor B', '2026-01-03'),
('REPLACE_WITH_USER_ID', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel loja janeiro', '2026-01-10'),
('REPLACE_WITH_USER_ID', 'despesa', 280.50, 'Reposição Stock', 'Roupas fornecedor C', '2026-01-12'),
('REPLACE_WITH_USER_ID', 'despesa', 100.00, 'Serviços', 'Limpeza loja', '2026-01-15'),
('REPLACE_WITH_USER_ID', 'despesa', 420.00, 'Reposição Stock', 'Higiene e cuidados fornecedor D', '2026-01-18'),
('REPLACE_WITH_USER_ID', 'despesa', 125.00, 'Utilitários', 'Eletricidade janeiro', '2026-01-20'),
-- Fevereiro 2026
('REPLACE_WITH_USER_ID', 'despesa', 480.00, 'Reposição Stock', 'Alimentos fevereiro fornecedor A', '2026-02-01'),
('REPLACE_WITH_USER_ID', 'despesa', 320.50, 'Reposição Stock', 'Bebidas fornecedor B', '2026-02-03'),
('REPLACE_WITH_USER_ID', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel loja fevereiro', '2026-02-10'),
('REPLACE_WITH_USER_ID', 'despesa', 600.00, 'Reposição Stock', 'Coleção primavera roupas C', '2026-02-12'),
('REPLACE_WITH_USER_ID', 'despesa', 95.50, 'Serviços', 'Limpeza loja', '2026-02-15'),
('REPLACE_WITH_USER_ID', 'despesa', 250.25, 'Reposição Stock', 'Higiene fornecedor D', '2026-02-18'),
('REPLACE_WITH_USER_ID', 'despesa', 110.00, 'Utilitários', 'Eletricidade fevereiro', '2026-02-20'),
-- Março 2026
('REPLACE_WITH_USER_ID', 'despesa', 520.00, 'Reposição Stock', 'Alimentos março fornecedor A', '2026-03-01'),
('REPLACE_WITH_USER_ID', 'despesa', 350.75, 'Reposição Stock', 'Bebidas fornecedor B', '2026-03-03'),
('REPLACE_WITH_USER_ID', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel loja março', '2026-03-10');

-- ============================================================
-- STEP 4: INSERT SALES (40 SALES)
-- ============================================================

INSERT INTO public.vendas (user_id, cliente_nome, valor_total, descricao, data) VALUES
-- Dezembro 2025
('REPLACE_WITH_USER_ID', 'João Silva', 245.50, 'Alimentos variados', '2025-12-01'),
('REPLACE_WITH_USER_ID', 'Maria Santos', 89.99, 'Bebidas e snacks', '2025-12-01'),
('REPLACE_WITH_USER_ID', 'Cliente Anónimo', 320.00, 'Roupas (2 camisetas, 1 hoodie)', '2025-12-02'),
('REPLACE_WITH_USER_ID', 'Rita Costa', 156.75, 'Produtos higiene e alimentos', '2025-12-02'),
('REPLACE_WITH_USER_ID', 'Cliente Anónimo', 490.00, 'Roupa inverno (calças, casaco, camisola)', '2025-12-03'),
('REPLACE_WITH_USER_ID', 'Pedro Oliveira', 287.50, 'Alimentos e bebidas premium', '2025-12-03'),
('REPLACE_WITH_USER_ID', 'Cliente Anónimo', 165.25, 'Higiene pessoal', '2025-12-04'),
('REPLACE_WITH_USER_ID', 'Ana Martins', 420.00, 'Compra grande roupas e acessórios', '2025-12-05'),
('REPLACE_WITH_USER_ID', 'Empresa ABC', 1200.00, 'Fornecimento corporativo alimentos', '2025-12-06'),
('REPLACE_WITH_USER_ID', 'Carlos Mendes', 350.00, 'Roupas e acessórios', '2025-12-08'),
-- Janeiro 2026
('REPLACE_WITH_USER_ID', 'Diana Marques', 320.00, 'Roupas ano novo', '2026-01-02'),
('REPLACE_WITH_USER_ID', 'Gonçalo Lima', 285.50, 'Alimentos frescos lote', '2026-01-04'),
('REPLACE_WITH_USER_ID', 'Cliente Anónimo', 420.00, 'Roupas desporto', '2026-01-05'),
('REPLACE_WITH_USER_ID', 'Isadora Costa', 540.00, 'Compra grande roupas e acessórios', '2026-01-07'),
('REPLACE_WITH_USER_ID', 'José Mendes', 380.00, 'Alimentos e bebidas lote', '2026-01-09'),
('REPLACE_WITH_USER_ID', 'Karolina Dias', 310.50, 'Roupas primavera', '2026-01-11'),
('REPLACE_WITH_USER_ID', 'Luís Barbosa', 420.00, 'Alimentos frescos fornecimento', '2026-01-13'),
('REPLACE_WITH_USER_ID', 'Mara Oliveira', 360.00, 'Roupas e sapatos', '2026-01-15'),
('REPLACE_WITH_USER_ID', 'Nata Ferreira', 510.75, 'Alimentos premium e bebidas', '2026-01-17'),
('REPLACE_WITH_USER_ID', 'Olga Teixeira', 320.00, 'Roupas lote', '2026-01-19'),
-- Fevereiro 2026
('REPLACE_WITH_USER_ID', 'Paulo Costa', 295.75, 'Bebidas e alimentos', '2026-02-02'),
('REPLACE_WITH_USER_ID', 'Quique Monteiro', 210.25, 'Higiene e cuidados', '2026-02-04'),
('REPLACE_WITH_USER_ID', 'Rita Pereira', 520.00, 'Roupas desporto e acessórios', '2026-02-06'),
('REPLACE_WITH_USER_ID', 'Cliente Anónimo', 125.75, 'Café e chás premium', '2026-02-07'),
('REPLACE_WITH_USER_ID', 'Sérgio Alves', 340.00, 'Alimentos variados fornecimento', '2026-02-08'),
('REPLACE_WITH_USER_ID', 'Telma Roxo', 360.50, 'Roupas de marca', '2026-02-10'),
('REPLACE_WITH_USER_ID', 'Ulisses Gamas', 420.00, 'Alimentos gourmet e bebidas premium', '2026-02-12'),
('REPLACE_WITH_USER_ID', 'Vera Nunes', 480.00, 'Roupa completa estação primavera', '2026-02-14'),
('REPLACE_WITH_USER_ID', 'Wagner Farias', 325.25, 'Alimentos frescos', '2026-02-16'),
('REPLACE_WITH_USER_ID', 'Xáre Mendes', 410.50, 'Roupas e acessórios', '2026-02-18'),
-- Março 2026
('REPLACE_WITH_USER_ID', 'Zóe Costa', 285.75, 'Bebidas e café premium', '2026-03-02'),
('REPLACE_WITH_USER_ID', 'Acácio Neves', 215.25, 'Higiene pessoal lote', '2026-03-04'),
('REPLACE_WITH_USER_ID', 'Benedita Sousa', 510.00, 'Roupas variadas descontos', '2026-03-06'),
('REPLACE_WITH_USER_ID', 'Custódio Veiga', 360.00, 'Alimentos e bebidas lote', '2026-03-08'),
('REPLACE_WITH_USER_ID', 'Delfina Bastos', 420.00, 'Roupas e sapatos primavera', '2026-03-10'),
('REPLACE_WITH_USER_ID', 'Evaristo Lima', 485.25, 'Alimentos premium e bebidas', '2026-03-12'),
('REPLACE_WITH_USER_ID', 'Florinda Reis', 380.00, 'Roupas lote primavera', '2026-03-14'),
('REPLACE_WITH_USER_ID', 'Gaspar Teles', 420.00, 'Alimentos variados e bebidas', '2026-03-16');

-- ============================================================
-- ✅ PRONTO!
-- ============================================================
-- 
-- Clique "Run" para executar
-- Aguarde 5 segundos
-- Veja as linhas inseridas no resumo inferior
--
