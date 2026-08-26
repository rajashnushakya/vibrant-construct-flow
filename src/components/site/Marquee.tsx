import { motion } from "framer-motion";

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="group relative overflow-hidden border-y border-border/60 py-5">
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: [0, -50] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, i) => (
          <motion.span
            key={`${item}-${i}`}
            whileHover={{ scale: 1.05, color: "var(--color-brand)" }}
            className="text-xs tracking-[0.22em] whitespace-nowrap text-muted-foreground uppercase transition-colors"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
