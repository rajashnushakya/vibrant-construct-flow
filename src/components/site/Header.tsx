import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Header() {
  const { t, toggle: toggleLang } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-7 place-items-center bg-primary text-[11px] font-bold tracking-tight text-primary-foreground">
            SI
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            {t("brand.name")}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleLang}
            className="rounded-sm border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
          >
            {t("lang.toggle")}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
            className="grid size-8 place-items-center rounded-sm border border-border transition-colors hover:border-brand hover:text-brand"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            className="grid size-8 place-items-center rounded-sm border border-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 md:hidden",
          open ? "max-h-80" : "max-h-0",
        )}
        style={{ transition: "max-height 300ms ease" }}
      >
        <nav className="flex flex-col px-5 py-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-3 text-sm text-muted-foreground last:border-0"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
