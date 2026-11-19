import type { IconName } from '../ui/icon'

export type Solution = {
  readonly slug: string
  readonly icon: IconName
  readonly name: string
  readonly summary: string
  readonly features: readonly string[]
  readonly videoId?: string
}

export type SolutionGroup = {
  readonly slug: string
  readonly name: string
  readonly description: string
  readonly icon: IconName
  readonly solutions: readonly Solution[]
}

export const SOLUTION_GROUPS: readonly SolutionGroup[] = [
  {
    slug: 'por-segmento',
    name: 'Por segmento',
    description: 'O sistema principal de cada tipo de operação.',
    icon: 'shield',
    solutions: [
      {
        slug: 'planos-funerarios',
        icon: 'shield',
        name: 'Planos Funerários',
        summary: 'Gestão de funerárias e planos de assistência familiar.',
        videoId: 'PJuVVmKkwOE',
        features: [
          'Planos mensais, bimestrais, trimestrais e rateio de óbitos por faixa etária',
          'Cobrança de seguros de vida, equipamentos de convalescença, transportes e taxas',
          'Carnês, cartas de cobrança e boletos bancários',
          'Débito em conta corrente ou na conta de luz',
          'Carteirinhas em impressora laser, matricial ou térmica',
          'Comissão de venda para gerente, supervisor e vendedor',
          'Baixa automática pelos arquivos de cobrança bancária',
          'Guias para conveniados e controle de convênios',
          'Caixa integrado, com baixa de parcelas e autenticação de documentos',
          'Relatórios de débitos, recebimentos, inadimplência, vendas e vendedores',
        ],
      },
      {
        slug: 'funerarias',
        icon: 'clipboard',
        name: 'Funerárias',
        summary: 'Registro dos dados do óbito e venda de produtos e serviços.',
        videoId: 'ymyX2M4RuA0',
        features: [
          'Documentação do óbito para registro em cartório',
          'Ordem de serviço para preparação do corpo',
          'Nota fiscal, boleto bancário ou nota promissória',
          'Controle de estoque de materiais',
          'Comissionamento de vendas',
          'Padronização dos atendimentos',
        ],
      },
      {
        slug: 'cemiterios',
        icon: 'pin',
        name: 'Cemitérios',
        summary: 'Parte contratual e administrativa de cadastros e cobranças.',
        videoId: 'I4QQv2BYno4',
        features: [
          'Preparado para qualquer engenharia de jazigos',
          'Sepultamentos e exumações, com histórico por jazigo',
          'Criação automática de jazigos, respeitando posições dependentes',
          'Busca e localização de sepultados',
          'Listagens para administrar exumações e sepultamentos',
          'Mala direta de previsão de exumações e para responsáveis pelos jazigos',
        ],
      },
      {
        slug: 'crematorios',
        icon: 'calendar',
        name: 'Crematórios',
        summary: 'Registro do falecido e venda de produtos e serviços de cremação.',
        features: [
          'Documentação da cremação',
          'Ordem de serviço com data e hora',
          'Nota fiscal, boleto bancário ou nota promissória',
          'Controle de estoque e comissionamento de vendas',
          'Padronização dos atendimentos',
          'Agendamento de salas de cerimonial e de velório',
        ],
      },
      {
        slug: 'clinicas',
        icon: 'heart',
        name: 'Clínicas',
        summary: 'Gestão de clínicas médicas e odontológicas.',
        features: [
          'Convênios com tabelas de valores por procedimento',
          'Agenda dos profissionais',
          'Guias de atendimento',
          'Carnê de manutenção de aparelhos ortodônticos',
          'Comissionamento de profissionais ou convênios',
          'Recebimentos e contas a receber',
          'Verificação de inadimplência ao emitir a guia, quando integrado ao plano',
          'Operação on-line para clínicas distantes da sede',
        ],
      },
    ],
  },
  {
    slug: 'gestao',
    name: 'Gestão',
    description: 'Controle das áreas administrativas da empresa.',
    icon: 'dashboard',
    solutions: [
      {
        slug: 'controle-financeiro',
        icon: 'wallet',
        name: 'Controle Financeiro',
        summary: 'Contas, pré-datados e fluxo de caixa em um só lugar.',
        features: [
          'Contas a pagar, contas a receber e contas correntes',
          'Controle de pré-datados',
          'Movimentação dos caixas diários, quando integrado a planos ou clínica',
          'Fluxo de caixa comparativo de até 12 meses',
          'Posição imediata dos saldos das contas correntes',
        ],
      },
      {
        slug: 'filiais-online',
        icon: 'building',
        name: 'Controle de Filiais',
        summary: 'Operação das filiais on-line ou off-line.',
        features: [
          'Funciona on-line ou off-line',
          'Recebimento de taxas, guias de convênios, carteirinhas e carnê não bancário',
          'Fechamento de caixa e relatórios',
          'Gerenciamento pela matriz e baixa direta no servidor principal, quando on-line',
        ],
      },
      {
        slug: 'frota',
        icon: 'truck',
        name: 'Controle de Frota',
        summary: 'Veículos, motoristas, manutenções e despesas.',
        videoId: 'zlwDWU0mPjs',
        features: [
          'Cadastro de veículos e motoristas',
          'Manutenções preventivas e corretivas',
          'Despesas, abastecimentos e multas',
          'Movimentação dos veículos',
          'Planilhas e fichas de vistoria',
          'Relatórios gerenciais',
        ],
      },
      {
        slug: 'equipamentos',
        icon: 'wrench',
        name: 'Controle de Equipamentos',
        summary: 'Empréstimo, locação e manutenção de equipamentos para convalescentes.',
        features: [
          'Empréstimo ou locação, com controle de prazos de devolução',
          'Verificação de inadimplência na retirada',
          'Contrato de empréstimo e nota promissória',
          'Rastreamento de todas as utilizações',
          'Manutenção e venda dos equipamentos',
        ],
      },
      {
        slug: 'crm',
        icon: 'phone-call',
        name: 'CRM: Telecobrança e S.A.C.',
        summary: 'Campanhas de cobrança e acompanhamento dos contatos.',
        features: [
          'Telecobrança com geração de campanhas',
          'Acompanhamento de produção e efetividade da cobrança',
          'Comissionamento dos colaboradores',
          'Registro de ligações recebidas e efetuadas',
          'Encaminhamento de pendências para as áreas da empresa',
          'Monitoramento dos contatos e das soluções dadas aos clientes',
        ],
      },
      {
        slug: 'veiculos-de-apoio',
        icon: 'ambulance',
        name: 'Veículos de Apoio',
        summary: 'Transporte não emergencial de pacientes em ambulâncias.',
        features: [
          'Agenda dos veículos',
          'Autorização de transporte',
          'Lançamento de valores no caixa da empresa',
          'Relatórios gerenciais',
        ],
      },
      {
        slug: 'dashboard',
        icon: 'chart',
        name: 'Dashboard',
        summary: 'Indicadores da empresa em qualquer dispositivo.',
        videoId: 'c_0ZaxRds_o',
        features: [
          'Receitas e despesas on-line',
          'Vendas e inadimplência',
          'Acesso por tablet, smartphone ou notebook',
        ],
      },
    ],
  },
  {
    slug: 'equipe-em-campo',
    name: 'Equipe em campo',
    description: 'Cobrança, venda e recebimento fora do escritório.',
    icon: 'phone',
    solutions: [
      {
        slug: 'cobranca-movel',
        icon: 'phone',
        name: 'Cobrança Móvel',
        summary: 'Cobrança a domicílio pelo smartphone.',
        videoId: 'DOhSeDlkZSk',
        features: [
          'Cobrança e consulta por smartphone',
          'Integração com o sistema de planos',
          'Baixa automática dos recebimentos',
        ],
      },
      {
        slug: 'venda-com-tablet',
        icon: 'tablet',
        name: 'Venda de Planos com Tablet',
        summary: 'Substitui as propostas em papel.',
        videoId: 'pvFlrhU67nM',
        features: [
          'Cadastro mais ágil dos contratos',
          'Menos tempo para entregar contratos novos',
          'Fim das propostas em papel',
        ],
      },
      {
        slug: 'pos',
        icon: 'credit-card',
        name: 'P.O.S para Ponto de Recebimento',
        summary: 'Recebimento remoto em pontos de apoio ou com cobradores.',
        videoId: '1cc8B3fjYtA',
        features: ['Baixas on-line', 'Emissão de recibos', 'Relatórios de recebimento'],
      },
    ],
  },
  {
    slug: 'canais-digitais',
    name: 'Canais digitais',
    description: 'Serviços on-line para o cliente final.',
    icon: 'globe',
    solutions: [
      {
        slug: 'portal-do-associado',
        icon: 'user',
        name: 'Portal do Associado',
        summary: 'Serviços e informações do plano contratado.',
        videoId: 'UzMKHQ2t2ks',
        features: ['Acesso on-line às informações do plano', 'Serviços para o associado'],
      },
      {
        slug: 'venda-web',
        icon: 'cart',
        name: 'Venda Web',
        summary: 'Venda de planos pela internet.',
        features: ['Cálculo de dependente extra', 'Pagamento por cartão de crédito ou boleto'],
      },
      {
        slug: 'chatbot',
        icon: 'bot',
        name: 'ChatBot MS Sistemas',
        summary: 'Atendimento automatizado para os seus clientes.',
        videoId: 'WfIgO2pPig0',
        features: ['Atendimento automatizado', 'Acesso por WhatsApp e QR Code'],
      },
      {
        slug: 'condolencia-online',
        icon: 'send',
        name: 'Condolência Online',
        summary: 'Envio de condolências às famílias pela internet.',
        features: ['Mensagens de condolência enviadas pela internet'],
      },
      {
        slug: 'sms-marketing',
        icon: 'message',
        name: 'SMS Marketing',
        summary: 'Comunicação automática com os clientes por SMS.',
        videoId: 'j2K1LwtdbEg',
        features: [
          'Boas-vindas e acompanhamento de tarefas',
          'Mensagens para aniversariantes',
          'Avisos de parcelas em débito',
          'Envio com shortcode',
          'Implantação gratuita para clientes ativos',
        ],
      },
    ],
  },
  {
    slug: 'atendimento-presencial',
    name: 'Atendimento presencial',
    description: 'Tecnologia para a recepção, a sala velatória e o cemitério.',
    icon: 'monitor',
    solutions: [
      {
        slug: 'totem-autoatendimento',
        icon: 'monitor',
        name: 'Totem de Autoatendimento',
        summary: 'Terminal ligado ao sistema de planos.',
        videoId: '_iHxb6AWg_4',
        features: [
          'Mesmo banco de dados do sistema de planos',
          'Mesmo fluxo do atendimento no balcão',
        ],
      },
      {
        slug: 'totem-cemiterio',
        icon: 'pin',
        name: 'Totem Cemitério',
        summary: 'Localização de jazigos para os visitantes.',
        videoId: 'zNyJOw1fGB8',
        features: [
          'Busca do jazigo pelo nome do falecido',
          'Indicação de como chegar',
          'Memorial com descrição e fotos',
        ],
      },
      {
        slug: 'qr-code-cemiterio',
        icon: 'qr',
        name: 'QR Code Cemitério',
        summary: 'Acesso ao histórico de vida pela lápide.',
        features: ['QR Code na lápide', 'Acesso ao histórico de vida do falecido'],
      },
      {
        slug: 'painel-de-velorio',
        icon: 'tv',
        name: 'Painel de Velório',
        summary: 'Informações na recepção e na sala velatória em TV LCD.',
        videoId: 'o1ww6oLPWn4',
        features: [
          'Início e término do velório',
          'Horário e local do sepultamento',
          'Homenagem em vídeo ou fotos',
        ],
      },
    ],
  },
]

export const SOLUTION_COUNT = SOLUTION_GROUPS.reduce(
  (total, group) => total + group.solutions.length,
  0,
)
