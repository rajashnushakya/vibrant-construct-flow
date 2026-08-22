import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export function BeforeAfter() {
  const { t } = useI18n();
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[3/2] w-full cursor-ew-resize overflow-hidden select-none"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img
        src={afterImg}
        alt={t("ba.after")}
        loading="lazy"
        width={1280}
        height={864}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={beforeImg}
          alt={t("ba.before")}
          loading="lazy"
          width={1280}
          height={853}
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          style={{ width: ref.current?.clientWidth ?? "100%" }}
        />
      </div>

      <span className="absolute top-3 left-3 bg-foreground/80 px-2 py-1 text-[11px] font-medium tracking-wide text-background uppercase">
        {t("ba.before")}
      </span>
      <span className="absolute top-3 right-3 bg-brand px-2 py-1 text-[11px] font-medium tracking-wide text-brand-foreground uppercase">
        {t("ba.after")}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-background"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-background bg-primary text-[10px] font-bold text-primary-foreground">
          ↔
        </div>
      </div>
    </div>
  );
}
