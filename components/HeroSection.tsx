import Link from "next/link";
import heroData from "@/data/hero.json";
import { ArrowUpRight, BarChart3, Clock, RefreshCw, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section className="bg-background pb-24 pt-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 sm:px-10">

        {/* Centered Headlines & CTAs */}
        <div className="flex flex-col items-center gap-8 text-center">
          <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-7xl">
            {heroData.headline}
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {heroData.subtext}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button size="lg" asChild>
              <Link href="#cta">
                {heroData.ctaPrimary}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#how-it-works">
                {heroData.ctaSecondary}
              </Link>
            </Button>
          </div>
        </div>

        {/* Value Props Grid */}
        <ul className="grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              text: "Automate the status updates, reminders, and follow-ups stealing your day.",
              icon: <Zap className="h-5 w-5" />,
            },
            {
              text: "Sync work across the tools you already use without manual copy and paste.",
              icon: <RefreshCw className="h-5 w-5" />,
            },
            {
              text: "See dashboards and alerts before projects or finances fall behind.",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              text: "Spend the saved time on the launches, customers, and people that matter.",
              icon: <Clock className="h-5 w-5" />,
            },
          ].map((item, index) => (
            <Card key={index} className="border-transparent hover:bg-muted/50 transition-colors">
              <CardContent className="flex flex-col gap-3 items-center text-center p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </span>
              </CardContent>
            </Card>
          ))}
        </ul>

      </div>
    </section>
  );
}
