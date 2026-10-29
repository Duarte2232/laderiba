"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { MAPS_QUERY } from "@/lib/site"

// O mapa só é carregado a pedido: poupa dados em telemóvel e não envia dados a terceiros sem necessidade.
export function MapEmbed() {
  const [show, setShow] = useState(false)

  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden rounded-3xl border border-border bg-sand">
      {show ? (
        <iframe
          title="Mapa com a localização da associação, em Riba de Mouro"
          src={`https://www.google.com/maps?q=${MAPS_QUERY}&hl=pt-PT&output=embed`}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPin className="h-10 w-10 text-accent" aria-hidden="true" />
          <p className="max-w-xs text-base text-muted-foreground">Veja onde estamos, em Riba de Mouro.</p>
          <button type="button" onClick={() => setShow(true)} className="btn-primary">
            Mostrar mapa
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-accent underline underline-offset-4"
          >
            Abrir no Google Maps (nova janela)
          </a>
        </div>
      )}
    </div>
  )
}
