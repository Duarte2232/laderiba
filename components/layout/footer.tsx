import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/site/logo"
import { Year } from "@/components/site/year"
import { NAV, SITE } from "@/lib/site"

export function Footer() {
  return (
    <footer className="bg-olive-dark text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo light />
          <p className="max-w-sm text-base text-white/85">
            Cuidar, ensinar e animar a comunidade de Riba de Mouro desde {SITE.founded}.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-xl text-white">Contactos</h2>
          <address className="space-y-3 text-base not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#E8A87C]" aria-hidden="true" />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.postalCode} {SITE.address.locality}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-[#E8A87C]" aria-hidden="true" />
              <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
                {SITE.phone}
              </a>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-[#E8A87C]" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="break-all underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="mb-4 font-serif text-xl text-white">Navegar</h2>
          <ul className="space-y-1 text-base">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-[2.75rem] items-center underline-offset-4 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-2 py-5 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
          <p>
            © <Year /> {SITE.name}. Todos os direitos reservados.
          </p>
          <Link href="/admin" className="inline-flex min-h-[2.75rem] items-center underline-offset-4 hover:underline">
            Área reservada
          </Link>
        </div>
      </div>
    </footer>
  )
}
