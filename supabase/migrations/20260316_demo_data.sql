-- Demo account with realistic retail business data
-- Email: Demo@demo.com
-- Password: demo1234

-- Insert demo user (note: password hashing handled by Supabase auth)
-- This is a placeholder - in practice, users are created via auth.signUp()
-- For local testing, you may need to use the admin API

-- Insert Demo Profile
-- First, we need to get the UUID from auth_users table
-- For this SQL script to work, the user must be created via the API first

-- Create a helper view to get the demo user ID
-- In production, replace 'DEMO_USER_ID_HERE' with actual user UUID

-- ============ PROFILE ============
-- Run this after user creation via API
-- INSERT INTO public.profiles (user_id, nome, nome_negocio)
-- VALUES ('DEMO_USER_ID', 'Demo', 'Somiles - Retalhista');

-- ============ STOCK PRODUCTS ============
-- ALIMENTOS
INSERT INTO public.stock (user_id, nome_produto, sku, quantidade, preco_unitario, descricao) VALUES
('DEMO_USER_ID', 'Arroz Integral 1kg', 'ARR-INT-001', 150, 2.50, 'Arroz integral de alta qualidade'),
('DEMO_USER_ID', 'Açúcar Branco 1kg', 'AÇU-BRA-001', 200, 1.20, 'Açúcar cristal refinado'),
('DEMO_USER_ID', 'Sal Fino 1kg', 'SAL-FIN-001', 300, 0.80, 'Sal alimentar fino'),
('DEMO_USER_ID', 'Pão Francês', 'PAO-FRA-001', 80, 0.45, 'Pão francês fresco'),
('DEMO_USER_ID', 'Queijo Meia Cura 500g', 'QUE-MEC-001', 45, 8.99, 'Queijo meia cura premium'),
('DEMO_USER_ID', 'Presunto Serrano 200g', 'PNT-SER-001', 60, 12.50, 'Presunto serrano ibérico'),
('DEMO_USER_ID', 'Azeite Extra Virgem 500ml', 'AZE-VIR-001', 85, 6.50, 'Azeite português extra virgem'),
('DEMO_USER_ID', 'Leite UHT 1L', 'LEI-UHT-001', 250, 1.05, 'Leite integral UHT'),
('DEMO_USER_ID', 'Ovos (Dúzia)', 'OVO-DUZ-001', 120, 2.99, 'Ovos frescos de galinhas livres'),
('DEMO_USER_ID', 'Manteiga 250g', 'MAN-250-001', 70, 4.50, 'Manteiga fresca de qualidade'),
('DEMO_USER_ID', 'Iogurte Natural 500ml', 'IOG-NAT-001', 100, 2.20, 'Iogurte natural sem açúcar'),
('DEMO_USER_ID', 'Fiambre Vila Franca 200g', 'FIA-VIL-001', 55, 5.99, 'Fiambre português tradicional'),
('DEMO_USER_ID', 'Massa Penne 500g', 'MAS-PEN-001', 180, 0.95, 'Pasta italiana tipo penne'),
('DEMO_USER_ID', 'Molho Tomate 400g', 'MOL-TOM-001', 140, 1.30, 'Molho de tomate natural'),
('DEMO_USER_ID', 'Castanha-do-Pará 200g', 'CAS-PAR-001', 35, 14.99, 'Castanha-do-pará premium'),

-- BEBIDAS
('DEMO_USER_ID', 'Água Mineral 1.5L', 'AGU-MIN-001', 400, 0.65, 'Água mineral natural'),
('DEMO_USER_ID', 'Sumo Laranja 1L', 'SUJ-LAR-001', 120, 2.10, 'Sumo natural de laranja'),
('DEMO_USER_ID', 'Refrigerante Cola 330ml', 'REF-COL-001', 250, 1.50, 'Refrigerante cola lata'),
('DEMO_USER_ID', 'Vinho Tinto Douro 750ml', 'VIN-TIN-001', 90, 9.99, 'Vinho tinto Douro DOC'),
('DEMO_USER_ID', 'Cerveja Artesanal 500ml', 'CER-ART-001', 180, 3.50, 'Cerveja artesanal portuguesa'),
('DEMO_USER_ID', 'Café Moído 250g', 'CAF-MOI-001', 150, 5.99, 'Café moído premium'),
('DEMO_USER_ID', 'Chá Preto Assam 100g', 'CHA-ASS-001', 45, 8.50, 'Chá assam de qualidade'),
('DEMO_USER_ID', 'Sumo Multifrutas 1L', 'SUJ-MUL-001', 100, 1.99, 'Sumo multifrutas natural'),
('DEMO_USER_ID', 'Leite Achocolatado 1L', 'LEI-ACH-001', 85, 2.49, 'Leite com achocolatado'),
('DEMO_USER_ID', 'Whisky Escocês 700ml', 'WHI-ESC-001', 35, 45.99, 'Whisky escocês premium'),

