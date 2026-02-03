import type { NextPage } from "next";

import AutomationFlows from "@/components/AutomationFlows";
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
    <div className="bg-background">
      <Header />
      <HeroSection />
      <main className="space-y-24 pb-24">

        <Section
          id="how-it-works"
          eyebrow="Automation in action"
          title="How SaveADay gives you time back"
          description="See how our apps communicate automatically to handle your manual handoffs. One event triggers the next, so you don't have to."
        >
          <AutomationFlows />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {howItWorks.map((item, index) => (
              <Card key={item.title} className="hover:border-primary transition-colors">
                <CardContent className="flex flex-col gap-3 p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
