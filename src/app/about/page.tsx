export default function About() {
  return (
     <main className="min-h-screen px-6 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Sobre mim
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
          <p>
            Sou um desenvolvedor full stack com paixão por backend e soluções robustas.
            Com experiência em Node.js, TypeScript e arquitetura de APIs, gosto de resolver
            problemas complexos com código limpo e bem organizado.
          </p>

          <p>
            Meu foco principal é em backend, mas tenho experiência e conforto com frontend
            usando React e Next.js. Acredito que a melhor solução é quando frontend e backend
            trabalham juntos de forma harmônica.
          </p>

          <p>
            Priorizo o alinhamento estratégico e clareza na troca de informações. 
            Acredito que o desenvolvimento de software eficiente depende de equipes sincronizadas, 
            onde a comunicação clara é a base para transformar requisitos complexos em 
            soluções funcionais.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Habilidades Técnicas</h2>

          <div className="space-y-6">
            {/* Linguagens de Programação */}
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="font-semibold text-zinc-900 dark:text-white">Linguagens de Programação</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Python • C/C++ • Java • JavaScript / TypeScript
              </p>
            </div>

            {/* Backend e Infraestrutura */}
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="font-semibold text-zinc-900 dark:text-white">Cloud e Backend</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                AWS (Lambda, serviços gerenciados) • Node.js • APIs REST • Integrações de sistemas • Processamento assíncrono • Modelagem de dados
              </p>
            </div>

            {/* Banco de Dados e BI */}
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="font-semibold text-zinc-900 dark:text-white">Banco de Dados e BI</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                SQL • Power BI
              </p>
            </div>

            {/* Ecossistema Frontend */}
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="font-semibold text-zinc-900 dark:text-white">Ecossistema Frontend</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                React • Tailwind CSS • Next.js • HTML • CSS
              </p>
            </div>

            {/* Ferramentas e DevOps */}
            <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
              <p className="font-semibold text-zinc-900 dark:text-white">Ferramentas e DevOps</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Git • GitHub • GitHub Actions • Gerenciamento de variáveis de ambiente e segurança de credenciais
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 mt-10">Competências Operacionais</h2>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="font-semibold text-zinc-900 dark:text-white">Metodologias</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• Lógica de programação aplicada</li>
              <li>• Estruturação modular de código</li>
              <li>• Resolução pragmática de problemas técnicos</li>
              <li>• Metodologias ágeis: Scrum e Kanban</li>
              <li>• Capacidade de adaptação a novas stacks tecnológicas</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-6 mt-10">Idiomas</h2>

          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Inglês (Avançado) • Espanhol (Intermediário) • Portugês (Nativo)</p>
          </div>
        </div>
      </section>
    </main>
  );
}
