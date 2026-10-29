import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Heart, Sprout, Users } from "lucide-react"
import { Contact } from "@/components/home/contact"
import { AreaIconView } from "@/components/site/area-icon"
import { ImageSlot } from "@/components/site/image-slot"
import { PageHero } from "@/components/site/page-hero"
import { Reveal } from "@/components/site/reveal"
import { AREAS, SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sobre nós",
  description: `Conheça a história, a missão e as áreas de trabalho da ${SITE.name}, fundada em ${SITE.founded} em Riba de Mouro.`,
  alternates: { canonical: "/sobre" },
}

const TIMELINE = [
  {
    when: String(SITE.founded),
    title: "Nasce a associação",
    text: "Um grupo de cidadãos comprometidos com o desenvolvimento social, cultural e educativo da comunidade funda a associação.",
    Icon: Sprout,
  },
  {
    when: "Ao longo dos anos",
    title: "Alargamos a nossa atuação",
    text: "Promovemos projetos que respondem às reais necessidades da população, do apoio a idosos e crianças à dinamização cultural e socioeducativa.",
    Icon: Users,
  },
  {
    when: "Hoje",
    title: "Uma equipa de voluntários",
    text: "Uma equipa multidisciplinar de voluntários dedicados ao bem-estar social, à formação e ao fortalecimento dos laços comunitários.",
    Icon: Heart,
  },
]

export default function SobrePage() {
  return (
    <>
      <PageHero
        slot="sobre-topo"
        eyebrow="Sobre nós"
        title="A nossa história, missão e valores"
        intro="Conheça o que nos move e o trabalho que fazemos todos os dias em Riba de Mouro."
      />

      <section className="section">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">A nossa história</p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">Mais de uma década ao serviço da comunidade</h2>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-sand shadow-lg">
              <ImageSlot slot="sobre" alt="Grupo de pessoas com a bandeira da associação, no evento Cantar os Reis" sizes="(min-width: 1024px) 520px, 100vw" />
            </div>
          </Reveal>

          <ol className="relative space-y-8 border-l-2 border-olive/25 pl-8">
            {TIMELINE.map(({ when, title, text, Icon }, i) => (
              <li key={title} className="relative">
                <Reveal delay={i * 100}>
                  <span className="absolute -left-[3.15rem] flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground ring-4 ring-background">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold uppercase tracking-wider text-accent">{when}</p>
                  <h3 className="mt-1 text-2xl font-bold">{title}</h3>
                  <p className="mt-2 text-muted-foreground">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-olive text-white">
        <div className="wrap py-16 md:py-20">
          <Reveal>
            <p className="eyebrow !text-[#F2B992]">A nossa missão</p>
            <blockquote className="max-w-4xl text-balance font-serif text-2xl leading-snug text-white md:text-4xl md:leading-snug">
              Contribuir para o bem-estar da comunidade, promovendo ações solidárias, educativas e culturais que respondam às
              necessidades sociais com impacto positivo e duradouro.
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="mb-12 max-w-2xl">
            <p className="eyebrow">Valores e áreas de trabalho</p>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">O que nos guia</h2>
            <p className="mt-4 text-muted-foreground">
              Valorizamos a solidariedade, a inclusão e o serviço à comunidade. É assim que se traduz no nosso trabalho:
            </p>
          </Reveal>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <li className="card-soft p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta-tint text-accent">
                <Heart className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-bold">Solidariedade Social</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Atividades que reforçam o espírito de entreajuda e apoio mútuo entre os membros da comunidade.
              </p>
            </li>
            {AREAS.map((area, i) => {
              const featured = !("featured" in area && area.featured === false)
              const body = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olive-tint text-olive">
                    <AreaIconView icon={area.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold">{area.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{area.summary}</p>
                  {featured && (
                    <span className="mt-4 inline-flex items-center gap-2 font-bold text-accent">
                      Saber mais <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  )}
                </>
              )
              return (
                <li key={area.slug}>
                  <Reveal delay={(i % 3) * 80} className="h-full">
                    {featured ? (
                      <Link href={`/respostas-sociais#${area.slug}`} className="card-soft group block h-full p-6 hover:shadow-xl">
                        {body}
                      </Link>
                    ) : (
                      <div className="card-soft h-full p-6">{body}</div>
                    )}
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <Contact />
    </>
  )
}
