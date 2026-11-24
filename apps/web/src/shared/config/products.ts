import type { IconName } from '../ui/icon'
import { DIGITAL_SOLUTIONS, whatsappMessageHref } from './site-config'
import {
  SMALL_BUSINESS_HIGHLIGHTS,
  SMALL_BUSINESS_HREF,
  SMALL_BUSINESS_MAX_MACHINES,
} from './small-business'

export type ProductSlug = 'smallbusiness' | 'app' | 'dashboard'

export type ProductPoint = {
  readonly icon: IconName
  readonly title: string
  readonly text: string
  readonly solution?: string
}

type ProductStep = {
  readonly title: string
  readonly text: string
}

export type Product = {
  readonly slug: ProductSlug
  readonly name: string
  readonly audience: string
  readonly access: string
  readonly headline: string
  readonly pitch: string
  readonly lead: string
  readonly bullets: readonly string[]
  readonly featuresTitle: string
  readonly features: readonly ProductPoint[]
  readonly reasonsTitle: string
  readonly reasons: readonly ProductPoint[]
  readonly checklistTitle: string
  readonly checklist: readonly string[]
  readonly stepsTitle?: string
  readonly steps?: readonly ProductStep[]
  readonly videoId?: string
  readonly solution?: string
  readonly whatsappHref: string
}

export const productHref = (slug: ProductSlug): string => `${DIGITAL_SOLUTIONS.href}/${slug}`

export const PRODUCTS_HREF: string = DIGITAL_SOLUTIONS.href

