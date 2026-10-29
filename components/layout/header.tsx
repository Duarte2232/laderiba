'use client';

import { useState } from "react";
import Link from "next/link"
import Image from "next/image";
import { Lock, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-semibold transition-colors hover:text-primary"
        >
          <Image
            src="/placeholder-logo.png"
            alt="Associação Cultural Lá de Riba"
            width={30}
            height={30}
            className="h-7 w-auto"
          />
          <span>Início</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/documentos" 
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Documentos
          </Link>
          <Link 
            href="/eventos" 
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Eventos
          </Link>
          <Link 
            href="/respostas-sociais" 
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Respostas Sociais
          </Link>
          <Link 
            href="/sobre" 
            className="text-sm font-medium transition-colors hover:text-primary hover:underline"
          >
            Sobre Nós
          </Link>
        </nav>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleMobileMenu}
          className="md:hidden transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          <span className="ml-2">Menu</span>
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-background border-b shadow-sm">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/documentos" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentos
            </Link>
            <Link 
              href="/eventos" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              href="/respostas-sociais" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Respostas Sociais
            </Link>
            <Link 
              href="/sobre" 
              className="text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre Nós
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
} 