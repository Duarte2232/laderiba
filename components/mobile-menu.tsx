"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
              Associação Cultural
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Fechar menu</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-4">
            <Link href="/documentos" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
              Documentos
            </Link>
            <Link href="/eventos" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
              Eventos
            </Link>
            <Link
              href="/respostas-sociais"
              className="text-lg font-medium hover:underline"
              onClick={() => setOpen(false)}
            >
              Respostas Sociais
            </Link>
            <Link href="/sobre" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
              Sobre Nós
            </Link>
            <Link href="/contacto" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
              Contacto
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
