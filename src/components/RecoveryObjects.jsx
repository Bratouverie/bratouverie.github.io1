import { useState } from "react";
import VisualPlaceholder from "./VisualPlaceholder";
import { MapPin, Users, Calendar, Banknote } from "lucide-react";
import { RECOVERY_OBJECTS } from "@/lib/calculatorData";

export default function RecoveryObjects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const obj = RECOVERY_OBJECTS[activeIdx];

  return (
    <section id="objects" className="py-24 sm:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">Объекты</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            Где вы будете работать: реальные объекты
          </h2>
          <p className="text-muted-foreground font-inter mt-4 max-w-xl mx-auto">
            Конкретные объекты восстановления с адресами, командами и зарплатами
          </p>
        </div>

        {/* Object selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {RECOVERY_OBJECTS.map((o, i) => (
            <button
              key={o.city}
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
                activeIdx === i
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/30"
              }`}
            >
              {o.city}
            </button>
          ))}
        </div>

        {/* Object details */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: images */}
          <div className="space-y-4">
            <VisualPlaceholder id={obj.visualId} ratio="3:2" label={obj.name} />
            <div className="grid grid-cols-2 gap-4">
              <VisualPlaceholder id={obj.baseVisualId} ratio="4:3" label="База размещения" />
              <VisualPlaceholder id={obj.baseVisualId + 1} ratio="4:3" label="Условия проживания" />
            </div>
          </div>

          {/* Right: details */}
          <div className="space-y-5">
            <div>
              <h3 className="font-inter font-black text-2xl text-foreground">{obj.name}</h3>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-inter text-sm">{obj.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span className="font-inter text-xs text-muted-foreground">Сроки</span>
                </div>
                <div className="font-inter font-bold text-sm text-foreground">{obj.period}</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="h-4 w-4 text-accent" />
                  <span className="font-inter text-xs text-muted-foreground">Зарплата</span>
                </div>
                <div className="font-inter font-bold text-sm text-foreground">{obj.salaryRange}</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-accent" />
                <span className="font-inter text-xs text-muted-foreground">Команда</span>
              </div>
              <div className="font-inter text-sm text-foreground">{obj.team}</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <div className="font-inter font-bold text-sm text-foreground mb-3">Виды работ:</div>
              <ul className="grid grid-cols-2 gap-2">
                {obj.works.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-inter text-muted-foreground">
                    <span className="text-accent shrink-0 mt-0.5">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Map placeholder */}
            <VisualPlaceholder id={41} ratio="16:9" label="Карта объектов ЛНР/ДНР" />
          </div>
        </div>
      </div>
    </section>
  );
}