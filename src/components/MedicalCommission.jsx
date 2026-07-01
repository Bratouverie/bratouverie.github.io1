import VisualPlaceholder from "./VisualPlaceholder";
import { Stethoscope, Clock, Banknote, CheckCircle, AlertTriangle } from "lucide-react";

const PROCEDURES = [
  "Общий анализ крови",
  "Анализ мочи",
  "Биохимия (печень, почки, глюкоза)",
  "ВИЧ / Гепатит / Сифилис",
  "ЭКГ (электрокардиограмма)",
  "Флюорография (рентген лёгких)",
  "УЗИ (при необходимости)",
  "Осмотр терапевта",
  "Осмотр невролога",
  "Осмотр офтальмолога",
  "Осмотр психолога",
];

const CHECKLIST = [
  "Приехать натощак (кровь на анализы)",
  "Взять паспорт (оригинал)",
  "Удобная одежда (для УЗИ)",
  "Время: 2–3 часа на весь процесс",
  "Результаты придут СМС на телефон",
];

export default function MedicalCommission() {
  return (
    <section id="medical" className="py-24 sm:py-32 bg-secondary/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">Медкомиссия</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            Медкомиссия: что, где, когда и зачем
          </h2>
          <p className="text-muted-foreground font-inter mt-4 max-w-xl mx-auto">
            Без отбраковки — цель задокументировать исходное состояние здоровья
          </p>
        </div>

        {/* Important notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="font-inter text-sm text-amber-800">
            <span className="font-bold">Важно:</span> Медкомиссия НЕ является фактором отбраковки. При обнаружении хронических болезней попросят подтверждение медикаментозного лечения, но в программе не откажут. Цель — зафиксировать исходное состояние здоровья.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: schedule & cost */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-inter font-bold text-foreground">Режим работы</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-muted-foreground">Дни:</span>
                  <span className="font-semibold text-foreground">Вторник – пятница</span>
                </div>
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-muted-foreground">Часы:</span>
                  <span className="font-semibold text-foreground">08:00 – 16:00</span>
                </div>
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-muted-foreground">Результаты:</span>
                  <span className="font-semibold text-foreground">3–5 дней</span>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Banknote className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-inter font-bold text-foreground">Стоимость</h3>
              </div>
              <div className="text-3xl font-mono font-black text-accent">0 ₽</div>
              <p className="font-inter text-xs text-muted-foreground mt-1">Полностью оплачена работодателем</p>
            </div>

            {/* Visual */}
            <VisualPlaceholder id={61} ratio="4:3" label="Процедуры медкомиссии" />
          </div>

          {/* Right: procedures & checklist */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-inter font-bold text-foreground">Процедуры</h3>
              </div>
              <ul className="grid grid-cols-2 gap-2">
                {PROCEDURES.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-inter text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-inter font-bold text-sm text-foreground mb-3">Чек-лист для участника</h3>
              <ul className="space-y-2">
                {CHECKLIST.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-inter text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}