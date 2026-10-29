import Image from "next/image"
import { cn } from "@/lib/utils"

// Logótipo oficial da associação (public/images/logo.png, fundo transparente).
// Sobre fundos escuros é invertido para branco.
export function LogoMark({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt=""
      width={808}
      height={536}
      sizes="96px"
      priority={!light}
      className={cn("h-14 w-auto shrink-0", light && "brightness-0 invert", className)}
    />
  )
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark light={light} />
      {/* O logótipo já inclui o nome; em ecrãs pequenos mostra-se só ele. */}
      <span className="hidden flex-col whitespace-nowrap leading-none sm:flex">
        <span className={cn("font-serif text-2xl font-bold tracking-tight", light ? "text-white" : "text-olive")}>
          Lá de Riba
        </span>
        <span
          className={cn(
            "mt-1 text-[0.7rem] font-bold uppercase tracking-[0.14em]",
            light ? "text-white/80" : "text-muted-foreground",
          )}
        >
          Associação Social e Cultural
        </span>
      </span>
    </span>
  )
}
