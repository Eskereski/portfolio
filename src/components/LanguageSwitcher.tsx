"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { useI18n } from "@/lib/use-i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useI18n(language);
  const nextLanguage = language === "pt-br" ? "en-us" : "pt-br";
  const currentLanguageLabel = language === "pt-br" ? "PT-BR" : "EN-US";

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      className={cn(
        "group cursor-pointer bg-transparent transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:scale-[1.02]",
        "transition-colors duration-150 ease-out hover:border-zinc-700 hover:bg-zinc-950 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:hover:border-zinc-300 dark:hover:bg-white dark:hover:text-zinc-900 dark:focus-visible:ring-zinc-600 dark:focus-visible:ring-offset-zinc-950",
        className
      )}
      aria-label={
        nextLanguage === "pt-br"
          ? t("languageSwitcher.ariaLabel.ptBr")
          : t("languageSwitcher.ariaLabel.enUs")
      }
      title={currentLanguageLabel}
    >
      <span className="relative block h-4 w-4">
        <Image
          src={`/icons/${language}.png`}
          alt=""
          width={24}
          height={24}
          className="absolute inset-0 h-4 w-4 rounded-full object-cover opacity-100 rotate-0 scale-100 transition-all duration-200 ease-out group-hover:opacity-0 group-hover:-rotate-90 group-hover:scale-75"
          aria-hidden="true"
        />
        <Image
          src={`/icons/${nextLanguage}.png`}
          alt=""
          width={24}
          height={24}
          className="absolute inset-0 h-4 w-4 rounded-full object-cover opacity-0 rotate-90 scale-75 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:rotate-0 group-hover:scale-100"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
