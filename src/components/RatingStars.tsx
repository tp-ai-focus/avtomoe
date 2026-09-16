import { Star } from "lucide-react";

export function RatingStars({
  value,
  size = 13,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (cls: string) => (
    <span className={`flex gap-[2px] ${cls}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0} fill="currentColor" />
      ))}
    </span>
  );

  return (
    <span className={`relative inline-flex ${className}`} aria-label={`Рейтинг ${value.toFixed(1)} из 5`}>
      {row("text-ink/10")}
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
        {row("text-star")}
      </span>
    </span>
  );
}
