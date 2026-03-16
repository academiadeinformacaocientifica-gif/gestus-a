import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format, subDays } from "date-fns";
import { pt } from "date-fns/locale";

interface Transaction {
  tipo: string;
  valor: number;
  data: string;
}

export function DashboardChart({ transactions }: { transactions: Transaction[] }) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, "yyyy-MM-dd");
    const dayTransactions = transactions.filter((t) => t.data === dateStr);

    return {
      name: format(date, "EEE", { locale: pt }),
      Faturamento: dayTransactions
        .filter((t) => t.tipo === "ganho")
        .reduce((sum, t) => sum + Number(t.valor), 0),
      Despesas: dayTransactions
        .filter((t) => t.tipo === "despesa")
        .reduce((sum, t) => sum + Number(t.valor), 0),
    };
  });

  return (
    <div className="bg-card rounded-2xl border border-border p-5 shadow-card h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-foreground">Performance de vendas</h3>
        <span className="text-xs text-muted-foreground">Últimos 7 dias</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={last7Days} barGap={6} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={45}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              fontSize: "12px",
              boxShadow: "var(--shadow-card-hover)",
            }}
            formatter={(value: number) => `${value.toFixed(2)}€`}
            cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
          />
          <Bar dataKey="Faturamento" fill="hsl(var(--ganho))" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Despesas" fill="hsl(var(--despesa))" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
