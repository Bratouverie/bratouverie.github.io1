import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#1e3a5f", "#f97316", "#22c55e", "#64748b", "#3b82f6", "#a855f7", "#ec4899", "#14b8a6"];

const formatValue = (v) => {
  if (v >= 1000) return `${(v / 1000).toFixed(0)} тыс.`;
  return String(v);
};

function SalaryRangeBar({ data, title }) {
  const formatted = data.map((d) => ({
    ...d,
    Минимум: d.min,
    Максимум: d.max,
  }));

  return (
    <div>
      <h3 className="font-inter font-bold text-foreground text-base mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formatted} margin={{ top: 5, right: 20, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "Inter" }} angle={-35} textAnchor="end" interval={0} />
          <YAxis tickFormatter={(v) => `${v}к`} tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(v) => [`${(v * 1000).toLocaleString("ru-RU")} ₽`, ""]}
            contentStyle={{ fontFamily: "Inter", fontSize: 12, borderRadius: 8 }}
          />
          <Legend wrapperStyle={{ fontFamily: "Inter", fontSize: 12, paddingTop: 8 }} />
          <Bar dataKey="Минимум" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Максимум" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground font-inter text-center mt-1">* тыс. ₽ в месяц</p>
    </div>
  );
}

function SimpleBar({ data, title }) {
  const formatted = data.map((d) => ({ ...d, Значение: d.value }));

  return (
    <div>
      <h3 className="font-inter font-bold text-foreground text-base mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={formatted} margin={{ top: 5, right: 20, left: 10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: "Inter" }} angle={-30} textAnchor="end" interval={0} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip
            formatter={(v) => [
              v >= 10000 ? `${v.toLocaleString("ru-RU")} ₽` : v >= 1 ? `${v} млн ₽` : `${v}`,
              ""
            ]}
            contentStyle={{ fontFamily: "Inter", fontSize: 12, borderRadius: 8 }}
          />
          <Bar dataKey="Значение" radius={[4, 4, 0, 0]}>
            {formatted.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function PieViz({ data, title }) {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    if (percent < 0.08) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontFamily="Inter" fontWeight="600">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h3 className="font-inter font-bold text-foreground text-base mb-4">{title}</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={100} dataKey="value" labelLine={false} label={renderLabel}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color || COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v, name) => [`${v.toLocaleString("ru-RU")} тыс. ₽`, name]}
              contentStyle={{ fontFamily: "Inter", fontSize: 12, borderRadius: 8 }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 flex-1">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color || COLORS[i % COLORS.length] }} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-inter text-sm text-foreground">{d.name}</span>
                  <span className="font-inter text-sm font-bold text-foreground ml-2 shrink-0">
                    {d.value.toLocaleString("ru-RU")} тыс. ₽
                  </span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(d.value / data.reduce((a, b) => a + b.value, 0)) * 100}%`,
                      backgroundColor: d.color || COLORS[i % COLORS.length],
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ArticleChart({ data }) {
  const isRangeBar = data.data?.[0]?.min !== undefined && data.data?.[0]?.max !== undefined;

  return (
    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
      {data.type === "pie" ? (
        <PieViz data={data.data} title={data.title} />
      ) : isRangeBar ? (
        <SalaryRangeBar data={data.data} title={data.title} />
      ) : (
        <SimpleBar data={data.data} title={data.title} />
      )}
    </div>
  );
}