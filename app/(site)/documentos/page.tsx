import type { Metadata } from "next"
import { Contact } from "@/components/home/contact"
import { EmptyState } from "@/components/site/empty-state"
import { LoadError } from "@/components/site/load-error"
import { PageHero } from "@/components/site/page-hero"
import { getDocumentos } from "@/lib/server/content"
import { SITE } from "@/lib/site"
import { DocumentosList } from "./documentos-list"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Documentos",
  description: `Documentos públicos da ${SITE.name}: relatórios, atas e documentos financeiros para consulta e descarregamento.`,
  alternates: { canonical: "/documentos" },
}

export default async function DocumentosPage() {
  // Os dados são obtidos no servidor; o browser nunca fala diretamente com a base de dados.
  const resultado = await getDocumentos()

  return (
    <>
      <PageHero
        eyebrow="Transparência"
        title="Documentos"
        intro="Relatórios, atas e documentos financeiros da associação, para consultar ou descarregar."
      />
      <section className="section">
        <div className="wrap">
          {!resultado.ok ? (
            <LoadError what="os documentos" />
          ) : resultado.data.length === 0 ? (
            <EmptyState
              title="Ainda não há documentos publicados"
              message="Os relatórios, atas e documentos financeiros serão disponibilizados aqui. Se precisar de algum documento, entre em contacto connosco."
            />
          ) : (
            <DocumentosList documentos={resultado.data} />
          )}
        </div>
      </section>
      <Contact />
    </>
  )
}