export const PRODUCTS: readonly Product[] = [
  {
    slug: 'smallbusiness',
    name: 'SmallBusiness',
    audience: 'Para a pequena empresa',
    access: 'Pelo navegador, na nuvem',
    headline: 'O sistema da MS na medida da pequena empresa',
    pitch: 'Plano, funerária, cobrança e caixa em um pacote enxuto, 100% na nuvem.',
    lead: 'Para quem quer sair das planilhas e dos controles manuais: os módulos essenciais da MS, acessados pelo navegador, com começo rápido e ótimo custo-benefício.',
    bullets: [
      'Plano, Funerária, Cobrança e Caixa',
      '100% na nuvem, pelo navegador',
      `Até ${SMALL_BUSINESS_MAX_MACHINES} máquinas`,
    ],
    featuresTitle: 'Os módulos que vêm no pacote',
    features: [
      {
        icon: 'shield',
        title: 'Plano',
        solution: 'planos-funerarios',
        text: 'Planos mensais, bimestrais ou por rateio, com carnês, boletos, carteirinhas e comissão de vendas.',
      },
      {
        icon: 'clipboard',
        title: 'Funerária',
        solution: 'funerarias',
        text: 'Registro do óbito, documentação, ordem de serviço, controle de estoque e comissionamento.',
      },
      {
        icon: 'receipt',
        title: 'Cobrança',
        solution: 'cobranca-bancaria',
        text: 'Boletos registrados no banco, com arquivo de remessa, baixa automática e rastreamento.',
      },
      {
        icon: 'banknote',
        title: 'Caixa',
        solution: 'caixa-matriz',
        text: 'Recebimento de taxas, guias, carteirinhas e fechamento de caixa com relatórios.',
      },
    ],
    reasonsTitle: 'Por que o SmallBusiness',
    reasons: [
      {
        icon: 'wallet',
        title: 'Acessível e completo',
        text: 'Uma solução robusta a preço competitivo, pensada para empresas de menor porte.',
      },
      {
        icon: 'cloud',
        title: '100% na nuvem',
        text: 'Acesse de qualquer lugar e a qualquer hora, sem instalar programas.',
      },
      {
        icon: 'monitor',
        title: 'Visual moderno',
        text: 'Interface redesenhada para facilitar o uso, mesmo para quem não é da área de tecnologia.',
      },
      {
        icon: 'shield',
        title: 'Segurança',
        text: 'Dados em data center de alto nível, com backup e monitoramento contínuos.',
      },
      {
        icon: 'layers',
        title: 'Cresce com você',
        text: 'Comece com o pacote básico e adicione módulos conforme a empresa cresce.',
      },
      {
        icon: 'building',
        title: `Até ${SMALL_BUSINESS_MAX_MACHINES} máquinas`,
        text: `Use o sistema em até ${SMALL_BUSINESS_MAX_MACHINES} máquinas da sua empresa.`,
      },
    ],
    checklistTitle: 'No dia a dia',
    checklist: SMALL_BUSINESS_HIGHLIGHTS,
    stepsTitle: 'Para quem é',
    steps: [
      {
        title: 'Empresas de pequeno porte',
        text: 'Que querem sair dos controles manuais e das planilhas.',
      },
      {
        title: 'Negócios que precisam de organização',
        text: 'Controle e segurança na rotina de plano, funerária, cobrança e caixa.',
      },
      {
        title: 'Quem decide com dados',
        text: 'Informações de qualquer lugar para decidir com base em números confiáveis.',
      },
    ],
    whatsappHref: SMALL_BUSINESS_HREF,
  },
  {
    slug: 'app',
    name: 'MS App',
    audience: 'Para os seus associados',
    access: 'No celular, Android e iOS',
    headline: 'O app que a sua empresa oferece aos associados',
    pitch: 'Plano, parcelas, carteirinha e contato com a empresa no celular do associado.',
    lead: 'Com o MS App, cada associado consulta o plano, acompanha as parcelas, mostra a carteirinha e fala com a sua empresa direto do celular, no Android e no iOS.',
    bullets: ['Parcelas, segunda via e link de pagamento', 'Carteirinha virtual', 'Android e iOS'],
    featuresTitle: 'O que o associado faz no app',
    features: [
      {
        icon: 'user',
        title: 'Meu plano',
        text: 'Dados do plano contratado e consulta dos dependentes.',
      },
      {
        icon: 'receipt',
        title: 'Parcelas',
        text: 'Parcelas pagas e pendentes, com segunda via na hora.',
      },
      {
        icon: 'credit-card',
        title: 'Pagamento',
        text: 'Link de pagamento para quitar a parcela com cartão de crédito.',
      },
      {
        icon: 'user-check',
        title: 'Carteirinha virtual',
        text: 'A carteirinha no celular, sempre à mão.',
      },
      {
        icon: 'heart',
        title: 'Convênios',
        text: 'Consulta dos convênios e emissão de guias de atendimento.',
      },
      {
        icon: 'pin',
        title: 'Unidades',
        text: 'Informações e localização de todas as unidades da empresa.',
      },
      {
        icon: 'calendar',
        title: 'Lembretes',
        text: 'Aviso de parcela a vencer para manter o plano em dia.',
      },
      {
        icon: 'message',
        title: 'Fale com a empresa',
        text: 'Contato direto com a sua empresa pelo WhatsApp.',
      },
    ],
    reasonsTitle: 'O que a sua empresa ganha',
    reasons: [
      {
        icon: 'headset',
        title: 'Balcão mais leve',
        text: 'Segunda via, carteirinha e consultas saem pelo app, sem o associado ir até a empresa.',
      },
      {
        icon: 'calendar',
        title: 'Parcelas em dia',
        text: 'Lembretes de vencimento e link de pagamento facilitam o pagamento.',
      },
      {
        icon: 'globe',
        title: 'Também no navegador',
        text: 'Os mesmos serviços estão no Portal do Associado, para quem prefere o computador.',
      },
    ],
    checklistTitle: 'Tudo o que o app traz',
    checklist: [
      'Dados do plano e dependentes',
      'Parcelas pagas e pendentes',
      'Segunda via de parcela',
      'Link de pagamento por cartão de crédito',
      'Convênios e guias de atendimento',
      'Carteirinha virtual',
      'Unidades com localização',
      'Contato pelo WhatsApp',
    ],
    stepsTitle: 'Como o associado usa',
    steps: [
      {
        title: 'Acesso rápido',
        text: 'O associado entra de forma rápida e simples, com o acesso que a sua empresa definir.',
      },
      {
        title: 'Todos os acessos facilitados',
        text: 'Parcelas em destaque e atalhos para o plano, os dependentes, o financeiro, a carteirinha e a telemedicina, tudo à mão na tela inicial.',
      },
      {
        title: 'Recebe lembretes',
        text: 'O aviso de parcela a vencer chega no app e ajuda a manter o plano em dia.',
      },
    ],
    solution: 'app-do-associado',
    whatsappHref: whatsappMessageHref('Olá! Quero oferecer o MS App aos meus associados.'),
  },
  {
    slug: 'dashboard',
    name: 'MS Dashboard',
    audience: 'Para quem decide',
    access: 'On-line, de onde estiver',
    headline: 'Os números da empresa em um só painel',
    pitch: 'Recebimentos, financeiro, previsto x realizado e inadimplência em gráficos.',
    lead: 'Consulte on-line, com um clique, as informações que importam para decidir: recebimentos de todos os caixas, financeiro, fluxo do plano e inadimplência, direto do sistema.',
    bullets: [
      'Fluxo previsto x realizado',
      'Análise de inadimplência',
      'Recebimentos de todos os caixas',
    ],
    featuresTitle: 'O que o painel mostra',
    features: [
      {
        icon: 'wallet',
        title: 'Recebimentos',
        text: 'O fluxo de recebimentos de todos os caixas da empresa.',
      },
      {
        icon: 'chart',
        title: 'Financeiro',
        text: 'Uma visão geral do financeiro, em um só lugar.',
      },
      {
        icon: 'layers',
        title: 'Previsto x realizado',
        text: 'O fluxo do plano previsto comparado ao que foi realizado.',
      },
      {
        icon: 'alert',
        title: 'Inadimplência',
        text: 'Análise das taxas em dia e em atraso dos associados.',
      },
      {
        icon: 'receipt',
        title: 'Relatórios',
        text: 'Relatórios de recebimento para acompanhar o caixa.',
      },
    ],
    reasonsTitle: 'Para quem decide',
    reasons: [
      {
        icon: 'clock',
        title: 'Com um clique',
        text: 'As informações fundamentais aparecem na hora, sem montar planilha.',
      },
      {
        icon: 'globe',
        title: 'On-line',
        text: 'Consulte os indicadores pela internet, de onde estiver.',
      },
      {
        icon: 'database',
        title: 'Direto do sistema',
        text: 'Os gráficos usam os dados que a empresa já registra no sistema da MS.',
      },
    ],
    checklistTitle: 'Indicadores por área',
    checklist: [
      'Plano: avaliação global e fluxo',
      'Plano: inadimplência e análise de vendas',
      'Plano: recebimentos por mês',
      'Financeiro: avaliação financeira',
      'Funerária: atendimentos (vendas)',
      'Funerária: óbitos',
    ],
    videoId: 'c_0ZaxRds_o',
    solution: 'dashboard',
    whatsappHref: whatsappMessageHref('Olá! Quero conhecer o MS Dashboard.'),
  },
]

export const findProduct = (slug: string | undefined): Product | undefined =>
  PRODUCTS.find((product) => product.slug === slug)
