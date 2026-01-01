import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          <Link href="mailto:hello@saveaday.ai" className="hover:text-gray-900">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-gray-900">
            Privacy
          </Link>
          <span>© {currentYear} SaveADay</span>
          <a
            href="https://www.linkedin.com/company/saveadayai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
