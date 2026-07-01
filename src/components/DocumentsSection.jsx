import { useState } from "react";
import { FileText, CheckCircle, AlertCircle, Download, Clock } from "lucide-react";

const REQUIRED_DOCS = [
  { title: "Паспорт РФ", desc: "Копия всех страниц + оригинал при прибытии" },
  { title: "СНИЛС", desc: "Оригинал" },
  { title: "ИНН", desc: "Копия или справка из налоговой" },
  { title: "Справка МВД о несудимости", desc: "Срок 3 месяца. Запросить онлайн или в полиции" },
  { title: "Медсправка", desc: "Получается на месте, в точке сбора" },
  { title: "Резюме", desc: "1–2 страницы: ФИО, опыт, контакты" },
];

const RECOMMENDED_DOCS = [
  { title: "Дипломы об образовании", desc: "Копии" },
  { title: "Сертификаты квалификации", desc: "Если есть" },
  { title: "Трудовая книжка", desc: "Копия выписки за 3–5 лет" },
  { title: "Рекомендательные письма", desc: "От 1–2 работодателей" },
];

const ADDITIONAL_DOCS = [
  { title: "Справка с места жительства", desc: "Если есть" },
  { title: "Справка об отсутствии задолженности", desc: "Налоги, алименты" },
];

const PREP_TIMELINE = [
  { period: "За 2 недели", action: "Отправить паспорт, СНИЛС, ИНН, резюме" },
  { period: "За 1 неделю", action: "Справка МВД, дипломы" },
  { period: "За 3 дня", action: "Забронировать билет до точки сбора" },
  { period: "За 1 день", action: "Собрать чемодан с вещами ПН, проверка документов" },
  { period: "День медкомиссии", action: "Привезти оригиналы документов" },
];

export default function DocumentsSection() {
  const [tab, setTab] = useState("required");

  return (
    <section id="documents" className="py-24 sm:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">Документы</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            Какие документы готовить
          </h2>
          <p className="text-muted-foreground font-inter mt-4 max-w-xl mx-auto">
            Полный чек-лист с категориями и временной шкалой подготовки
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "required", label: "Обязательные" },
            { id: "recommended", label: "Рекомендуемые" },
            { id: "additional", label: "Дополнительно" },
            { id: "timeline", label: "Таймлайн" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 rounded-lg font-inter text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Required */}
        {tab === "required" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {REQUIRED_DOCS.map((doc) => (
              <div key={doc.title} className="bg-card border border-border rounded-xl p-5 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <div className="font-inter font-bold text-sm text-foreground">{doc.title}</div>
                  <div className="font-inter text-xs text-muted-foreground mt-0.5">{doc.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended */}
        {tab === "recommended" && (
          <div className="grid sm:grid-cols-2 gap-4">
            {RECOMMENDED_DOCS.map((doc) => (
              <div key={doc.title} className="bg-card border border-border rounded-xl p-5 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="font-inter font-bold text-sm text-foreground">{doc.title}</div>
                  <div className="font-inter text-xs text-muted-foreground mt-0.5">{doc.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional */}
        {tab === "additional" && (
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {ADDITIONAL_DOCS.map((doc) => (
              <div key={doc.title} className="bg-card border border-border rounded-xl p-5 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <div className="font-inter font-bold text-sm text-foreground">{doc.title}</div>
                  <div className="font-inter text-xs text-muted-foreground mt-0.5">{doc.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        {tab === "timeline" && (
          <div className="max-w-2xl mx-auto space-y-3">
            {PREP_TIMELINE.map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-mono text-xs font-bold text-accent">{step.period}</div>
                  <div className="font-inter text-sm text-foreground">{step.action}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legal basis download */}
        <div className="mt-10 bg-secondary/60 border border-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <FileText className="h-7 w-7 text-accent" />
            </div>
            <div>
              <div className="font-inter font-bold text-base text-foreground">Юридическое основание проекта</div>
              <div className="text-muted-foreground font-inter text-xs mt-1">Постановление Правительства РФ № 2255 от 22.12.2023</div>
            </div>
          </div>
          <a
            href="https://media.base44.com/files/public/69f4a665db2c72a42818d397/a60e58511_Postanovlenie_11zon.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            <Download className="h-4 w-4" />
            Скачать
          </a>
        </div>
      </div>
    </section>
  );
}