import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BookOpen, GaugeCircle, Palette, Sun } from "lucide-react";

const HOURS_IN_WORKDAY = 8;
const CAREER_YEARS = 40;

type SliderConfig = {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix: string;
  description: string;
};

type VibeKey = "flow" | "create" | "learn" | "escape";

const vibeConfig: Record<
  VibeKey,
  { icon: typeof GaugeCircle; label: string; colorClass: string }
> = {
  flow: { icon: GaugeCircle, label: "Flow restored", colorClass: "text-brand-blue" },
  create: { icon: Palette, label: "Creative burst", colorClass: "text-accent" },
  learn: { icon: BookOpen, label: "Learning time", colorClass: "text-brand-blue" },
  escape: { icon: Sun, label: "Long weekend energy", colorClass: "text-accent" },
};

export default function TimeSavingsCalculator() {
  const [hoursPerTask, setHoursPerTask] = useState(1.5);
  const [tasksPerWeek, setTasksPerWeek] = useState(6);
  const [teamSize, setTeamSize] = useState(4);

  const { weeklyDays, monthlyDays, yearlyDays, lifetimeYears, vibeKey } =
    useMemo(() => {
      const weeklyHours = hoursPerTask * tasksPerWeek * teamSize;
      const weeklyDays = weeklyHours / HOURS_IN_WORKDAY;
      const monthlyDays = weeklyDays * 4;
      const yearlyDays = weeklyDays * 52;
      const lifetimeDays = yearlyDays * CAREER_YEARS;
      const lifetimeYears = lifetimeDays / 365;

      let vibeKey: VibeKey = "flow";
      if (weeklyDays >= 3) {
        vibeKey = "escape";
      } else if (weeklyDays >= 1.5) {
        vibeKey = "create";
      } else if (weeklyDays >= 0.5) {
        vibeKey = "learn";
      }

      return {
        weeklyDays,
        monthlyDays,
        yearlyDays,
        lifetimeYears,
        vibeKey,
      };
    }, [hoursPerTask, tasksPerWeek, teamSize]);

  const sliders: Array<
    SliderConfig & {
      value: number;
      onChange: (value: number) => void;
    }
  > = [
    {
      id: "hours-per-task",
      label: "Hours spent per task",
      min: 0,
      max: 4,
      step: 0.25,
      suffix: "hrs",
      description: "How long one manual chore usually takes.",
      value: hoursPerTask,
      onChange: (value) => setHoursPerTask(value),
    },
    {
      id: "tasks-per-week",
      label: "Repetitive tasks per week",
      min: 0,
      max: 20,
      step: 1,
      suffix: "tasks",
      description: "Think daily reports, follow-ups, reminders.",
      value: tasksPerWeek,
      onChange: (value) => setTasksPerWeek(value),
    },
    {
      id: "team-size",
      label: "People you want to help",
      min: 1,
      max: 12,
      step: 1,
      suffix: "humans",
      description: "How many teammates benefit from automation.",
      value: teamSize,
      onChange: (value) => setTeamSize(value),
    },
  ];

  const formatDecimal = (value: number) => Math.round(value).toLocaleString();

  const vibeInfo = vibeConfig[vibeKey];
  const VibeIcon = vibeInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-raise/90 via-[#101824] to-[#0d121b] p-10 shadow-[0_45px_120px_-60px_rgba(58,139,255,0.55)]"
    >
      <div className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 -bottom-16 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Build your reclaimed hours recipe
          </div>
          <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            Drag the sliders to see how quickly time turns into freedom.
          </h3>
          <p className="text-base text-gray-300 sm:text-lg">
            Help your team find breathing room. Automate the chores and gift
            back deep work days, creative mornings, or slow walks with the dog.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                label: "Days back every week",
                value: formatDecimal(weeklyDays),
              },
              {
                label: "Creative days every month",
                value: formatDecimal(monthlyDays),
              },
              {
                label: "Sabbatical days per year",
                value: formatDecimal(yearlyDays),
              },
              {
                label: "Bonus years in a career",
                value: formatDecimal(lifetimeYears),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-left text-gray-200 shadow-inner shadow-black/40"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-accent">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-gray-100 backdrop-blur">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Your vibe check
              </p>
              <p className="mt-2 text-sm text-gray-200">
                Every slider nudge reveals more time to reinvest into living.
              </p>
            </div>
            <motion.div
              key={vibeKey}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="flex flex-col items-center gap-1 text-xs text-white/70"
            >
              <VibeIcon className={`h-6 w-6 ${vibeInfo.colorClass}`} />
              <span>{vibeInfo.label}</span>
            </motion.div>
          </div>

          <div className="space-y-6">
            {sliders.map((slider) => (
              <label key={slider.id} htmlFor={slider.id} className="block">
                <div className="flex items-center justify-between text-sm text-gray-200">
                  <span className="font-semibold">{slider.label}</span>
                  <span className="text-accent">
                    {slider.value.toFixed(slider.step >= 1 ? 0 : 2)}{" "}
                    {slider.suffix}
                  </span>
                </div>
                <input
                  id={slider.id}
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={slider.value}
                  onChange={(event) => slider.onChange(Number(event.target.value))}
                  className="mt-3 h-1.5 w-full appearance-none rounded-full bg-white/10 accent-brand-blue"
                  style={{
                    background: `linear-gradient(90deg, rgba(58,139,255,0.9) 0%, rgba(76,195,167,0.9) ${
                      ((slider.value - slider.min) / (slider.max - slider.min)) *
                      100
                    }%, rgba(255,255,255,0.1) ${
                      ((slider.value - slider.min) / (slider.max - slider.min)) *
                      100
                    }%)`,
                  }}
                />
                <p className="mt-2 text-xs text-gray-400">{slider.description}</p>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
