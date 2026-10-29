import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ImageSlot } from "@/components/site/image-slot"
import { Reveal } from "@/components/site/reveal"
import { SITE } from "@/lib/site"

export function AboutIntro() {
  return (
    <section className="section">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Quem somos</p>
          <h2 className="text-balance text-3xl font-bold md:text-4xl">Uma associação ao serviço da comunidade</h2>
          <p className="mt-5 text-muted-foreground">
            Fundada em {SITE.founded} por um grupo de cidadãos comprometidos com o desenvolvimento social, cultural e educativo da
            comunidade, a Lá de Riba atua hoje em várias áreas: do apoio a idosos e crianças à dinamização cultural e à formação.
          </p>
          <p className="mt-4 text-muted-foreground">
            Valorizamos a solidariedade, a inclusão e o serviço à comunidade, com uma equipa de voluntários dedicados ao bem-estar de todos.
          </p>
          <Link href="/sobre" className="btn-outline mt-8">
            Conheça a nossa história <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand shadow-lg">
            <ImageSlot slot="sobre" alt="Pessoas da associação Lá de Riba" sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
