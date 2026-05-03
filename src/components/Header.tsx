"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
        >
          Eskereski
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block h-0.5 w-6 bg-zinc-900 dark:bg-white"></span>
          <span className="block h-0.5 w-6 bg-zinc-900 dark:bg-white"></span>
          <span className="block h-0.5 w-6 bg-zinc-900 dark:bg-white"></span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}