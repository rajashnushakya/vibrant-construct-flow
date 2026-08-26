import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Receipt, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import { HoverLift } from "@/components/site/Animations";
import teamImg from "@/assets/site-team.jpg";
import teamImg2 from "@/assets/team.jpg";
import planningImg from "@/assets/planning.jpg";
import materialsImg from "@/assets/materials.jpg";
import renovationImg from "@/assets/project-renovation-1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shree Infra Builders" },
      {
        name: "description",
        content:
          "Shree Infra Builders Pvt Ltd keeps engineering, execution and finishing under one roof for consistent construction quality.",
      },
      { property: "og:title", content: "About — Shree Infra Builders" },
      {
        property: "og:description",
        content: "Quality craftsmanship, transparent pricing and on-schedule delivery.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: ShieldCheck, k: "about.value1" },
  { icon: Receipt, k: "about.value2" },
  { icon: CalendarCheck, k: "about.value3" },
];

const timeline = [
  { year: "about.t1.year", body: "about.t1.body", img: planningImg },
  { year: "about.t2.year", body: "about.t2.body", img: materialsImg },
  { year: "about.t3.year", body: "about.t3.body", img: teamImg2 },
  { year: "about.t4.year", body: "about.t4.body", img: renovationImg },
];

function AboutPage() {
  const { t } = useI18n();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
          <Reveal>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs tracking-[0.28em] text-primary uppercase"
            >
              {t("hero.eyebrow")}
            </motion.p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] sm:text-5xl">
              {t("about.title")}
            </h1>
            <p className="mt-6 leading-relaxed text-muted-foreground">{t("about.lead")}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.p1")}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.p2")}</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-brand hover:text-brand-foreground"
              >
                {t("home.cta.button")}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 40 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-sm"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={teamImg}
                  alt="Shree Infra Builders crew on site"
                  loading="lazy"
                  width={1600}
                  height={1200}
                  className="aspect-[4/3] w-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 hidden md:block"
              >
                <div className="rounded-sm border border-border bg-card p-4 shadow-lg">
                  <p className="font-display text-2xl font-bold text-primary">120+</p>
                  <p className="text-xs text-muted-foreground">{t("home.stat1")}</p>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/60 bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { v: "120+", k: "home.stat1" },
              { v: "14", k: "home.stat2" },
              { v: "98%", k: "home.stat3" },
              { v: "60+", k: "about.team.title" },
            ].map((s, i) => (
              <Reveal key={s.k} delay={i * 0.1} className="text-center">
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="font-display text-3xl font-semibold sm:text-4xl"
                >
                  {s.v}
                </motion.p>
                <p className="mt-2 text-xs opacity-80 sm:text-sm">{t(s.k)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t("about.team.title")}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.team.body")}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-sm">
              <img
                src={teamImg2}
                alt="Site engineer on a project"
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t("about.craft.title")}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">{t("about.craft.body")}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { img: planningImg, alt: "Planning" },
              { img: materialsImg, alt: "Materials" },
              { img: renovationImg, alt: "Renovation" },
            ].map((item, i) => (
              <Reveal key={item.alt} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group overflow-hidden rounded-sm"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.alt}
                      loading="lazy"
                      width={600}
                      height={400}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="border border-border border-t-0 bg-card p-5">
                    <h3 className="text-base font-semibold capitalize">{item.alt}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.alt === "Planning" &&
                        "Detailed site surveys and architectural drawings"}
                      {item.alt === "Materials" && "Graded rebar, tested concrete, seasoned timber"}
                      {item.alt === "Renovation" && "Full structural revamps and retrofitting"}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("about.timeline.title")}</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.1}>
              <HoverLift y={-4}>
                <div className="flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:bg-background">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={item.img}
                    alt={t(item.body)}
                    loading="lazy"
                    width={400}
                    height={300}
                    className="mb-4 aspect-[4/3] w-full rounded-sm object-cover"
                  />
                  <span className="text-xs font-semibold tracking-wide text-brand">
                    {t(item.year)}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(item.body)}
                  </p>
                </div>
              </HoverLift>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">{t("home.cta.title")}</h2>
            <p className="mt-2 text-sm opacity-80">{t("home.cta.body")}</p>
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
