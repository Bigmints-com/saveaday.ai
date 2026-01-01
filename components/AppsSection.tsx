import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import appsData from "@/data/apps.json";
import AppLogo from "./AppLogo";

type AppColor = "blue" | "green" | "purple" | "orange" | "pink" | "indigo" | "teal";

export default function AppsSection() {
  const { apps } = appsData;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app, index) => {
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
            <Link
              href={app.dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AppLogo
                    appName={app.name}
                    color={app.color as AppColor}
                    icon={app.icon}
                  />
                  <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                    {app.name}
                  </h3>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm text-gray-600">{app.description}</p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
