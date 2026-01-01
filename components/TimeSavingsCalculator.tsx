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
  flow: { icon: GaugeCircle, label: "Flow restored", colorClass: "text-blue-600" },
  create: { icon: Palette, label: "Creative burst", colorClass: "text-purple-600" },
  learn: { icon: BookOpen, label: "Learning time", colorClass: "text-green-600" },
  escape: { icon: Sun, label: "Long weekend energy", colorClass: "text-orange-600" },
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
      className="overflow-hidden rounded-lg border border-gray-200 bg-white p-10"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-gray-500">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Saved time snapshot
          </div>
          <h3 className="font-display text-3xl font-semibold text-gray-900 sm:text-4xl">
            Drag the sliders to see how fast a day comes back.
          </h3>
          <p className="text-base text-gray-600 sm:text-lg">
            Adjust the numbers to total the manual hours you automate and the
            days you give back to focused work.
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                label: "Days back each week",
                value: formatDecimal(weeklyDays),
              },
              {
                label: "Days back each month",
                value: formatDecimal(monthlyDays),
              },
              {
                label: "Days back each year",
                value: formatDecimal(yearlyDays),
              },
              {
                label: "Extra years across a career",
                value: formatDecimal(lifetimeYears),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4 text-left text-gray-900"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
                  {stat.label}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-blue-600">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6 text-gray-900">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                Where the day goes
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Each adjustment shows how you can invest the time you just won back.
              </p>
            </div>
            <motion.div
              key={vibeKey}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="flex flex-col items-center gap-1 text-xs text-gray-600"
            >
              <VibeIcon className={`h-6 w-6 ${vibeInfo.colorClass}`} />
              <span>{vibeInfo.label}</span>
            </motion.div>
          </div>

          <div className="space-y-6">
            {sliders.map((slider) => (
              <label key={slider.id} htmlFor={slider.id} className="block">
                <div className="flex items-center justify-between text-sm text-gray-900">
                  <span className="font-semibold">{slider.label}</span>
                  <span className="text-blue-600">
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
                  className="mt-3 h-2 w-full appearance-none rounded-full bg-gray-200"
                  style={{
                    background: `linear-gradient(90deg, rgb(37 99 235) 0%, rgb(37 99 235) ${((slider.value - slider.min) / (slider.max - slider.min)) *
                      100
                      }%, rgb(229 231 235) ${((slider.value - slider.min) / (slider.max - slider.min)) *
                      100
                      }%)`,
                  }}
                />
                <p className="mt-2 text-xs text-gray-500">{slider.description}</p>
              </label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
