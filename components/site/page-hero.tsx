import Image from "next/image"
import { resolveSlot, type ImageSlotName } from "@/lib/images"

interface PageHeroProps {
  eyebrow?: string
  title: string
  intro?: string
  slot?: ImageSlotName
  alt?: string
}

// Cabeçalho das páginas interiores: fundo quente, com foto opcional por trás.
export function PageHero({ eyebrow, title, intro, slot, alt = "" }: PageHeroProps) {
  const src = slot ? resolveSlot(slot) : null
  return (
    <section className="relative isolate overflow-hidden bg-olive text-white">
      {src && (
        <div className="absolute inset-0 -z-10 opacity-40">
          <Image src={src} alt={alt} fill sizes="100vw" priority className="object-cover" />
        </div>
      )}
      <div className="wrap py-16 md:py-24">
        {eyebrow && <p className="eyebrow !text-[#F2B992]">{eyebrow}</p>}
        <h1 className="max-w-3xl text-balance text-4xl font-bold !text-white md:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-xl text-white/90">{intro}</p>}
      </div>
    </section>
  )
}
