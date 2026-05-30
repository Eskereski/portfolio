"use client";

import { useEffect, useRef, useState, type FocusEvent, type MouseEvent } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useLanguage } from "@/lib/language-context";
import { useI18n } from "@/lib/use-i18n";
import { cn } from "@/lib/utils";

export default function Contact() {
  const { language } = useLanguage();
  const { t } = useI18n(language);
  const emailAddress = "d.eskereski@hotmail.com";
  const emailPointerActive = useRef(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailTooltipVisible, setEmailTooltipVisible] = useState(false);
  const [emailTooltipPosition, setEmailTooltipPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!emailCopied) return;

    const timeout = window.setTimeout(() => {
      setEmailCopied(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [emailCopied]);

  const copyEmail = async (event: MouseEvent<HTMLButtonElement>) => {
    if (event.clientX || event.clientY) {
      setEmailTooltipVisible(true);
      setEmailTooltipPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    await navigator.clipboard.writeText(emailAddress);
    setEmailCopied(true);
  };

  const moveEmailTooltip = (event: MouseEvent<HTMLButtonElement>) => {
    emailPointerActive.current = true;
    setEmailTooltipVisible(true);
    setEmailTooltipPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const hideEmailTooltip = () => {
    emailPointerActive.current = false;
    setEmailTooltipVisible(false);
  };

  const showEmailTooltipOnFocus = (event: FocusEvent<HTMLButtonElement>) => {
    if (emailPointerActive.current) {
      setEmailTooltipVisible(true);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setEmailTooltipVisible(true);
    setEmailTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  return (
    <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("contact.title")}
        </h1>

        <div className="mt-6 space-y-4 text-lg text-zinc-600 dark:text-zinc-300">
          <p>{t("contact.description.paragraph1")}</p>
          <p>{t("contact.description.paragraph2")}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <button
            type="button"
            onClick={copyEmail}
            onMouseEnter={moveEmailTooltip}
            onMouseMove={moveEmailTooltip}
            onMouseLeave={hideEmailTooltip}
            onFocus={showEmailTooltipOnFocus}
            onBlur={() => setEmailTooltipVisible(false)}
            className="group relative flex h-full cursor-pointer flex-col justify-between rounded-lg border border-zinc-200 bg-white px-5 py-6 text-left shadow-sm shadow-zinc-900/5 transition duration-200 ease-out hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15 dark:border-zinc-800/50 dark:bg-zinc-950 dark:shadow-black/20 dark:hover:border-zinc-700 dark:hover:shadow-black/30 dark:focus-visible:ring-zinc-200/20"
            aria-label={`Copiar email ${emailAddress}`}
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest leading-none text-zinc-500 dark:text-zinc-400">
                <MdAlternateEmail className="h-4 w-4" aria-hidden="true" />
                <span>{t("contact.cards.email.label")}</span>
              </div>
              <div className="mt-2 text-lg font-medium text-zinc-900 dark:text-white">
                Demétrius Eskereski
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {emailAddress}
              </p>
            </div>
          </button>
          <span
            className={cn(
              "pointer-events-none fixed z-50 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm shadow-zinc-900/10 transition-opacity duration-200 ease-out dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:shadow-black/30",
              emailTooltipVisible ? "opacity-100" : "opacity-0"
            )}
            style={{
              left: emailTooltipPosition.x,
              top: emailTooltipPosition.y,
              transform: "translate(14px, -40px)",
            }}
            aria-live="polite"
          >
            {emailCopied ? "email copiado" : "clique para copiar"}
          </span>

          <a
            href="https://github.com/Eskereski"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col justify-between rounded-lg border border-zinc-200 bg-white px-5 py-6 transition hover:border-zinc-300 dark:border-zinc-800/50 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest leading-none text-zinc-500 dark:text-zinc-400">
                <FaGithub className="h-4 w-4" />
                <span>{t("contact.cards.github.label")}</span>
              </div>
              <div className="mt-2 truncate text-lg font-medium text-zinc-900 dark:text-white">
                Eskereski
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {t("contact.cards.github.description")}
            </p>
          </a>

          <a
            href="https://linkedin.com/in/demétrius-eskereski/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full flex-col justify-between rounded-lg border border-zinc-200 bg-white px-5 py-6 transition hover:border-zinc-300 dark:border-zinc-800/50 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest leading-none text-zinc-500 dark:text-zinc-400">
                <FaLinkedin className="h-4 w-4" />
                <span>{t("contact.cards.linkedin.label")}</span>
              </div>
              <div className="mt-2 truncate text-lg font-medium text-zinc-900 dark:text-white">
                Demétrius Eskereski
              </div>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {t("contact.cards.linkedin.description")}
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
