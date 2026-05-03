"use client";

import Link from "next/link";
import { navLinks, socialLinks } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-transparent text-zinc-900 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold">Eskereski</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Desenvolvedor Full stack com foco em soluções backend.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide">Navigation</p>
            <div className="mt-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide">Social</p>
            <div className="mt-3 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          © 2024 Eskereski. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}