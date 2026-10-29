import "server-only"
import { z } from "zod"
import { FieldValue, Timestamp } from "firebase-admin/firestore"

const url = z.string().url().max(2000)
const text = (max: number) => z.string().trim().min(1).max(max)

// Cada coleção define o que o painel pode escrever. Nada fora destes campos chega ao Firestore.
export const collections = {
  documentos: {
    schema: z.object({
      title: text(200),
      description: z.string().trim().max(2000).default(""),
      category: z.enum(["financial", "minutes", "reports", "other"]),
      urlArquivo: url,
      tipoArquivo: z.string().max(20).optional(),
      tamanhoArquivo: z.number().int().nonnegative().optional(),
    }),
    transform: (d: Record<string, unknown>) => d,
    files: (d: { urlArquivo?: string }) => (d.urlArquivo ? [d.urlArquivo] : []),
  },
  eventos: {
    schema: z.object({
      title: text(200),
      description: z.string().trim().max(5000).default(""),
      location: z.string().trim().max(200).default(""),
      eventDate: z.string().datetime(),
      urlsImagens: z.array(url).max(10).default([]),
    }),
    transform: (d: Record<string, unknown>) => ({ ...d, eventDate: Timestamp.fromDate(new Date(d.eventDate as string)) }),
    files: (d: { urlsImagens?: string[] }) => d.urlsImagens ?? [],
  },
  respostasSociais: {
    schema: z.object({
      title: text(200),
      description: z.string().trim().max(5000).default(""),
      urlsImagens: z.array(url).max(10).default([]),
    }),
    transform: (d: Record<string, unknown>) => d,
    files: (d: { urlsImagens?: string[] }) => d.urlsImagens ?? [],
  },
} as const

export type CollectionName = keyof typeof collections
export const isCollection = (name: string): name is CollectionName => name in collections
export const serverTimestamp = () => FieldValue.serverTimestamp()
