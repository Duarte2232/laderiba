import Image from "next/image"
import { Camera } from "lucide-react"
import { IMAGE_SLOTS, resolveSlot, type ImageSlotName } from "@/lib/images"
import { cn } from "@/lib/utils"

interface ImageSlotProps {
  slot: ImageSlotName
  alt: string
  className?: string
  sizes: string
  priority?: boolean
  /** Sem `fill`, a imagem ocupa o contentor (deve ter altura/aspeto definidos). */
}

// Mostra /public/images/<slot>.(webp|jpg|png) se existir; caso contrário um espaço reservado, claramente provisório.
export function ImageSlot({ slot, alt, className, sizes, priority }: ImageSlotProps) {
  const src = resolveSlot(slot)
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />
  }
  return (
    <div
      role="img"
      aria-label={`${alt} (foto provisória)`}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-sand-dark text-olive/70",
        className,
      )}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.12]" preserveAspectRatio="none">
        <defs>
          <pattern id="slot-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2" fill="#2F4A36" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#slot-dots)" />
      </svg>
      <Camera className="relative h-8 w-8" aria-hidden="true" />
      <span className="relative rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-olive">
        Foto a fornecer · {IMAGE_SLOTS[slot].label}
      </span>
    </div>
  )
}
