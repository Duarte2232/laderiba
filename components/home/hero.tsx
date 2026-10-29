import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { resolveSlot } from "@/lib/images"
import { SITE } from "@/lib/site"

export function Hero() {
  const src = resolveSlot("hero")
  return (
    <section className="relative isolate flex w-full flex-col overflow-hidden bg-olive-dark text-white md:aspect-[2.18/1] md:min-h-[36rem] md:max-h-[88vh]">
      {src ? (
        <>
          <Image src={src} alt="Novo edifício da associação, em Riba de Mouro" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_50%]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-olive-dark/85 via-olive-dark/50 to-olive-dark/5" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-olive-dark via-olive to-[#3d5c44]">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-full w-full" aria-hidden="true">
            <circle cx="930" cy="190" r="86" fill="#E8A87C" opacity="0.9" />
            <path d="M0 470C180 360 330 330 520 380s330 90 680-40V600H0z" fill="#3d5c44" />
            <path d="M0 520C220 430 400 430 620 475s390 40 580-30V600H0z" fill="#A94B2A" opacity="0.85" />
            <path d="M0 565C260 510 470 520 700 548s330 10 500-20V600H0z" fill="#FAF6EF" />
          </svg>
        </div>
      )}

      <div className="wrap flex min-h-[34rem] flex-1 flex-col justify-center py-20 md:min-h-[36rem] md:py-24">
        <p className="eyebrow !text-[#F2B992]">Riba de Mouro · desde {SITE.founded}</p>
        <h1 className="max-w-3xl text-balance text-4xl font-bold !text-white sm:text-5xl lg:text-6xl">
          Cuidar, ensinar e animar a nossa comunidade
        </h1>
        <p className="mt-6 max-w-xl text-xl text-white/95 md:text-2xl md:leading-relaxed">
          A {SITE.name} apoia idosos e promove a cultura e a formação em Riba de Mouro.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/respostas-sociais" className="btn-accent">
            Conheça o nosso trabalho <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link href="/#contactos" className="btn-outline-light">
            <Phone className="h-5 w-5" aria-hidden="true" /> Fale connosco
          </Link>
        </div>
      </div>
    </section>
  )
}
