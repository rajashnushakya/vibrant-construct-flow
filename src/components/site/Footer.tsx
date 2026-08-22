import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PHONE } from "@/lib/projects";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display font-semibold text-foreground">{t("brand.full")}</p>
          <p className="mt-1">{t("footer.tagline")}</p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a href={`tel:+977${PHONE}`} className="transition-colors hover:text-brand">
            +977 {PHONE}
          </a>
          <Link to="/contact" className="transition-colors hover:text-brand">
            {t("nav.contact")}
          </Link>
          <span className="text-xs">
            © {new Date().getFullYear()} {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
