import { cn } from "@/lib/utils"

// Marca: uma colina ("riba") com o sol a nascer por cima, em verde-oliva e terracota.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-11 w-11 shrink-0", className)} aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#2F4A36" />
      <circle cx="24" cy="19" r="7" fill="#E8A87C" />
      <path d="M0 40c7-12 15-17 24-17s17 5 24 17v8H0z" fill="#FAF6EF" />
      <path d="M0 44c9-8 16-11 24-11s15 3 24 11v4H0z" fill="#A94B2A" />
    </svg>
  )
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={cn("font-serif text-2xl font-bold tracking-tight", light ? "text-white" : "text-olive")}>
          Lá de Riba
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.7rem] min-[430px]:block font-bold uppercase tracking-[0.14em]",
            light ? "text-white/80" : "text-muted-foreground",
          )}
        >
          Associação Social e Cultural
        </span>
      </span>
    </span>
  )
}
