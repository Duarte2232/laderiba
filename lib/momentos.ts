// Memórias de eventos já realizados, com fotografias fornecidas pela associação.
// São conteúdo fixo (sem datas); eventos com data devem ser registados em /admin.
export interface Momento {
  slug: string
  titulo: string
  descricao?: string
  fotos: { file: string; alt: string }[]
}

const f = (file: string, alt: string) => ({ file: `/images/momentos/${file}.jpg`, alt })

export const MOMENTOS: Momento[] = [
  {
    slug: "inauguracao-lar-de-idosos",
    titulo: "Inauguração do Lar de Idosos",
    fotos: [
      f("lar1", "Grupo de convidados e membros da associação à entrada do edifício, junto à placa comemorativa"),
      f("lar5", "Descerramento da bandeira durante a inauguração"),
      f("lar2", "Brinde entre os presentes na inauguração"),
      f("lar3", "Convidados na sala de convívio, com cadeirões azuis e cinzentos"),
      f("lar4", "Convidados a entrar no edifício durante a visita"),
      f("lar6", "Vidro da sala com a identificação A.S.C. Lá de Riba"),
    ],
  },
  {
    slug: "cantar-os-reis",
    titulo: "Cantar os Reis pela freguesia",
    fotos: [f("reis1", "Grupo de pessoas de várias idades com a bandeira da associação e um acordeão, no Cantar os Reis")],
  },
  {
    slug: "jantar-de-natal",
    titulo: "Jantar de Natal",
    fotos: [
      f("jantardenatal", "Sala cheia durante o Jantar de Natal, com mesas postas e árvore de Natal ao fundo"),
      f("jantardenatal2", "Longas mesas e muitos convivas no salão durante o Jantar de Natal"),
    ],
  },
  {
    slug: "festa-do-bucho-e-do-champarriao",
    titulo: "Festa do Bucho e do Champarrião",
    fotos: [
      f("convivio1", "Voluntários com camisolas verdes junto a um grande recipiente roxo"),
      f("convivio3", "Quatro participantes junto à prensa de uvas, sob um telheiro"),
      f("convivio2", "Dois participantes a cumprimentarem-se atrás do balcão"),
      f("convivio4", "Convívio ao final do dia, sob a tenda iluminada"),
    ],
  },
  {
    slug: "caminhada-contra-o-cancro",
    titulo: "Caminhada contra o cancro",
    fotos: [
      f("caminhada1", "Participantes da caminhada reunidos junto à igreja, com t-shirts brancas"),
      f("caminhada2", "Fitas coloridas atadas a uma vedação de madeira junto ao rio, com uma placa comemorativa"),
    ],
  },
  {
    slug: "apresentacao-livro-os-de-la-de-riba",
    titulo: "Apresentação do livro «Os de Lá de Riba»",
    descricao:
      "Um trabalho desenvolvido há vários anos por duas filhas da terra, Alda Barreiros e Maria Alves, e agora «palpável», carregado de memórias e de história.",
    fotos: [
      f("livro1", "Capa do livro «Os de Lá de Riba», de Alda Barreiros e Maria Alves, junto a um prato de barro da Feira Lá de Riba"),
      f("livro2", "Mesa da apresentação do livro «Os de Lá de Riba», com cartaz do livro em frente"),
    ],
  },
  {
    slug: "passeio-da-comunidade",
    titulo: "Passeio da comunidade",
    descricao: "Um passeio organizado para a comunidade.",
    fotos: [
      f("passeio2", "Grupo de participantes no passeio, reunidos num cais junto a barcos"),
      f("passeio1", "Participantes sentados no autocarro durante o passeio"),
    ],
  },
]
