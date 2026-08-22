import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { projects, type Category } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Projects — Shree Infra Builders" },
      {
        name: "description",
        content:
          "Browse completed residential, commercial, renovation and interior projects, including before-and-after transformations.",
      },
      { property: "og:title", content: "Projects — Shree Infra Builders" },
      {
        property: "og:description",
        content: "A filterable gallery of completed builds across Nepal.",
      },
    ],
  }),
  component: PortfolioPage,
});

const filters: Array<{ id: Category | "all"; key: string }> = [
  { id: "all", key: "filter.all" },
  { id: "residential", key: "filter.residential" },
  { id: "commercial", key: "filter.commercial" },
  { id: "renovation", key: "filter.renovation" },
  { id: "interiors", key: "filter.interiors" },
];

function PortfolioPage() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Category | "all">("all");
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <h1 className="text-4xl font-semibold sm:text-5xl">{t("portfolio.title")}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("portfolio.subtitle")}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "border px-4 py-2 text-xs tracking-wide uppercase transition-all duration-200",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-brand hover:text-brand",
              )}
            >
              {t(f.key)}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.figure
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden"
            >
              <img
                src={p.image}
                alt={p.title[lang]}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-107"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.2213_0_0/0.9)] to-transparent p-4">
                <p className="text-sm font-medium text-[oklch(0.984_0.0018_247.84)]">
                  {p.title[lang]}
                </p>
                <p className="text-xs text-[oklch(0.9_0.005_250/0.7)]">{p.place[lang]}</p>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <section className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("ba.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("ba.subtitle")}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <BeforeAfter />
        </Reveal>
      </section>
    </div>
  );
}
