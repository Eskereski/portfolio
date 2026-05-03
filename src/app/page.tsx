export default function Home() {
  return (
     <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col justify-center pt-10 sm:pt-16 lg:pt-24">
        <div className="mb-8 inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white/70 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300">
          Portfolio de desenvolvedor full stack
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
              Backend first
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Construo aplicações web com foco em backend, performance e usabilidade.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
              Sou desenvolvedor full stack, mas gosto de trabalhar mais perto da lógica,
              da API e da estrutura que sustenta o produto. Fiz a página para mostrar alguns dos meus
              projetos, minhas habilidades e formas de entrar em contato.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Ver projetos
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                Falar comigo
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              O que eu faço
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                <p className="text-sm font-semibold">Backend</p>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  APIs, autenticação, integrações e modelagem de dados.
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                <p className="text-sm font-semibold">Frontend</p>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Interfaces limpas, responsivas e fáceis de usar.
                </p>
              </div>

              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-950">
                <p className="text-sm font-semibold">Projetos</p>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Portfólio, sistemas internos e produtos com foco em resultado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}