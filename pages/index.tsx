import { motion } from "framer-motion";
import Image from "next/image";
import type { NextPage } from "next";
import { useState } from "react";
import { Sparkles } from "lucide-react";

import AutomationShowcase from "@/components/AutomationShowcase";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Section from "@/components/Section";
import TimeSavingsCalculator from "@/components/TimeSavingsCalculator";
import sections from "@/data/sections.json";

const HomePage: NextPage = () => {
  const { howItWorks } = sections;

  return (
    <>
      <HeroSection />
      <main className="space-y-24 pb-24">
        <BenefitsTabs />

        <Section
          id="how-it-works"
          eyebrow="How it works"
          title="Automation that feels like a teammate"
          description="See how SaveADay choreographs holiday planning, thoughtful shopping, and everyday ops into calm, living spaces."
        >
          <AutomationShowcase />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-inner shadow-black/40"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/15 font-display text-lg font-semibold text-brand-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section
          id="calculator"
          eyebrow="Play with the numbers"
          title="See how much time SaveADay gives back"
          description="Customize a couple of assumptions to uncover how fast small automations multiply into big life upgrades."
          align="left"
        >
          <TimeSavingsCalculator />
        </Section>

        <CTASection />
      </main>
      <Footer />
    </>
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
    connectors: { name: string; logo: string }[];
  }
> = {
  business: {
    title: "Run the business without babysitting every workflow",
    description:
      "SaveADay plugs into the platforms your org already trusts. The result: project updates, finance checks, communications, and ops escalations all stay in sync without another status meeting.",
    highlights: [
      "Project portfolio dashboards that stay current across Jira, Asana, Linear, and internal tooling.",
      "Finance and revenue snapshots that reconcile invoices, expenses, and forecasts as close to real time as you need.",
      "Agentic workflows that triage emails, route escalations, and notify the right people before issues spread.",
    ],
    callout: "Automation that keeps the full commercial engine humming—projects, finance, comms, and ops included.",
    connectors: [
      { name: "Google Drive", logo: "/connectors/google.svg" },
      { name: "HubSpot", logo: "/connectors/hubspot.svg" },
      { name: "Notion", logo: "/connectors/notion.svg" },
      { name: "Slack", logo: "/connectors/slack.svg" },
      { name: "Asana", logo: "/connectors/asana.svg" },
      { name: "Airtable", logo: "/connectors/airtable.svg" },
    ],
  },
  personal: {
    title: "Reclaim personal energy for the life you actually want",
    description:
      "Household admin shouldn’t eat your evenings. SaveADay coordinates the utilities, finances, travel, and ongoing life logistics so you can focus on family, creativity, and rest.",
    highlights: [
      "Smart reminders that auto-pay utilities, surface upcoming renewals, and keep budgets on track.",
      "Travel planning that stitches together bookings, itineraries, and packing prompts without digging through inboxes.",
      "Personal knowledge base that stores recipes, health records, and quick notes for the people you care for.",
    ],
    callout: "Make room for the joyful, the meaningful, and the restorative parts of being human.",
    connectors: [
      { name: "Gmail", logo: "/connectors/google.svg" },
      { name: "Notion", logo: "/connectors/notion.svg" },
      { name: "Airtable", logo: "/connectors/airtable.svg" },
      { name: "Zoom", logo: "/connectors/zoom.svg" },
      { name: "Slack", logo: "/connectors/slack.svg" },
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
      description="Automation should meet people where they are. Toggle the lens to explore how SaveADay supports the workday and the everyday."
      align="left"
    >
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-surface-raise via-[#111b2a] to-[#0e1724] p-10 shadow-[0_35px_90px_-50px_rgba(58,139,255,0.55)] backdrop-blur-sm lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/60">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-blue/40 bg-brand-blue/10 text-brand-blue">
                <Sparkles className="h-4 w-4" />
              </span>
              {activeTab} lens
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold">
              {(["business", "personal"] as BenefitsKey[]).map((key) => {
                const isActive = key === activeTab;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveTab(key)}
                    className={`rounded-full px-4 py-1 capitalize transition ${
                      isActive
                        ? "bg-brand-blue text-white shadow-[0_10px_24px_-14px_rgba(58,139,255,0.6)]"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>

          <h3 className="font-display text-3xl font-semibold text-white">
            {content.title}
          </h3>
          <p className="text-base text-gray-300">{content.description}</p>
          <ul className="space-y-4 text-sm text-gray-200">
            {content.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-black/30"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-blue" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-sm text-gray-200 shadow-inner shadow-black/30">
            {content.callout}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Connect anything
          </p>
          <div className="grid w-full max-w-sm grid-cols-3 gap-4">
            {content.connectors.map((connector) => (
              <div
                key={connector.name}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-xs text-gray-300 shadow-inner shadow-black/30"
              >
                <Image
                  src={connector.logo}
                  alt={connector.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 opacity-80"
                />
                <span>{connector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default HomePage;
