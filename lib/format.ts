const longDate = new Intl.DateTimeFormat("pt-PT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Lisbon" })
const shortDate = new Intl.DateTimeFormat("pt-PT", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Lisbon" })
const day = new Intl.DateTimeFormat("pt-PT", { day: "2-digit", timeZone: "Europe/Lisbon" })
const month = new Intl.DateTimeFormat("pt-PT", { month: "short", timeZone: "Europe/Lisbon" })
const year = new Intl.DateTimeFormat("pt-PT", { year: "numeric", timeZone: "Europe/Lisbon" })

export const formatLongDate = (iso: string | null) => (iso ? longDate.format(new Date(iso)) : "")
export const formatShortDate = (iso: string | null) => (iso ? shortDate.format(new Date(iso)) : "")
export const dateParts = (iso: string) => {
  const d = new Date(iso)
  return { day: day.format(d), month: month.format(d).replace(".", ""), year: year.format(d) }
}
export const yearOf = (iso: string | null) => (iso ? Number(year.format(new Date(iso))) : null)

export function formatBytes(bytes: number | null): string {
  if (!bytes) return ""
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toLocaleString("pt-PT", { maximumFractionDigits: 1 })} MB`
}

export function fileExtension(url: string, tipo: string | null): string {
  if (tipo) return tipo.toUpperCase()
  const match = url.split("?")[0].match(/\.([a-z0-9]{2,5})$/i)
  return match ? match[1].toUpperCase() : "FICHEIRO"
}

// Cloudinary: a flag fl_attachment faz o browser descarregar em vez de abrir.
export function downloadUrl(url: string): string {
  return url.includes("res.cloudinary.com") && url.includes("/upload/") ? url.replace("/upload/", "/upload/fl_attachment/") : url
}

const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Lisbon" })

// Um evento "de hoje" ainda conta como próximo.
export const isUpcoming = (iso: string) => dayKey.format(new Date(iso)) >= dayKey.format(new Date())
