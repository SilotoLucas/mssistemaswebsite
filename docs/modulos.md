# Módulos do sistema MS

Descritivo de todos os módulos da MS Consultoria & Sistemas, organizado como aparece na tela Soluções do site. É a referência para escrever ou corrigir qualquer texto sobre os módulos.

## Fonte e regras

- **Fonte:** documento "Módulos.docx", enviado pelo dono do projeto em 24/11/2026.
- **Valores ficam fora.** O documento traz preços (da Cobrança Móvel e do SmallBusiness). Eles não entram no site nem neste arquivo.
- **Mapa de Calor fica fora do site** por decisão do dono do projeto. Ele está descrito no fim deste arquivo só para referência.
- **Onde o site lê os módulos:** `apps/web/src/shared/config/solutions-catalog.ts`. Cada módulo tem um `slug`, que é o endereço dele: `/solucoes#<slug>` abre a tela Soluções já com os detalhes daquele módulo.
- **Ao mudar um módulo,** atualize este arquivo e o catálogo juntos. O teste `solutions-catalog.unit.test.ts` confere o total de módulos (hoje 38) e que nenhum preço aparece no catálogo.
- **Outros lugares que citam módulos:**
  - `features/home/home-content.ts` (`MODULE_GROUPS`): faixa que corre na Home e cartões do ecossistema.
  - `shared/config/small-business.ts`: pacote SmallBusiness.
  - `features/demo-request/demo-options.ts` (`SEGMENT_MODULES`): formulário de demonstração.

## Por segmento

O sistema principal de cada tipo de operação.

### Planos Funerários (MS Plano)

- **Slug:** `planos-funerarios` (tem vídeo)
- **Resumo:** controle completo dos planos de assistência familiar, da venda à cobrança.
- **Recursos:**
  - Qualquer tipo de plano: mensal, bimestral, trimestral, rateio de óbitos por faixa etária e outros.
  - Cobrança de seguros de vida, equipamentos de convalescença, transportes não emergenciais e qualquer outra taxa.
  - Carnês, cartas de cobrança e boletos bancários.
  - Débito em conta corrente bancária ou em companhias de energia elétrica (conta de luz).
  - Carteirinhas para associados, em etiqueta para impressora laser, matricial ou térmica.
  - Comissão de venda em até 3 níveis: gerente, supervisor e vendedor.
  - Baixa automática dos pagamentos pelos arquivos da cobrança bancária.
  - Guias para conveniados e controle de convênios.
  - Caixa integrado, que baixa as parcelas recebidas e autentica os documentos.
  - Relatórios gerenciais: débitos, recebimentos previstos, recebimentos realizados, inadimplência, vendas e vendedores.

### Funerárias (MS Funer)

- **Slug:** `funerarias` (tem vídeo)
- **Resumo:** controle de óbito, com o registro de todos os dados do óbito e a venda dos produtos e serviços.
- **Recursos:** documentação do óbito; ordem de serviço para preparação do corpo; boleto bancário ou nota promissória; controle de todo o estoque de materiais; comissionamento de vendas; padronização dos atendimentos.

### Cemitérios (Adm. de Cemitérios)

- **Slug:** `cemiterios` (tem vídeo)
- **Resumo:** integrado ao sistema de planos, controla toda a parte contratual e administrativa do cemitério.
- **Recursos:**
  - Preparado para qualquer engenharia de jazigos.
  - Controle de sepultamentos e exumações, com histórico de todos os jazigos.
  - Criação automática de jazigos, respeitando as posições dependentes para exumação e sepultamento.
  - Busca e localização de sepultados.
  - Listagens para administrar exumações e sepultamentos.
  - Mala direta de previsão de exumações e para os responsáveis pelos jazigos.

### Crematórios (Adm. de Crematórios)

- **Slug:** `crematorios`
- **Resumo:** registro dos dados do falecido e venda dos produtos e do serviço de cremação, com atendimento mais ágil à família.
- **Recursos:**
  - Documentação da cremação.
  - Ordem de serviço com data e hora da cremação.
  - Nota fiscal, e boleto bancário ou nota promissória.
  - Controle de todo o estoque de materiais do crematório.
  - Comissionamento de vendas e padronização dos atendimentos.
  - Agendamento de salas de cerimonial ou de velório.

