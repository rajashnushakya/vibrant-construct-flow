export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="group relative overflow-hidden border-y border-border/60 py-5">
      <div className="animate-marquee flex w-max gap-12 group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-xs tracking-[0.22em] whitespace-nowrap text-muted-foreground uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
