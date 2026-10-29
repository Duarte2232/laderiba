import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Phone, Users } from "lucide-react"
import { DetailPage } from "@/components/site/detail-page"
import { getRespostaSocialPorId } from "@/lib/server/content"

export const revalidate = 60

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resposta = await getRespostaSocialPorId((await params).id)
  if (!resposta) return { title: "Resposta social não encontrada" }
  return {
    title: resposta.titulo,
    description: resposta.descricao.slice(0, 160) || "Resposta social da associação Lá de Riba.",
    alternates: { canonical: `/respostas-sociais/${resposta.id}` },
    openGraph: resposta.urlsImagens[0] ? { images: [resposta.urlsImagens[0]] } : undefined,
  }
}

export default async function RespostaSocialDetalhePage({ params }: Props) {
  const resposta = await getRespostaSocialPorId((await params).id)
  if (!resposta) notFound()

  return (
    <DetailPage
      backHref="/respostas-sociais"
      backLabel="Voltar às respostas sociais"
      title={resposta.titulo}
      description={resposta.descricao}
      images={resposta.urlsImagens}
      meta={
        <>
          {resposta.tipo && (
            <p className="flex items-center gap-3">
              <Users className="h-6 w-6 text-accent" aria-hidden="true" />
              {resposta.tipo}
            </p>
          )}
          {resposta.contato && (
            <p className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-accent" aria-hidden="true" />
              {resposta.contato}
            </p>
          )}
        </>
      }
    />
  )
}
