# ⚡ SUPER RÁPIDO: Setup em 2 Minutos

## 🎯 O que vai fazer:

1. **Criar utilizador** (30 seg) → Supabase AuthUI
2. **Copiar UUID** (30 seg) → Guardar em bloco de notas
3. **Executar SQL** (60 seg) → Supabase SQL Editor

**Total: ~2 minutos** ⏱️

---

## 📍 PASSO 1: Criar Utilizador (30 segundos)

### Link Direto:
```
https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/auth/users
```

### Na página que aparece:

1. Clique: **"Add User"** (botão azul canto direito)

2. Preencha:
```
Email:               Demo@demo.com
Password:            demo1234
Confirm Password:    demo1234
```

3. Clique: **"Create User"**

4. **COPIE O UUID** que aparece (número com hífens)
   ```
   Exemplo: 550e8400-e29b-41d4-a716-446655440000
   ```

✅ **Pronto! Utilizador criado**

---

## 📍 PASSO 2: Guardar UUID (30 segundos)

**Cole isto num bloco de notas:**
```
UUID_DEMO = seu-uuid-copiado-aqui

Exemplo:
UUID_DEMO = 550e8400-e29b-41d4-a716-446655440000
```

✅ **Pronto! UUID guardado**

---

## 📍 PASSO 3: Executar SQL (60 segundos)

### Link Direto para SQL Editor:
```
https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/sql/new
```

### Cola este SQL (com TEU UUID no lugar de `'seu-uuid'`):

```sql
-- SUBSTITUA 'seu-uuid' PELO VOSSO UUID (com aspas simples)
-- Exemplo: '550e8400-e29b-41d4-a716-446655440000'

INSERT INTO public.profiles (user_id, nome, nome_negocio) VALUES ('seu-uuid', 'Demo', 'Somiles - Retalhista') ON CONFLICT (user_id) DO UPDATE SET nome = 'Demo', nome_negocio = 'Somiles - Retalhista';

INSERT INTO public.stock (user_id, nome_produto, sku, quantidade, preco_unitario, descricao) VALUES ('seu-uuid', 'Arroz Integral 1kg', 'ARR-INT-001', 150, 2.50, 'Arroz integral'), ('seu-uuid', 'Açúcar Branco 1kg', 'AÇU-BRA-001', 200, 1.20, 'Açúcar'), ('seu-uuid', 'Sal Fino 1kg', 'SAL-FIN-001', 300, 0.80, 'Sal'), ('seu-uuid', 'Pão Francês', 'PAO-FRA-001', 80, 0.45, 'Pão'), ('seu-uuid', 'Queijo Meia Cura 500g', 'QUE-MEC-001', 45, 8.99, 'Queijo'), ('seu-uuid', 'Presunto Serrano 200g', 'PNT-SER-001', 60, 12.50, 'Presunto'), ('seu-uuid', 'Azeite Extra Virgem 500ml', 'AZE-VIR-001', 85, 6.50, 'Azeite'), ('seu-uuid', 'Leite UHT 1L', 'LEI-UHT-001', 250, 1.05, 'Leite'), ('seu-uuid', 'Ovos (Dúzia)', 'OVO-DUZ-001', 120, 2.99, 'Ovos'), ('seu-uuid', 'Manteiga 250g', 'MAN-250-001', 70, 4.50, 'Manteiga'), ('seu-uuid', 'Água Mineral 1.5L', 'AGU-MIN-001', 400, 0.65, 'Água'), ('seu-uuid', 'Sumo Laranja 1L', 'SUJ-LAR-001', 120, 2.10, 'Sumo'), ('seu-uuid', 'Refrigerante Cola 330ml', 'REF-COL-001', 250, 1.50, 'Refrigerante'), ('seu-uuid', 'Vinho Tinto Douro 750ml', 'VIN-TIN-001', 90, 9.99, 'Vinho'), ('seu-uuid', 'Cerveja Artesanal 500ml', 'CER-ART-001', 180, 3.50, 'Cerveja'), ('seu-uuid', 'Café Moído 250g', 'CAF-MOI-001', 150, 5.99, 'Café'), ('seu-uuid', 'T-Shirt Básica Branca M', 'TXH-BAS-001', 150, 12.99, 'Camiseta'), ('seu-uuid', 'Calças Jeans Azul M', 'CAL-JEA-001', 85, 49.99, 'Calças'), ('seu-uuid', 'Hoodie Cinzento G', 'HOO-CIN-001', 60, 34.99, 'Hoodie'), ('seu-uuid', 'Sabonete Líquido 250ml', 'SAB-LIQ-001', 120, 2.99, 'Sabonete'), ('seu-uuid', 'Detergente Louça 500ml', 'DET-LOU-001', 150, 1.99, 'Detergente'), ('seu-uuid', 'Champô Neutro 200ml', 'CHA-NEU-001', 80, 5.99, 'Champô'), ('seu-uuid', 'Papel Higienico 12 rolos', 'PAP-HIG-001', 200, 6.99, 'Papel'), ('seu-uuid', 'Iogurte Natural 500ml', 'IOG-NAT-001', 100, 2.20, 'Iogurte'), ('seu-uuid', 'Fiambre Vila Franca 200g', 'FIA-VIL-001', 55, 5.99, 'Fiambre'), ('seu-uuid', 'Saia Comprida Preta P', 'SAI-COM-001', 40, 44.99, 'Saia'), ('seu-uuid', 'Camisola de Lã Cinza M', 'CAM-LAN-001', 70, 29.99, 'Camisola'), ('seu-uuid', 'Casaco Invernoso Preto G', 'CAS-INV-001', 45, 89.99, 'Casaco'), ('seu-uuid', 'Meias Algodão 3 pares', 'MEI-ALG-001', 200, 8.99, 'Meias'), ('seu-uuid', 'Lenço Seda Estampado', 'LEN-SEI-001', 55, 18.50, 'Lenço');

INSERT INTO public.transacoes (user_id, tipo, valor, categoria, descricao, data) VALUES ('seu-uuid', 'despesa', 450.00, 'Reposição Stock', 'Compra lote alimentos', '2025-12-01'), ('seu-uuid', 'despesa', 320.50, 'Reposição Stock', 'Compra bebidas', '2025-12-02'), ('seu-uuid', 'despesa', 1200.00, 'Reposição Stock', 'Compra roupas', '2025-12-03'), ('seu-uuid', 'despesa', 150.25, 'Renda/Aluguel', 'Aluguel loja', '2025-12-10'), ('seu-uuid', 'despesa', 120.00, 'Utilitários', 'Eletricidade', '2025-12-20'), ('seu-uuid', 'despesa', 520.00, 'Reposição Stock', 'Alimentos ano novo', '2026-01-02'), ('seu-uuid', 'despesa', 400.25, 'Reposição Stock', 'Bebidas', '2026-01-03'), ('seu-uuid', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel', '2026-01-10'), ('seu-uuid', 'despesa', 280.50, 'Reposição Stock', 'Roupas', '2026-01-12'), ('seu-uuid', 'despesa', 125.00, 'Utilitários', 'Eletricidade', '2026-01-20'), ('seu-uuid', 'despesa', 480.00, 'Reposição Stock', 'Alimentos', '2026-02-01'), ('seu-uuid', 'despesa', 320.50, 'Reposição Stock', 'Bebidas', '2026-02-03'), ('seu-uuid', 'despesa', 150.00, 'Renda/Aluguel', 'Aluguel', '2026-02-10'), ('seu-uuid', 'despesa', 600.00, 'Reposição Stock', 'Coleção primavera', '2026-02-12'), ('seu-uuid', 'despesa', 110.00, 'Utilitários', 'Eletricidade', '2026-02-20');

INSERT INTO public.vendas (user_id, cliente_nome, valor_total, descricao, data) VALUES ('seu-uuid', 'João Silva', 245.50, 'Alimentos', '2025-12-01'), ('seu-uuid', 'Maria Santos', 89.99, 'Bebidas', '2025-12-01'), ('seu-uuid', 'Cliente Anónimo', 320.00, 'Roupas', '2025-12-02'), ('seu-uuid', 'Rita Costa', 156.75, 'Produtos', '2025-12-02'), ('seu-uuid', 'Pedro Oliveira', 287.50, 'Alimentos premium', '2025-12-03'), ('seu-uuid', 'Ana Martins', 420.00, 'Roupas', '2025-12-05'), ('seu-uuid', 'Empresa ABC', 1200.00, 'Fornecimento corporativo', '2025-12-06'), ('seu-uuid', 'Carlos Mendes', 350.00, 'Roupas', '2025-12-08'), ('seu-uuid', 'Diana Marques', 320.00, 'Roupas', '2026-01-02'), ('seu-uuid', 'Gonçalo Lima', 285.50, 'Alimentos', '2026-01-04'), ('seu-uuid', 'Isadora Costa', 540.00, 'Roupas', '2026-01-07'), ('seu-uuid', 'José Mendes', 380.00, 'Alimentos', '2026-01-09'), ('seu-uuid', 'Karolina Dias', 310.50, 'Roupas', '2026-01-11'), ('seu-uuid', 'Luís Barbosa', 420.00, 'Alimentos', '2026-01-13'), ('seu-uuid', 'Paulo Costa', 295.75, 'Bebidas', '2026-02-02');
```

