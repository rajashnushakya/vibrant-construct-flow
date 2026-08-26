import { Link } from "@tanstack/react-router";
import { ArrowUp, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PHONE, WHATSAPP_URL } from "@/lib/projects";
import logoImg from "@/assets/logo_shree_infra.png";

const exploreLinks = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

const serviceKeys = ["res", "com", "int", "ren"] as const;

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
      {children}
      <span aria-hidden className="h-px w-6 bg-gradient-to-r from-primary to-brand" />
    </h3>
  );
}

export function Footer() {
  const { t } = useI18n();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand accent strip */}
      <div aria-hidden className="h-1 bg-gradient-to-r from-primary via-brand to-primary" />

      <div className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.3fr] lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="Shree Infra Builders" className="size-12 object-contain" />
              <span className="font-display text-base leading-tight font-semibold text-foreground">
                {t("brand.full")}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.blurb")}
            </p>
            <div className="mt-6 flex gap-8">
              {[
                { v: "120+", k: "home.stat1" },
                { v: "14", k: "home.stat2" },
              ].map((s) => (
                <div key={s.k}>
                  <p className="font-display text-xl font-semibold text-brand">{s.v}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t(s.k)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-label={t("footer.explore.title")}
          >
            <FooterHeading>{t("footer.explore.title")}</FooterHeading>
            <ul className="mt-5 space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-4"
                    />
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.19, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            aria-label={t("footer.services.title")}
          >
            <FooterHeading>{t("footer.services.title")}</FooterHeading>
            <ul className="mt-5 space-y-2.5">
              {serviceKeys.map((k) => (
                <li key={k}>
                  <Link
                    to="/services"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-4"
                    />
                    {t(`svc.${k}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <FooterHeading>{t("footer.contact.title")}</FooterHeading>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`tel:+977${PHONE}`}
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-border bg-background text-brand transition-colors group-hover:border-brand">
                    <Phone className="size-4" />
                  </span>
                  +977 {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-border bg-background text-brand transition-colors group-hover:border-brand">
                    <MessageCircle className="size-4" />
                  </span>
                  {t("contact.whatsapp")}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-border bg-background text-brand">
                  <MapPin className="size-4" />
                </span>
                {t("footer.location")}
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t("brand.full")}. {t("footer.rights")}
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 transition-colors hover:text-brand"
          >
            {t("footer.backtotop")}
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.footer>
  );
}
