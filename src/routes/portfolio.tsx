import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { HoverLift } from "@/components/site/Animations";
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
            <motion.button
              key={f.id}
              onClick={() => setFilter(f.id)}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                "border px-4 py-2 text-xs tracking-wide uppercase transition-all duration-200",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-brand hover:text-brand",
              )}
            >
              {t(f.key)}
            </motion.button>
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
              className="group relative overflow-hidden rounded-sm"
            >
              <motion.img
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.6 }}
                src={p.image}
                alt={p.title[lang]}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
              <motion.figcaption
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.2213_0_0/0.9)] to-transparent p-4"
              >
                <p className="text-sm font-medium text-[oklch(0.984_0.0018_247.84)]">
                  {p.title[lang]}
                </p>
                <p className="text-xs text-[oklch(0.9_0.005_250/0.7)]">{p.place[lang]}</p>
              </motion.figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      <section className="mt-24 border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("portfolio.stats.title")}</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { v: "120+", k: "home.stat1" },
              { v: "14", k: "home.stat2" },
              { v: "98%", k: "home.stat3" },
            ].map((s, i) => (
              <Reveal
                key={s.k}
                delay={i * 0.1}
                className="rounded-sm border border-border bg-card p-6 text-center"
              >
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="font-display text-3xl font-semibold text-primary sm:text-4xl"
                >
                  {s.v}
                </motion.p>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{t(s.k)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">{t("ba.title")}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("ba.subtitle")}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <BeforeAfter />
        </Reveal>
      </section>

      <section className="mt-24 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("portfolio.cta.title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-brand px-6 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-200"
              >
                {t("home.cta.button")} <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
