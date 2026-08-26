import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { PHONE, WHATSAPP_URL } from "@/lib/projects";

export function QuickContact() {
  const { t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="fixed right-4 bottom-4 z-50 flex flex-col gap-3"
    >
      <motion.a
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={t("contact.whatsapp")}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="grid size-12 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/30"
      >
        <MessageCircle className="size-5" />
      </motion.a>
      <motion.a
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        href={`tel:+977${PHONE}`}
        aria-label={t("contact.call")}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30"
      >
        <Phone className="size-5" />
      </motion.a>
    </motion.div>
  );
}
