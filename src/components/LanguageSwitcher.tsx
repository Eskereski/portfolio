"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { type Language } from "@/lib/i18n";
import { useI18n } from "@/lib/use-i18n";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { GiBrazilFlag } from "react-icons/gi";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useI18n(language);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const languages: { code: Language; Icon: IconType }[] = [
    { code: "pt-br", Icon: GiBrazilFlag },
    { code: "en-us", Icon: LiaFlagUsaSolid },
  ];

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center justify-center h-8 w-8"
        >
          <AiOutlineLoading3Quarters className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex h-8 w-14 items-center justify-between rounded-full border p-0.5 bg-transparent",
        className
      )}
    >
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