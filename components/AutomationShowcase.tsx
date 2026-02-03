import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Play,
  RefreshCw,
} from "lucide-react";

const PROMPT = "Automate my weekly status update";

type Scene = "idle" | "generating" | "complete";

export default function AutomationShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const [scene, setScene] = useState<Scene>(
    prefersReducedMotion ? "complete" : "idle"
  );
  const timeoutRef = useRef<number | undefined>(undefined);

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
          "rounded-lg border border-blue-200 bg-blue-50 p-5 text-left",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
              Project velocity
            </p>
            <div className="mt-3 flex items-baseline gap-3 text-gray-900">
              <span className="font-display text-4xl font-semibold">92%</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                +8% vs last sprint
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-700">
              14 active projects flowing through{" "}
              <span className="inline-flex items-center gap-1 text-gray-900">
                <span>design</span>
                <ArrowRight className="h-3.5 w-3.5 text-blue-600" />
                <span>build</span>
                <ArrowRight className="h-3.5 w-3.5 text-blue-600" />
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
          "rounded-lg border border-gray-200 bg-white p-5 text-left",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
              Portfolio spotlight
            </p>
            <ul className="mt-3 space-y-3 text-sm text-gray-700">
              {[
                { name: "Apollo Revamp", status: "On track", color: "bg-blue-600" },
                {
                  name: "Billing Sync",
                  status: "Needs attention",
                  color: "bg-orange-500",
                },
                { name: "Docs Refresh", status: "Ahead", color: "bg-green-600" },
              ].map((item) => (
                <li key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`h-2 w-2 rounded-full ${item.color}`}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.status}</span>
                </li>
              ))}
            </ul>
          </>
        ),
      },
      {
        key: "automation-feed",
        className:
          "rounded-lg border border-gray-200 bg-gray-50 p-5 text-left",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
              Automation feed
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
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
                  className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3"
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="flex items-center gap-2 text-gray-900">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      {item.label}
                    </span>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <button className="whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-50">
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
          "rounded-lg border border-purple-200 bg-purple-50 p-5 text-left",
        content: (
          <>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-600">
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
                  className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm text-gray-900 transition hover:border-purple-300 hover:bg-purple-50"
                >
                  <span>{action}</span>
                  <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
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
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-8">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-6"
        >
          <div className="flex flex-col gap-5">
            <div className="relative flex w-full items-center gap-4 rounded-lg border border-gray-300 bg-gray-50 px-6 py-5">
              <span className="flex-1 text-sm text-gray-900">{PROMPT}</span>
              <button
                type="button"
                onClick={handleGo}
                disabled={disableButton}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white transition disabled:cursor-not-allowed disabled:opacity-60 hover:bg-blue-700"
                aria-label={buttonLabel}
              >
                <ButtonIcon
                  className={`h-4 w-4 ${scene === "generating" ? "animate-spin" : ""
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
                  className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs uppercase tracking-[0.25em] text-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <span>Generating visualization</span>
                    <span>72%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <motion.span
                      initial={{ width: "15%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="block h-full rounded-full bg-blue-600"
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {scene === "idle" ? (
              <p className="text-sm text-gray-600">
                Press play to watch SaveADay build the updates you used to write
                by hand.
              </p>
            ) : scene === "complete" ? (
              <p className="text-sm text-gray-600">
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