### Clínicas (Adm. de Clínicas)

- **Slug:** `clinicas`
- **Resumo:** gestão de clínicas médicas e odontológicas, com vários convênios e tabelas de valores diferentes por procedimento.
- **Recursos:**
  - Agenda dos profissionais.
  - Guias para atendimento.
  - Carnê de manutenção de aparelhos ortodônticos.
  - Comissionamento dos profissionais ou de convênios.
  - Recebimentos e contas a receber.
  - Verificação de inadimplência do associado no plano ao emitir a guia (quando integrado ao plano de assistência).
  - Operação on-line, pela internet, quando a clínica fica distante da sede do plano.

### Plano PET

- **Slug:** `plano-pet` (módulo novo no site)
- **Resumo:** para empresas que já usam o controle de planos e querem atender o segmento PET. Funciona dentro do sistema já instalado: basta configurar, sem implantar um sistema novo.
- **Recursos:**
  - Cadastro individual do PET, em tabela própria, com foto.
  - Vínculo direto com o plano do tutor (titular).
  - Taxa do PET lançada automaticamente no cadastro.
  - Contrato e carteirinha personalizados do PET.
  - Financeiro integrado ao módulo de cobrança e aos relatórios.
- **Vantagens:** aproveita a estrutura já instalada, implantação ágil, controle padronizado, menos retrabalho e mais serviços no portfólio.

### Funerária PET (MS Funer PET)

- **Slug:** `funeraria-pet` (módulo novo no site)
- **Resumo:** controle de óbito PET, com os dados do falecimento do animal e a venda dos produtos e serviços do atendimento.
- **Recursos:**
  - Documentação do óbito PET.
  - Ordem de serviço para preparação e higienização do corpo do animal.
  - Boleto bancário ou nota promissória.
  - Estoque de urnas, lembranças e itens do atendimento PET.
  - Comissionamento de vendas de planos e serviços PET.
  - Atendimento padronizado, com cuidado, agilidade e respeito aos tutores.

## Financeiro e caixa

Contas, caixas e cobrança bancária integrados ao sistema.

### Controle Financeiro (MSFINAN)

- **Slug:** `controle-financeiro`
- **Resumo:** administração completa do fluxo financeiro da empresa.
- **Recursos:**
  - Contas a pagar: vencimentos, fornecedores e histórico de pagamentos.
  - Contas a receber: acompanhamento dos recebimentos e gestão da inadimplência.
  - Contas correntes: saldos e movimentações bancárias em tempo real.
  - Pré-datados: cheques e pagamentos pré-datados, com alertas.
  - Integração com planos, clínicas ou administração funerária: recebe as movimentações dos caixas diários a cada fechamento.
  - Fluxo de caixa comparativo de até 12 meses.
  - Posição imediata dos saldos das contas correntes.

### Caixa Matriz (MS Caixa Matriz)

- **Slug:** `caixa-matriz` (módulo novo no site)
- **Recursos:** recebimento de taxas; guias de convênios; carteirinhas; carnê não bancário; fechamento de caixa com relatórios para acompanhamento.

### Caixa PIX

- **Slug:** `caixa-pix` (módulo novo no site)
- **Resumo:** pagamento por PIX com QR Code direto na tela do caixa, integrado ao sistema, compatível com as regras do Banco Central e com o suporte da equipe MS.

### MS Cobrança

- **Slug:** `cobranca-bancaria` (módulo novo no site)
- **Resumo:** administra os boletos emitidos pelo sistema.
- **Recursos:** controle dos boletos emitidos junto ao banco; arquivo de remessa para registro no banco; baixa automática pelo arquivo de recebimentos do banco; rastreamento de todas as cobranças emitidas.

## Gestão

Cadastros, operação e controle das áreas administrativas.

### MS Principal

