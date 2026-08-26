import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Hammer,
  Home,
  MessageCircle,
  Phone,
  Sofa,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { HoverLift } from "@/components/site/Animations";
import { PHONE, WHATSAPP_URL } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Request an Estimate — Shree Infra Builders" },
      {
        name: "description",
        content:
          "Send your project details in three short steps and get a clear construction estimate within one working day.",
      },
      { property: "og:title", content: "Request an Estimate — Shree Infra Builders" },
      {
        property: "og:description",
        content: "Tell us your scope — we reply within one working day.",
      },
    ],
  }),
  component: ContactPage,
});

const serviceKeys = ["res", "com", "int", "ren"] as const;
const icons = { res: Home, com: Building2, int: Sofa, ren: Hammer };
const budgets = ["budget.a", "budget.b", "budget.c", "budget.d", "budget.e"] as const;

function ContactPage() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: "" as "" | (typeof serviceKeys)[number],
    budget: "",
    location: "",
    message: "",
    name: "",
    phone: "",
    email: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Static site — no backend. The inquiry is handed off to WhatsApp with all
  // entered details pre-filled into the chat message.
  const submit = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t("contact.required"));
      return;
    }
    const rows = [
      `${t("contact.name")}: ${form.name.trim()}`,
      `${t("contact.phone")}: ${form.phone.trim()}`,
    ];
    if (form.email.trim()) rows.push(`${t("contact.email")}: ${form.email.trim()}`);
    if (form.service) rows.push(`${t("contact.step1")}: ${t(`svc.${form.service}.name`)}`);
    if (form.budget) rows.push(`${t("contact.budget")}: ${form.budget}`);
    if (form.location.trim()) rows.push(`${t("contact.location")}: ${form.location.trim()}`);
    if (form.message.trim()) rows.push(`${t("contact.message")}: ${form.message.trim()}`);

    const text = encodeURIComponent(`*${t("contact.title")}*\n\n${rows.join("\n")}`);
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
    toast.success(t("contact.whatsapp_sent"));
    setForm({ service: "", budget: "", location: "", message: "", name: "", phone: "", email: "" });
    setStep(0);
  };

  const inputClass =
    "w-full border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-brand focus:shadow-[0_0_0_3px_var(--color-ring)]";

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <h1 className="text-4xl font-semibold sm:text-5xl">{t("contact.title")}</h1>
            <p className="mt-4 text-muted-foreground">{t("contact.subtitle")}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex items-center gap-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "h-0.5 flex-1 transition-colors duration-300",
                    i <= step ? "bg-brand" : "bg-border",
                  )}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                />
              ))}
            </div>
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-xs tracking-wide text-muted-foreground uppercase"
            >
              {t("contact.step")} {step + 1} {t("contact.of")} 3 — {t(`contact.step${step + 1}`)}
            </motion.p>
          </Reveal>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <Stagger>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {serviceKeys.map((k) => {
                        const Icon = icons[k];
                        return (
                          <StaggerItem key={k}>
                            <HoverLift y={-3}>
                              <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                  set("service", k);
                                  setStep(1);
                                }}
                                className={cn(
                                  "group flex items-center gap-4 border p-5 text-left transition-all duration-200",
                                  form.service === k
                                    ? "border-brand bg-card"
                                    : "border-border hover:border-brand hover:bg-card",
                                )}
                              >
                                <Icon className="size-5 text-primary transition-colors group-hover:text-brand" />
                                <span className="text-sm font-medium">{t(`svc.${k}.name`)}</span>
                              </motion.button>
                            </HoverLift>
                          </StaggerItem>
                        );
                      })}
                    </div>
                  </Stagger>
                )}

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-xs tracking-wide text-muted-foreground uppercase">
                        {t("contact.budget")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <motion.button
                            key={b}
                            whileHover={{ y: -2, scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => set("budget", t(b))}
                            className={cn(
                              "border px-3.5 py-2 text-xs transition-colors",
                              form.budget === t(b)
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-brand hover:text-brand",
                            )}
                          >
                            {t(b)}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={inputClass}
                      placeholder={t("contact.location")}
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                    />
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={cn(inputClass, "min-h-32 resize-none")}
                      placeholder={t("contact.message")}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="space-y-4"
                  >
                    {(["name", "phone", "email"] as const).map((field, i) => (
                      <motion.input
                        key={field}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + i * 0.06,
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        whileFocus={{ scale: 1.01 }}
                        className={inputClass}
                        placeholder={t(`contact.${field}`)}
                        value={form[field]}
                        onChange={(e) => set(field, e.target.value)}
                        inputMode={
                          field === "phone" ? "tel" : field === "email" ? "email" : undefined
                        }
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3">
              {step > 0 && (
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm transition-colors hover:border-brand hover:text-brand"
                >
                  <ArrowLeft className="size-4" /> {t("contact.back")}
                </motion.button>
              )}
              {step < 2 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep((s) => s + 1)}
                  className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-brand hover:text-brand-foreground"
                >
                  {t("contact.next")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={submit}
                  className="inline-flex items-center gap-2 bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform duration-200"
                >
                  {t("contact.submit")}
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <Reveal delay={0.14}>
          <HoverLift y={-4}>
            <aside className="border border-border bg-card p-7">
              <h2 className="text-lg font-semibold">{t("contact.direct")}</h2>
              <motion.a
                whileHover={{ scale: 1.03, x: 3 }}
                whileTap={{ scale: 0.97 }}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center gap-3 bg-brand px-5 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-200"
              >
                <MessageCircle className="size-4" /> {t("contact.whatsapp")}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03, x: 3 }}
                whileTap={{ scale: 0.97 }}
                href={`tel:+977${PHONE}`}
                className="mt-3 flex items-center gap-3 bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200"
              >
                <Phone className="size-4" /> +977 {PHONE}
              </motion.a>
            </aside>
          </HoverLift>
        </Reveal>
      </div>
    </div>
  );
}
