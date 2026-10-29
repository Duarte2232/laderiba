import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CalendarDays, MapPin } from "lucide-react"
import { DetailPage } from "@/components/site/detail-page"
import { formatLongDate } from "@/lib/format"
import { getEventoPorId } from "@/lib/server/content"

export const revalidate = 60

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const evento = await getEventoPorId((await params).id)
  if (!evento) return { title: "Evento não encontrado" }
  return {
    title: evento.titulo,
    description: evento.descricao.slice(0, 160) || `Evento organizado pela associação Lá de Riba.`,
    alternates: { canonical: `/eventos/${evento.id}` },
    openGraph: evento.urlsImagens[0] ? { images: [evento.urlsImagens[0]] } : undefined,
  }
}

export default async function EventoDetalhePage({ params }: Props) {
  const evento = await getEventoPorId((await params).id)
  if (!evento) notFound()

  return (
    <DetailPage
      backHref="/eventos"
      backLabel="Voltar aos eventos"
      title={evento.titulo}
      description={evento.descricao}
      images={evento.urlsImagens}
      meta={
        <>
          {evento.dataEventoISO && (
            <p className="flex items-center gap-3 font-bold text-olive">
              <CalendarDays className="h-6 w-6" aria-hidden="true" />
              <time dateTime={evento.dataEventoISO}>{formatLongDate(evento.dataEventoISO)}</time>
            </p>
          )}
          {evento.local && (
            <p className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-accent" aria-hidden="true" />
              {evento.local}
            </p>
          )}
        </>
      }
    />
  )
}
