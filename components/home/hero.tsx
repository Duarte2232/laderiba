import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { resolveSlot } from "@/lib/images"
import { SITE } from "@/lib/site"

export function Hero() {
  const src = resolveSlot("hero")

  const text = (
    <div className="wrap relative flex flex-col justify-center py-14 md:py-20">
      <p className="eyebrow !text-[#F2B992]">Riba de Mouro · desde {SITE.founded}</p>
      <h1 className="max-w-3xl text-balance text-4xl font-bold !text-white sm:text-5xl lg:text-6xl">
        Cuidar, ensinar e animar a nossa comunidade
      </h1>
      <p className="mt-6 max-w-xl text-xl text-white/95 md:text-2xl md:leading-relaxed">
        A {SITE.name} apoia idosos e crianças e promove a cultura e a formação em Riba de Mouro.
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
  )

  // Com foto: faixa de texto e, logo abaixo, a fotografia inteira (sem texto por cima, para não cortar ninguém).
  if (src) {
    return (
      <section className="bg-olive-dark text-white">
        {text}
        <div className="relative aspect-[16/9] w-full sm:aspect-[2.2/1]">
          <Image
            src={src}
            alt="Participantes numa caminhada da associação, reunidos à frente da igreja"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_80%]"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="relative isolate overflow-hidden bg-olive-dark text-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-olive-dark via-olive to-[#3d5c44]">
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-full w-full" aria-hidden="true">
          <circle cx="930" cy="190" r="86" fill="#E8A87C" opacity="0.9" />
          <path d="M0 470C180 360 330 330 520 380s330 90 680-40V600H0z" fill="#3d5c44" />
          <path d="M0 520C220 430 400 430 620 475s390 40 580-30V600H0z" fill="#A94B2A" opacity="0.85" />
          <path d="M0 565C260 510 470 520 700 548s330 10 500-20V600H0z" fill="#FAF6EF" />
        </svg>
      </div>
      <div className="min-h-[34rem] md:min-h-[40rem]">{text}</div>
    </section>
  )
}
