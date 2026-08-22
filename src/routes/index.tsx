import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Building2, Hammer, Home, Sofa } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shree Infra Builders — Construction & Design in Nepal" },
      {
        name: "description",
        content:
          "Residential, commercial, interior and renovation construction across Nepal. Precision engineering, transparent estimates, on-time handover.",
      },
      { property: "og:title", content: "Shree Infra Builders — Construction & Design in Nepal" },
      {
        property: "og:description",
        content: "Building spaces that outlive trends. Explore our completed projects.",
      },
    ],
  }),
  component: Index,
});

const icons = { res: Home, com: Building2, int: Sofa, ren: Hammer };

function Index() {
  const { t } = useI18n();

  return (
    <div>
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Completed construction project at dusk"
            width={1920}
            height={1088}
            className="animate-kenburns size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.2213_0_0/0.88)] via-[oklch(0.2213_0_0/0.6)] to-[oklch(0.2213_0_0/0.25)]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-5 py-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.28em] text-[oklch(0.984_0.0018_247.84)] uppercase"
          >
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-3xl text-4xl leading-[1.05] font-semibold text-[oklch(0.984_0.0018_247.84)] sm:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-xl text-base text-[oklch(0.9_0.005_250/0.85)]"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-10"
          >
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-brand hover:text-brand-foreground"
            >
              {t("hero.cta")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-border/60 px-5">
          {[
            { v: "120+", k: "home.stat1" },
            { v: "14", k: "home.stat2" },
            { v: "98%", k: "home.stat3" },
          ].map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08} className="px-3 py-10 text-center">
              <p className="font-display text-3xl font-semibold text-primary sm:text-4xl">{s.v}</p>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{t(s.k)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("home.highlights.title")}</h2>
        </Reveal>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2">
          {(["res", "com", "int", "ren"] as const).map((key, i) => {
            const Icon = icons[key];
            return (
              <Reveal key={key} delay={i * 0.06}>
                <div className="group h-full bg-background p-8 transition-colors duration-300 hover:bg-card">
                  <Icon className="size-6 text-primary transition-colors duration-300 group-hover:text-brand" />
                  <h3 className="mt-5 text-lg font-semibold">{t(`svc.${key}.name`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`svc.${key}.desc`)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-brand"
          >
            {t("home.highlights.cta")} <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("home.cta.title")}</h2>
            <p className="mt-2 text-sm opacity-80">{t("home.cta.body")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand px-6 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:scale-105"
            >
              {t("home.cta.button")} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
