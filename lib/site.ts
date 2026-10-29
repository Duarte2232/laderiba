export const SITE = {
  name: "Associação Social e Cultural Lá de Riba",
  shortName: "Lá de Riba",
  url: "https://ascladeriba.pt",
  founded: 2014,
  description:
    "Associação de Riba de Mouro que apoia idosos e crianças e promove a cultura, a formação e o bem-estar da comunidade desde 2014.",
  phone: "+351 963 352 648",
  phoneHref: "tel:+351963352648",
  email: "associal.laderiba@hotmail.com",
  address: {
    street: "Estrada de Santo António, Cruzeiro",
    postalCode: "4950-710",
    locality: "Riba de Mouro",
    country: "PT",
  },
} as const

export const ADDRESS_ONE_LINE = `${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality}, Portugal`
// Localização exata da associação no Google Maps.
export const MAPS_LINK = "https://maps.app.goo.gl/JJ45EjZMNGDysFGE9"
export const MAPS_EMBED_URL = "https://www.google.com/maps?q=42.0356286,-8.3392757&z=17&hl=pt-PT&output=embed"

export const NAV = [
  { href: "/documentos", label: "Documentos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/respostas-sociais", label: "Respostas Sociais" },
  { href: "/sobre", label: "Sobre Nós" },
] as const


export type AreaIcon = "idosos" | "criancas" | "cultura" | "servicos" | "formacao" | "centro"

// Texto retirado da página "Sobre".
export const AREAS = [
  {
    slug: "apoio-a-idosos",
    alt: "Sala da associação, com a identificação A.S.C. Lá de Riba no vidro e cadeiras azuis",
    title: "Apoio a Idosos",
    icon: "idosos" as AreaIcon,
    image: "area-idosos",
    summary: "Suporte em várias áreas para garantir qualidade de vida e dignidade às pessoas idosas.",
  },
  {
    slug: "criancas",
    alt: "Crianças e atividades da associação",
    title: "Crianças",
    icon: "criancas" as AreaIcon,
    image: "evento", // não usado: esta área não tem cartão próprio
    summary: "Cuidados e iniciativas que promovem o desenvolvimento integral das crianças.",
    featured: false, // sem fotografia adequada por agora: só aparece na página Sobre
  },
  {
    slug: "cultura-e-turismo",
    alt: "Marcador da caminhada junto ao rio, com fitas coloridas, em Riba de Mouro",
    title: "Cultura, Educação e Turismo",
    icon: "cultura" as AreaIcon,
    image: "area-cultura",
    summary: "Ações de animação, produção e divulgação com enfoque cultural, socioeducativo e turístico.",
  },
  {
    slug: "servicos-comunitarios",
    alt: "Voluntários da associação com camisolas verdes, num evento da comunidade",
    title: "Serviços Comunitários",
    icon: "servicos" as AreaIcon,
    image: "area-servicos",
    summary: "Serviços úteis e relevantes para as necessidades da população local.",
  },
  {
    slug: "formacao",
    alt: "Atividades de formação da associação",
    title: "Promoção e Formação",
    icon: "formacao" as AreaIcon,
    image: "area-formacao",
    summary: "Promoção, investigação e formação, sempre em defesa dos interesses da comunidade.",
  },
  {
    slug: "centro-de-dia",
    alt: "Sala de convívio do Centro de Dia, com cadeirões e janelas amplas",
    title: "Centro de Dia",
    icon: "centro" as AreaIcon,
    image: "area-centro-de-dia",
    summary: "O Centro de Dia já foi inaugurado e vai acolher e apoiar idosos em contexto de proximidade e bem-estar. Neste momento decorre o processo de admissão de utentes.",
    badge: "Inaugurado · admissões em curso",
  },
] as const

// Áreas com cartão próprio na página inicial e em Respostas Sociais.
export const FEATURED_AREAS = AREAS.filter((a) => !("featured" in a && a.featured === false))