### Como fazer:

1. Abra a página acima
2. **Ctrl+F** para encontrar `'seu-uuid'`
3. **Ctrl+H** para Replace
4. Coloque seu UUID (com aspas)
5. **Replace All**
6. Clique: **"Run"** (Ctrl+Enter)
7. Aguarde 5 segundos

✅ **Pronto! SQL executado com dados**

---

## ✅ Verificar se correu bem

### Via Browser - Login na App

1. Abra: http://localhost:5173
2. Clique: **Sign In**
3. Preencha:
```
Email:    Demo@demo.com
Password: demo1234
```
4. Clique: **Sign In**

### Veja os dados em:
- **Dashboard** → Gráficos
- **Stock** → 27+ produtos
- **Transações** → 15 despesas
- **Vendas** → 15 vendas

🎉 **Pronto! Tudo funciona!**

---

## ⏱️ Resumo Tempo

```
Passo 1: Criar user    → 30 segundos
Passo 2: Guardar UUID  → 30 segundos  
Passo 3: SQL + Run     → 60 segundos
TOTAL:                 → 2 MINUTOS
```

---

## 🔗 Links Diretos (para não esquecer)

**Criar Utilizador:**
https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/auth/users

**SQL Editor:**
https://app.supabase.com/project/yxicmhvbmjpbwvylnugr/sql/new

**Aplicação:**
http://localhost:5173

---

## ❓ Se algo falhar

- Erro "Email já existe" → Faça login normal
- Erro SQL → Verifique se o UUID tem aspas: `'550e8400-...'`
- Nenhum dado aparece → Aguarde 5 segundos e atualize (F5)

---

**Comece agora! ⚡**
