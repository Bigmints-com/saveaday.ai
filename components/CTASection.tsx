import { useCallback } from "react";

import sections from "@/data/sections.json";

export default function CTASection() {
  const { title, button } = sections.cta;

  const handleJoinWaitlist = useCallback(() => {
    // Trigger waitlist modal - the script should expose a global function
    if (typeof window !== "undefined") {
      // Try different possible global function names that waitlist widgets commonly use
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
        // Fallback: dispatch a custom event that the script might listen to
        // or try to find and click an element with the waitlist data attribute
        window.dispatchEvent(new CustomEvent("openWaitlist"));
        
        // Some widgets attach to elements with data-waitlist-token
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
    <section
      id="cta"
      className="mx-auto my-24 flex w-full max-w-5xl flex-col items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent px-8 py-16 text-center shadow-lg shadow-black/30 backdrop-blur sm:px-12"
    >
      <h2 className="text-balance text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-lg text-gray-300">
        Join the teams replacing manual check-ins and reports with automations
        that hand back a full day to focus on what matters most.
      </p>
      <button
        onClick={handleJoinWaitlist}
        data-waitlist-token="7fce994a363f8f3abef1249f"
        className="inline-flex items-center justify-center rounded-full bg-brand-teal px-8 py-3 text-base font-semibold text-gray-950 transition hover:bg-brand-teal/90"
      >
        {button}
      </button>
    </section>
  );
}
