"use client";

import { useLanguage } from "@/lib/language-context";
import { useI18n } from "@/lib/use-i18n";

export default function About() {
  const { language } = useLanguage();
  const { t } = useI18n(language);

  const skillCategories = [
    {
      title: t("about.skills.categories.programming.title"),
      description: t("about.skills.categories.programming.description"),
    },
    {
      title: t("about.skills.categories.cloudBackend.title"),
      description: t("about.skills.categories.cloudBackend.description"),
    },
    {
      title: t("about.skills.categories.databaseBi.title"),
      description: t("about.skills.categories.databaseBi.description"),
    },
    {
      title: t("about.skills.categories.frontend.title"),
      description: t("about.skills.categories.frontend.description"),
    },
    {
      title: t("about.skills.categories.toolsDevops.title"),
      description: t("about.skills.categories.toolsDevops.description"),
    },
  ];

  const methodologyItems = [
    t("about.operations.methodologies.items.item1"),
    t("about.operations.methodologies.items.item2"),
    t("about.operations.methodologies.items.item3"),
    t("about.operations.methodologies.items.item4"),
    t("about.operations.methodologies.items.item5"),
  ];

  return (
    <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t("about.title")}
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          <p>{t("about.intro.paragraph1")}</p>
          <p>{t("about.intro.paragraph2")}</p>
          <p>{t("about.intro.paragraph3")}</p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{t("about.skills.title")}</h2>

          <div className="space-y-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <p className="font-semibold text-zinc-900 dark:text-white">{category.title}</p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6 mt-10">{t("about.operations.title")}</h2>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="font-semibold text-zinc-900 dark:text-white">
              {t("about.operations.methodologies.title")}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {methodologyItems.map((item, index) => (
                <li key={`${index}-${item}`}>{item ? `• ${item}` : item}</li>
              ))}
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-6 mt-10">{t("about.languages.title")}</h2>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {t("about.languages.description")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
