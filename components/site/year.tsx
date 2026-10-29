"use client"

// Calculado no browser para não ficar fixo no ano da última compilação.
export function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>
}
