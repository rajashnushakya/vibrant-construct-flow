import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Receipt, ShieldCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
import teamImg from "@/assets/project-residential-1.jpg";

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

function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <h1 className="text-4xl font-semibold sm:text-5xl">{t("about.title")}</h1>
          <p className="mt-6 leading-relaxed text-muted-foreground">{t("about.lead")}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.p1")}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("about.p2")}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <img
            src={teamImg}
            alt="Completed residence by Shree Infra Builders"
            loading="lazy"
            width={1024}
            height={768}
            className="aspect-[4/3] w-full object-cover"
          />
        </Reveal>
      </div>

      <div className="mt-20 grid gap-px bg-border sm:grid-cols-3">
        {values.map((v, i) => (
          <Reveal key={v.k} delay={i * 0.08}>
            <div className="h-full bg-background p-8">
              <v.icon className="size-6 text-brand" />
              <h2 className="mt-4 text-lg font-semibold">{t(`${v.k}.title`)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`${v.k}.body`)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
