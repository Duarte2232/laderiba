import { Mail, MapPin, Phone } from "lucide-react"
import { MapEmbed } from "@/components/site/map-embed"
import { Reveal } from "@/components/site/reveal"
import { SITE } from "@/lib/site"

export function Contact({ heading = "h2" }: { heading?: "h2" }) {
  const Heading = heading
  const items = [
    {
      Icon: Phone,
      label: "Telefone",
      content: (
        <a href={SITE.phoneHref} className="text-2xl font-bold text-olive underline-offset-4 hover:underline">
          {SITE.phone}
        </a>
      ),
    },
    {
      Icon: Mail,
      label: "Email",
      content: (
        <a href={`mailto:${SITE.email}`} className="text-lg font-bold text-olive [overflow-wrap:anywhere] sm:text-xl underline-offset-4 hover:underline">
          {SITE.email}
        </a>
      ),
    },
    {
      Icon: MapPin,
      label: "Morada",
      content: (
        <address className="text-lg not-italic">
          {SITE.address.street}
          <br />
          {SITE.address.postalCode} {SITE.address.locality}
        </address>
      ),
    },
  ]

  return (
    <section id="contactos" className="section bg-olive-tint/60">
      <div className="wrap">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow">Contactos</p>
          <Heading className="text-balance text-3xl font-bold md:text-4xl">Fale connosco</Heading>
          <p className="mt-4 text-muted-foreground">Ligue, escreva ou visite-nos. Teremos todo o gosto em ajudar.</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <ul className="space-y-4">
              {items.map(({ Icon, label, content }) => (
                <li key={label} className="card-soft flex items-start gap-4 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                    {content}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <MapEmbed />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
