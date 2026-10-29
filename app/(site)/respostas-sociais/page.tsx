import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Contact } from "@/components/home/contact"
import { AreaIconView } from "@/components/site/area-icon"
import { ImageSlot } from "@/components/site/image-slot"
import { LoadError } from "@/components/site/load-error"
import { PageHero } from "@/components/site/page-hero"
import { Reveal } from "@/components/site/reveal"
import { getRespostasSociais } from "@/lib/server/content"
import { FEATURED_AREAS, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Respostas Sociais",
  description: `Conheça as áreas de trabalho da ${SITE.name}: apoio a idosos, cultura e turismo, serviços comunitários, formação e o Lar de Idosos.`,
  alternates: { canonical: "/respostas-sociais" },
}

export default async function RespostasSociaisPage() {
  const respostas = await getRespostasSociais()

  return (
    <>
      <PageHero
        eyebrow="Respostas Sociais"
        title="Como apoiamos a comunidade"
        intro="Do apoio a idosos à cultura e à formação: estas são as áreas em que a associação trabalha."
      />

      <section className="section">
        <div className="wrap space-y-20 md:space-y-28">
          {FEATURED_AREAS.map((area, i) => (
            <article key={area.slug} id={area.slug} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand shadow-lg">
                  <ImageSlot slot={area.image} alt={area.alt} sizes="(min-width: 1024px) 540px, 100vw" priority={i === 0} />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive-tint text-olive">
                  <AreaIconView icon={area.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">{area.title}</h2>
                {"badge" in area && (
                  <p className="mt-3 inline-block rounded-full bg-accent px-4 py-1 text-sm font-bold text-accent-foreground">{area.badge}</p>
                )}
                <p className="mt-4 text-xl text-muted-foreground">{area.summary}</p>

                <a href={SITE.phoneHref} className="btn-outline mt-6">
                  Saber mais: {SITE.phone}
                </a>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {!respostas.ok && (
        <section className="pb-16">
          <div className="wrap">
            <LoadError what="os projetos e iniciativas" />
          </div>
        </section>
      )}

      {respostas.ok && respostas.data.length > 0 && (
        <section className="section bg-sand/60">
          <div className="wrap">
            <Reveal className="mb-10 max-w-2xl">
              <p className="eyebrow">Projetos e iniciativas</p>
              <h2 className="text-balance text-3xl font-bold md:text-4xl">Em destaque</h2>
            </Reveal>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {respostas.data.map((r) => (
                <li key={r.id}>
                  <article className="card-soft group relative flex h-full flex-col overflow-hidden hover:shadow-xl">
                    <div className="relative aspect-[3/2] bg-sand">
                      {r.urlsImagens[0] ? (
                        <Image src={r.urlsImagens[0]} alt={`Imagem de ${r.titulo}`} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                      ) : (
                        <ImageSlot slot="evento" alt={r.titulo} sizes="360px" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-2xl font-bold">
                        <Link href={`/respostas-sociais/${r.id}`} className="after:absolute after:inset-0 hover:underline">
                          {r.titulo}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-base text-muted-foreground">{r.descricao}</p>
                      <span className="mt-4 inline-flex items-center gap-2 font-bold text-accent">
                        Mais informações <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Contact />
    </>
  )
}
