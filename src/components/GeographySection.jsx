import { useState } from "react";
import { MapPin, Building2, Banknote } from "lucide-react";

const LNR_CITIES = [
  { city: "Луганск", objects: "Жилые дома, школы, поликлиники", priority: "Высокий", note: "Столица ЛНР, центр восстановления" },
  { city: "Алчевск", objects: "Жилые дома, больница", priority: "Высокий", note: "Крупный промышленный центр" },
  { city: "Антрацит", objects: "Жилые дома, школа", priority: "Средний", note: "Угольная промышленность" },
  { city: "Ровеньки", objects: "Жилые дома, социальные объекты", priority: "Средний", note: "Пограничный город" },
  { city: "Свердловск (Должанск)", objects: "Жилые дома, школа", priority: "Средний", note: "Административный центр района" },
  { city: "Краснодон", objects: "Жилые дома, больница", priority: "Средний", note: "Культурный центр" },
  { city: "Красный Луч (Хрустальный)", objects: "Жилые дома, школа", priority: "Низкий", note: "Малая численность населения" },
  { city: "Стаханов (Кадиевка)", objects: "Жилые дома, учреждения культуры", priority: "Средний", note: "Исторический центр" },
  { city: "Брянка", objects: "Жилые дома", priority: "Низкий", note: "Малое поселение" },
  { city: "Кировск", objects: "Жилые дома, школа", priority: "Низкий", note: "Пригородное поселение" },
  { city: "Лутугино", objects: "Жилые дома, социальные объекты", priority: "Средний", note: "Сельское поселение" },
  { city: "Молодогвардейск", objects: "Жилые дома, школа", priority: "Средний", note: "Молодёжный центр" },
  { city: "Суходольск", objects: "Жилые дома", priority: "Низкий", note: "Малое поселение" },
  { city: "Первомайск", objects: "Жилые дома, школа", priority: "Средний", note: "Сельское поселение" },
];

const DNR_CITIES = [
  { city: "Мариуполь", objects: "Жилые дома, школы, больницы", priority: "Высокий", note: "Крупнейший город, приоритет" },
  { city: "Макеевка", objects: "Жилые дома, школы", priority: "Высокий", note: "Крупный промышленный центр" },
  { city: "Енакиево", objects: "Жилые дома, школа", priority: "Высокий", note: "Металлургический центр" },
  { city: "Иловайск", objects: "Жилые дома, социальные объекты", priority: "Высокий", note: "Стратегический центр" },
  { city: "Ждановка", objects: "Жилые дома, социальные объекты", priority: "Средний", note: "Пригородное поселение" },
  { city: "Кировское (Крестовка)", objects: "Жилые дома, школа", priority: "Средний", note: "Административный центр" },
  { city: "Шахтерск", objects: "Жилые дома, больница", priority: "Средний", note: "Угольный центр" },
  { city: "Снежное", objects: "Жилые дома, школа", priority: "Средний", note: "Высокогорное поселение" },
  { city: "Торез (Чистяково)", objects: "Жилые дома, учреждения", priority: "Средний", note: "Промышленный центр" },
  { city: "Харцызск", objects: "Жилые дома, школы", priority: "Средний", note: "Промышленный центр" },
  { city: "Новоазовск", objects: "Жилые дома, больница", priority: "Средний", note: "Приморский город" },
  { city: "Таганрог", objects: "Жилые дома, школы, культурные объекты", priority: "Средний", note: "Исторический город" },
  { city: "Амвросиевка", objects: "Жилые дома, школа", priority: "Низкий", note: "Сельское поселение" },
  { city: "Зугрэс", objects: "Жилые дома", priority: "Низкий", note: "Малое поселение" },
];

const VOLUMES = [
  { category: "Жилые дома", target: "500", unit: "зданий", period: "24–36 мес." },
  { category: "Жилые помещения", target: "5 000", unit: "квартир", period: "24–36 мес." },
  { category: "Школы", target: "50", unit: "учреждений", period: "18–30 мес." },
  { category: "Больницы", target: "20", unit: "учреждений", period: "18–24 мес." },
  { category: "Дороги", target: "100", unit: "км", period: "12–24 мес." },
  { category: "Водопроводы", target: "150", unit: "км", period: "18–24 мес." },
  { category: "Электросети", target: "200", unit: "км", period: "12–18 мес." },
  { category: "Телекоммуникации", target: "300", unit: "км", period: "12–18 мес." },
  { category: "Население, получившее жильё", target: "10 000", unit: "чел.", period: "24–36 мес." },
  { category: "Созданные рабочие места", target: "2 000", unit: "мест", period: "Параллельно" },
];

const BUDGET_TYPES = [
  { label: "Жилые объекты", pct: 45, color: "bg-accent" },
  { label: "Социальная инфраструктура", pct: 30, color: "bg-primary" },
  { label: "Коммунальная инфраструктура", pct: 25, color: "bg-muted-foreground" },
];

const PRIORITY_COLORS = {
  "Высокий": "bg-red-100 text-red-700 border-red-200",
  "Средний": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Низкий": "bg-green-100 text-green-700 border-green-200",
};

