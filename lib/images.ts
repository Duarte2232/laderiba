import "server-only"
import { existsSync } from "node:fs"
import path from "node:path"

// Cada "slot" corresponde a um ficheiro em /public/images (ver IMAGES.md).
// Basta colocar o ficheiro com o nome certo e o site passa a usá-lo; sem ficheiro, mostra-se um espaço reservado.
export const IMAGE_SLOTS = {
  hero: { label: "Foto principal da página inicial", width: 2000, height: 1200 },
  sobre: { label: "Foto da associação (Quem somos)", width: 1200, height: 900 },
  "sobre-topo": { label: "Foto de topo da página Sobre", width: 2000, height: 900 },
  "area-idosos": { label: "Apoio a idosos", width: 1200, height: 900 },
  "area-criancas": { label: "Crianças", width: 1200, height: 900 },
  "area-cultura": { label: "Cultura, educação e turismo", width: 1200, height: 900 },
  "area-servicos": { label: "Serviços comunitários", width: 1200, height: 900 },
  "area-formacao": { label: "Promoção e formação", width: 1200, height: 900 },
  "area-centro-de-dia": { label: "Centro de Dia", width: 1200, height: 900 },
  evento: { label: "Imagem por omissão de eventos", width: 1200, height: 800 },
  "eventos-vazio": { label: "Página de eventos sem eventos", width: 1200, height: 800 },
} as const

export type ImageSlotName = keyof typeof IMAGE_SLOTS

const EXTENSIONS = ["webp", "jpg", "jpeg", "png"]

export function resolveSlot(name: ImageSlotName): string | null {
  for (const ext of EXTENSIONS) {
    if (existsSync(path.join(process.cwd(), "public", "images", `${name}.${ext}`))) {
      return `/images/${name}.${ext}`
    }
  }
  return null
}
