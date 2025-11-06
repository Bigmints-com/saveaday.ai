import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import AnimatedText from "@/components/AnimatedText";
import heroData from "@/data/hero.json";
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

type StatsMap = typeof heroData.stats;
type Timeframe = keyof StatsMap;

const heroBullets = [
  "Spin up dashboards, automations, and alerts from a single, plain-language prompt.",
  "Keep projects in view with widgets shaped by how your whole team actually works.",
  "Surface the moments that need a human call and let the loops close themselves.",
  "Make space for rest, real conversations, and the ideas only you can champion.",
];

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const frames = useMemo(() => {
    const available = heroData.cycles.filter(
      (frame): frame is Timeframe => frame in heroData.stats
    );
    return available.length
      ? available
      : (Object.keys(heroData.stats) as Timeframe[]);
  }, []);

  const defaultFrame = frames[0] ?? ("week" as Timeframe);
  const stats = heroData.stats;

  const [activeFrame, setActiveFrame] = useState<Timeframe>(defaultFrame);
  const [displayDays, setDisplayDays] = useState<number>(
    stats[defaultFrame].daysSaved
  );
  const animatedDays = useSpring(stats[defaultFrame].daysSaved, {
    stiffness: 140,
    damping: 18,
    mass: 0.8,
  });

  useEffect(() => {
    const target = stats[activeFrame].daysSaved;
    if (prefersReducedMotion) {
      animatedDays.set(target);
      setDisplayDays(target);
      return;
    }
    animatedDays.set(target);
  }, [activeFrame, stats, animatedDays, prefersReducedMotion]);

  useEffect(() => {
    const unsubscribe = animatedDays.on("change", (value) => {
      setDisplayDays(Math.max(0, Math.round(value)));
    });
    return unsubscribe;
  }, [animatedDays]);

  const maxDays = useMemo(() => {
    if (!frames.length) {
      return 1;
    }
    return Math.max(...frames.map((frame) => stats[frame].daysSaved));
  }, [frames, stats]);

  const activeStat = stats[activeFrame];
  const progress = Math.min(1, Math.max(0, displayDays / maxDays));

  const formatDays = (value: number) =>
    Math.max(0, Math.round(value)).toLocaleString("en-US");

  return (
    <section className="relative isolate overflow-hidden px-6 pb-28 pt-28 sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(58,139,255,0.22),_transparent_55%),radial-gradient(circle_at_center,_rgba(126,231,135,0.08),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-[-20%] top-[-32%] -z-10 h-[520px] rounded-full bg-[conic-gradient(from_120deg_at_50%_50%,rgba(58,139,255,0.32),rgba(12,18,28,0),rgba(76,195,167,0.35),rgba(12,18,28,0))] blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col gap-8"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/60 bg-brand-blue/15 px-6 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-blue shadow-[0_0_25px_rgba(58,139,255,0.25)]">
            <Sparkles className="h-4 w-4" />
            Focus mode unlocked
          </span>

          <h1 className="text-balance font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {heroData.headline}{" "}
            <AnimatedText
              items={frames}
              interval={prefersReducedMotion ? 0 : 2200}
              className="min-w-[6.75rem]"
              itemClassName="ml-3 capitalize font-semibold text-transparent bg-gradient-to-r from-accent via-accent-emphasis to-brand-blue bg-clip-text"
            />
            <span className="text-brand-blue">.</span>
          </h1>

          <p className="max-w-xl text-lg text-gray-300 sm:text-xl">
            {heroData.subtext}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#cta"
              className="group inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-3 text-base font-semibold text-white shadow-[0_18px_45px_-18px_rgba(31,111,235,0.75)] transition hover:bg-brand-blue/90"
            >
              {heroData.ctaPrimary}
              <ArrowUpRight className="ml-3 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-base font-semibold text-white transition hover:border-brand-blue/60 hover:text-brand-blue"
            >
              {heroData.ctaSecondary}
            </Link>
          </div>

          <ul className="mt-6 grid gap-4 text-sm text-gray-300 sm:grid-cols-2">
            {heroBullets.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 shadow-inner shadow-black/20 backdrop-blur-sm"
              >
                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-stretch justify-center"
        >
          <div className="relative flex w-full max-w-md flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-surface-raise via-[#0f1824] to-[#141d2b] p-8 shadow-[0_40px_90px_-45px_rgba(58,139,255,0.45)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Choose your reclaimed window
              </p>
              <LayoutGroup>
                <div className="mt-3 grid grid-cols-3 gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-semibold">
                  {frames.map((frame) => {
                    const isActive = frame === activeFrame;
                    return (
                      <button
                        key={frame}
                        type="button"
                        onClick={() => setActiveFrame(frame)}
                        className="relative flex h-11 items-center justify-center overflow-hidden rounded-full px-3 text-sm capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60"
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="timeframe-pill"
                            className="absolute inset-0 rounded-full bg-brand-blue"
                            transition={{ type: "spring", stiffness: 320, damping: 26 }}
                          />
                        ) : null}
                        <span
                          className={`relative z-10 ${
                            isActive ? "text-white" : "text-white/60"
                          }`}
                        >
                          {stats[frame].label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl shadow-black/30">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                Days saved
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeFrame}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 font-display text-5xl font-semibold text-accent"
                >
                  {formatDays(displayDays)}
                  <span className="ml-2 text-base font-normal text-gray-400">
                    day{displayDays >= 1.5 ? "s" : ""} unlocked
                  </span>
                </motion.p>
              </AnimatePresence>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  key={`progress-${activeFrame}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(progress, 0.05) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block h-full rounded-full bg-gradient-to-r from-accent via-accent-emphasis to-brand-blue"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`summary-${activeFrame}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-gray-200 shadow-inner shadow-black/30"
              >
                <p className="font-medium text-white">{activeStat.summary}</p>
                <ul className="mt-4 space-y-2 text-[13px] text-gray-300">
                  {activeStat.ideas.map((idea) => (
                    <motion.li
                      key={idea}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-2"
                    >
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                      <span>{idea}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
