import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo-symbol.svg"
            alt="SaveADay"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-medium text-gray-900">SaveADay</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-brand-accent px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
