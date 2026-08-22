import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Building2, Hammer, Home, MessageCircle, Phone, Sofa } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/site/Reveal";
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
  const { t, lang } = useI18n();
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
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

  const submit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t("contact.required"));
      return;
    }
    setSending(true);
    const { error } = await supabase.from("inquiries").insert({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      service_type: form.service ? t(`svc.${form.service}.name`) : "General",
      budget: form.budget || null,
      location: form.location.trim() || null,
      message: form.message.trim() || null,
      language: lang,
    });
    setSending(false);
    if (error) {
      toast.error(t("contact.error"));
      return;
    }
    toast.success(t("contact.success"));
    setForm({ service: "", budget: "", location: "", message: "", name: "", phone: "", email: "" });
    setStep(0);
  };

  const inputClass =
    "w-full border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-brand";

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
                <div
                  key={i}
                  className={cn(
                    "h-0.5 flex-1 transition-colors duration-300",
                    i <= step ? "bg-brand" : "bg-border",
                  )}
                />
              ))}
            </div>
            <p className="mt-3 text-xs tracking-wide text-muted-foreground uppercase">
              {t("contact.step")} {step + 1} {t("contact.of")} 3 —{" "}
              {t(`contact.step${step + 1}`)}
            </p>
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
                  <div className="grid gap-3 sm:grid-cols-2">
                    {serviceKeys.map((k) => {
                      const Icon = icons[k];
                      return (
                        <button
                          key={k}
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
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs tracking-wide text-muted-foreground uppercase">
                        {t("contact.budget")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {budgets.map((b) => (
                          <button
                            key={b}
                            onClick={() => set("budget", t(b))}
                            className={cn(
                              "border px-3.5 py-2 text-xs transition-colors",
                              form.budget === t(b)
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-brand hover:text-brand",
                            )}
                          >
                            {t(b)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <input
                      className={inputClass}
                      placeholder={t("contact.location")}
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                    />
                    <textarea
                      className={cn(inputClass, "min-h-32 resize-none")}
                      placeholder={t("contact.message")}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <input
                      className={inputClass}
                      placeholder={t("contact.name")}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    <input
                      className={inputClass}
                      placeholder={t("contact.phone")}
                      inputMode="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                    <input
                      className={inputClass}
                      placeholder={t("contact.email")}
                      inputMode="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm transition-colors hover:border-brand hover:text-brand"
                >
                  <ArrowLeft className="size-4" /> {t("contact.back")}
                </button>
              )}
              {step < 2 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="group inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-brand hover:text-brand-foreground"
                >
                  {t("contact.next")}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:scale-105 disabled:opacity-60"
                >
                  {sending ? t("contact.sending") : t("contact.submit")}
                </button>
              )}
            </div>
          </div>
        </div>

        <Reveal delay={0.14}>
          <aside className="border border-border bg-card p-7">
            <h2 className="text-lg font-semibold">{t("contact.direct")}</h2>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center gap-3 bg-brand px-5 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:scale-[1.03]"
            >
              <MessageCircle className="size-4" /> {t("contact.whatsapp")}
            </a>
            <a
              href={`tel:+977${PHONE}`}
              className="mt-3 flex items-center gap-3 bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03]"
            >
              <Phone className="size-4" /> +977 {PHONE}
            </a>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
