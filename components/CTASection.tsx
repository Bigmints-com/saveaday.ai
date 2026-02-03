import { useCallback } from "react";
import Link from "next/link";

import sections from "@/data/sections.json";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const { title } = sections.cta;

  const handleJoinWaitlist = useCallback(() => {
    if (typeof window !== "undefined") {
      const win = window as any;

      if (typeof win.waitlistOpen === "function") {
        win.waitlistOpen();
      } else if (typeof win.waitlist?.open === "function") {
        win.waitlist.open();
      } else if (typeof win.__waitlist === "function") {
        win.__waitlist();
      } else if (typeof win.openWaitlist === "function") {
        win.openWaitlist();
      } else {
        window.dispatchEvent(new CustomEvent("openWaitlist"));

        const waitlistElement = document.querySelector(
          '[data-waitlist-token="7fce994a363f8f3abef1249f"]'
        );
        if (waitlistElement && waitlistElement instanceof HTMLElement) {
          waitlistElement.click();
        }
      }
    }
  }, []);

  return (
    <section id="cta" className="mx-auto my-24 w-full max-w-5xl px-6 sm:px-10">
      <Card className="text-center">
        <CardContent className="flex flex-col items-center gap-6 py-16 px-8 sm:px-12">
          <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Join the teams replacing manual check-ins and reports with automations
            that hand back a full day to focus on what matters most.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="#apps">
                Browse the App Catalog
              </Link>
            </Button>
            <Button
              size="lg"
              onClick={handleJoinWaitlist}
              data-waitlist-token="7fce994a363f8f3abef1249f"
            >
              Experience the Full Ecosystem
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
