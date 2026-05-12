"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useLanguage } from "@/lib/language-context";
import { useI18n } from "@/lib/use-i18n";

export default function Contact() {
  const { language } = useLanguage();
  const { t } = useI18n(language);

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
          <a
            href="mailto:d.eskereski@hotmail.com"
            className="flex h-full flex-col justify-between rounded-lg border border-zinc-200 bg-white px-5 py-6 transition hover:border-zinc-300 dark:border-zinc-800/50 dark:bg-zinc-950 dark:hover:border-zinc-700"
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest leading-none text-zinc-500 dark:text-zinc-400">
                <MdAlternateEmail className="h-4 w-4" />
                <span>{t("contact.cards.email.label")}</span>
              </div>
              <div className="mt-2 text-lg font-medium text-zinc-900 dark:text-white">
                d.eskereski@hotmail.com
              </div>
            </div>
          </a>

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
