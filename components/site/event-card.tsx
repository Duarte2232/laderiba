import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { ImageSlot } from "@/components/site/image-slot"
import { dateParts } from "@/lib/format"
import type { Evento } from "@/lib/server/content"

export function EventCard({ evento, past = false }: { evento: Evento; past?: boolean }) {
  const parts = evento.dataEventoISO ? dateParts(evento.dataEventoISO) : null
  const image = evento.urlsImagens[0]

  return (
    <article className="card-soft group relative flex h-full flex-col overflow-hidden hover:shadow-xl">
      <div className="relative aspect-[3/2] overflow-hidden bg-sand">
        {image ? (
          <Image src={image} alt={`Imagem do evento ${evento.titulo}`} fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <ImageSlot slot="evento" alt={`Evento ${evento.titulo}`} sizes="(min-width: 1024px) 360px, 100vw" />
        )}
        {parts && (
          <div className="absolute left-4 top-4 rounded-xl bg-background px-3 py-2 text-center shadow-md" aria-hidden="true">
            <div className="font-serif text-2xl font-bold leading-none text-olive">{parts.day}</div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wider text-accent">{parts.month}</div>
            <div className="text-xs text-muted-foreground">{parts.year}</div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold">
          <Link href={`/eventos/${evento.id}`} className="after:absolute after:inset-0 hover:underline">
            {evento.titulo}
          </Link>
        </h3>
        {evento.dataEventoISO && (
          <p className="mt-1 text-base font-bold text-olive">
            <time dateTime={evento.dataEventoISO}>
              {new Intl.DateTimeFormat("pt-PT", { dateStyle: "full", timeZone: "Europe/Lisbon" }).format(new Date(evento.dataEventoISO))}
            </time>
          </p>
        )}
        {evento.local && (
          <p className="mt-2 flex items-start gap-2 text-base text-muted-foreground">
            <MapPin className="mt-1 h-5 w-5 shrink-0" aria-hidden="true" />
            {evento.local}
          </p>
        )}
        {evento.descricao && <p className="mt-3 line-clamp-3 flex-1 text-base text-muted-foreground">{evento.descricao}</p>}
        <span className="mt-5 inline-flex items-center gap-2 font-bold text-accent">
          {past ? "Ver detalhes" : "Mais informações"}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
