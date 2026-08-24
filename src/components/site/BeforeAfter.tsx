import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

export function BeforeAfter() {
  const { t } = useI18n();
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  // Track pointer globally while dragging so the handle keeps following the
  // cursor/finger even when it leaves the image bounds.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      move(e.clientX);
    };
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, [dragging, move]);

  return (
    <div
      ref={ref}
      className="relative aspect-[3/2] w-full touch-none overflow-hidden select-none"
      onPointerDown={(e) => {
        setDragging(true);
        move(e.clientX);
      }}
      onMouseMove={(e) => {
        // Hover scrub on desktop for a more responsive feel.
        if (!dragging && e.buttons === 0 && window.matchMedia("(hover: hover)").matches) {
          move(e.clientX);
        }
      }}
    >
      <img
        src={afterImg}
        alt={t("ba.after")}
        loading="lazy"
        draggable={false}
        width={1280}
        height={864}
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <img
        src={beforeImg}
        alt={t("ba.before")}
        loading="lazy"
        draggable={false}
        width={1280}
        height={853}
        className="pointer-events-none absolute inset-0 size-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="pointer-events-none absolute top-3 left-3 bg-foreground/80 px-2 py-1 text-[11px] font-medium tracking-wide text-background uppercase">
        {t("ba.before")}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 bg-brand px-2 py-1 text-[11px] font-medium tracking-wide text-brand-foreground uppercase">
        {t("ba.after")}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-background"
        style={{ left: `${pos}%` }}
      >
        <div
          className={`absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground shadow-lg transition-transform duration-150 ${dragging ? "scale-110" : ""}`}
        >
          ↔
        </div>
      </div>

      {/* Accessible + keyboard control */}
      <input
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${t("ba.before")} / ${t("ba.after")}`}
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
