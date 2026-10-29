"use client"

import { useMemo, useState } from "react"
import { Download, ExternalLink, FileSpreadsheet, FileText, Image as ImageIcon, Search } from "lucide-react"
import { downloadUrl, fileExtension, formatBytes, formatShortDate, yearOf } from "@/lib/format"
import type { CategoriaDocumento, Documento } from "@/lib/server/content"
import { cn } from "@/lib/utils"

const CATEGORIAS: { key: CategoriaDocumento | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "financial", label: "Financeiros" },
  { key: "minutes", label: "Atas" },
  { key: "reports", label: "Relatórios" },
  { key: "other", label: "Outros" },
]

const normalizar = (texto: string) => texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()

function FileIcon({ tipo }: { tipo: string }) {
  const Icon = ["XLS", "XLSX", "ODS", "CSV"].includes(tipo) ? FileSpreadsheet : ["JPG", "JPEG", "PNG", "WEBP"].includes(tipo) ? ImageIcon : FileText
  return <Icon className="h-6 w-6" aria-hidden="true" />
}

export function DocumentosList({ documentos }: { documentos: Documento[] }) {
  const [categoria, setCategoria] = useState<CategoriaDocumento | "todos">("todos")
  const [pesquisa, setPesquisa] = useState("")

  const filtrados = useMemo(() => {
    const termo = normalizar(pesquisa.trim())
    return documentos.filter(
      (d) =>
        (categoria === "todos" || d.categoria === categoria) &&
        (!termo || normalizar(`${d.titulo} ${d.descricao}`).includes(termo)),
    )
  }, [documentos, categoria, pesquisa])

  // Agrupa por categoria e ano (mais recente primeiro; a lista já vem ordenada por data).
  const grupos = useMemo(() => {
    const mapa = new Map<string, { categoria: CategoriaDocumento; ano: number | null; itens: Documento[] }>()
    for (const d of filtrados) {
      const ano = yearOf(d.dataISO)
      const chave = `${d.categoria}-${ano}`
      if (!mapa.has(chave)) mapa.set(chave, { categoria: d.categoria, ano, itens: [] })
      mapa.get(chave)!.itens.push(d)
    }
    return [...mapa.values()].sort(
      (a, b) => (b.ano ?? 0) - (a.ano ?? 0) || CATEGORIAS.findIndex((c) => c.key === a.categoria) - CATEGORIAS.findIndex((c) => c.key === b.categoria),
    )
  }, [filtrados])

  const rotulo = (key: CategoriaDocumento) => CATEGORIAS.find((c) => c.key === key)?.label ?? key

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
          {CATEGORIAS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={categoria === key}
              onClick={() => setCategoria(key)}
              className={cn(
                "min-h-[3rem] rounded-full border-2 px-5 font-bold transition-colors",
                categoria === key ? "border-olive bg-olive text-white" : "border-border bg-card hover:border-olive",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-96">
          <label htmlFor="pesquisa-documentos" className="sr-only">
            Pesquisar documentos
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="pesquisa-documentos"
            type="search"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            placeholder="Pesquisar documentos…"
            className="h-14 w-full rounded-full border-2 border-input bg-card pl-12 pr-4 text-lg placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <p className="mt-6 text-base text-muted-foreground" role="status" aria-live="polite">
        {filtrados.length === 1 ? "1 documento encontrado" : `${filtrados.length} documentos encontrados`}
      </p>

      {grupos.length === 0 ? (
        <p className="card-soft mt-6 p-8 text-center text-lg">Nenhum documento corresponde à sua pesquisa.</p>
      ) : (
        <div className="mt-6 space-y-12">
          {grupos.map((g) => (
            <section key={`${g.categoria}-${g.ano}`} aria-labelledby={`g-${g.categoria}-${g.ano}`}>
              <h2 id={`g-${g.categoria}-${g.ano}`} className="mb-4 flex items-baseline gap-3 border-b-2 border-border pb-2 text-2xl font-bold">
                {rotulo(g.categoria)}
                <span className="text-xl font-normal text-accent">{g.ano ?? "Sem data"}</span>
              </h2>
              <ul className="space-y-3">
                {g.itens.map((d) => {
                  const tipo = fileExtension(d.urlArquivo, d.tipoArquivo)
                  const tamanho = formatBytes(d.tamanhoArquivo)
                  return (
                    <li key={d.id} className="card-soft flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-olive-tint text-olive">
                        <FileIcon tipo={tipo} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold">{d.titulo}</h3>
                        {d.descricao && <p className="mt-1 text-base text-muted-foreground">{d.descricao}</p>}
                        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm font-bold text-muted-foreground">
                          <span className="rounded-full bg-sand px-3 py-0.5">{tipo}</span>
                          {tamanho && <span className="py-0.5">{tamanho}</span>}
                          <span className="py-0.5">{formatShortDate(d.dataISO)}</span>
                        </p>
                      </div>
                      {d.urlArquivo ? (
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <a href={d.urlArquivo} target="_blank" rel="noopener noreferrer" className="btn-outline !min-h-[3rem] !px-5">
                            <ExternalLink className="h-5 w-5" aria-hidden="true" /> Ver<span className="sr-only">: {d.titulo} (abre numa nova janela)</span>
                          </a>
                          <a href={downloadUrl(d.urlArquivo)} download className="btn-primary !min-h-[3rem] !px-5">
                            <Download className="h-5 w-5" aria-hidden="true" /> Descarregar<span className="sr-only">: {d.titulo}</span>
                          </a>
                        </div>
                      ) : (
                        <span className="text-base text-muted-foreground">Ficheiro indisponível</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
