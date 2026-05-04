"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { socialLinks } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="bg-transparent text-zinc-900 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8">
        <div className="flex items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            © 2026 Eskereski. Todos os direitos reservados.
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.icon === "email" ? undefined : "_blank"}
                rel={link.icon === "email" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ type: "tween", duration: 0, ease: "easeOut" }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                {link.icon === "github" ? (
                  <FaGithub className="h-5 w-5" />
                ) : link.icon === "linkedin" ? (
                  <FaLinkedin className="h-5 w-5" />
                ) : (
                  <MdAlternateEmail className="h-5 w-5" />
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}