-- ROUPAS E TÊXTEIS
('DEMO_USER_ID', 'T-Shirt Básica Branca M', 'TXH-BAS-001', 150, 12.99, 'Camiseta básica branca algodão'),
('DEMO_USER_ID', 'Calças Jeans Azul M', 'CAL-JEA-001', 85, 49.99, 'Calças jeans clássicas azul'),
('DEMO_USER_ID', 'Hoodie Cinzento G', 'HOO-CIN-001', 60, 34.99, 'Hoodie cinzento algodão'),
('DEMO_USER_ID', 'Saia Comprida Preta P', 'SAI-COM-001', 40, 44.99, 'Saia comprida preta elegante'),
('DEMO_USER_ID', 'Camisola de Lã Cinza M', 'CAM-LAN-001', 70, 29.99, 'Camisola de lã merino'),
('DEMO_USER_ID', 'Casaco Invernoso Preto G', 'CAS-INV-001', 45, 89.99, 'Casaco invernoso preto'),
('DEMO_USER_ID', 'Meias Algodão 3 pares', 'MEI-ALG-001', 200, 8.99, 'Meias de algodão pack 3'),
('DEMO_USER_ID', 'Lenço Seda Estampado', 'LEN-SEI-001', 55, 18.50, 'Lenço de seda estampado'),
('DEMO_USER_ID', 'Cinto Couro Preto', 'CIN-COU-001', 80, 24.99, 'Cinto de couro genuíno'),
('DEMO_USER_ID', 'Chapéu Malha Inverno', 'CHA-MAL-001', 95, 14.99, 'Chapéu de malha para inverno'),

-- HIGIENE E CUIDADOS
('DEMO_USER_ID', 'Sabonete Líquido 250ml', 'SAB-LIQ-001', 120, 2.99, 'Sabonete líquido natural'),
('DEMO_USER_ID', 'Detergente Louça 500ml', 'DET-LOU-001', 150, 1.99, 'Detergente para louça'),
('DEMO_USER_ID', 'Champô Neutro 200ml', 'CHA-NEU-001', 80, 5.99, 'Champô neutro hipoalergénico'),
('DEMO_USER_ID', 'Dentífrico Branco 75ml', 'DEN-BRA-001', 100, 3.50, 'Pasta de dentes whitening'),
('DEMO_USER_ID', 'Papel Higienico 12 rolos', 'PAP-HIG-001', 200, 6.99, 'Papel higiênico premium'),
('DEMO_USER_ID', 'Desinfectante Neutro 750ml', 'DES-NEU-001', 110, 3.20, 'Desinfectante multiusos'),
('DEMO_USER_ID', 'Toalhas Banho Brancas', 'TOA-BAN-001', 50, 19.99, 'Jogo 2 toalhas banho'),

-- OUTROS PRODUTOS
('DEMO_USER_ID', 'Livro de Ficção Bestseller', 'LIV-FIC-001', 35, 15.99, 'Livro de ficção bestseller'),
('DEMO_USER_ID', 'Gadget Smartphone Case', 'GAD-PHO-001', 120, 12.50, 'Capa para smartphone'),
('DEMO_USER_ID', 'Vela Aromatizada 200g', 'VEL-ARO-001', 75, 8.99, 'Vela aromatizada aroma natural'),
('DEMO_USER_ID', 'Almofada Decorativa 40x40', 'ALM-DEC-001', 60, 22.50, 'Almofada decorativa cinzenta'),
('DEMO_USER_ID', 'Caneta Esferográfica Pack 10', 'CAN-ESF-001', 180, 4.50, 'Pack 10 canetas azuis');

