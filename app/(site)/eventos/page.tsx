import type { Metadata } from "next"
import { Contact } from "@/components/home/contact"
import { EmptyState } from "@/components/site/empty-state"
import { EventCard } from "@/components/site/event-card"
import { MomentosGaleria } from "@/components/site/momentos"
import { LoadError } from "@/components/site/load-error"
import { PageHero } from "@/components/site/page-hero"
import { isUpcoming } from "@/lib/format"
import { getEventos } from "@/lib/server/content"
import type { Evento } from "@/lib/server/content"
import { SITE } from "@/lib/site"
import { EventosTabs } from "./eventos-tabs"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Eventos",
  description: `Próximos eventos e atividades da ${SITE.name}, em Riba de Mouro, e memórias de eventos passados.`,
  alternates: { canonical: "/eventos" },
}

function Lista({ eventos, past }: { eventos: Evento[]; past?: boolean }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {eventos.map((evento) => (
        <li key={evento.id}>
          <EventCard evento={evento} past={past} />
        </li>
      ))}
    </ul>
  )
}

export default async function EventosPage() {
  const resultado = await getEventos()
  const eventos = resultado.ok ? resultado.data : []

  // Sem data definida, o evento é tratado como próximo para não desaparecer.
  const proximos = eventos
    .filter((e) => !e.dataEventoISO || isUpcoming(e.dataEventoISO))
    .sort((a, b) => (a.dataEventoISO ?? "9").localeCompare(b.dataEventoISO ?? "9"))
  const passados = eventos
    .filter((e) => e.dataEventoISO && !isUpcoming(e.dataEventoISO))
    .sort((a, b) => b.dataEventoISO!.localeCompare(a.dataEventoISO!))

  return (
    <>
      <PageHero
        eyebrow="Agenda"
        title="Eventos e atividades"
        intro="Descubra o que se passa na nossa associação e venha participar."
      />
      <section className="section">
        <div className="wrap">
          {resultado.ok ? (
            <EventosTabs
              counts={{ proximos: proximos.length, passados: passados.length }}
              panels={{
                proximos: proximos.length ? (
                  <Lista eventos={proximos} />
                ) : (
                  <EmptyState
                    title="Ainda não há eventos marcados"
                    message="Estamos a preparar novas atividades para a comunidade. Volte a visitar esta página em breve ou contacte-nos para saber o que vem aí."
                  />
                ),
                passados: passados.length ? (
                  <Lista eventos={passados} past />
                ) : (
                  <EmptyState
                    title="Ainda não há eventos anteriores"
                    message="Assim que realizarmos novas atividades, poderá recordá-las aqui."
                  />
                ),
              }}
            />
          ) : <LoadError what="os eventos" />}
        </div>
      </section>
      <MomentosGaleria />
      <Contact />
    </>
  )
}
