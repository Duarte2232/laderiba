import Link from "next/link"

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap max-w-2xl text-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="text-4xl font-bold md:text-5xl">Página não encontrada</h1>
        <p className="mt-4 text-xl text-muted-foreground">A página que procura não existe ou foi removida.</p>
        <Link href="/" className="btn-primary mt-8">
          Voltar ao início
        </Link>
      </div>
    </section>
  )
}
