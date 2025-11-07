import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import appsData from "@/data/apps.json";

type AppColor = "blue" | "green" | "purple" | "orange" | "pink" | "indigo" | "teal";

const colorClasses: Record<AppColor, string> = {
  blue: "border-brand-blue/30 bg-brand-blue/10 text-brand-blue",
  green: "border-green-500/30 bg-green-500/10 text-green-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  orange: "border-orange-500/30 bg-orange-500/10 text-orange-400",
  pink: "border-pink-500/30 bg-pink-500/10 text-pink-400",
  indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
  teal: "border-teal-500/30 bg-teal-500/10 text-teal-400",
};

export default function AppsSection() {
  const { apps } = appsData;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app, index) => {
        const colorClass = colorClasses[app.color as AppColor] || colorClasses.blue;
        const isComingSoon = app.comingSoon === true;
        const cardClassName = `group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-inner shadow-black/40 transition-all ${
          isComingSoon
            ? "opacity-60 cursor-not-allowed"
            : "hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-brand-blue/20 cursor-pointer"
        }`;

        const cardContent = (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{app.icon}</span>
                <h3
                  className={`text-lg font-semibold text-white transition-colors ${
                    isComingSoon ? "" : "group-hover:text-brand-blue"
                  }`}
                >
                  {app.name}
                </h3>
              </div>
              {!isComingSoon && (
                <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-brand-blue transition-colors flex-shrink-0 mt-1" />
              )}
            </div>
            <p className="text-sm text-gray-300">{app.description}</p>
            <div className="mt-auto pt-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                  isComingSoon
                    ? "border-white/20 bg-white/5 text-white/60"
                    : colorClass
                }`}
              >
                {isComingSoon ? "Coming Soon" : "Open Dashboard"}
              </span>
            </div>
          </>
        );

        return (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.08,
            }}
          >
            {isComingSoon ? (
              <div className={cardClassName}>{cardContent}</div>
            ) : (
              <Link
                href={app.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
              >
                {cardContent}
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

