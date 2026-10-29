import type { MetadataRoute } from "next"
import { getEventos, getRespostasSociais } from "@/lib/server/content"
import { SITE } from "@/lib/site"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/sobre", "/respostas-sociais", "/eventos", "/documentos"].map((path) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }))

  // Se a base de dados não responder, o sitemap continua válido apenas com as páginas fixas.
  const [eventos, respostas] = await Promise.all([getEventos(), getRespostasSociais()])
  const dynamicPages = [
    ...(eventos.ok ? eventos.data.map((e) => ({ path: `/eventos/${e.id}`, date: e.dataISO })) : []),
    ...(respostas.ok ? respostas.data.map((r) => ({ path: `/respostas-sociais/${r.id}`, date: r.dataISO })) : []),
  ].map(({ path, date }) => ({
    url: `${SITE.url}${path}`,
    lastModified: date ?? undefined,
    priority: 0.5,
  }))

  return [...pages, ...dynamicPages]
}
