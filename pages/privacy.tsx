import type { NextPage } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PrivacyPage: NextPage = () => {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-24 text-gray-200">
      <h1 className="text-3xl font-semibold text-white sm:text-4xl">
        Privacy &amp; Data Respect
      </h1>
      <p className="text-lg text-gray-300">
        SaveADay.ai is built with privacy in mind. We only collect the minimal
        data required to keep your automations running and we never sell your
        information. Full terms will follow as we launch publicly.
      </p>
      <p className="text-sm text-gray-400">
        Curious about how we handle data today? Reach out at{" "}
        <Link href="mailto:hello@saveaday.ai" className="text-brand-teal">
          hello@saveaday.ai
        </Link>{" "}
        and we will share the latest draft.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-brand-teal/60 px-6 py-2 text-sm font-semibold text-brand-teal transition hover:bg-brand-teal/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the homepage
      </Link>
    </main>
  );
};

export default PrivacyPage;
