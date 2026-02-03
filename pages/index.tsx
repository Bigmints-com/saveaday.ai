import type { NextPage } from "next";

import AutomationFlows from "@/components/AutomationFlows";
import MetricsSection from "@/components/MetricsSection";
import AISection from "@/components/AISection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Section from "@/components/Section";
import sections from "@/data/sections.json";

import { Card, CardContent } from "@/components/ui/card";

const HomePage: NextPage = () => {
  const { howItWorks } = sections;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <main className="space-y-0">

        <Section
          id="how-it-works"
          eyebrow="Automation in action"
          title="How SaveADay gives you time back"
          description="See how our apps communicate automatically to handle your manual handoffs. One event triggers the next, so you don't have to."
        >
          <AutomationFlows />

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {howItWorks.map((item, index) => (
              <Card 
                key={item.title} 
                className="group border-border/50 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="ai"
          eyebrow="Human + Machine"
          title="Powered by You, Assisted by AI"
          description="You stay in control. AI handles the execution. Together, you accomplish more with less effort."
          gradient
        >
          <AISection />
        </Section>

        <Section
          id="metrics"
          eyebrow="Results you can measure"
          title="Metrics that keep you on track"
          description="Real-time visibility into your automation performance. Know exactly how much time you're saving."
        >
          <MetricsSection />
        </Section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
