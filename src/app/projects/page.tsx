export default function Projects() {
  const projects = [
    {
      title: "Portfolio",
      description: "Site pessoal com foco em showcasing de projetos e habilidades. Construído com Next.js, TypeScript e Tailwind CSS.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "/",
    },
  ];

  return (
    <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Projetos
        </h1>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
          Alguns dos projetos que desenvolvi, com foco em backend, performance e experiência do usuário.
        </p>

        <div className="mt-12 space-y-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="mt-6 inline-flex items-center rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  >
                    Visitar →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
