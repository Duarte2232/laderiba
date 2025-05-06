import Link from "next/link"
import { Building, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sobre a Nossa Associação
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Conheça a nossa história, missão e valores que orientam o nosso trabalho na comunidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Nossa História</h2>
                <p className="text-gray-500">
                A Associação Social e Cultural foi fundada em 2014 por um grupo de cidadãos comprometidos com o desenvolvimento social, cultural e educativo da comunidade. Com o tempo, temos vindo a alargar a nossa atuação, promovendo projetos inovadores que respondem às reais necessidades da população.

Atuamos em diversas áreas, desde o apoio a idosos e crianças até à dinamização cultural e socioeducativa. Valorizamos a solidariedade, a inclusão e o serviço à comunidade, prestando apoio em múltiplos domínios com impacto positivo e duradouro.


                </p>
                <p className="text-gray-500">
                Contamos hoje com uma equipa multidisciplinar de voluntários dedicados à promoção do bem-estar social, à formação e ao fortalecimento dos laços comunitários.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Missão e Valores</h2>
                <p className="text-gray-500">
                A nossa missão é contribuir para o bem-estar da comunidade, promovendo ações solidárias, educativas e culturais que respondam às necessidades sociais com impacto positivo e duradouro.
                </p>
                <ul className="space-y-2 text-gray-500">  
                <ul>
  <li><strong> • Solidariedade Social:</strong> Promovemos atividades que reforçam o espírito de entreajuda e apoio mútuo entre os membros da comunidade.</li>
  <li><strong> • Apoio a Idosos:</strong> Oferecemos suporte em várias áreas para garantir qualidade de vida e dignidade às pessoas idosas.</li>
  <li><strong> • Cuidados e Atividades para Crianças:</strong> Prestamos cuidados e organizamos iniciativas que promovem o desenvolvimento integral das crianças.</li>
  <li><strong> • Cultura, Educação e Turismo:</strong> Desenvolvemos ações de animação, produção e divulgação com enfoque cultural, socioeducativo e turístico.</li>
  <li><strong> • Serviços Comunitários:</strong> Prestamos diversos serviços úteis e relevantes para as necessidades da população local.</li>
  <li><strong> • Promoção e Formação:</strong> Investimos na promoção, investigação e formação, sempre com foco na defesa dos interesses da comunidade.</li>
  <li><strong> • Centro de Dia:</strong> Planeamos a criação de um Centro de Dia para acolher e apoiar idosos em contexto de proximidade e bem-estar.</li>
</ul>

                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Contacte-nos</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Morada
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Estrada de Santo António, Cruzeiro
                      <br />
                    4950-710 Riba de Mouro
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Telefone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">+351 963 352 648</p>
                </CardContent>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                          Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">associal.laderiba@hotmail.com</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
