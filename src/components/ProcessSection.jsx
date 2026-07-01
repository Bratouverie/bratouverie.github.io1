import VisualPlaceholder from "./VisualPlaceholder";
import { FileText, Phone, ShieldCheck, MapPin, Stethoscope, PenTool, Banknote, Plane, ClipboardCheck } from "lucide-react";

const STEPS = [
  { day: "День 1", icon: FileText, title: "Заявка", desc: "Заполните форму на сайте или позвоните", docs: "Паспорт, резюме", visualId: 44, ratio: "4:3" },
  { day: "День 2–3", icon: Phone, title: "Собеседование", desc: "По телефону или через мессенджер", docs: "Опыт работы, контакты", visualId: 45, ratio: "4:3" },
  { day: "День 4", icon: ShieldCheck, title: "Проверка безопасности", desc: "Проверка в органах безопасности (2–3 дня)", docs: "Справка о несудимости", visualId: 46, ratio: "4:3" },
  { day: "День 5", icon: MapPin, title: "Приглашение в точку сбора", desc: "При положительном решении — приглашение", docs: "Билет до точки сбора", visualId: 47, ratio: "4:3" },
  { day: "День 5–7", icon: ClipboardCheck, title: "Прибытие в точку сбора", desc: "Собрать чемодан + документы ПН", docs: "Все оригиналы документов", visualId: 48, ratio: "4:3" },
  { day: "День 8–9", icon: Stethoscope, title: "Медкомиссия + допуски", desc: "ВТ–ПТ, 08:00–16:00, оформление секретности", docs: "Медкарта, анализы", visualId: 49, ratio: "4:3" },
  { day: "День 10", icon: PenTool, title: "Подписание договора", desc: "Трудовой договор по ТК РФ", docs: "Трудовой договор (2 экз.)", visualId: 50, ratio: "4:3" },
  { day: "День 11", icon: Banknote, title: "Выплата подъёмных", desc: "625 000 ₽ на карту в течение 5 дней", docs: "Банковская карта", visualId: 51, ratio: "4:3" },
  { day: "День 12", icon: Plane, title: "Отправка самолётом", desc: "В Ростов-на-Дону → автобус в Макеевку", docs: "Билет (за счёт программы)", visualId: 52, ratio: "4:3" },
  { day: "День 13–15", icon: MapPin, title: "Первый день работы", desc: "Распределение по объектам, начало работы", docs: "Пропуск на объект", visualId: 53, ratio: "4:3" },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 sm:py-32 bg-secondary/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">Процесс</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            10 шагов: от заявки до первой зарплаты
          </h2>
          <p className="text-muted-foreground font-inter mt-4 max-w-xl mx-auto">
            Полный путь занимает 2–3 недели. Каждый шаг с таймлайном и списком документов.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-px" />

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <div key={i} className={`relative flex items-start gap-6 sm:gap-12 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                {/* Content */}
                <div className={`flex-1 sm:text-${i % 2 === 0 ? "right" : "left"} pl-16 sm:pl-0`}>
                  <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300 inline-block text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="h-5 w-5 text-accent" />
                      <span className="font-mono text-xs text-accent font-bold">{step.day}</span>
                    </div>
                    <h3 className="font-inter font-bold text-base text-foreground">{step.title}</h3>
                    <p className="font-inter text-sm text-muted-foreground mt-1">{step.desc}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-inter text-xs text-muted-foreground">{step.docs}</span>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-4 border-background shadow-sm z-10 mt-6" />

                {/* Visual on other side */}
                <div className="hidden sm:block flex-1">
                  <VisualPlaceholder id={step.visualId} ratio={step.ratio} className="max-w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
          <p className="font-inter text-sm text-foreground">
            <span className="font-bold">Итого:</span> от заявки до первой зарплаты — 2–3 недели
          </p>
        </div>
      </div>
    </section>
  );
}