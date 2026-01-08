import { useCallback } from "react";
import Link from "next/link";

import sections from "@/data/sections.json";

export default function CTASection() {
  const { title, button } = sections.cta;

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
    <section
      id="cta"
      className="mx-auto my-24 flex w-full max-w-5xl flex-col items-center gap-8 rounded-lg border border-gray-200 bg-white px-8 py-16 text-center sm:px-12"
    >
      <h2 className="text-balance text-3xl font-semibold text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-2xl text-lg text-gray-600">
        Join the teams replacing manual check-ins and reports with automations
        that hand back a full day to focus on what matters most.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Link
          href="#apps"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 px-8 py-3 text-base font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Browse the App Catalog
        </Link>
        <button
          onClick={handleJoinWaitlist}
          data-waitlist-token="7fce994a363f8f3abef1249f"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
        >
          Experience the Full Ecosystem
        </button>
      </div>
    </section>
  );
}
