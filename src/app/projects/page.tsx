import { getProjectsData } from '../../lib/github';

export default async function Projects() {
  let projects: Array<any> = [];
  try {
    // Chamada direta à função executada no lado do servidor
    projects = await getProjectsData();
  } catch (err) {
    console.error('[Projects Page] Error fetching projects:', err instanceof Error ? err.message : String(err));
  }

  return (
    <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Projetos</h1>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
          Alguns dos projetos que desenvolvi, com foco em backend, performance e experiência do usuário.
        </p>

        <div className="mt-12 space-y-8">
          {projects.length === 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-zinc-600 dark:text-zinc-300">Nenhum projeto encontrado.</p>
            </div>
          )}

          {projects.map((project: any) => (
            <article
              key={project.repoName}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start gap-4">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-24 w-24 flex-none rounded-md object-cover"
                  />
                )}

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{project.name}</h2>
                      <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{project.language ?? '—'}</div>
                    </div>

                    <div className="text-sm text-zinc-500 dark:text-zinc-400">⭐ {project.stars ?? 0}</div>
                  </div>

                  <p className="mt-3 text-zinc-600 dark:text-zinc-300">{project.description}</p>

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
                    Ver no GitHub →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
