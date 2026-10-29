import Link from "next/link"
import { ArrowRight, Download, FileText } from "lucide-react"
import { EventCard } from "@/components/site/event-card"
import { Reveal } from "@/components/site/reveal"
import { downloadUrl, fileExtension, formatShortDate } from "@/lib/format"
import type { Documento, Evento } from "@/lib/server/content"

// Só aparece quando existe algo para mostrar.
export function Highlights({ evento, documentos }: { evento: Evento | null; documentos: Documento[] }) {
  if (!evento && documentos.length === 0) return null

  return (
    <section className="section">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        {evento && (
          <Reveal>
            <p className="eyebrow">Para agendar</p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Próximo evento</h2>
            <EventCard evento={evento} />
            <Link href="/eventos" className="mt-5 inline-flex min-h-[3rem] items-center gap-2 font-bold text-accent hover:underline">
              Ver todos os eventos <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Reveal>
        )}

        {documentos.length > 0 && (
          <Reveal delay={100} className={evento ? "" : "lg:col-span-2"}>
            <p className="eyebrow">Transparência</p>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Documentos recentes</h2>
            <ul className="space-y-3">
              {documentos.map((doc) => (
                <li key={doc.id} className="card-soft flex items-center gap-4 p-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-olive-tint text-olive">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-bold">{doc.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {fileExtension(doc.urlArquivo, doc.tipoArquivo)} · {formatShortDate(doc.dataISO)}
                    </p>
                  </div>
                  {doc.urlArquivo && (
                    <a
                      href={downloadUrl(doc.urlArquivo)}
                      aria-label={`Descarregar ${doc.titulo}`}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-olive text-olive transition-colors hover:bg-olive hover:text-white"
                    >
                      <Download className="h-5 w-5" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/documentos" className="mt-5 inline-flex min-h-[3rem] items-center gap-2 font-bold text-accent hover:underline">
              Ver todos os documentos <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  )
}
