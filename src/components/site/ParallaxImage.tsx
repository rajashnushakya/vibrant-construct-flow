import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function ParallaxImage({
  src,
  alt,
  className,
  ratio = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={cn("overflow-hidden", ratio, className)}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={960}
        className="size-full scale-115 object-cover"
      />
    </div>
  );
}