- **Slug:** `ms-principal` (módulo novo no site)
- **Recursos:** cadastro de clientes e fornecedores (usados no financeiro); cadastro de responsáveis; cadastro de cidades pelo IBGE; GED, o gerenciador eletrônico de documentos.

### Controle de Filiais OnLine

- **Slug:** `filiais-online`
- **Recursos:** recebimento de taxas; guias de convênios; carteirinhas; carnê não bancário; fechamento de caixa com relatórios para acompanhamento.
- **No site também:** "funciona on-line ou off-line", que vinha do site anterior.

### Controle de Frota (Controle de Veículo)

- **Slug:** `frota` (tem vídeo)
- **Recursos:** cadastro completo dos veículos e dos motoristas; manutenções preventivas e corretivas; despesas, abastecimentos e multas; movimentação dos veículos; planilhas e fichas para vistoria; relatórios gerenciais.

### Controle de Equipamentos

- **Slug:** `equipamentos`
- **Resumo:** administra os equipamentos para convalescentes, com a posição exata de uso e disponibilidade.
- **Recursos:** empréstimo ou locação; prazos de devolução; verificação de inadimplência na retirada; contrato de empréstimo e nota promissória; rastreamento de todas as utilizações; manutenção e venda dos equipamentos.

### CRM: Telecobrança e S.A.C.

- **Slug:** `crm`
- **Recursos:**
  - Telecobrança com geração de campanhas.
  - Acompanhamento da produção e da efetividade da cobrança.
  - Comissionamento dos colaboradores.
  - Registro das ligações recebidas e efetuadas pelo S.A.C.
  - Encaminhamento de pendências para as áreas da empresa.
  - Monitoramento dos contatos e acompanhamento das soluções dadas aos clientes.

### CIB: Controle Integrado de Benefícios

- **Slug:** `cib`. No site, substituiu o antigo "Veículos de Apoio".
- **Resumo:** transporte não emergencial de pacientes ou outros serviços oferecidos pela empresa.
- **Recursos:** agenda; autorização de transporte; autorização de serviço; lançamento de valores para recebimento no caixa; relatórios gerenciais.

### Compras

- **Slug:** `compras` (módulo novo no site)
- **Recursos:**
  - **Requisições:** criação e aprovação conforme a hierarquia, com histórico para auditoria e relatório.
  - **Cotações:** solicitação aos fornecedores, recebimento e comparação de preços, prazos e condições.
  - **Pedidos:** conversão das requisições aprovadas em pedidos, acompanhamento até a entrega, histórico e relatórios.

### Administração de Produtos

- **Slug:** `produtos` (módulo novo no site)
- **Recursos:** cadastro de produtos; controle de movimentação; processo de troca e acerto; controle de requisição de produtos.

### MS Patrimônio

- **Slug:** `patrimonio` (módulo novo no site)
- **Resumo:** controle dos bens patrimoniais, da aquisição à baixa.
- **Recursos:**
  - Cadastro de bens: tombamento, código auxiliar, descrição, localização, responsável, estado de conservação, nota fiscal e fornecedor.
  - Classificação por grupo, tipo, local e setor.
  - Depreciação calculada automaticamente, por tabela auxiliar configurável.
  - Transferência entre setores, unidades ou responsáveis, com histórico.
  - Relatórios e etiquetas para o inventário físico.
  - Manutenções preventivas e corretivas.
  - Histórico de alterações e auditoria.
  - Gestão por locais e setores, para grupos de empresas.

### Dashboard

- **Slug:** `dashboard` (tem vídeo)
- **Resumo:** informações para a tomada de decisão, on-line e com um clique.
- **Recursos:** fluxo de recebimentos de todos os caixas; visão geral do financeiro; fluxo do plano previsto x realizado; análise de inadimplência; relatórios de recebimento.
- **Na Home:** a seção "Dashboard e App" usa estes recursos no cartão "Para o gestor".

### MSCLOUD (tecnologia em nuvem)

