import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ImageSlot } from "@/components/site/image-slot"
import { AreaIconView } from "@/components/site/area-icon"
import { Reveal } from "@/components/site/reveal"
import { AREAS } from "@/lib/site"

export function Areas() {
  return (
    <section className="section bg-sand/60">
      <div className="wrap">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">O que fazemos</p>
          <h2 className="text-balance text-3xl font-bold md:text-4xl">Áreas de trabalho</h2>
          <p className="mt-4 text-muted-foreground">Seis frentes onde a associação procura fazer a diferença no dia a dia da comunidade.</p>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area, i) => (
            <li key={area.slug}>
              <Reveal delay={(i % 3) * 90} className="h-full">
                <Link
                  href={`/respostas-sociais#${area.slug}`}
                  className="card-soft group flex h-full flex-col overflow-hidden hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <ImageSlot
                      slot={area.image}
                      alt={area.alt}
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    {"planned" in area && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                        Em planeamento
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="flex items-center gap-3 text-2xl font-bold">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-olive-tint text-olive">
                        <AreaIconView icon={area.icon} className="h-6 w-6" />
                      </span>
                      {area.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base text-muted-foreground">{area.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-2 font-bold text-accent">
                      Saber mais
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