-- ============ TRANSAÇÕES (COMPRAS) - 3 MESES ============
-- Dezembro 2025
INSERT INTO public.transacoes (user_id, tipo, valor, categoria, descricao, data) VALUES
('DEMO_USER_ID', 'despesa', 450.00, 'Reposição Stock', 'Compra lote alimentos fornecedor A', '2025-12-01'),
('DEMO_USER_ID', 'despesa', 320.50, 'Reposição Stock', 'Compra bebidas distribuidor B', '2025-12-02'),
('DEMO_USER_ID', 'despesa', 1200.00, 'Reposição Stock', 'Compra roupas fornecedor C', '2025-12-03'),
('DEMO_USER_ID', 'despesa', 180.75, 'Reposição Stock', 'Produtos higiene fornecedor D', '2025-12-05'),
('DEMO_USER_ID', 'despesa', 280.00, 'Reposição Stock', 'Alimentos frescos fornecedor A', '2025-12-08'),
('DEMO_USER_ID', 'despesa', 150.25, 'Renda/Aluguel', 'Aluguel loja dezembro', '2025-12-10'),
('DEMO_USER_ID', 'despesa', 320.00, 'Reposição Stock', 'Bebidas premium distribuidor E', '2025-12-12'),
('DEMO_USER_ID', 'despesa', 200.50, 'Serviços', 'Limpeza e manutenção loja', '2025-12-15'),
('DEMO_USER_ID', 'despesa', 890.00, 'Reposição Stock', 'Compra roupas inverno C', '2025-12-18'),
('DEMO_USER_ID', 'despesa', 120.00, 'Utilitários', 'Eletricidade dezembro', '2025-12-20'),
('DEMO_USER_ID', 'despesa', 85.50, 'Publicidade', 'Anúncio online Facebook', '2025-12-22'),
('DEMO_USER_ID', 'despesa', 350.00, 'Reposição Stock', 'Alimentos e bebidas fornecedor A', '2025-12-24'),
('DEMO_USER_ID', 'despesa', 195.75, 'Serviços', 'Caixa registadora manutenção', '2025-12-28'),