- **Slug:** `ms-cloud` (módulo novo no site)
- **Resumo:** os sistemas da MS hospedados em data center de alto desempenho e acessados pelo navegador, sem instalar programas.
- **Recursos:**
  - Servidores redundantes, com alta disponibilidade.
  - Acesso seguro de qualquer lugar, por dispositivos autorizados.
  - Atualizações aplicadas sem interrupção.
  - Backups automáticos e monitorados, e monitoramento diário.
  - Firewall, criptografia e controle de acesso.
  - Adequação à LGPD, com controle de acesso e rastreabilidade.
  - Sem gastos com servidor próprio, manutenção e refrigeração.

## Equipe em campo

Cobrança, venda e recebimento fora do escritório.

### Cobrança Móvel

- **Slug:** `cobranca-movel` (tem vídeo)
- **Resumo:** cobrança e consulta de dados pelo smartphone, integradas ao sistema de planos.
- **Recursos:**
  - Feito para cobrança e recebimento a domicílio.
  - Fácil de operar e seguro.
  - Baixas on-line.
  - Recebimentos exportados e baixados automaticamente no sistema de planos.
  - Emissão de recibos e relatórios de recebimento.

### Venda de Planos com Tablet

- **Slug:** `venda-com-tablet` (tem vídeo)
- **Recursos:** venda de planos; cálculo de dependente extra; pagamento por cartão de crédito ou boleto bancário. As vendas seguem para o Pré-Cadastro.
- **Atenção:** no documento, o texto deste módulo é igual ao da Venda Web. Vale confirmar com a MS se há algo próprio do tablet.

### Pré-Cadastro

- **Slug:** `pre-cadastro` (módulo novo no site)
- **Resumo:** centraliza as vendas do tablet e da internet e valida os dados antes de o cliente entrar na base oficial do plano.
- **Recursos:**
  - Importa automaticamente as vendas do tablet e do formulário on-line.
  - Detalhes da venda: titular, dependentes, plano, valor e taxas adicionais (tanatopraxia, seguro, PET e outras).
  - Filtros para organizar as vendas em pré-cadastro.
  - Pós-venda: contato com o cliente para confirmar a compra e validar os dados.
  - Boleto ou link de pagamento para as vendas do tablet.
  - Plano homologado na base oficial depois da confirmação do pagamento.

### P.O.S para Ponto de Recebimento

- **Slug:** `pos` (tem vídeo)
- **Resumo:** automatiza o recebimento remoto em pontos de apoio ou com cobradores.
- **Recursos:** baixas on-line; emissão de recibos; mais controle e confiabilidade; relatórios de recebimento.

### Gestor de Frotas (aplicativo)

- **Slug:** `app-frota` (módulo novo no site)
- **Resumo:** aplicativo para motoristas e gestores registrarem o uso dos veículos.
- **Recursos:**
  - O motorista entra no aplicativo, escolhe o veículo pelo QR Code fixado no carro, faz o checklist e confirma o quilômetro inicial. Data e hora ficam registradas.
  - Abastecimentos com quilometragem, litros e valor.
  - Despesas e ocorrências lançadas na hora.
  - Rastreamento da rota percorrida (opcional).
  - Ao encerrar, quilômetro final e descrição. Tudo entra no Controle de Frota sem redigitação.

## Canais digitais

Serviços on-line e comunicação com o cliente final.

### Portal do Associado

- **Slug:** `portal-do-associado` (tem vídeo)
- **Resumo:** plataforma no navegador para o associado consultar o plano e usar os serviços.
- **Recursos:**
  - Dados do plano e consulta de dependentes.
  - Parcelas pagas e pendentes, com segunda via.
  - Link de pagamento por cartão de crédito.
  - Consulta de convênios e emissão de guias.
  - Carteirinha virtual.
  - Contato direto pelo WhatsApp.

### App do Associado (APP Portal do Associado)

- **Slug:** `app-do-associado` (módulo novo no site)
- **Resumo:** aplicativo para Android e iOS com os recursos do portal, mais a consulta de unidades (filiais), com informações e localização.
- **Na Home:** é o "App do Cliente" da vitrine da abertura e da seção "Dashboard e App".

### Venda Web

