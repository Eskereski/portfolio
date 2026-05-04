"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNavLinks } from "@/lib/navigation";
import { useLanguage } from "@/lib/language-context";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedHamburgerButton } from "@/components/ui/animated-hamburger-button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const navLinks = getNavLinks(language);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group inline-flex min-h-11 items-center rounded-full border border-transparent px-4 py-2 text-sm font-medium text-zinc-600 transition duration-200 ease-out transform-gpu hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none dark:text-zinc-300 dark:hover:text-white dark:focus-visible:text-white"
            >
              <span className="inline-block transition duration-200 ease-out group-hover:scale-110 group-focus-visible:scale-110 group-hover:[text-shadow:0_2px_10px_rgba(217,119,6,0.42)] group-focus-visible:[text-shadow:0_2px_10px_rgba(217,119,6,0.42)] dark:group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.65)] dark:group-focus-visible:drop-shadow-[0_0_16px_rgba(255,255,255,0.65)]">
                {link.label}
              </span>
            </Link>
          ))}
          <AnimatedThemeToggler className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:text-zinc-50" />
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <AnimatedHamburgerButton
            active={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            className="h-10 w-10 text-zinc-900 dark:text-white"
          />
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <>
            <button
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-40 bg-zinc-950/40"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed right-0 top-0 z-50 h-dvh w-[85vw] max-w-sm border-l border-zinc-200 bg-white px-6 py-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
                  Menu
                </p>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  Navegação
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex min-h-12 items-center rounded-2xl border border-transparent px-5 py-3 text-sm font-medium text-zinc-700 transition duration-200 ease-out transform-gpu hover:text-zinc-900 focus-visible:text-zinc-900 focus-visible:outline-none dark:text-zinc-200 dark:hover:text-white dark:focus-visible:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="inline-block transition duration-200 ease-out group-hover:scale-110 group-focus-visible:scale-110 group-hover:[text-shadow:0_2px_10px_rgba(217,119,6,0.42)] group-focus-visible:[text-shadow:0_2px_10px_rgba(217,119,6,0.42)] dark:group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.6)] dark:group-focus-visible:drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]">
                      {link.label}
                    </span>
                  </Link>
                ))}
                <div className="mt-4">
                  <AnimatedThemeToggler className="w-full inline-flex items-center justify-center rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-200" />
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}