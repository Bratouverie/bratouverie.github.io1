import VisualPlaceholder from "./VisualPlaceholder";
import { MapPin, Phone, Clock } from "lucide-react";
import { COLLECTION_POINTS } from "@/lib/calculatorData";

export default function CollectionPoints() {
  return (
    <section id="collection-points" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm font-semibold tracking-widest uppercase">Точки сбора</span>
          <h2 className="text-3xl sm:text-4xl font-inter font-black text-foreground mt-3 tracking-tight">
            Выберите ближайшую точку оформления
          </h2>
          <p className="text-muted-foreground font-inter mt-4 max-w-xl mx-auto">
            6 городов России, где проходит медкомиссия и оформление документов
          </p>
        </div>

        {/* Map */}
        <div className="mb-10">
          <VisualPlaceholder id={54} ratio="16:9" label="Карта России с точками сбора" />
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COLLECTION_POINTS.map((point) => (
            <div key={point.city} className="bg-card border border-border rounded-2xl p-5 hover:border-accent/30 transition-colors">
              <VisualPlaceholder id={point.visualId} ratio="4:3" label={point.city} className="mb-4" />

              <h3 className="font-inter font-bold text-lg text-foreground mb-3">{point.city}</h3>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-inter text-sm text-foreground">{point.address}</div>
                    <div className="font-inter text-xs text-muted-foreground">{point.region}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div className="font-inter text-sm text-foreground">{point.phone}</div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div className="font-inter text-xs text-muted-foreground">{point.workHours}</div>
                </div>
              </div>

              <div className="mt-4 bg-secondary/50 rounded-lg p-3">
                <div className="font-inter text-xs text-muted-foreground">
                  Проживание в точке сбора: <span className="font-semibold text-foreground">бесплатное</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}