- **Slug:** `venda-web`
- **Recursos:** venda de planos pela internet; cálculo de dependente extra; pagamento on-line por cartão de crédito ou boleto bancário.

### ChatBot MS Sistemas

- **Slug:** `chatbot` (tem vídeo)
- **Resumo:** atendimento inteligente e automatizado.
- **Recursos:**
  - Responde dúvidas na hora, sem depender de um atendente.
  - Fica ativo o tempo todo.
  - Reduz filas e o custo de atendimento.
  - Dá respostas rápidas e personalizadas.
  - É integrado ao sistema da MS para automatizar processos.

### WhatsApp Marketing

- **Slug:** `whatsapp-marketing` (módulo novo no site)
- **Recursos:**
  - Boas-vindas automáticas para novos clientes.
  - Acompanhamento do cadastro: contrato enviado para entrega e contrato entregue.
  - Lembrete de aniversariantes.
  - Aviso de parcelas em atraso e de parcelas a vencer.
  - Mensagens livres para associados ou grupos.
  - Contato também com os dependentes do plano.

### SMS Marketing

- **Slug:** `sms-marketing` (tem vídeo)
- **Recursos:** boas-vindas, acompanhamento de tarefas, lembrete de aniversariantes, aviso de parcelas em débito e outros comunicados.
- **No site também:** "envio com shortcode" e "implantação gratuita para clientes ativos", que vinham do site anterior.

## Atendimento presencial

Tecnologia para a recepção, a sala velatória e o cemitério.

### Totem de Autoatendimento

- **Slug:** `totem-autoatendimento` (tem vídeo)
- **Resumo:** terminal ligado ao sistema de planos, no mesmo banco de dados, em que o cliente se atende sem um atendente.
- **Recursos:** recebimento de taxas; emissão de guias de convênio.

### Totem Cemitério

- **Slug:** `totem-cemiterio` (tem vídeo)
- **Resumo:** o visitante informa o nome do falecido e recebe as coordenadas de como chegar à sepultura, sem depender de um atendente. Também permite eternizar a memória do sepultado com descrição e fotos.

### QR Code Cemitério

- **Slug:** `qr-code-cemiterio`
- **Resumo:** QR Code colocado na lápide, que dá acesso a todo o histórico de vida do sepultado.

### Painel de Velório

- **Slug:** `painel-de-velorio` (tem vídeo)
- **Resumo:** transforma uma TV de LCD em painel de informações: início e término do velório, horário e local do sepultamento e homenagem com vídeo ou fotos.

### Condolência Online

- **Slug:** `condolencia-online`. No site, passou de "Canais digitais" para "Atendimento presencial".
- **Resumo:** aplicativo em computador, notebook ou totem na sala de velório, em que os visitantes deixam mensagens de apoio à família.
- **Recursos:**
  - Interface simples, para pessoas de todas as idades.
  - Mensagens guardadas com segurança e organizadas automaticamente.
  - Depois do sepultamento, a família recebe o livro de condolências, em versão virtual ou encadernado.

## SmallBusiness (pacote)

Não está na tela Soluções. Tem seção própria na Home e um slide na abertura (`shared/config/small-business.ts`).

- **Para quem:** pequenas empresas que querem sair de planilhas e controles manuais.
- **Como é:** 100% on-line, acessado pelo navegador, com visual moderno e hospedagem em data center seguro.
- **Módulos no site:** Plano, Funerária, Cobrança e Caixa, em até 5 máquinas. Essas duas regras foram passadas pelo dono do projeto e não estão no documento.
- **Funcionalidades:**
  - Gestão de clientes e contratos.
  - Contas a pagar, contas a receber e relatórios.
  - Boletos e PIX integrados ao banco.
  - Relatórios e indicadores.
  - Novos módulos conforme a empresa cresce.
- **Valor:** consta no documento e fica fora do site.

## Mapa de Calor (fora do site)

Mostra, num mapa da cidade, onde estão os clientes. A concentração dos planos vendidos aparece por área, zona, bairro e rua, ajudando a achar regiões com pouca cobertura e a direcionar a equipe de vendas. Por decisão do dono do projeto, não aparece no site.
