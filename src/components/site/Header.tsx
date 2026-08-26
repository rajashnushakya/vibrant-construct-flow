import { Link, useLocation } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo_shree_infra.png";

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
  const location = useLocation();

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <motion.img
            whileHover={{ rotate: 10, scale: 1.05 }}
            src={logoImg}
            alt="Shree Infra Builders"
            className="size-10 object-contain"
          />
          <motion.span
            whileHover={{ letterSpacing: "0.02em" }}
            transition={{ duration: 0.2 }}
            className="font-display text-sm font-semibold tracking-tight"
          >
            {t("brand.name")}
          </motion.span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l, i) => {
            const active = isActive(l.to);
            return (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
              >
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className={cn(
                    "relative text-sm transition-colors",
                    active
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-primary",
                  )}
                  activeProps={{ className: "text-primary font-medium" }}
                >
                  {t(l.key)}
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-brand"
                    initial={{ width: 0 }}
                    animate={{ width: active ? "100%" : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLang}
            className="rounded-sm border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
          >
            {t("lang.toggle")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label={t("theme.toggle")}
            className="grid size-8 place-items-center rounded-sm border border-border transition-colors hover:border-brand hover:text-brand"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="grid size-8 place-items-center rounded-sm border border-border md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ maxHeight: open ? 320 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-border/60 md:hidden"
      >
        <nav className="flex flex-col px-5 py-2">
          {links.map((l, i) => {
            const active = isActive(l.to);
            return (
              <motion.div
                key={l.to}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: open ? i * 0.05 : 0, duration: 0.3 }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block border-b border-border/40 py-3 text-sm last:border-0",
                    active ? "text-primary font-medium" : "text-muted-foreground",
                  )}
                  activeProps={{ className: "text-primary font-medium" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {t(l.key)}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </motion.div>
    </motion.header>
  );
}