-- Janeiro 2026
('DEMO_USER_ID', 'despesa', 520.00, 'Reposição Stock', 'Alimentos ano novo fornecedor A', '2026-01-02'),
('DEMO_USER_ID', 'despesa', 400.25, 'Reposição Stock', 'Bebidas fornecedor B', '2026-01-03'),
('DEMO_USER_ID', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel loja janeiro', '2026-01-10'),
('DEMO_USER_ID', 'despesa', 280.50, 'Reposição Stock', 'Roupas fornecedor C', '2026-01-12'),
('DEMO_USER_ID', 'despesa', 100.00, 'Serviços', 'Limpeza loja', '2026-01-15'),
('DEMO_USER_ID', 'despesa', 420.00, 'Reposição Stock', 'Higiene e cuidados fornecedor D', '2026-01-18'),
('DEMO_USER_ID', 'despesa', 125.00, 'Utilitários', 'Eletricidade janeiro', '2026-01-20'),
('DEMO_USER_ID', 'despesa', 250.75, 'Reposição Stock', 'Alimentos frescos fornecedor A', '2026-01-22'),
('DEMO_USER_ID', 'despesa', 180.00, 'Serviços', 'Internet e comunicações', '2026-01-25'),
('DEMO_USER_ID', 'despesa', 350.00, 'Reposição Stock', 'Bebidas distribuidor E', '2026-01-28'),

-- Fevereiro 2026
('DEMO_USER_ID', 'despesa', 480.00, 'Reposição Stock', 'Alimentos fevereiro fornecedor A', '2026-02-01'),
('DEMO_USER_ID', 'despesa', 320.50, 'Reposição Stock', 'Bebidas fornecedor B', '2026-02-03'),
('DEMO_USER_ID', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel loja fevereiro', '2026-02-10'),
('DEMO_USER_ID', 'despesa', 600.00, 'Reposição Stock', 'Coleção primavera roupas C', '2026-02-12'),
('DEMO_USER_ID', 'despesa', 95.50, 'Serviços', 'Limpeza loja', '2026-02-15'),
('DEMO_USER_ID', 'despesa', 250.25, 'Reposição Stock', 'Higiene fornecedor D', '2026-02-18'),
('DEMO_USER_ID', 'despesa', 110.00, 'Utilitários', 'Eletricidade fevereiro', '2026-02-20'),
('DEMO_USER_ID', 'despesa', 380.00, 'Reposição Stock', 'Alimentos fornecedor A', '2026-02-22'),
('DEMO_USER_ID', 'despesa', 200.00, 'Publicidade', 'Anúncios online', '2026-02-25'),
('DEMO_USER_ID', 'despesa', 175.00, 'Serviços', 'Seguros loja', '2026-02-28'),

-- Março 2026
('DEMO_USER_ID', 'despesa', 520.00, 'Reposição Stock', 'Alimentos março fornecedor A', '2026-03-01'),
('DEMO_USER_ID', 'despesa', 350.75, 'Reposição Stock', 'Bebidas fornecedor B', '2026-03-03'),
('DEMO_USER_ID', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel loja março', '2026-03-10'),
('DEMO_USER_ID', 'despesa', 280.50, 'Reposição Stock', 'Roupas spring collection C', '2026-03-12'),
('DEMO_USER_ID', 'despesa', 120.00, 'Serviços', 'Limpeza loja', '2026-03-15');

-- ============ VENDAS (GANHOS) - 3 MESES ============
-- Dezembro 2025
INSERT INTO public.vendas (user_id, cliente_nome, valor_total, descricao, data) VALUES
('DEMO_USER_ID', 'João Silva', 245.50, 'Alimentos variados', '2025-12-01'),
('DEMO_USER_ID', 'Maria Santos', 89.99, 'Bebidas e snacks', '2025-12-01'),
('DEMO_USER_ID', 'Cliente Anónimo', 320.00, 'Roupas (2 camisetas, 1 hoodie)', '2025-12-02'),
('DEMO_USER_ID', 'Rita Costa', 156.75, 'Produtos higiene e alimentos', '2025-12-02'),
('DEMO_USER_ID', 'Cliente Anónimo', 490.00, 'Roupa inverno (calças, casaco, camisola)', '2025-12-03'),
('DEMO_USER_ID', 'Pedro Oliveira', 287.50, 'Alimentos e bebidas premium', '2025-12-03'),
('DEMO_USER_ID', 'Cliente Anónimo', 165.25, 'Higiene pessoal', '2025-12-04'),
('DEMO_USER_ID', 'Ana Martins', 420.00, 'Compra grande roupas e acessórios', '2025-12-05'),
('DEMO_USER_ID', 'Cliente Anónimo', 198.50, 'Bebidas variadas', '2025-12-05'),
('DEMO_USER_ID', 'Empresa ABC', 1200.00, 'Fornecimento corporativo alimentos', '2025-12-06'),
('DEMO_USER_ID', 'Cliente Anónimo', 75.99, 'Alimentos básicos', '2025-12-07'),
('DEMO_USER_ID', 'Carlos Mendes', 350.00, 'Roupas e acessórios', '2025-12-08'),
('DEMO_USER_ID', 'Cliente Anónimo', 120.75, 'Bebidas e café', '2025-12-08'),
('DEMO_USER_ID', 'Madalena Rocha', 280.50, 'Alimentos frescos e ultracongelados', '2025-12-09'),
('DEMO_USER_ID', 'Cliente Anónimo', 195.00, 'Roupas (camisetas e meias)', '2025-12-10'),
('DEMO_USER_ID', 'Sofia Gomes', 412.25, 'Alimentos premium e bebidas', '2025-12-11'),
('DEMO_USER_ID', 'Cliente Anónimo', 88.50, 'Higiene e cuidados', '2025-12-11'),
('DEMO_USER_ID', 'Roberto Dias', 520.00, 'Roupas lote (trabalho)', '2025-12-12'),
('DEMO_USER_ID', 'Cliente Anónimo', 145.75, 'Alimentos variados', '2025-12-12'),
('DEMO_USER_ID', 'Loja Parceira X', 800.00, 'Fornecimento alimentos grossista', '2025-12-13'),
('DEMO_USER_ID', 'Cliente Anónimo', 235.25, 'Bebidas e alimentos', '2025-12-14'),
('DEMO_USER_ID', 'Filipa Costa', 320.50, 'Roupas de marca e acessórios', '2025-12-15'),
('DEMO_USER_ID', 'Cliente Anónimo', 102.99, 'Produtos higiene', '2025-12-15'),
('DEMO_USER_ID', 'Miguel Teixeira', 410.00, 'Alimentos gourmet e vinho premium', '2025-12-16'),
('DEMO_USER_ID', 'Cliente Anónimo', 180.75, 'Roupas e sapatos', '2025-12-17'),
('DEMO_USER_ID', 'Estela Ramos', 295.00, 'Alimentos e bebidas variadas', '2025-12-18'),
('DEMO_USER_ID', 'Cliente Anónimo', 125.50, 'Café e chás', '2025-12-18'),
('DEMO_USER_ID', 'Empresa XYZ', 950.00, 'Fornecimento para evento corporativo', '2025-12-19'),
('DEMO_USER_ID', 'Cliente Anónimo', 220.75, 'Roupas inverno', '2025-12-20'),
('DEMO_USER_ID', 'Bento Neves', 380.25, 'Alimentos frescos lote', '2025-12-21'),
('DEMO_USER_ID', 'Cliente Anónimo', 165.00, 'Bebidas e higiene', '2025-12-21'),
('DEMO_USER_ID', 'Catarina Pires', 510.00, 'Roupa de festa e acessórios', '2025-12-22'),
('DEMO_USER_ID', 'Cliente Anónimo', 92.50, 'Alimentos básicos', '2025-12-23'),
('DEMO_USER_ID', 'Rui Santos', 425.75, 'Alimentos premium para festa natal', '2025-12-23'),
('DEMO_USER_ID', 'Cliente Anónimo', 280.25, 'Bebidas variadas lote', '2025-12-24'),
('DEMO_USER_ID', 'Clínica Saúde Y', 600.00, 'Fornecimento higiene e produtos wellness', '2025-12-27'),

-- Janeiro 2026
('DEMO_USER_ID', 'Cliente Anónimo', 156.50, 'Alimentos e bebidas', '2026-01-02'),
('DEMO_USER_ID', 'Diana Marques', 320.00, 'Roupas ano novo', '2026-01-02'),
('DEMO_USER_ID', 'Cliente Anónimo', 98.75, 'Higiene pessoal', '2026-01-03'),
('DEMO_USER_ID', 'Gonçalo Lima', 285.50, 'Alimentos frescos lote', '2026-01-04'),
('DEMO_USER_ID', 'Cliente Anónimo', 420.00, 'Roupas desporto', '2026-01-05'),
('DEMO_USER_ID', 'Hélena Silva', 210.25, 'Bebidas premium', '2026-01-05'),
('DEMO_USER_ID', 'Cliente Anónimo', 175.75, 'Alimentos variados', '2026-01-06'),
('DEMO_USER_ID', 'Isadora Costa', 540.00, 'Compra grande roupas e acessórios', '2026-01-07'),
('DEMO_USER_ID', 'Cliente Anónimo', 125.50, 'Café e chás', '2026-01-08'),
('DEMO_USER_ID', 'José Mendes', 380.00, 'Alimentos e bebidas lote', '2026-01-09'),
('DEMO_USER_ID', 'Cliente Anónimo', 92.25, 'Produtos higiene', '2026-01-10'),
('DEMO_USER_ID', 'Karolina Dias', 310.50, 'Roupas primavera', '2026-01-11'),
('DEMO_USER_ID', 'Cliente Anónimo', 198.75, 'Bebidas variadas', '2026-01-12'),
('DEMO_USER_ID', 'Luís Barbosa', 420.00, 'Alimentos frescos fornecimento', '2026-01-13'),
('DEMO_USER_ID', 'Cliente Anónimo', 235.25, 'Alimentos e acessórios', '2026-01-14'),
('DEMO_USER_ID', 'Mara Oliveira', 360.00, 'Roupas e sapatos', '2026-01-15'),
('DEMO_USER_ID', 'Cliente Anónimo', 145.50, 'Higiene e cuidados pessoais', '2026-01-16'),
('DEMO_USER_ID', 'Nata Ferreira', 510.75, 'Alimentos premium e bebidas', '2026-01-17'),
('DEMO_USER_ID', 'Cliente Anónimo', 280.25, 'Bebidas e café', '2026-01-18'),
('DEMO_USER_ID', 'Olga Teixeira', 320.00, 'Roupas lote', '2026-01-19'),

-- Fevereiro 2026
('DEMO_USER_ID', 'Cliente Anónimo', 165.50, 'Alimentos básicos', '2026-02-01'),
('DEMO_USER_ID', 'Paulo Costa', 295.75, 'Bebidas e alimentos', '2026-02-02'),
('DEMO_USER_ID', 'Cliente Anónimo', 420.00, 'Roupas primavera', '2026-02-03'),
('DEMO_USER_ID', 'Quique Monteiro', 210.25, 'Higiene e cuidados', '2026-02-04'),
('DEMO_USER_ID', 'Cliente Anónimo', 380.50, 'Alimentos frescos lote', '2026-02-05'),
('DEMO_USER_ID', 'Rita Pereira', 520.00, 'Roupas desporto e acessórios', '2026-02-06'),
('DEMO_USER_ID', 'Cliente Anónimo', 125.75, 'Café e chás premium', '2026-02-07'),
('DEMO_USER_ID', 'Sérgio Alves', 340.00, 'Alimentos variados fornecimento', '2026-02-08'),
('DEMO_USER_ID', 'Cliente Anónimo', 185.25, 'Bebidas e snacks', '2026-02-09'),
('DEMO_USER_ID', 'Telma Roxo', 360.50, 'Roupas de marca', '2026-02-10'),
('DEMO_USER_ID', 'Cliente Anónimo', 98.75, 'Produtos higiene', '2026-02-11'),
('DEMO_USER_ID', 'Ulisses Gamas', 420.00, 'Alimentos gourmet e bebidas premium', '2026-02-12'),
('DEMO_USER_ID', 'Cliente Anónimo', 210.50, 'Alimentos e bebidas', '2026-02-13'),
('DEMO_USER_ID', 'Vera Nunes', 480.00, 'Roupa completa estação primavera', '2026-02-14'),
('DEMO_USER_ID', 'Cliente Anónimo', 155.75, 'Bebidas variadas', '2026-02-15'),
('DEMO_USER_ID', 'Wagner Farias', 325.25, 'Alimentos frescos', '2026-02-16'),
('DEMO_USER_ID', 'Cliente Anónimo', 195.00, 'Higiene e cuidados', '2026-02-17'),
('DEMO_USER_ID', 'Xáre Mendes', 410.50, 'Roupas e acessórios', '2026-02-18'),
('DEMO_USER_ID', 'Cliente Anónimo', 225.75, 'Alimentos e bebidas variadas', '2026-02-19'),
('DEMO_USER_ID', 'Yara Silva', 520.00, 'Roupas desporto e fitness', '2026-02-20'),

-- Março 2026 (até 16)
('DEMO_USER_ID', 'Cliente Anónimo', 175.50, 'Alimentos básicos', '2026-03-01'),
('DEMO_USER_ID', 'Zóe Costa', 285.75, 'Bebidas e café premium', '2026-03-02'),
('DEMO_USER_ID', 'Cliente Anónimo', 380.00, 'Roupas primavera', '2026-03-03'),
('DEMO_USER_ID', 'Acácio Neves', 215.25, 'Higiene pessoal lote', '2026-03-04'),
('DEMO_USER_ID', 'Cliente Anónimo', 420.50, 'Alimentos frescos fornecimento', '2026-03-05'),
('DEMO_USER_ID', 'Benedita Sousa', 510.00, 'Roupas variadas descontos', '2026-03-06'),
('DEMO_USER_ID', 'Cliente Anónimo', 140.75, 'Café e alimentos gourmet', '2026-03-07'),
('DEMO_USER_ID', 'Custódio Veiga', 360.00, 'Alimentos e bebidas lote', '2026-03-08'),
('DEMO_USER_ID', 'Cliente Anónimo', 205.50, 'Bebidas variadas', '2026-03-09'),
('DEMO_USER_ID', 'Delfina Bastos', 420.00, 'Roupas e sapatos primavera', '2026-03-10'),
('DEMO_USER_ID', 'Cliente Anónimo', 115.75, 'Produtos higiene', '2026-03-11'),
('DEMO_USER_ID', 'Evaristo Lima', 485.25, 'Alimentos premium e bebidas', '2026-03-12'),
('DEMO_USER_ID', 'Cliente Anónimo', 240.50, 'Alimentos e acessórios', '2026-03-13'),
('DEMO_USER_ID', 'Florinda Reis', 380.00, 'Roupas lote primavera', '2026-03-14'),
('DEMO_USER_ID', 'Cliente Anónimo', 170.75, 'Bebidas e café', '2026-03-15'),
('DEMO_USER_ID', 'Gaspar Teles', 420.00, 'Alimentos variados e bebidas', '2026-03-16');

-- Notes about this migration:
-- 1. The user account must be created via the application's auth API first
-- 2. Replace 'DEMO_USER_ID' with the actual UUID from auth.users table
-- 3. To get the user ID after signup, run:
--    SELECT id FROM auth.users WHERE email = 'Demo@demo.com';
-- 4. Then uncomment and run the INSERT statements for profiles and other data
-- 5. This script provides realistic retail data for ~3 months of testing
