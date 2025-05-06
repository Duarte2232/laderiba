import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
        <p className="text-sm text-gray-500">© 2024 Associação Social e Cultural Lá de Riba. Todos os direitos reservados.</p>
        <nav className="flex gap-4">
          <Link 
            href="mailto:associal.laderiba@hotmail.com" 
            className="text-sm text-gray-500 transition-colors hover:text-primary hover:underline"
          >
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  )
} 