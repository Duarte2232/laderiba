import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/site/reveal"
import { MOMENTOS } from "@/lib/momentos"

// Galeria completa, para a página de eventos.
export function MomentosGaleria() {
  return (
    <section id="momentos" className="section scroll-mt-24 bg-sand/60">
      <div className="wrap">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">Memórias</p>
          <h2 className="text-balance text-3xl font-bold md:text-4xl">Momentos da nossa comunidade</h2>
          <p className="mt-4 text-muted-foreground">Algumas fotografias de eventos que já vivemos juntos.</p>
        </Reveal>

        <div className="space-y-14">
          {MOMENTOS.map((m) => (
            <Reveal key={m.slug}>
              <section aria-labelledby={`m-${m.slug}`}>
                <h3 id={`m-${m.slug}`} className="mb-4 text-2xl font-bold">
                  {m.titulo}
                </h3>
                <ul className={m.fotos.length > 1 ? "grid grid-cols-2 gap-3 lg:grid-cols-3" : "grid max-w-2xl gap-3"}>
                  {m.fotos.map((foto, i) => (
                    <li
                      key={foto.file}
                      className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand ${i === 0 && m.fotos.length > 2 ? "col-span-2 lg:row-span-2 lg:aspect-auto" : ""}`}
                    >
                      <Image
                        src={foto.file}
                        alt={foto.alt}
                        fill
                        sizes={i === 0 && m.fotos.length > 2 ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 360px, 50vw"}
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// Faixa curta para a página inicial.
export function MomentosFaixa() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Memórias</p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">Momentos da nossa comunidade</h2>
          </div>
          <Link href="/eventos#momentos" className="inline-flex min-h-[3rem] items-center gap-2 font-bold text-accent hover:underline">
            Ver todas as fotografias <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MOMENTOS.map((m, i) => (
            <li key={m.slug}>
              <Reveal delay={i * 70} className="h-full">
                <Link href={`/eventos#m-${m.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-sand shadow-sm">
                  <Image
                    src={m.fotos[0].file}
                    alt={m.fotos[0].alt}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-olive-dark/95 to-transparent p-4 pt-14 font-serif text-lg font-bold leading-tight text-white">
                    {m.titulo}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
