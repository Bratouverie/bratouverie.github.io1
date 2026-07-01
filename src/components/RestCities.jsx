import VisualPlaceholder from "./VisualPlaceholder";
import { MapPin, Clock } from "lucide-react";

const CITIES = [
  {
    name: "Макеевка",
    role: "Главная база",
    distance: "0–30 км от объектов",
    amenities: ["Ресторан", "Кинотеатр", "Парк", "Интернет-кафе", "Прачечная"],
    weekends: "Суббота – воскресенье",
    visualId: 75,
  },
  {
    name: "Мариуполь",
    role: "Город у моря",
    distance: "60–80 км (групповой проезд)",
    amenities: ["Море", "Рестораны", "Музеи", "Парк аттракционов"],
    weekends: "Суббота – воскресенье",
    visualId: 76,
  },
  {
    name: "Луганск",
    role: "Редкие выезды",
    distance: "100+ км",
    amenities: ["Музеи", "Театр", "Рестораны"],
    weekends: "По согласованию",
    visualId: 77,
  },
  {
    name: "Алчевск",
    role: "Редкие выезды",
    distance: "150+ км",
    amenities: ["Парки", "Культурные центры"],
    weekends: "По согласованию",
    visualId: 78,
  },
];

export default function RestCities() {
  return (
    <section id="rest-cities" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">Отдых</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            Отдыхайте в ближайших городах во время вахты
          </h2>
          <p className="text-muted-foreground font-inter mt-4 max-w-xl mx-auto">
            Выходные в городах ЛНР/ДНР — питание, жильё и проезд оплачены
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CITIES.map((city) => (
            <div key={city.name} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-colors">
              <VisualPlaceholder id={city.visualId} ratio="3:2" label={city.name} />

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-inter font-bold text-lg text-foreground">{city.name}</h3>
                  <div className="font-inter text-xs text-accent font-medium">{city.role}</div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="font-inter text-xs text-muted-foreground">{city.distance}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span className="font-inter text-xs text-muted-foreground">{city.weekends}</span>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="font-inter text-xs font-bold text-foreground mb-2">Инфраструктура:</div>
                  <div className="flex flex-wrap gap-1">
                    {city.amenities.map((a) => (
                      <span key={a} className="text-xs font-inter bg-secondary/60 text-muted-foreground px-2 py-0.5 rounded-full">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}