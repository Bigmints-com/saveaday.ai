import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Play,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const PROMPT = "Automate my weekly status update";

type Scene = "idle" | "generating" | "complete";

export default function AutomationShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [scene, setScene] = useState<Scene>(
    prefersReducedMotion ? "complete" : "idle"
  );
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (prefersReducedMotion) {
      setScene("complete");
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleGo = () => {
    if (scene === "generating") {
      return;
    }
    if (scene === "complete") {
      setScene("idle");
      return;
    }

    if (prefersReducedMotion) {
      setScene("complete");
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    setScene("generating");
    timeoutRef.current = window.setTimeout(() => {
      setScene("complete");
      timeoutRef.current = undefined;
    }, 900);
  };

  const cards = useMemo(
    () => [
      {
        key: "velocity",
        className:
          "rounded-2xl border border-white/10 bg-gradient-to-br from-brand-blue/20 via-brand-blue/10 to-transparent p-5 text-left shadow-lg shadow-brand-blue/20",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Project velocity
            </p>
            <div className="mt-3 flex items-baseline gap-3 text-white">
              <span className="font-display text-4xl font-semibold">92%</span>
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent">
                +8% vs last sprint
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-200">
              14 active projects flowing through{" "}
              <span className="inline-flex items-center gap-1 text-white">
                <span>design</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand-blue" />
                <span>build</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand-blue" />
                <span>QA</span>
              </span>
              .
            </p>
          </>
        ),
      },
      {
        key: "portfolio",
        className:
          "rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-inner shadow-black/30",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Portfolio spotlight
            </p>
            <ul className="mt-3 space-y-3 text-sm text-gray-200">
              {[
                { name: "Apollo Revamp", status: "On track", color: "bg-accent" },
                {
                  name: "Billing Sync",
                  status: "Needs attention",
                  color: "bg-[#f4a261]",
                },
                { name: "Docs Refresh", status: "Ahead", color: "bg-brand-blue" },
              ].map((item) => (
                <li key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`h-2 w-2 rounded-full ${item.color}`}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-xs text-white/60">{item.status}</span>
                </li>
              ))}
            </ul>
          </>
        ),
      },
      {
        key: "automation-feed",
        className:
          "rounded-2xl border border-white/10 bg-black/45 p-5 text-left shadow-lg shadow-black/40",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Automation feed
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-200">
              {[
                {
                  label: "Bills paid for vendors",
                  time: "9:12 AM",
                  action: "Review payment",
                },
                {
                  label: "Weekly report sent to leadership",
                  time: "Just now",
                  action: "Peek at summary",
                },
                {
                  label: "Sprint summary drafted",
                  time: "2 min ago",
                  action: "Edit before send",
                },
                {
                  label: "Budget alerts posted in finance",
                  time: "5 min ago",
                  action: "Catch the details",
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      {item.label}
                    </span>
                    <span className="text-xs text-white/60">{item.time}</span>
                  </div>
                  <button className="whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white transition hover:border-brand-blue/60 hover:bg-brand-blue/20">
                    {item.action}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ),
      },
      {
        key: "actions",
        className:
          "rounded-2xl border border-white/10 bg-gradient-to-br from-accent/15 via-black/30 to-black/60 p-5 text-left shadow-lg shadow-accent/20",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Critical actions
            </p>
            <div className="mt-3 space-y-2">
              {[
                "Approve scope change for Billing Sync",
                "Assign QA buddy for Apollo Revamp",
                "Send gratitude note to Docs crew",
              ].map((action) => (
                <button
                  key={action}
                  className="group flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white transition hover:border-accent/60 hover:bg-accent/15"
                >
                  <span>{action}</span>
                  <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-accent transition group-hover:bg-accent group-hover:text-surface">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </div>
          </>
        ),
      },
    ],
    []
  );

  const buttonLabel =
    scene === "idle" ? "Run visual" : scene === "generating" ? "Working" : "Run again";
  const ButtonIcon =
    scene === "idle" ? Play : scene === "generating" ? Loader2 : RefreshCw;
  const disableButton = scene === "generating";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface-raise/95 via-[#0f1a27] to-[#0d141e] p-8 shadow-[0_45px_120px_-60px_rgba(58,139,255,0.55)]">
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-6"
        >
          <div className="flex flex-col gap-5">
            <div className="relative flex w-full items-center gap-4 rounded-full border border-brand-blue/60 bg-[#111a28]/90 px-6 py-5 shadow-[0_18px_60px_-30px_rgba(58,139,255,0.7)] backdrop-blur">
              <span className="flex-1 text-sm text-gray-100">{PROMPT}</span>
              <button
                type="button"
                onClick={handleGo}
                disabled={disableButton}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg shadow-brand-blue/40 transition disabled:cursor-not-allowed disabled:opacity-60 hover:bg-brand-blue/90"
                aria-label={buttonLabel}
              >
                <ButtonIcon
                  className={`h-4 w-4 ${
                    scene === "generating" ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>

            <AnimatePresence>
              {scene === "generating" ? (
                <motion.div
                  key="assembling"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.25em] text-white/60"
                >
                  <div className="flex items-center justify-between">
                    <span>Generating visualization</span>
                    <span>72%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      initial={{ width: "15%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="block h-full rounded-full bg-gradient-to-r from-brand-blue via-accent to-brand-blue"
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {scene === "idle" ? (
              <p className="text-sm text-gray-400">
                Press play to watch SaveADay build the updates you used to write
                by hand.
              </p>
            ) : scene === "complete" ? (
              <p className="text-sm text-gray-400">
                Automations ready. Review the outputs or run it again with a new
                prompt.
              </p>
            ) : null}
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          <AnimatePresence>
            {scene === "complete"
              ? cards.map((card, index) => (
                  <motion.div
                    key={card.key}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                      delay: prefersReducedMotion ? 0 : index * 0.12,
                    }}
                    className={card.className}
                  >
                    {card.content}
                  </motion.div>
                ))
              : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
