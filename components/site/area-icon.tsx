import { Baby, GraduationCap, HeartHandshake, House, Handshake, Palette, type LucideIcon } from "lucide-react"
import type { AreaIcon } from "@/lib/site"

const ICONS: Record<AreaIcon, LucideIcon> = {
  idosos: HeartHandshake,
  criancas: Baby,
  cultura: Palette,
  servicos: Handshake,
  formacao: GraduationCap,
  centro: House,
}

export function AreaIconView({ icon, className }: { icon: AreaIcon; className?: string }) {
  const Icon = ICONS[icon]
  return <Icon className={className} aria-hidden="true" />
}
