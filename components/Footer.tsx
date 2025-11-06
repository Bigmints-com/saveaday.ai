import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo-symbol.svg"
            alt="SaveADay.ai"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <p className="font-medium text-gray-300">
            © {currentYear} SaveADay.ai. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-gray-400">
          <Link href="mailto:hello@saveaday.ai" className="transition hover:text-brand-teal">
            Contact
          </Link>
          <Link href="/privacy" className="transition hover:text-brand-teal">
            Privacy
          </Link>
          <Link href="https://www.linkedin.com/company/saveadayai" className="transition hover:text-brand-teal">
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
