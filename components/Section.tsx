import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}>;

export default function Section({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const alignment =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 ${className ?? ""}`}
    >
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative flex flex-col gap-5 ${alignment}`}
      >
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-balance font-display text-3xl font-semibold text-gray-900 sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-lg text-gray-600 sm:text-xl">
            {description}
          </p>
        ) : null}
      </motion.div>
      {children ? <div className="mt-14">{children}</div> : null}
    </section>
  );
}
