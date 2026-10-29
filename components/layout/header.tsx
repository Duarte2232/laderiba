"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Phone, X } from "lucide-react"
import { Logo } from "@/components/site/logo"
import { NAV, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-olive text-sm text-white md:block">
        <div className="wrap flex flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-center">
          <span>Estrada de Santo António, Cruzeiro · Riba de Mouro</span>
          <a href={SITE.phoneHref} className="font-bold underline-offset-4 hover:underline">
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="underline-offset-4 hover:underline">
            {SITE.email}
          </a>
        </div>
      </div>

      <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" aria-label={`${SITE.name} — página inicial`} className="rounded-lg">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2.5 text-base font-bold transition-colors hover:bg-sand",
                isActive(href) ? "bg-olive-tint text-olive" : "text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
          <Link href="/#contactos" className="btn-accent ml-2 !min-h-[2.9rem] !px-5">
            Contactos
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={SITE.phoneHref}
            aria-label={`Ligar para ${SITE.phone}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movel"
            className="flex h-12 items-center gap-2 rounded-full border-2 border-olive px-4 font-bold text-olive"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movel" aria-label="Principal" className="border-t border-border bg-background lg:hidden">
          <ul className="wrap flex flex-col py-3">
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-[3.25rem] items-center rounded-xl px-3 text-lg font-bold",
                    isActive(href) && "bg-olive-tint text-olive",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contactos" className="flex min-h-[3.25rem] items-center rounded-xl px-3 text-lg font-bold">
                Contactos
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