function CityTable({ cities, title }) {
  return (
    <div>
      <h4 className="font-inter font-bold text-base text-foreground mb-3 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-accent" />
        {title}
      </h4>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-xs font-inter">
          <thead>
            <tr className="bg-secondary/60">
              <th className="text-left px-3 py-2.5 font-semibold text-foreground">Город</th>
              <th className="text-left px-3 py-2.5 font-semibold text-foreground hidden sm:table-cell">Тип объектов</th>
              <th className="text-left px-3 py-2.5 font-semibold text-foreground">Приоритет</th>
              <th className="text-left px-3 py-2.5 font-semibold text-foreground hidden lg:table-cell">Примечания</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c, i) => (
              <tr key={c.city} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                <td className="px-3 py-2.5 font-semibold text-foreground">{c.city}</td>
                <td className="px-3 py-2.5 text-muted-foreground hidden sm:table-cell">{c.objects}</td>
                <td className="px-3 py-2.5">
                  <span className={`inline-block px-2 py-0.5 rounded-full border text-xs font-medium ${PRIORITY_COLORS[c.priority]}`}>
                    {c.priority}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-muted-foreground hidden lg:table-cell">{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GeographySection() {
  const [tab, setTab] = useState("geo");

  return (
    <section id="geography" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">Масштаб</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            География и масштаб проекта
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "geo", label: "Города и объекты", icon: MapPin },
            { id: "volumes", label: "Объёмы работ", icon: Building2 },
            { id: "budget", label: "Бюджет", icon: Banknote },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-inter text-sm font-medium transition-all duration-200 ${
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/30"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Geo tab */}
        {tab === "geo" && (
          <div className="space-y-10">
            <CityTable cities={LNR_CITIES} title="Луганская Народная Республика (ЛНР)" />
            <CityTable cities={DNR_CITIES} title="Донецкая Народная Республика (ДНР)" />
            <div className="flex flex-wrap gap-4 text-xs font-inter text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Высокий приоритет — первоочередное восстановление</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> Средний приоритет — последующие этапы</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Низкий приоритет</span>
            </div>
          </div>
        )}

        {/* Volumes tab */}
        {tab === "volumes" && (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm font-inter">
              <thead>
                <tr className="bg-secondary/60">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Категория</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">Целевой показатель</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">Единица</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">Срок выполнения</th>
                </tr>
              </thead>
              <tbody>
                {VOLUMES.map((v, i) => (
                  <tr key={v.category} className={i % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                    <td className="px-4 py-3 font-medium text-foreground">{v.category}</td>
                    <td className="px-4 py-3 text-center font-mono font-bold text-accent text-base">{v.target}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{v.unit}</td>
                    <td className="px-4 py-3 text-center text-muted-foreground">{v.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Budget tab */}
        {tab === "budget" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="text-4xl font-mono font-black text-accent mb-2">50+ млрд ₽</div>
              <div className="font-inter text-muted-foreground">Общий бюджет программы (финансирование уточняется)</div>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm font-inter">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="font-bold text-foreground">Федеральный бюджет РФ</div>
                  <div className="text-muted-foreground text-xs mt-1">Основное финансирование</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="font-bold text-foreground">Бюджеты ЛНР и ДНР</div>
                  <div className="text-muted-foreground text-xs mt-1">Дополнительное финансирование</div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="font-bold text-foreground">Частные инвестиции</div>
                  <div className="text-muted-foreground text-xs mt-1">Возможны по согласованию</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-inter font-bold text-base text-foreground mb-6">Распределение бюджета по направлениям</h3>
              <div className="space-y-4">
                {BUDGET_TYPES.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-inter text-sm text-foreground">{b.label}</span>
                      <span className="font-mono font-bold text-accent">{b.pct}%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-inter font-bold text-base text-foreground mb-4">Виды восстанавливаемых объектов</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-sm font-inter">
                <div>
                  <div className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    Жилые объекты (45%)
                  </div>
                  <ul className="space-y-1 text-muted-foreground text-xs pl-4">
                    <li>Многоэтажные жилые дома (3–5 этажей)</li>
                    <li>Коттеджные комплексы (пригородные зоны)</li>
                    <li>Социальное жильё для малообеспеченных</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                    Социальная инфраструктура (30%)
                  </div>
                  <ul className="space-y-1 text-muted-foreground text-xs pl-4">
                    <li>Школы (начальные и средние)</li>
                    <li>Поликлиники и больницы</li>
                    <li>Детские сады</li>
                    <li>Культурные центры, библиотеки</li>
                    <li>Спортивные объекты</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block" />
                    Коммунальная инфраструктура (25%)
                  </div>
                  <ul className="space-y-1 text-muted-foreground text-xs pl-4">
                    <li>Дороги и уличное освещение</li>
                    <li>Водоснабжение и канализация</li>
                    <li>Электроснабжение</li>
                    <li>Телекоммуникационные сети</li>
                    <li>Общественный транспорт</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}