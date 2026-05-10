import { IoMdDownload } from "react-icons/io";
import { Particles } from "@/components/ui/particles";
import { MagicCard } from "@/components/ui/magic-card";

export default function Home() {
  const featureCardClass =
    "rounded-2xl border border-zinc-200/80 bg-zinc-100/80 p-4 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-white/5 dark:shadow-black/20"

  return (
    <main className="min-h-screen pb-16">
      <section className="relative isolate w-full overflow-hidden">
        <Particles
          className="absolute inset-0 h-full w-full opacity-80 dark:opacity-50"
          quantity={90}
          size={0.45}
          color="#71717a"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(113,113,122,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-10 sm:px-8 sm:pt-16 lg:pt-24">
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

            <div className="mt-8 mb-2 flex flex-col gap-3 sm:flex-row">
              <a
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition duration-200 ease-out transform-gpu hover:scale-[1.04] hover:bg-zinc-700 hover:shadow-[0_0_22px_rgba(253,224,71,0.28)] focus-visible:scale-[1.04] focus-visible:bg-zinc-700 focus-visible:shadow-[0_0_22px_rgba(253,224,71,0.28)] focus-visible:outline-none dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:hover:shadow-[0_0_18px_rgba(255,255,255,0.16)] dark:focus-visible:bg-zinc-200 dark:focus-visible:shadow-[0_0_18px_rgba(255,255,255,0.16)]"
              >
                Ver projetos
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition duration-200 ease-out transform-gpu hover:scale-[1.04] hover:bg-zinc-100 hover:shadow-[0_0_22px_rgba(253,224,71,0.2)] focus-visible:scale-[1.04] focus-visible:bg-zinc-100 focus-visible:shadow-[0_0_22px_rgba(253,224,71,0.2)] focus-visible:outline-none dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:hover:shadow-[0_0_18px_rgba(255,255,255,0.12)] dark:focus-visible:bg-zinc-900 dark:focus-visible:shadow-[0_0_18px_rgba(255,255,255,0.12)]"
              >
                Entre em contato
              </a>

              <a
                href="/curriculo.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition duration-200 ease-out transform-gpu hover:scale-[1.04] hover:bg-zinc-100 hover:shadow-[0_0_22px_rgba(253,224,71,0.2)] focus-visible:scale-[1.04] focus-visible:bg-zinc-100 focus-visible:shadow-[0_0_22px_rgba(253,224,71,0.2)] focus-visible:outline-none dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:hover:shadow-[0_0_18px_rgba(255,255,255,0.12)] dark:focus-visible:bg-zinc-900 dark:focus-visible:shadow-[0_0_18px_rgba(255,255,255,0.12)]"
              >
                Currículo
                <IoMdDownload className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <MagicCard
            mode="gradient"
            gradientSize={220}
            gradientColor="#ffffff"
            gradientOpacity={0.11}
            gradientFrom="#9E7AFF"
            gradientTo="#FE8BBB"
            className="rounded-3xl shadow-lg shadow-black/20"
          >
            <div className="h-full w-full p-6">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                O que eu faço
              </p>

              <div className="mt-5 space-y-4">
                <div className={featureCardClass}>
                  <p className="text-sm font-semibold">Backend</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    APIs, autenticação, integrações e modelagem de dados.
                  </p>
                </div>

                <div className={featureCardClass}>
                  <p className="text-sm font-semibold">Frontend</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    Interfaces limpas, responsivas e intuitivas.
                  </p>
                </div>

                <div className={featureCardClass}>
                  <p className="text-sm font-semibold">Projetos</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                    Portfólio, sistemas internos e produtos com foco em resultado.
                  </p>
                </div>
              </div>
            </div>
          </MagicCard>
        </div>
        </div>
      </section>

      <section className="mx-auto mt-24 w-full max-w-6xl px-6 sm:px-8">
        <div className="rounded-3xl border border-dashed border-zinc-300/80 bg-zinc-50/70 p-8 shadow-sm shadow-zinc-900/5 dark:border-zinc-700 dark:bg-white/5 dark:shadow-black/20 sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-zinc-500 dark:text-zinc-400">
            Placeholder
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Próxima seção reservada
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            Este espaço está pronto para receber as próximas seções do portfólio.
          </p>
        </div>
      </section>
    </main>
  );
}