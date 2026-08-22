import { MessageCircle, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PHONE, WHATSAPP_URL } from "@/lib/projects";

export function QuickContact() {
  const { t } = useI18n();
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={t("contact.whatsapp")}
        className="grid size-12 place-items-center rounded-full bg-brand text-brand-foreground shadow-lg transition-transform duration-200 hover:scale-110"
      >
        <MessageCircle className="size-5" />
      </a>
      <a
        href={`tel:+977${PHONE}`}
        aria-label={t("contact.call")}
        className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-110"
      >
        <Phone className="size-5" />
      </a>
    </div>
  );
}
