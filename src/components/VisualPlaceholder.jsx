export default function VisualPlaceholder({ id, ratio = "16:9", label, className = "" }) {
  const [w, h] = ratio.split(":").map(Number);

  return (
    <div
      className={`relative w-full bg-secondary/50 border-2 border-dashed border-border rounded-xl overflow-hidden flex flex-col items-center justify-center ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <div className="text-center px-4">
        <div className="font-mono text-sm font-bold text-muted-foreground">
          ВИЗУАЛ #{id}
        </div>
        <div className="font-mono text-xs text-muted-foreground/70 mt-1">
          {ratio.replace(":", "×")}
        </div>
        {label && (
          <div className="font-inter text-xs text-muted-foreground/50 mt-2 max-w-xs">
            {label}
          </div>
        )}
      </div>
    </div>
  );
}