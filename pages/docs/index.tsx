import { FileText, Link2, ShieldCheck } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";

import Footer from "@/components/Footer";
import Section from "@/components/Section";

const DEFAULT_DOCS_URL = "https://bigmints-com.github.io/sad-apps/";

const featureCards = [
  {
    title: "Live handbook",
    icon: FileText,
    body: "Markdown files inside the private monorepo render instantly on GitHub Pages using the just-the-docs theme.",
  },
  {
    title: "Embed-friendly",
    icon: Link2,
    body: "This page simply points to the hosted docs URL, so content updates only require git pushes—no marketing redeploys.",
  },
  {
    title: "Secure by default",
    icon: ShieldCheck,
    body: "When the docs repo stays private you will need a GitHub session to view them. Flip the URL env var to expose a public mirror.",
  },
];

const DocsPage: NextPage = () => {
  const docsUrl = process.env.NEXT_PUBLIC_DOCS_URL ?? DEFAULT_DOCS_URL;

  return (
    <>
      <Head>
        <title>SaveADay.ai — Documentation</title>
      </Head>
      <main className="space-y-24 bg-[#050d18] pb-24 pt-16 text-white">
        <Section
          id="docs"
          eyebrow="Docs"
          title="Documentation for every SaveADay app"
          description="These docs are authored in Markdown inside the monorepo and published via GitHub Pages so engineering and marketing stay in sync."
          align="left"
        >
          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_35px_120px_-70px_rgba(58,139,255,0.45)] lg:flex-row">
            <div className="space-y-6">
              <p className="text-lg text-gray-200">
                Need the full handbook? Open the live site in a new tab or read it inline below. The content covers every monorepo app
                except this marketing site.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 font-semibold text-white shadow-lg shadow-brand-blue/40"
                  href={docsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View docs
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-gray-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Auto-published from /docs
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Configure a different target via <code className="rounded bg-black/30 px-2 py-1">NEXT_PUBLIC_DOCS_URL</code> in the
                saveaday.ai deployment pipeline.
              </p>
            </div>
            <ul className="space-y-4 lg:w-80">
              {featureCards.map(({ title, icon: Icon, body }) => (
                <li key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/15 text-brand-blue">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-gray-300">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          id="preview"
          eyebrow="Live preview"
          title="Inline view"
          description="The iframe below loads whatever URL is configured for the handbook so you can browse without leaving saveaday.ai."
        >
          <div className="space-y-4">
            <div className="relative min-h-[24rem] overflow-hidden rounded-3xl border border-white/10 bg-[#0d1625] shadow-[0_40px_120px_-60px_rgba(8,21,45,0.9)]">
              <iframe
                src={docsUrl}
                title="SaveADay documentation"
                className="h-[70vh] w-full"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d1625] to-transparent p-4 text-right text-xs text-gray-400">
                Having trouble? Open the docs in a new tab so GitHub authentication can complete.
              </div>
            </div>
            <p className="text-sm text-gray-400">
              If the iframe fails to load (private repo, CSP, etc.) the primary "View docs" button above will always take you to the
              canonical site.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
};

export default DocsPage;
