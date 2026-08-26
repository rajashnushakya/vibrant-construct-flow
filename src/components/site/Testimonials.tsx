import { motion } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { useI18n } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useI18n();
  const items = [
    { key: "t1", name: "n1" },
    { key: "t2", name: "n2" },
    { key: "t3", name: "n3" },
  ];

  return (
    <section className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold sm:text-4xl">{t("home.testi.title")}</h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.key}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="h-full rounded-sm border border-border bg-card p-6"
              >
                <p className="text-sm leading-relaxed text-foreground">
                  "{t(`home.testi.${item.key}`)}"
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  — {t(`home.testi.${item.name}`)}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
