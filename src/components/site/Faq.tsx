import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function Faq() {
  const { t } = useI18n();
  const items = ["1", "2", "3", "4"];

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((i, idx) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: idx * 0.08, duration: 0.4 }}
        >
          <AccordionItem value={i} className="border-border">
            <AccordionTrigger className="py-5 text-left text-base font-medium hover:text-brand hover:no-underline">
              {t(`home.faq.q${i}`)}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {t(`home.faq.a${i}`)}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}
