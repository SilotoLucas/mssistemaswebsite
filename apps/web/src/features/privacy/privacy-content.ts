import { COMPANY_EMAIL } from '../../shared/config/company-info'

export type PolicySection = {
  readonly id: string
  readonly title: string
  readonly paragraphs: readonly string[]
  readonly items?: readonly string[]
}

export const POLICY_UPDATED_AT = 'novembro de 2026'

export const POLICY_SECTIONS: readonly PolicySection[] = [
  {
    id: 'quem-somos',
    title: 'Quem é o responsável pelos seus dados',
    paragraphs: [
      'A MS Consultoria & Sistemas, de Botucatu/SP, é a responsável pelo tratamento dos dados pessoais coletados neste site, nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018).',
      `Para qualquer assunto sobre seus dados, escreva para ${COMPANY_EMAIL}.`,
    ],
  },
  {
    id: 'dados-coletados',
    title: 'Quais dados coletamos',
    paragraphs: ['Coletamos somente o que você preenche no formulário de demonstração:'],
    items: [
      'nome',
      'empresa e segmento de atuação',
      'cidade e estado',
      'número de WhatsApp',
      'e-mail',
    ],
  },
  {
    id: 'finalidade',
    title: 'Para que usamos',
    paragraphs: [
      'Usamos esses dados para entrar em contato com você, combinar a demonstração dos sistemas e responder ao seu pedido. Não usamos os dados para outras finalidades sem avisar você antes.',
    ],
  },
  {
    id: 'base-legal',
    title: 'Em que nos baseamos',
    paragraphs: [
      'O tratamento é feito com base no seu consentimento, dado ao marcar a caixa de aceite do formulário. Você pode retirar o consentimento a qualquer momento.',
    ],
  },
  {
    id: 'compartilhamento',
    title: 'Com quem compartilhamos',
    paragraphs: [
      'Não vendemos seus dados. Eles podem ser compartilhados apenas com prestadores que ajudam a MS a atender o seu pedido, sob compromisso de sigilo, ou quando a lei exigir.',
    ],
  },
  {
    id: 'guarda',
    title: 'Por quanto tempo guardamos',
    paragraphs: [
      'Guardamos os dados pelo tempo necessário para atender o seu pedido e cumprir obrigações legais. Depois disso, eles são apagados ou anonimizados.',
    ],
  },
  {
    id: 'direitos',
    title: 'Seus direitos',
    paragraphs: ['Você pode pedir, a qualquer momento:'],
    items: [
      'confirmação de que tratamos seus dados e acesso a eles',
      'correção de dados incompletos ou desatualizados',
      'anonimização, bloqueio ou eliminação de dados desnecessários',
      'portabilidade dos dados',
      'informação sobre com quem os compartilhamos',
      'revogação do consentimento',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    paragraphs: [
      'Este site não usa cookies de publicidade. Se passarmos a usar cookies de medição ou de outro tipo, vamos avisar aqui e pedir a sua escolha antes.',
    ],
  },
  {
    id: 'seguranca',
    title: 'Como protegemos',
    paragraphs: [
      'Adotamos medidas técnicas e administrativas para proteger os dados contra acesso indevido, perda e alteração.',
    ],
  },
  {
    id: 'alteracoes',
    title: 'Mudanças nesta política',
    paragraphs: [
      'Podemos atualizar esta política. A data da última atualização fica sempre no topo da página.',
    ],
  },
]
