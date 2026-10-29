"use client"

import { useId, useState } from "react"
import { CalendarDays, History } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "proximos" | "passados"

interface EventosTabsProps {
  counts: Record<Tab, number>
  panels: Record<Tab, React.ReactNode>
}

// Os painéis são desenhados no servidor (fotos e estados vazios); aqui só se alterna entre eles.
export function EventosTabs({ counts, panels }: EventosTabsProps) {
  const [tab, setTab] = useState<Tab>("proximos")
  const id = useId()

  const tabs = [
    { key: "proximos" as const, label: "Próximos eventos", count: counts.proximos, Icon: CalendarDays },
    { key: "passados" as const, label: "Eventos passados", count: counts.passados, Icon: History },
  ]

  return (
    <div>
      <div role="tablist" aria-label="Tipo de eventos" className="inline-flex w-full rounded-full bg-sand p-1.5 sm:w-auto">
        {tabs.map(({ key, label, count, Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`${id}-${key}`}
            aria-selected={tab === key}
            aria-controls={`${id}-panel`}
            onClick={() => setTab(key)}
            className={cn(
              "flex min-h-[3.25rem] flex-1 items-center justify-center gap-2 rounded-full px-5 text-base font-bold transition-colors sm:flex-none sm:px-7",
              tab === key ? "bg-olive text-white shadow" : "text-foreground hover:bg-sand-dark/60",
            )}
          >
            <Icon className="hidden h-5 w-5 sm:block" aria-hidden="true" />
            {label} ({count})
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${tab}`} tabIndex={0} className="mt-8 rounded-2xl">
        {panels[tab]}
      </div>
    </div>
  )
}
