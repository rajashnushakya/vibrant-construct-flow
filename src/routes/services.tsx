import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, Check, Hammer, Home, Sofa } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import residential from "@/assets/project-residential-1.jpg";
import commercial from "@/assets/project-commercial-1.jpg";
import interiors from "@/assets/project-interior-2.jpg";
import renovation from "@/assets/project-renovation-1.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Shree Infra Builders" },
      {
        name: "description",
        content:
          "Residential construction, commercial projects, interior design and renovation upgrades delivered by one accountable team.",
      },
      { property: "og:title", content: "Services — Shree Infra Builders" },
      {
        property: "og:description",
        content: "Four disciplines, one accountable team — from foundation to final finish.",
      },
    ],
  }),
  component: ServicesPage,
});

const keys = ["res", "com", "int", "ren"] as const;
const icons = { res: Home, com: Building2, int: Sofa, ren: Hammer };
const images = { res: residential, com: commercial, int: interiors, ren: renovation };

function ServicesPage() {
  const { t } = useI18n();
  const [active, setActive] = useState<(typeof keys)[number]>("res");
  const Icon = icons[active];

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <h1 className="text-4xl font-semibold sm:text-5xl">{t("services.title")}</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">{t("services.subtitle")}</p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-12 flex flex-wrap gap-2 border-b border-border pb-3">
          {keys.map((k) => (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={cn(
                "relative px-4 py-2.5 text-sm transition-colors duration-200",
                active === k ? "text-primary-foreground" : "text-muted-foreground hover:text-brand",
              )}
            >
              {active === k && (
                <motion.span
                  layoutId="svc-pill"
                  className="absolute inset-0 bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{t(`svc.${k}.name`)}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-10 md:grid-cols-2 md:items-center"
        >
          <div>
            <Icon className="size-7 text-brand" />
            <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">{t(`svc.${active}.name`)}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t(`svc.${active}.desc`)}</p>
            <ul className="mt-6 space-y-3">
              {(["p1", "p2", "p3"] as const).map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  <Check className="size-4 shrink-0 text-brand" />
                  {t(`svc.${active}.${p}`)}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-brand hover:text-brand-foreground"
            >
              {t("home.cta.button")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={images[active]}
              alt={t(`svc.${active}.name`)}
              loading="lazy"
              width={1024}
              height={768}
              className="size-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
