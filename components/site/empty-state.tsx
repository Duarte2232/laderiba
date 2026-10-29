import Link from "next/link"
import { Phone } from "lucide-react"
import { ImageSlot } from "@/components/site/image-slot"
import type { ImageSlotName } from "@/lib/images"
import { SITE } from "@/lib/site"

interface EmptyStateProps {
  title: string
  message: string
  slot?: ImageSlotName
  action?: { href: string; label: string }
}

// Estado vazio com ar de intencional: ilustração, mensagem curta e forma de contactar.
export function EmptyState({ title, message, slot = "eventos-vazio", action }: EmptyStateProps) {
  return (
    <div className="card-soft grid overflow-hidden md:grid-cols-[1fr_1.2fr]">
      <div className="relative min-h-[14rem] bg-sand">
        <ImageSlot slot={slot} alt="" sizes="(min-width: 768px) 400px, 100vw" />
      </div>
      <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <p className="text-muted-foreground">{message}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={SITE.phoneHref} className="btn-primary">
            <Phone className="h-5 w-5" aria-hidden="true" /> {SITE.phone}
          </a>
          {action ? (
            <Link href={action.href} className="btn-outline">
              {action.label}
            </Link>
          ) : (
            <a href={`mailto:${SITE.email}`} className="btn-outline">
              Enviar email
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
