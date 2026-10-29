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
export const MAPS_QUERY = encodeURIComponent(ADDRESS_ONE_LINE)

export const NAV = [
  { href: "/documentos", label: "Documentos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/respostas-sociais", label: "Respostas Sociais" },
  { href: "/sobre", label: "Sobre Nós" },
] as const

export type AreaIcon = "idosos" | "criancas" | "cultura" | "servicos" | "formacao" | "centro"

// Texto retirado da página "Sobre". Os pontos em `aConfirmar` são perguntas em aberto para a direção, não factos.
export const AREAS = [
  {
    slug: "apoio-a-idosos",
    title: "Apoio a Idosos",
    icon: "idosos" as AreaIcon,
    image: "area-idosos",
    summary: "Suporte em várias áreas para garantir qualidade de vida e dignidade às pessoas idosas.",
    aConfirmar: ["Serviços concretos prestados", "Quem pode pedir apoio e como", "Horários"],
  },
  {
    slug: "criancas",
    title: "Crianças",
    icon: "criancas" as AreaIcon,
    image: "area-criancas",
    summary: "Cuidados e iniciativas que promovem o desenvolvimento integral das crianças.",
    aConfirmar: ["Atividades em curso", "Idades abrangidas", "Horários e inscrições"],
  },
  {
    slug: "cultura-e-turismo",
    title: "Cultura, Educação e Turismo",
    icon: "cultura" as AreaIcon,
    image: "area-cultura",
    summary: "Ações de animação, produção e divulgação com enfoque cultural, socioeducativo e turístico.",
    aConfirmar: ["Iniciativas regulares", "Parcerias locais"],
  },
  {
    slug: "servicos-comunitarios",
    title: "Serviços Comunitários",
    icon: "servicos" as AreaIcon,
    image: "area-servicos",
    summary: "Serviços úteis e relevantes para as necessidades da população local.",
    aConfirmar: ["Lista de serviços disponíveis", "Condições de acesso"],
  },
  {
    slug: "formacao",
    title: "Promoção e Formação",
    icon: "formacao" as AreaIcon,
    image: "area-formacao",
    summary: "Promoção, investigação e formação, sempre em defesa dos interesses da comunidade.",
    aConfirmar: ["Cursos e ações de formação previstos", "Datas e destinatários"],
  },
  {
    slug: "centro-de-dia",
    title: "Centro de Dia",
    icon: "centro" as AreaIcon,
    image: "area-centro-de-dia",
    summary: "Um projeto em planeamento para acolher e apoiar idosos em contexto de proximidade e bem-estar.",
    planned: true,
    aConfirmar: ["Estado atual do projeto", "Calendário previsto"],
  },
] as const
