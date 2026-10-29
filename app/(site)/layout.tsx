import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  )
}
