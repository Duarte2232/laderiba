import { MapPin } from "lucide-react"
import { MAPS_LINK, MAPS_EMBED_URL } from "@/lib/site"

// Mapa sempre visível; o iframe só carrega quando a secção se aproxima do ecrã (loading="lazy").
export function MapEmbed() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-3xl border border-border bg-sand">
        <iframe
          title="Mapa com a localização da Associação Social e Cultural Lá de Riba, em Riba de Mouro"
          src={MAPS_EMBED_URL}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[3rem] items-center gap-2 font-bold text-accent underline underline-offset-4"
      >
        <MapPin className="h-5 w-5" aria-hidden="true" /> Abrir no Google Maps (nova janela)
      </a>
    </div>
  )
}
