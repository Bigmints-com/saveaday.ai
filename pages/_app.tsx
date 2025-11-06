import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import "@/styles/globals.css";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load waitlist script
    const script = document.createElement("script");
    script.src = "https://localhost:3000/embed/7fce994a363f8f3abef1249f.js";
    script.setAttribute("data-waitlist-token", "7fce994a363f8f3abef1249f");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="SaveADay.ai helps you reclaim precious time by delegating tedious tasks to thoughtful AI automations."
        />
        <link rel="icon" href="/favicon.svg" />
        <title>SaveADay.ai - Save a day every week</title>
      </Head>
      <div className="font-sans">
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}
