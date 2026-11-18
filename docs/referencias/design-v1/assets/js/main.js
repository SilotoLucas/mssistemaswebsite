/* MS Sistemas: partes da home em JavaScript puro, sem dependências. */
(function () {
  var LOGO = 'assets/img/ms-logo.webp';
  /* Preencha com DDD e número, só com dígitos, para ativar os botões de WhatsApp. */
  var WHATSAPP = '';
  var WA_HREF = WHATSAPP ? 'https://wa.me/55' + WHATSAPP : '#atendimento';

  var P = {
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><circle cx="16" cy="16" r="6"/><path d="M16 14v2l1.5 1"/>',
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    layers: '<path d="m12 2-10 5 10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
    chart: '<path d="M3 3v18h18"/><path d="M8 17v-4"/><path d="M13 17V7"/><path d="M18 17v-7"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>'
  };

  function icon(n, s) { s = s || 24; return '<svg class="ms-icon" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true">' + P[n] + '</svg>'; }
  function link(t, href, sr, cls) { return '<a class="ms-link ' + (cls || '') + '" href="' + href + '"><span class="ms-link__t">' + t + '</span>' + (sr ? '<span class="ms-sr"> ' + sr + '</span>' : '') + icon('arrow-right', 20) + '</a>'; }
  function logo(w, h) { return '<img src="' + LOGO + '" alt="MS Consultoria &amp; Sistemas" width="' + w + '" height="' + h + '">'; }

  var NAV = [['Atendimento', '#atendimento'], ['Soluções', '#solucoes'], ['Clientes', '#clientes'], ['Empresa', '#empresa'], ['Contato', '#demonstracao']];
  var SYS = [
    ['MS Suporte', 'Chamados e atendimento', 'https://suporte.mssistemas.com.br'],
    ['Portal do Associado', 'Serviços do plano contratado', 'https://apps.mssistemas.com.br/areacliente'],
    ['MS Dashboard', 'Indicadores da sua empresa', 'https://indicadores.mssistemas.com.br']
  ];
  function sysLinks() { return SYS.map(function (s) { return '<a class="ms-sys" href="' + s[2] + '"><strong>' + s[0] + '</strong><span>' + s[1] + '</span></a>'; }).join(''); }

  function header(o) {
    o = o || {};
    return '<header class="ms-header"><div class="ms-wrap ms-header__bar">' +
      '<a class="ms-header__logo" href="#inicio" aria-label="MS Consultoria &amp; Sistemas, página inicial">' + logo(97, 48) + '</a>' +
      '<nav class="ms-nav" aria-label="Principal">' + NAV.map(function (n) { return '<a href="' + n[1] + '">' + n[0] + '</a>'; }).join('') + '</nav>' +
      '<div class="ms-header__actions">' +
      '<div class="ms-access"><button class="ms-access__btn" type="button" aria-expanded="' + (o.open ? 'true' : 'false') + '" aria-controls="ms-access-menu" data-ms="access">Acessar sistemas' + icon('chevron-down', 16) + '</button>' +
      '<div class="ms-access__menu" id="ms-access-menu"' + (o.open ? '' : ' hidden') + '>' + sysLinks() + '</div></div>' +
      '<a class="ms-btn ms-btn--primary ms-btn--sm" href="#demonstracao"><span class="ms-cta-full">Solicitar demonstração</span><span class="ms-cta-short">Demonstração</span></a>' +
      '<button class="ms-burger" type="button" aria-label="' + (o.drawer ? 'Fechar menu' : 'Abrir menu') + '" aria-expanded="' + (o.drawer ? 'true' : 'false') + '" aria-controls="ms-drawer" data-ms="burger">' + icon(o.drawer ? 'x' : 'menu') + '</button>' +
      '</div></div>' +
      '<div class="ms-drawer" id="ms-drawer"' + (o.drawer ? '' : ' hidden') + '><div class="ms-wrap ms-drawer__in">' +
      '<nav class="ms-drawer__nav" aria-label="Principal no celular">' + NAV.map(function (n) { return '<a href="' + n[1] + '">' + n[0] + '</a>'; }).join('') + '</nav>' +
      '<div><p class="ms-drawer__label">Acessar sistemas</p>' + sysLinks() + '</div>' +
      '</div></div></header>';
  }

  function waBtn(cls) { return '<a class="ms-btn ms-btn--whatsapp ' + (cls || '') + '" href="' + WA_HREF + '">' + icon('message', 20) + 'Chamar no WhatsApp</a>'; }

  function waCard() {
    return '<aside class="ms-wacard" aria-label="Atendimento pelo WhatsApp"><span class="ms-wa-i">' + icon('message') + '</span><p class="ms-wacard__t">Atendimento rápido pelo WhatsApp</p><p>Fale direto com a equipe da MS, que conhece a rotina do seu setor.</p>' + waBtn('ms-btn--block') + '</aside>';
  }

  var SEGS = [
    ['shield', 'Planos Funerários', 'Contratos, cobrança, carteirinhas, convênios e comissões em um só lugar.'],
    ['clipboard', 'Funerárias', 'Documentação do óbito, ordens de serviço, nota fiscal e estoque.'],
    ['pin', 'Cemitérios', 'Jazigos, sepultamentos, exumações, contratos e cobranças.'],
    ['calendar', 'Crematórios', 'Cremações, agendamento de salas, documentação e vendas.']
  ];
  function segCard(s, cls) { return '<article class="ms-seg ' + (cls || '') + '">' + icon(s[0], 32) + '<h3 class="ms-h3">' + s[1] + '</h3><p>' + s[2] + '</p>' + link('Saiba mais', '#demonstracao', 'sobre ' + s[1]) + '</article>'; }

  var ECO = [
    ['dashboard', 'Gestão', ['Financeiro', 'Filiais', 'Frota', 'Equipamentos', 'CRM', 'Dashboard']],
    ['phone', 'Equipe em campo', ['Cobrança Móvel', 'Venda com Tablet', 'P.O.S']],
    ['globe', 'Canais digitais', ['Portal do Associado', 'Venda Web', 'ChatBot', 'SMS', 'Condolência Online']],
    ['monitor', 'Atendimento presencial', ['Totem de Autoatendimento', 'Totem Cemitério', 'QR Code', 'Painel de Velório']]
  ];

  var UF = { AC: 'Acre', AL: 'Alagoas', AM: 'Amazonas', AP: 'Amapá', BA: 'Bahia', CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MG: 'Minas Gerais', MS: 'Mato Grosso do Sul', MT: 'Mato Grosso', PA: 'Pará', PB: 'Paraíba', PE: 'Pernambuco', PI: 'Piauí', PR: 'Paraná', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RO: 'Rondônia', RR: 'Roraima', RS: 'Rio Grande do Sul', SC: 'Santa Catarina', SE: 'Sergipe', SP: 'São Paulo', TO: 'Tocantins' };
  var ON = 'SP ES MG PR RJ RS GO MS AL AM BA PA PB PE PI RN RO SE'.split(' ');
  var GRID = [['RR', 3, 1], ['AP', 4, 1], ['AM', 3, 2], ['PA', 4, 2], ['MA', 5, 2], ['CE', 6, 2], ['RN', 7, 2], ['AC', 1, 3], ['RO', 2, 3], ['MT', 3, 3], ['TO', 4, 3], ['PI', 5, 3], ['PB', 6, 3], ['GO', 3, 4], ['DF', 4, 4], ['BA', 5, 4], ['PE', 6, 4], ['AL', 7, 4], ['MS', 3, 5], ['MG', 4, 5], ['ES', 5, 5], ['SE', 6, 5], ['PR', 3, 6], ['SP', 4, 6], ['RJ', 5, 6], ['SC', 3, 7], ['RS', 3, 8]];
  function map() {
    return '<ul class="ms-map" aria-label="Mapa do Brasil por estados. 18 estados atendidos.">' + GRID.map(function (g) {
      var on = ON.indexOf(g[0]) > -1;
      return '<li class="' + (on ? 'is-on' : '') + '" style="grid-column:' + g[1] + ';grid-row:' + g[2] + '" title="' + UF[g[0]] + (on ? ': atendido' : '') + '"><span aria-hidden="true">' + g[0] + '</span><span class="ms-sr">' + UF[g[0]] + (on ? ', atendido' : ', sem atendimento listado') + '</span></li>';
    }).join('') + '</ul>';
  }

  function err(id) { return '<p class="ms-err" id="' + id + '-e" hidden>' + icon('alert', 16) + '<span></span></p>'; }
  function field(id, label, attrs) { return '<div class="ms-field" data-f="' + id + '"><label for="' + id + '">' + label + '</label><input class="ms-input" id="' + id + '" name="' + id + '" aria-describedby="' + id + '-e" required ' + attrs + '>' + err(id) + '</div>'; }

  function form() {
    return '<div class="ms-formcard" data-ms="card"><form class="ms-form" novalidate data-ms="form"><div class="ms-form__grid">' +
      field('nome', 'Nome', 'type="text" autocomplete="name"') +
      field('empresa', 'Empresa', 'type="text" autocomplete="organization"') +
      '<div class="ms-field" data-f="segmento"><label for="segmento">Segmento</label><div class="ms-selectw"><select class="ms-input" id="segmento" name="segmento" aria-describedby="segmento-e" required><option value="">Selecione</option><option>Planos Funerários</option><option>Funerária</option><option>Cemitério</option><option>Crematório</option><option>Outro</option></select>' + icon('chevron-down', 20) + '</div>' + err('segmento') + '</div>' +
      field('cidade', 'Cidade/UF', 'type="text" autocomplete="address-level2" placeholder="Botucatu/SP"') +
      field('whatsapp', 'WhatsApp', 'type="tel" inputmode="tel" autocomplete="tel-national" placeholder="(14) 99999-9999"') +
      field('email', 'E-mail', 'type="email" autocomplete="email" placeholder="voce@empresa.com.br"') +
      '</div><div class="ms-field" data-f="aceite"><label class="ms-check" for="aceite"><span class="ms-check__box"><input type="checkbox" id="aceite" name="aceite" aria-describedby="aceite-e" required>' + icon('check', 16) + '</span><span class="ms-check__t">Li e aceito a <a href="#privacidade">Política de Privacidade</a> e autorizo o contato da MS sobre este pedido.</span></label>' + err('aceite') + '</div>' +
      '<div class="ms-alert" data-ms="alert" role="alert" hidden>' + icon('alert', 16) + '<span>Não foi possível enviar agora. Confira a conexão e tente de novo.</span></div>' +
      '<button class="ms-btn ms-btn--primary ms-btn--block" type="submit" data-ms="submit">Solicitar demonstração</button></form></div>';
  }

  function successPanel(name) {
    return '<div class="ms-success" role="status" tabindex="-1" data-ms="ok"><span class="ms-success__i">' + icon('check') + '</span><h3 class="ms-h3">Pedido recebido' + (name ? ', ' + name : '') + '</h3><p>Um consultor da MS vai falar com você pelo WhatsApp informado para combinar a demonstração.</p><button class="ms-btn ms-btn--secondary" type="button" data-ms="again">Enviar outro pedido</button></div>';
  }

  function footer() {
    return '<footer class="ms-footer" id="empresa"><div class="ms-wrap"><div class="ms-footer__top">' +
      '<div class="ms-footer__brand">' + logo(121, 60) + '<p>Software de gestão para funerárias, planos, cemitérios e crematórios desde 2005.</p>' +
      '<div class="ms-social"><a href="https://www.facebook.com/mssist" aria-label="Facebook da MS Sistemas">' + icon('facebook') + '</a><a href="https://www.instagram.com/mssistemas5" aria-label="Instagram da MS Sistemas">' + icon('instagram') + '</a></div></div>' +
      '<div class="ms-footer__cols">' +
      '<nav aria-label="Rodapé"><p class="ms-footer__t">Navegação</p><ul class="ms-footer__links">' + NAV.map(function (n) { return '<li><a href="' + n[1] + '">' + n[0] + '</a></li>'; }).join('') + '</ul></nav>' +
      '<nav aria-label="Acesso aos sistemas"><p class="ms-footer__t">Acesso aos sistemas</p><ul class="ms-footer__links">' + SYS.map(function (s) { return '<li><a href="' + s[2] + '">' + s[0] + '</a></li>'; }).join('') + '</ul></nav>' +
      '<div><p class="ms-footer__t">Contato</p><address><span>Rua Florindo Silva, 51<br>Botucatu/SP, CEP 18610-150</span><a href="tel:+551438156846">(14) 3815-6846</a><a href="tel:+551438140749">(14) 3814-0749</a><a href="mailto:contato@mssistemas.com.br">contato@mssistemas.com.br</a></address></div>' +
      '</div></div><div class="ms-footer__bottom"><p>Parceiros: Granito, Rede Parcerias e iugu</p><a href="#privacidade">Política de Privacidade</a></div></div></footer>';
  }

  function feats(a) { return '<ul class="ms-feats">' + a.map(function (x) { return '<li>' + icon('check', 18) + '<span>' + x + '</span></li>'; }).join('') + '</ul>'; }

  /* Ícones sólidos das telas do produto */
  var U = {
    person: '<path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-3.6 0-8.5 1.8-8.5 5.2V21h17v-1.8c0-3.4-4.9-5.2-8.5-5.2Z"/>',
    group: '<path d="M8 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.5 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 13.5c-2.9 0-6.5 1.4-6.5 4.2V20h13v-2.3c0-2.8-3.6-4.2-6.5-4.2Zm8.5.5c-.5 0-1 0-1.5.1 1.1.9 1.5 2.1 1.5 3.6V20h6v-2.2c0-2.5-3.300-3.800-6-3.800Z"/>',
    money: '<path fill-rule="evenodd" d="M2 6h20v12H2V6Zm10 9.500a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7ZM5 8.500a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm14 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"/>',
    basket: '<path d="m7.600 9.500 3.500-6.200 1.700 1-2.900 5.200h4.200l-2.900-5.200 1.700-1 3.500 6.200H22v2.500h-1.300l-1.500 8.500H4.800L3.300 12H2V9.500h5.600Zm.900 4.500v4.500h2V14h-2Zm5 0v4.500h2V14h-2Z"/>',
    paw: '<path d="M12 11c-3 0-6 3.400-6 6.300 0 1.700 1.300 2.700 2.800 2.700 1.200 0 2-.6 3.200-.6s2 .6 3.200.6c1.500 0 2.800-1 2.800-2.700C18 14.400 15 11 12 11ZM5 11.500a2.200 2.700 0 1 0 0-5.400 2.200 2.700 0 0 0 0 5.400Zm14 0a2.200 2.700 0 1 0 0-5.400 2.200 2.700 0 0 0 0 5.400ZM9.300 8.500a2.300 2.900 0 1 0 0-5.800 2.300 2.900 0 0 0 0 5.800Zm5.400 0a2.300 2.900 0 1 0 0-5.800 2.300 2.900 0 0 0 0 5.800Z"/>',
    shield: '<path fill-rule="evenodd" d="m12 2 8 3v6.200c0 5-3.400 9.300-8 10.800-4.600-1.500-8-5.800-8-10.800V5l8-3Zm-1.200 5v3.300H7.500v2.400h3.300V16h2.400v-3.300h3.300v-2.400h-3.300V7h-2.400Z"/>',
    wallet: '<path fill-rule="evenodd" d="M4 5h15v3h2v12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 3h13V7H4v1Zm13 4.500a1.500 1.500 0 1 0 0 3 1.500 1.500 0 0 0 0-3Z"/>',
    card: '<path fill-rule="evenodd" d="M2 5h20v14H2V5Zm6.500 7a2.200 2.200 0 1 0 0-4.400 2.200 2.200 0 0 0 0 4.400Zm-4 4.500h8c0-2-1.800-3.200-4-3.200s-4 1.200-4 3.200ZM14.500 9v1.800h5V9h-5Zm0 4v1.800h5V13h-5Z"/>',
    nav: '<path d="M21.500 2.500 2.500 10.300l7.700 3.500 3.500 7.700 7.800-19Z"/>',
    heart: '<path d="M12 21.300S3 15.700 3 9.300A5 5 0 0 1 12 6.300a5 5 0 0 1 9 3c0 6.400-9 12-9 12Z"/>',
    deal: '<path fill-rule="evenodd" d="M4 3h16v18h-6v-4h-4v4H4V3Zm3.500 3v2.500H10V6H7.500Zm6.500 0v2.500h2.500V6H14Zm-6.500 5v2.500H10V11H7.500Zm6.500 0v2.500h2.500V11H14Z"/>',
    bell: '<path d="M12 22a2.500 2.500 0 0 0 2.400-2H9.600A2.500 2.500 0 0 0 12 22Zm7-6v-5a7 7 0 0 0-5.500-6.800V3.500a1.500 1.500 0 0 0-3 0v.7A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"/>',
    cal: '<path fill-rule="evenodd" d="M7 2h2v2h6V2h2v2h4v17H3V4h4V2Zm-2 8v9h14v-9H5Zm2 2h3v3H7v-3Z"/>',
    chat: '<path fill-rule="evenodd" d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2ZM8.700 7c-.5 0-1.700.9-1.700 2.700 0 3.300 4 7.300 7.300 7.300 1.800 0 2.700-1.200 2.700-1.700v-1l-2.600-1.300-1.200 1.200c-1.400-.5-2.900-2-3.400-3.400l1.200-1.200L9.700 7h-1Z"/>'
  };
  function ui(n) { return '<svg class="ms-ui__i" viewBox="0 0 24 24" aria-hidden="true">' + U[n] + '</svg>'; }
  function uf(label, value, span) { return '<div class="ms-ui__f" style="grid-column:span ' + span + '"><b>' + label + '</b><span>' + value + '</span></div>'; }

  function screenPC() {
    return '<div class="ms-ui ms-ui--pc" role="img" aria-label="Área do Cliente no computador, com cadastro do associado e acesso a dependentes, pagamentos e clube de desconto. Dados de exemplo."><div aria-hidden="true">' +
      '<div class="ms-ui__bar"><span class="ms-ui__chip">' + logo(97, 48) + '</span><span>Meu Plano</span><span>Sair</span></div>' +
      '<div class="ms-ui__body"><div class="ms-ui__side"><div class="ms-ui__box"><p class="ms-ui__name">Nome do associado</p><p class="ms-ui__c">Plano</p><p class="ms-ui__c">R$ 85,00</p><p class="ms-ui__btn">Carteirinha Virtual</p>' +
      '<p class="ms-ui__l">Meus Planos</p><p class="ms-ui__sel">Plano Familiar</p>' +
      [['Data de cadastro', '10/09/2013'], ['Inscrição', '000001'], ['Carência', 'Sem Carência']].map(function (x) { return '<p class="ms-ui__r"><b>' + x[0] + '</b><span>' + x[1] + '</span></p>'; }).join('') +
      '<p class="ms-ui__alt">Alterar dados de Acesso</p></div><p class="ms-ui__wa">' + ui('chat') + '<span>WhatsApp</span></p>' +
      ['Atendimento 24h', 'Administrativo', 'Financeiro'].map(function (x) { return '<p class="ms-ui__m">' + x + '</p>'; }).join('') + '</div>' +
      '<div class="ms-ui__main"><div class="ms-ui__tabs">' + [['person', 'Meus Dados'], ['group', 'Meus Dependentes'], ['money', 'Meus Pagamentos'], ['basket', 'Clube de Desconto']].map(function (x, i) { return '<p class="ms-ui__tab' + (i ? '' : ' is-on') + '">' + ui(x[0]) + '<span>' + x[1] + '</span></p>'; }).join('') + '</div>' +
      '<div class="ms-ui__box ms-ui__form"><p class="ms-ui__h">Meus Dados de Cadastro</p><div class="ms-ui__g">' +
      uf('Nome', 'Nome do associado', 9) + uf('Data de Nasc.', '00/00/0000', 3) + uf('Endereço', 'Rua Exemplo, 100', 9) + uf('Bairro', 'Centro', 3) + uf('CEP', '00000-000', 3) + uf('Cidade', 'Cidade', 7) + uf('UF', 'UF', 2) + uf('Telefone', '(00) 0000-0000', 4) + uf('Telefone Recado', '(00) 0000-0000', 4) + uf('Celular', '(00) 00000-0000', 4) + uf('E-mail', 'associado@exemplo.com.br', 12) +
      '</div><div class="ms-ui__bill"><p class="ms-ui__h">Endereço de Cobrança</p><div class="ms-ui__g">' + uf('Endereço', 'Rua Exemplo, 100', 9) + uf('Bairro', 'Centro', 3) + uf('CEP', '00000-000', 4) + uf('Cidade', 'Cidade', 6) + uf('UF', 'UF', 2) + '</div></div></div></div></div></div></div>';
  }

  function screenApp() {
    var pay = function (r) { return '<div class="ms-ua__pay"><b>Pago: 30/09/2025</b><em>Valor R$ 42,50</em><span>Ref: ' + r + '</span></div>'; };
    return '<div class="ms-ui ms-ui--app" role="img" aria-label="Tela inicial do App do Cliente no celular, com parcelas, atalhos do plano e carteirinha digital. Dados de exemplo."><div aria-hidden="true">' +
      '<div class="ms-ua__head"><i class="ms-ua__notch"></i><p class="ms-ua__time">15:31</p><div class="ms-ua__tools">' + ui('cal') + '<span>' + ui('group') + ui('bell') + '</span></div><p class="ms-ua__hi">Olá, MS CONSULTORIA &amp; SISTEMAS</p><p class="ms-ua__sub">Existem parcelas disponíveis para pagamento!</p></div>' +
      '<div class="ms-ua__pays">' + pay('10/25') + pay('11/25') + '</div><div class="ms-ua__grid">' +
      [['person', 'Meu Plano'], ['paw', 'Meus Pets'], ['shield', 'Meu Jazigo'], ['group', 'Dependentes'], ['wallet', 'Financeiro'], ['card', 'Carteirinha'], ['nav', 'Unidades'], ['heart', 'Obituário'], ['deal', 'Convênios']].map(function (x) { return '<div class="ms-ua__a"><span>' + ui(x[0]) + '</span><b>' + x[1] + '</b></div>'; }).join('') +
      '</div><div class="ms-ua__card"><div class="ms-ua__ct"><span class="ms-ui__chip">' + logo(97, 48) + '</span></div><div class="ms-ua__cb"><p><small>Titular</small><b>MS CONSULTORIA &amp; SISTEMAS</b></p><div><p><small>Inscrição</small><b>000001</b></p><p><small>Validade</small><b>18/11/2025</b></p></div></div></div></div></div>';
  }

  function portal() {
    return '<section class="ms-por ms-dark" id="area-do-cliente"><div class="ms-wrap"><h2>Seu associado com tudo à mão</h2><p class="ms-por__i">Com a Área do Cliente e o App do Cliente, sua empresa oferece mais praticidade e menos burocracia.</p><div class="ms-por__g">' +
      '<div class="ms-por__t ms-por__t--a"><h3>Área do Cliente</h3>' + feats(['Dados cadastrais em dia', 'Dependentes', 'Boletos e pagamentos', 'Clube de descontos', 'Carteirinha virtual', 'Atendimento pelo WhatsApp']) + '</div>' +
      '<div class="ms-shot ms-shot--p">' + screenPC() + '</div>' +
      '<div class="ms-por__t ms-por__t--b"><h3>App do Cliente</h3>' + feats(['Carteirinha digital', 'Segunda via do boleto', 'Notificações e avisos', 'Informações do plano', 'Fale com a empresa']) + '</div>' +
      '<div class="ms-shot ms-shot--a">' + screenApp() + '</div></div></div></section>';
  }

  function home() {
    return '<div class="ms-page" id="inicio">' + header() + '<main>' +
      '<section class="ms-hero"><div class="ms-wrap ms-hero__grid"><div class="ms-hero__copy"><h1>Gestão completa para funerárias, planos, cemitérios e crematórios</h1><p class="ms-lead">Do contrato à cobrança, do atendimento ao pós-venda: tudo integrado em um só sistema, com suporte especializado de quem conhece o setor desde 2005.</p><div class="ms-hero__cta"><a class="ms-btn ms-btn--primary" href="#demonstracao">Solicitar demonstração</a><a class="ms-btn ms-btn--secondary" href="#solucoes">Conhecer as soluções</a></div></div>' + waCard() + '</div></section>' +
      '<section class="ms-proof" aria-label="A MS em números"><div class="ms-wrap"><ul><li><strong>Desde 2005</strong>atuação no setor</li><li><strong>18</strong>estados atendidos</li><li><strong>+300</strong>cidades</li><li><strong>24</strong>soluções integradas</li></ul></div></section>' +
      '<section class="ms-section ms-section--dark ms-dark" id="atendimento"><div class="ms-wrap ms-sup"><div class="ms-sup__copy"><h2 class="ms-h2">Precisou da MS? Chame no WhatsApp</h2><p>O setor não para, e o nosso atendimento também não. Fale pelo WhatsApp com uma equipe especializada e resolva com rapidez.</p><div class="ms-wanum"><span>WhatsApp da MS</span><strong>[Número do WhatsApp]</strong></div><div class="ms-sup__cta">' + waBtn() + '<a class="ms-btn ms-btn--on-dark" href="https://suporte.mssistemas.com.br">Abrir chamado</a></div></div><div class="ms-sup__list">' +
      [['message', 'Atendimento rápido', 'Sua mensagem chega direto à nossa equipe.'], ['headset', 'Quem atende conhece o setor', 'Equipe especializada na rotina de funerárias, planos, cemitérios e crematórios.'], ['clock', 'Plantão em fins de semana e feriados', 'Nos dias úteis, fale também pelos telefones fixos.']].map(function (b) { return '<div class="ms-sup__i">' + icon(b[0], 26) + '<h3 class="ms-h3">' + b[1] + '</h3><p>' + b[2] + '</p></div>'; }).join('') + '</div></div></section>' +
      '<section class="ms-section" id="solucoes"><div class="ms-wrap"><div class="ms-intro"><h2 class="ms-h2">Feito para a sua operação</h2></div><div class="ms-segs">' + SEGS.map(function (s) { return segCard(s); }).join('') + '</div></div></section>' +
      portal() +
      '<section class="ms-section"><div class="ms-wrap"><div class="ms-intro"><h2 class="ms-h2">Tudo conectado, do escritório ao campo</h2></div><div class="ms-eco">' + ECO.map(function (g) { return '<div class="ms-eco__g"><span class="ms-eco__n">' + icon(g[0], 22) + '</span><h3>' + g[1] + '</h3><ul>' + g[2].map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul></div>'; }).join('') + '</div><div class="ms-eco__more">' + link('Ver todas as soluções', '#solucoes') + '</div></div></section>' +
      '<section class="ms-section ms-section--mist"><div class="ms-wrap"><div class="ms-intro"><h2 class="ms-h2">Menos tarefas repetidas, mais controle</h2></div><div class="ms-bens">' +
      [['layers', 'Menos retrabalho', 'Informações integradas entre as áreas.'], ['receipt', 'Cobrança sob controle', 'Baixas automáticas e análise de inadimplência.'], ['chart', 'Decisões com dados', 'Receitas, despesas e vendas de qualquer lugar.']].map(function (b) { return '<div class="ms-ben">' + icon(b[0], 26) + '<h3 class="ms-h3">' + b[1] + '</h3><p>' + b[2] + '</p></div>'; }).join('') + '</div></div></section>' +
      '<section class="ms-section" id="clientes"><div class="ms-wrap ms-pres"><div class="ms-pres__copy"><h2 class="ms-h2">Empresas de todo o Brasil confiam na MS</h2><p>Clientes em 18 estados, do Rio Grande do Sul ao Amazonas.</p><div class="ms-legend" aria-hidden="true"><span><i></i>Estados atendidos</span><span><i class="is-idle"></i>Demais estados</span></div></div>' + map() + '</div></section>' +
      '<section class="ms-section ms-section--mist" id="demonstracao"><div class="ms-wrap ms-final"><div class="ms-final__copy"><h2 class="ms-h2">Veja como a MS pode simplificar a sua gestão</h2><p>Conte um pouco sobre a sua empresa. Um consultor entra em contato para combinar a demonstração.</p></div>' + form() + '</div></section>' +
      '</main>' + footer() + '</div>';
  }

  var RULES = {
    nome: function (v) { return v.trim().length >= 3 ? '' : 'Informe seu nome.'; },
    empresa: function (v) { return v.trim() ? '' : 'Informe o nome da empresa.'; },
    segmento: function (v) { return v ? '' : 'Selecione o segmento da empresa.'; },
    cidade: function (v) { return /^.{2,}[\/,\-\s]+[A-Za-z]{2}$/.test(v.trim()) ? '' : 'Informe cidade e UF, como Botucatu/SP.'; },
    whatsapp: function (v) { var d = v.replace(/\D/g, '').length; return d === 10 || d === 11 ? '' : 'Informe o WhatsApp com DDD.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Informe um e-mail válido, como voce@empresa.com.br.'; }
  };

  function wireForm(root) {
    var card = root.querySelector('[data-ms="card"]'); if (!card) return;
    var blank = card.innerHTML;
    function bind() {
      var f = card.querySelector('[data-ms="form"]');
      function show(id, msg) {
        var w = f.querySelector('[data-f="' + id + '"]'), e = f.querySelector('#' + id + '-e'), i = f.querySelector('#' + id);
        w.classList.toggle('is-invalid', !!msg); e.hidden = !msg; e.querySelector('span').textContent = msg;
        if (msg) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid');
        return !msg;
      }
      function check(id) { var i = f.querySelector('#' + id); return show(id, id === 'aceite' ? (i.checked ? '' : 'Aceite a Política de Privacidade para continuar.') : RULES[id](i.value)); }
      var ids = ['nome', 'empresa', 'segmento', 'cidade', 'whatsapp', 'email', 'aceite'];
      ids.forEach(function (id) {
        var i = f.querySelector('#' + id);
        i.addEventListener('blur', function () { if (i.value && id !== 'aceite') check(id); });
        i.addEventListener(id === 'aceite' || id === 'segmento' ? 'change' : 'input', function () { if (f.querySelector('[data-f="' + id + '"]').classList.contains('is-invalid')) check(id); });
      });
      f.querySelector('#whatsapp').addEventListener('input', function (e) {
        var d = e.target.value.replace(/\D/g, '').slice(0, 11), o = d;
        if (d.length > 2) o = '(' + d.slice(0, 2) + ') ' + (d.length > 10 ? d.slice(2, 7) + '-' + d.slice(7) : d.length > 6 ? d.slice(2, 6) + '-' + d.slice(6) : d.slice(2));
        e.target.value = o;
      });
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var bad = ids.filter(function (id) { return !check(id); });
        if (bad.length) { f.querySelector('#' + bad[0]).focus(); return; }
        var b = f.querySelector('[data-ms="submit"]'), name = f.querySelector('#nome').value.trim().split(' ')[0];
        b.classList.add('is-loading'); b.setAttribute('aria-busy', 'true'); b.disabled = true;
        b.innerHTML = '<span class="ms-spinner" aria-hidden="true"></span>Enviando…';
        setTimeout(function () {
          card.innerHTML = successPanel(name.replace(/[<>&"]/g, ''));
          card.querySelector('[data-ms="ok"]').focus();
          card.querySelector('[data-ms="again"]').addEventListener('click', function () { card.innerHTML = blank; bind(); card.querySelector('#nome').focus(); });
        }, 1400);
      });
    }
    bind();
  }

  function wire(root) {
    var ab = root.querySelector('[data-ms="access"]'), am = root.querySelector('#ms-access-menu');
    var bb = root.querySelector('[data-ms="burger"]'), dr = root.querySelector('#ms-drawer');
    function closeA() { if (ab) { ab.setAttribute('aria-expanded', 'false'); am.hidden = true; } }
    function setD(open) { dr.hidden = !open; bb.setAttribute('aria-expanded', String(open)); bb.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); bb.innerHTML = icon(open ? 'x' : 'menu'); }
    if (ab) ab.addEventListener('click', function (e) { e.stopPropagation(); var o = ab.getAttribute('aria-expanded') === 'true'; ab.setAttribute('aria-expanded', String(!o)); am.hidden = o; });
    if (bb) bb.addEventListener('click', function () { setD(dr.hidden); });
    if (dr) dr.addEventListener('click', function (e) { if (e.target.closest('a')) setD(false); });
    document.addEventListener('click', function (e) { if (am && !am.contains(e.target)) closeA(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if (ab && ab.getAttribute('aria-expanded') === 'true') { closeA(); ab.focus(); } if (dr && !dr.hidden) { setD(false); bb.focus(); } } });
    wireForm(root);
  }

  window.MS = {
    icon: icon, iconNames: Object.keys(P), link: link, logo: logo, logoUrl: LOGO,
    header: header, footer: footer, home: home, map: map, form: form, field: field,
    segCard: segCard, SEGS: SEGS, waBtn: waBtn, waCard: waCard, portal: portal, screenPC: screenPC, screenApp: screenApp, successPanel: successPanel, wire: wire,
    mountHome: function (el) { el.innerHTML = home(); wire(el); }
  };
})();

/* Inicia menus e formulário. Informe o WhatsApp abaixo, com DDD e só com dígitos. */
(function () {
  var WHATSAPP_MS = '';
  MS.wire(document);
  if (WHATSAPP_MS) {
    document.querySelectorAll('.ms-btn--whatsapp').forEach(function (a) { a.href = 'https://wa.me/55' + WHATSAPP_MS; });
    var n = document.querySelector('.ms-wanum strong'); if (n) n.textContent = WHATSAPP_MS;
  }
})();
