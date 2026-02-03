"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AUTH_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:3010" 
  : "https://auth.saveaday.ai";

const APP_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3014"
  : "https://app.saveaday.ai";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for session cookie
    const hasSession = document.cookie.split(';').some(c => c.trim().startsWith('session='));
    setIsLoggedIn(hasSession);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo-symbol.svg"
            alt="SaveADay"
            width={32}
            height={32}
            className="h-8 w-8 transition-transform group-hover:scale-110"
          />
          <span className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            SaveADay
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          
          {isLoggedIn ? (
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25" asChild>
              <a href={`${APP_URL}/dashboard`}>View Dashboard</a>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <a href={`${AUTH_URL}/login`}>Log in</a>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25" asChild>
                <a href={`${AUTH_URL}/register`}>Get Started</a>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
