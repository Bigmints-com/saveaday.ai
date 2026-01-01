import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type AnimatedTextProps = {
  items: string[];
  interval?: number;
  className?: string;
  itemClassName?: string;
  onFrameChange?: (value: string) => void;
  activeValue?: string;
};

export default function AnimatedText({
  items,
  interval = 2000,
  className,
  itemClassName,
  onFrameChange,
  activeValue,
}: AnimatedTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length || items.length === 1 || interval <= 0) return;

    const timer = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % items.length);
    }, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [items, interval]);

  useEffect(() => {
    if (!items.length) return;
    onFrameChange?.(items[index]);
  }, [index, items, onFrameChange]);

  useEffect(() => {
    if (!items.length || activeValue === undefined) return;
    const nextIndex = items.findIndex((item) => item === activeValue);
    if (nextIndex >= 0 && nextIndex !== index) {
      setIndex(nextIndex);
    }
  }, [activeValue, items, index]);

  if (!items.length) {
    return null;
  }

  return (
    <span className={`relative inline-block overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block text-brand-teal ${itemClassName ?? ""}`}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
