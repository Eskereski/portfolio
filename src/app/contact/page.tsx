export default function Contact() {
  return (
     <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Entre em contato
        </h1>

        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
          Estou sempre aberto para conversar sobre novos projetos, ideias ou oportunidades.
          Sinta-se livre para entrar em contato através dos canais abaixo.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {/* Email */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Email
            </p>
            <a
              href="mailto:d.eskereski@hotmail.com"
              className="mt-2 text-lg font-medium text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            >
              d.eskereski@hotmail.com
            </a>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Me contate via email para oportunidades profissionais ou colaborações
            </p>
          </div>

          {/* GitHub */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              GitHub
            </p>
            <a
              href="https://github.com/Eskereski"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-lg font-medium text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            >
              github.com/Eskereski
            </a>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Veja meus projetos e contribuições
            </p>
          </div>

          {/* LinkedIn */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              LinkedIn
            </p>
            <a
              href="https://linkedin.com/in/demétrius-eskereski/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-lg font-medium text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            >
              linkedin.com/in/demétrius-eskereski
            </a>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Conecte-se comigo
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
