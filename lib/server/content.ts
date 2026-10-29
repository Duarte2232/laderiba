import "server-only"
import type { DocumentSnapshot, Timestamp } from "firebase-admin/firestore"
import { adminDb } from "./firebase-admin"

export type CategoriaDocumento = "financial" | "minutes" | "reports" | "other"

export interface Documento {
  id: string
  titulo: string
  descricao: string
  categoria: CategoriaDocumento
  urlArquivo: string
  tipoArquivo: string | null
  tamanhoArquivo: number | null
  dataISO: string | null
}

export interface Evento {
  id: string
  titulo: string
  descricao: string
  local: string
  dataEventoISO: string | null
  urlsImagens: string[]
  dataISO: string | null
}

export interface RespostaSocial {
  id: string
  titulo: string
  descricao: string
  tipo: string
  contato: string
  urlsImagens: string[]
  dataISO: string | null
}

// Resultado explícito: as páginas distinguem "sem dados" de "falha ao obter dados".
export type Resultado<T> = { ok: true; data: T } | { ok: false; error: string }

const iso = (value: unknown): string | null =>
  value && typeof (value as Timestamp).toDate === "function" ? (value as Timestamp).toDate().toISOString() : null

const CATEGORIAS: CategoriaDocumento[] = ["financial", "minutes", "reports", "other"]

const toDocumento = (snap: DocumentSnapshot): Documento => {
  const d = snap.data() ?? {}
  return {
    id: snap.id,
    titulo: d.title ?? "",
    descricao: d.description ?? "",
    categoria: CATEGORIAS.includes(d.category) ? d.category : "other",
    urlArquivo: d.urlArquivo ?? "",
    tipoArquivo: d.tipoArquivo ?? null,
    tamanhoArquivo: typeof d.tamanhoArquivo === "number" ? d.tamanhoArquivo : null,
    dataISO: iso(d.dataCriacao),
  }
}

const toEvento = (snap: DocumentSnapshot): Evento => {
  const d = snap.data() ?? {}
  return {
    id: snap.id,
    titulo: d.title ?? "",
    descricao: d.description ?? "",
    local: d.location ?? "",
    dataEventoISO: iso(d.eventDate),
    urlsImagens: d.urlsImagens ?? [],
    dataISO: iso(d.dataCriacao),
  }
}

const toResposta = (snap: DocumentSnapshot): RespostaSocial => {
  const d = snap.data() ?? {}
  return {
    id: snap.id,
    titulo: d.title ?? "",
    descricao: d.description ?? "",
    tipo: d.tipo ?? "",
    contato: d.contato ?? "",
    urlsImagens: d.urlsImagens ?? [],
    dataISO: iso(d.dataCriacao),
  }
}

async function listar<T>(colecao: string, map: (s: DocumentSnapshot) => T): Promise<Resultado<T[]>> {
  try {
    const snapshot = await adminDb().collection(colecao).orderBy("dataCriacao", "desc").get()
    return { ok: true, data: snapshot.docs.map(map) }
  } catch (error) {
    console.error(`Erro ao obter ${colecao}:`, error)
    return { ok: false, error: "Não foi possível obter os dados neste momento." }
  }
}

async function obter<T>(colecao: string, id: string, map: (s: DocumentSnapshot) => T): Promise<T | null> {
  try {
    const snap = await adminDb().collection(colecao).doc(id).get()
    return snap.exists ? map(snap) : null
  } catch (error) {
    console.error(`Erro ao obter ${colecao}/${id}:`, error)
    return null
  }
}

export const getDocumentos = () => listar("documentos", toDocumento)
export const getEventos = () => listar("eventos", toEvento)
export const getRespostasSociais = () => listar("respostasSociais", toResposta)
export const getEventoPorId = (id: string) => obter("eventos", id, toEvento)
export const getRespostaSocialPorId = (id: string) => obter("respostasSociais", id, toResposta)
