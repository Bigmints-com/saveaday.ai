import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useState } from "react";
import {
  Sparkles,
  Mail,
  Database,
  Video,
  MessageSquare,
  FileText,
  CheckCircle,
  HardDrive,
  Users
} from "lucide-react";

import AutomationShowcase from "@/components/AutomationShowcase";
import AppsSection from "@/components/AppsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Section from "@/components/Section";
import TimeSavingsCalculator from "@/components/TimeSavingsCalculator";
import sections from "@/data/sections.json";

const HomePage: NextPage = () => {
  const { howItWorks } = sections;

  return (
    <div className="bg-gray-50">
      <Header />
      <HeroSection />
      <main className="space-y-24 pb-24">
        <BenefitsTabs />

        <Section
          id="how-it-works"
          eyebrow="How it works"
          title="How SaveADay gives you time back"
          description="Move your manual tasks into automations and get an extra working day without extra headcount."
        >
          <AutomationShowcase />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.08,
                }}
                className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-display text-sm font-semibold text-blue-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section
          id="calculator"
          eyebrow="Play with the numbers"
          title="See how quickly a day comes back"
          description="Adjust the inputs to quantify how automating routine updates stacks into a reclaimed day."
          align="left"
        >
          <TimeSavingsCalculator />
        </Section>

        <Section
          id="apps"
          eyebrow="Our Platform"
          title="Launch the automations you need"
          description="Every SaveADay app targets a repeatable task so you can hand it off and get the day back."
        >
          <AppsSection />
        </Section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

type BenefitsKey = "business" | "personal";

const benefitsCopy: Record<
  BenefitsKey,
  {
    title: string;
    description: string;
    highlights: string[];
    callout: string;
    connectors: { name: string; icon: any; color: string }[];
  }
> = {
  business: {
    title: "Keep teams shipping while the busywork runs itself",
    description:
      "SaveADay connects to your stack, closes communication loops, and hands back a full day to focus on growth.",
    highlights: [
      "Automated standups, status reports, and alerts across Jira, Asana, Linear, and your internal tools.",
      "Finance snapshots that reconcile invoices, expenses, and approvals without spreadsheet hours.",
      "Smart routing that triages escalations and pings the right teammate before work stalls.",
    ],
    callout: "Reclaim a day each week to ship product, close deals, and support customers with confidence.",
    connectors: [
      { name: "Google Drive", icon: HardDrive, color: "text-blue-600" },
      { name: "HubSpot", icon: Users, color: "text-orange-600" },
      { name: "Notion", icon: FileText, color: "text-gray-900" },
      { name: "Slack", icon: MessageSquare, color: "text-purple-600" },
      { name: "Asana", icon: CheckCircle, color: "text-red-500" },
      { name: "Airtable", icon: Database, color: "text-yellow-600" },
    ],
  },
  personal: {
    title: "Let life admin run on autopilot",
    description:
      "SaveADay handles the reminders, bills, and logistics that crowd your schedule so you can spend time where it counts.",
    highlights: [
      "Automatic bill nudges, renewal reminders, and budget check-ins you never have to chase.",
      "Travel and event plans that assemble bookings, itineraries, and packing lists for you.",
      "Shared notes, records, and care tasks in one place for the people who rely on you.",
    ],
    callout: "Use your reclaimed day for family, creativity, or rest—SaveADay keeps the chores moving.",
    connectors: [
      { name: "Gmail", icon: Mail, color: "text-red-600" },
      { name: "Notion", icon: FileText, color: "text-gray-900" },
      { name: "Airtable", icon: Database, color: "text-yellow-600" },
      { name: "Zoom", icon: Video, color: "text-blue-500" },
      { name: "Slack", icon: MessageSquare, color: "text-purple-600" },
    ],
  },
};

function BenefitsTabs() {
  const [activeTab, setActiveTab] = useState<BenefitsKey>("business");
  const content = benefitsCopy[activeTab];

  return (
    <Section
      id="benefits"
      eyebrow="Why it helps"
      title="Built for teams and humans"
      description="Toggle the lens to see how SaveADay frees a day for teams and households."
      align="left"
    >
      <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-10 shadow-sm lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-gray-500">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
                <Sparkles className="h-4 w-4" />
              </span>
              {activeTab} lens
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 p-1 text-xs font-semibold">
              {(["business", "personal"] as BenefitsKey[]).map((key) => {
                const isActive = key === activeTab;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`rounded-full px-4 py-1 capitalize transition ${isActive
                        ? "bg-brand-accent text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>

          <h3 className="font-display text-3xl font-semibold text-gray-900">
            {content.title}
          </h3>
          <p className="text-base text-gray-600">{content.description}</p>
          <ul className="space-y-4 text-sm text-gray-700">
            {content.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-lg border border-gray-200 bg-blue-50 px-5 py-4 text-sm text-gray-700">
            {content.callout}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Connect anything
          </p>
          <div className="grid w-full max-w-sm grid-cols-3 gap-4">
            {content.connectors.map((connector) => {
              const Icon = connector.icon;
              return (
                <div
                  key={connector.name}
                  className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 text-center text-xs text-gray-600 shadow-sm"
                >
                  <Icon className={`h-8 w-8 ${connector.color}`} />
                  <span>{connector.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default HomePage;
