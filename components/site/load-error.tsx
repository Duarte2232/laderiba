import { TriangleAlert } from "lucide-react"
import { SITE } from "@/lib/site"

export function LoadError({ what }: { what: string }) {
  return (
    <div role="alert" className="flex gap-4 rounded-2xl border-2 border-accent/40 bg-terracotta-tint p-6">
      <TriangleAlert className="mt-1 h-7 w-7 shrink-0 text-accent" aria-hidden="true" />
      <div>
        <h2 className="text-xl font-bold">Não foi possível carregar {what}</h2>
        <p className="mt-1 text-base">
          Tente novamente dentro de alguns minutos. Se o problema continuar, contacte-nos por telefone (
          <a href={SITE.phoneHref} className="font-bold underline">
            {SITE.phone}
          </a>
          ) ou email.
        </p>
      </div>
    </div>
  )
}
