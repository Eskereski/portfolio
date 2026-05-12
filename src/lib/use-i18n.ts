"use client";

import { useEffect, useMemo, useState } from "react";

import {
  createTranslator,
  defaultLanguage,
  defaultNamespace,
  getPreloadedMessages,
  loadMessages,
  type Language,
  type Messages,
  type Namespace,
  type Translator,
} from "@/lib/i18n";

export function useI18n(
  language: Language = defaultLanguage,
  namespace: Namespace = defaultNamespace
): { t: Translator; ready: boolean } {
  const [primary, setPrimary] = useState<Messages | null>(() =>
    getPreloadedMessages(language, namespace) ?? null
  );
  const [fallback, setFallback] = useState<Messages | null>(() =>
    getPreloadedMessages(defaultLanguage, namespace) ?? null
  );
  const [loadedLanguage, setLoadedLanguage] = useState<Language | null>(() =>
    getPreloadedMessages(language, namespace) ? language : null
  );

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const [nextPrimary, nextFallback] = await Promise.all([
        loadMessages(language, namespace),
        loadMessages(defaultLanguage, namespace),
      ]);

      if (cancelled) return;

      setPrimary(nextPrimary);
      setFallback(nextFallback);
      setLoadedLanguage(language);
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [language, namespace]);

  const t = useMemo(
    () =>
      createTranslator(
        primary ? { [namespace]: primary } : {},
        fallback ? { [namespace]: fallback } : {}
      ),
    [primary, fallback, namespace]
  );

  return { t, ready: loadedLanguage === language };
}
