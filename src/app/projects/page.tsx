"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "@/lib/language-context";
import { useI18n } from "@/lib/use-i18n";
import type { EnrichedProject } from "../../lib/github";

type ProjectsResponse = {
  projects?: EnrichedProject[];
};

export default function Projects() {
  const { language } = useLanguage();
  const { t } = useI18n(language);
  const [projects, setProjects] = useState<EnrichedProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = (await response.json()) as ProjectsResponse;

        if (!cancelled) {
          setProjects(data.projects ?? []);
          setIsLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(
            "[Projects Page] Error fetching projects:",
            error instanceof Error ? error.message : String(error)
          );
          setProjects([]);
          setIsLoading(false);
        }
      }
    };

    void loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("projects.title")}</h1>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
          {t("projects.description")}
        </p>

        <div className="mt-12 space-y-8">
          {!isLoading && projects.length === 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-zinc-600 dark:text-zinc-300">{t("projects.emptyState")}</p>
            </div>
          )}

          {projects.map((project) => {
            const description =
              project.repoName === "portfolio"
                ? t("projects.items.portfolio.description")
                : project.description;

            return (
              <article
                key={project.repoName}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-24 w-24 flex-none items-center justify-center overflow-hidden rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-300">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      ) : (
                        <FaGithub className="h-12 w-12" aria-hidden="true" />
                      )}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{project.name}</h2>
                      <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{project.language ?? "—"}</div>
                    </div>
                  </div>

                  <div className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400">⭐ {project.stars ?? 0}</div>
                </div>

                <p className="mt-4 text-left text-zinc-600 dark:text-zinc-300">{description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.tags ?? []).map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  {t("projects.openOnGitHub")}
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
