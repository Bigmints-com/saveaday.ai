import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="SaveADay.ai helps you reclaim precious time by delegating tedious tasks to thoughtful automations."
        />
        <link rel="icon" href="/favicon.svg" />
        <title>SaveADay.ai - Save a day every month</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
