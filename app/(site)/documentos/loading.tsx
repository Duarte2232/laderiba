import { PageHero } from "@/components/site/page-hero"

// Esqueleto mostrado enquanto o servidor obtém a lista de documentos.
export default function Loading() {
  return (
    <>
      <PageHero eyebrow="Transparência" title="Documentos" intro="A carregar os documentos…" />
      <section className="section" aria-busy="true" aria-live="polite">
        <div className="wrap">
          <span className="sr-only">A carregar documentos…</span>
          <div className="mb-8 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 w-28 animate-pulse rounded-full bg-sand" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-soft flex items-center gap-4 p-5">
                <div className="h-14 w-14 animate-pulse rounded-2xl bg-sand" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-sand" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-sand" />
                </div>
                <div className="hidden h-12 w-40 animate-pulse rounded-full bg-sand sm:block" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
