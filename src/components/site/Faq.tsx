import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/lib/i18n";

export function Faq() {
  const { t } = useI18n();
  const items = ["1", "2", "3", "4"];

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((i) => (
        <AccordionItem key={i} value={i} className="border-border">
          <AccordionTrigger className="py-5 text-left text-base font-medium hover:text-brand hover:no-underline">
            {t(`home.faq.q${i}`)}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
            {t(`home.faq.a${i}`)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
