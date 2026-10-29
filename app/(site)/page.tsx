import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { AboutIntro } from "@/components/home/about-intro"
import { Areas } from "@/components/home/areas"
import { Highlights } from "@/components/home/highlights"
import { Contact } from "@/components/home/contact"
import { getDocumentos, getEventos } from "@/lib/server/content"
import { isUpcoming } from "@/lib/format"
import { SITE } from "@/lib/site"

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Riba de Mouro` },
  description: SITE.description,
  alternates: { canonical: "/" },
}

export default async function Home() {
  const [eventos, documentos] = await Promise.all([getEventos(), getDocumentos()])

  const proximo = eventos.ok
    ? eventos.data
        .filter((e) => e.dataEventoISO && isUpcoming(e.dataEventoISO))
        .sort((a, b) => a.dataEventoISO!.localeCompare(b.dataEventoISO!))[0] ?? null
    : null
  const recentes = documentos.ok ? documentos.data.slice(0, 3) : []

  return (
    <>
      <Hero />
      <AboutIntro />
      <Areas />
      <Highlights evento={proximo} documentos={recentes} />
      <Contact />
    </>
  )
}
