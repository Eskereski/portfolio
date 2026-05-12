"use client";

import { useLanguage } from "@/lib/language-context";
import { type Language } from "@/lib/i18n";
import { useI18n } from "@/lib/use-i18n";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { GiBrazilFlag } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { t } = useI18n(language);

  const languages: { code: Language; Icon: IconType }[] = [
    { code: "pt-br", Icon: GiBrazilFlag },
    { code: "en-us", Icon: LiaFlagUsaSolid },
  ];

  return (
    <div className="relative inline-flex items-center justify-between w-14 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 p-0.5 bg-transparent">
      <motion.div
        className="absolute inset-y-0.5 left-0.5 w-1/2 rounded-full bg-zinc-900 dark:bg-white"
        animate={{ x: language === "pt-br" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        aria-hidden="true"
      />

      {languages.map((lang) => {
        const Icon = lang.Icon;
        const active = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative z-10 inline-flex items-center justify-center h-6 w-6 rounded-full transition ${
              active
                ? "text-white dark:text-zinc-900 cursor-default"
                : "text-zinc-600 dark:text-zinc-300 cursor-pointer"
            }`}
            aria-pressed={active}
            aria-label={lang.code === "pt-br" ? t("languageSwitcher.ariaLabel.ptBr") : t("languageSwitcher.ariaLabel.enUs")}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}