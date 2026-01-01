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
import { ArrowRight, ArrowUpRight, BarChart3, CheckCircle2, Clock, RefreshCw, Sparkles, Zap } from "lucide-react";

type StatsMap = typeof heroData.stats;
type Timeframe = keyof StatsMap;

const heroBullets = [
  "Automate the status updates, reminders, and follow-ups stealing your day.",
  "Sync work across the tools you already use without manual copy and paste.",
  "See dashboards and alerts before projects or finances fall behind.",
  "Spend the saved time on the launches, customers, and people that matter.",
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

  const [mounted, setMounted] = useState(false);
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
    setMounted(true);
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
    <section className="bg-white pb-24 pt-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 sm:px-10">

        {/* Centered Headlines & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-8 text-center"
        >
          <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl lg:text-7xl">
            {heroData.headline}{" "}
            {mounted ? (
              <AnimatedText
                items={frames}
                interval={prefersReducedMotion ? 0 : 2200}
                className="inline-flex min-w-[6.75rem] justify-center"
                itemClassName="capitalize font-semibold text-blue-600"
              />
            ) : (
              <span className="inline-flex min-w-[6.75rem] justify-center capitalize font-semibold text-blue-600">
                {frames[0]}
              </span>
            )}
            <span className="text-blue-600">.</span>
          </h1>

          <p className="max-w-2xl text-lg text-gray-600 sm:text-xl">
            {heroData.subtext}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#cta"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
            >
              {heroData.ctaPrimary}
              <ArrowUpRight className="ml-3 h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-8 py-4 text-base font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              {heroData.ctaSecondary}
            </Link>
          </div>
        </motion.div>


        {/* Value Props Grid */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              text: "Automate the status updates, reminders, and follow-ups stealing your day.",
              icon: <Zap className="h-5 w-5" />,
            },
            {
              text: "Sync work across the tools you already use without manual copy and paste.",
              icon: <RefreshCw className="h-5 w-5" />,
            },
            {
              text: "See dashboards and alerts before projects or finances fall behind.",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              text: "Spend the saved time on the launches, customers, and people that matter.",
              icon: <Clock className="h-5 w-5" />,
            },
          ].map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-3 rounded-xl border border-transparent px-4 py-4 text-center transition hover:bg-gray-50"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                {item.icon}
              </div>
              <span className="text-sm leading-relaxed text-gray-600">
                {item.text}
              </span>
            </li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}
