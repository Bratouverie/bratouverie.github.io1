import VisualPlaceholder from "./VisualPlaceholder";
import { Clock } from "lucide-react";

const TIMELINE = [
  { time: "06:30", title: "Подъём, завтрак", desc: "Столовая на базе, 3-разовое питание", visualId: 14, ratio: "3:2" },
  { time: "07:00", title: "Линейка, брифинг", desc: "Инструктаж по ТБ, план на день", visualId: 15, ratio: "3:2" },
  { time: "08:00", title: "Доставка на объект", desc: "Охраняемый автобус до объекта", visualId: 16, ratio: "3:2" },
  { time: "08:00–12:00", title: "Работа на объекте", desc: "Восстановительные работы", visualId: 17, ratio: "3:2" },
  { time: "12:00–13:00", title: "Обед", desc: "Горячее питание на объекте", visualId: 18, ratio: "3:2" },
  { time: "13:00–17:00", title: "Продолжение работ", desc: "Работа до конца смены", visualId: 19, ratio: "3:2" },
  { time: "17:30", title: "Возврат на базу", desc: "Доставка обратно на базу", visualId: 20, ratio: "3:2" },
  { time: "18:00–19:00", title: "Ужин, свободное время", desc: "Столовая, отдых", visualId: 21, ratio: "3:2" },
  { time: "19:00–23:00", title: "Отдых", desc: "Спортзал, психолог, ТВ, интернет", visualId: 22, ratio: "3:2" },
  { time: "23:00", title: "Сон", desc: "Восстановление сил", visualId: null, ratio: "3:2" },
];

export default function DayOfSpecialist() {
  return (
    <section id="day-of-specialist" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">День специалиста</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            День на объекте: почасовая шкала
          </h2>
          <p className="text-muted-foreground font-inter mt-4 max-w-xl mx-auto">
            Как проходит типичный рабочий день специалиста на программе восстановления
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {TIMELINE.filter((t) => t.visualId).map((item) => (
              <div key={item.time} className="bg-card border border-border rounded-xl p-4 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="font-mono text-xs font-bold text-accent">{item.time}</span>
                </div>
                <h3 className="font-inter font-bold text-sm text-foreground mb-1">{item.title}</h3>
                <p className="font-inter text-xs text-muted-foreground mb-3">{item.desc}</p>
                <VisualPlaceholder id={item.visualId} ratio={item.ratio} />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Stat label="Часов работы" value="8–12" />
          <Stat label="Дней в неделю" value="5–6" />
          <Stat label="Питание" value="3-разовое" />
          <Stat label="Отдых" value="спортзал, ТВ" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center bg-secondary/50 rounded-xl p-4">
      <div className="font-mono text-lg font-bold text-accent">{value}</div>
      <div className="font-inter text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}