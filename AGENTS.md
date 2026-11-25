# MS Sistemas Website

Site institucional da MS Consultoria & Sistemas. Nesta fase existe somente o front-end, com as telas do plano em `docs/plano-telas.md` (Clientes e Contato estão ocultas por enquanto, ver `HIDDEN_PAGES`). As soluções digitais (SmallBusiness, MS App e MS Dashboard) ficam em `shared/config/products.ts`. A MS não tem "produtos": use "soluções digitais" nos textos. O nome `products` só existe no código.

## Comandos

| Comando | Uso |
| --- | --- |
| `bun install` | Instala as dependências com versões fixas |
| `bun run dev` | Abre o site em `http://127.0.0.1:5173` |
| `bun run dev:rede` | Abre o site para a rede local na porta 5174 |
| `bun run build` | Gera o site em `apps/web/dist` |
| `bun run preview` | Serve o build em `http://127.0.0.1:4173` |
| `bun run tokens` | Gera `tokens.css` a partir de `tokens.json` |
| `bun test` | Roda os testes unitários e de interface |
| `bun run validate:quick` | Gate rápido, a cada iteração |
| `bun run validate` | Gate completo, antes de propor commit |
| `deploy/atualizar.sh` | Publica na VM, ver `docs/deploy.md` |

## Camadas

`packages/domain` -> `packages/application` -> `apps/web`

- `domain`: regras puras e `Result`. Não importa nenhum pacote.
- `application`: casos de uso e portas. Importa apenas `domain`.
- `apps/web/src/shared`: configuração e componentes sem regra de feature.
- `apps/web/src/features/<feature>`: telas e adaptadores. Outra feature só importa pelo `index.ts`.
- `apps/web/src/app`: composição da página.

A matriz completa está em `docs/arquitetura.md`. O `dependency-cruiser` impõe essas regras.

## Criar uma feature

1. Regra pura em `packages/domain`, com teste `*.unit.test.ts` ao lado.
2. Porta em `packages/application/src/ports`, somente se pagar uma das três contas abaixo.
3. Caso de uso em `packages/application/src/use-cases/<acao>`, com teste irmão.
4. Adaptador e tela em `apps/web/src/features/<feature>`.
5. Exportação pública em `index.ts`.

Uma porta só nasce quando existe um segundo implementador real, um teste sem I/O depende dela ou a fronteira está declarada em `docs/arquitetura.md`.

## Design

- **Leia `docs/design.md` antes de criar ou alterar qualquer interface.** Ele é o padrão visual aprovado (abertura escura com aurora, vidro, seções que alternam branco e névoa, movimento suave) e vence o design V1.
- `docs/referencias/design-v1` serve só de base de identidade e conteúdo. O estilo claro e minimalista dele foi substituído (decisão 016).
- Reaproveite componentes e classes que já existem (`PageHero`, `Reveal`, `Aurora`, `ms-btn`, `ms-eyebrow`, `ms-glass`). Não crie estilo novo quando existir um equivalente.
- Cores, espaçamentos e fontes vêm de `packages/design-tokens/tokens.json`.
- A logo é a 2D original, pelo componente `BrandMark`: `light` em fundo claro e `dark` (texto branco) em fundo escuro. A fonte é `docs/referencias/design-v1/assets/img/ms-logo.webp`. A logo 3D (`docs/referencias/logo-3d`) não é mais usada.
- Textos em português do Brasil, com WCAG 2.1 AA e áreas de toque de pelo menos 44 px.
- As telas e o ícone do MS App ficam em `apps/web/src/assets/app`. Os originais enviados, sem tratamento, ficam em `docs/referencias/ms-app/originais` (ver o `README.md` da pasta).
- O descritivo dos módulos do sistema fica em `docs/modulos.md`. Consulte-o antes de escrever sobre um módulo e mantenha-o igual ao catálogo `shared/config/solutions-catalog.ts`.

## Nunca

- Nunca usar `npm`, `yarn` ou `pnpm`. O gerenciador é o Bun.
- Nunca escrever cor à mão fora de `tokens.json`.
- Nunca escrever comentário no código.
- Nunca usar `throw` em `domain` ou `application`.
- Nunca usar `any` ou `!` para calar o compilador.
- Nunca usar `--no-verify`, `skip` em teste ou remover uma verificação para passar.
- Nunca usar versão de dependência com `^`, `~` ou `latest`.
- Nunca inventar depoimento, cliente, número ou tempo de resposta.

## Armadilhas

- Mantenha o TypeScript 5.9.3. Na versão 7, o `dependency-cruiser` analisa zero módulos e o gate fica verde sem verificar nada.
- O Bun instala pacotes por workspace. Tipos do Vite entram por `apps/web/src/env.d.ts`.
- O WhatsApp da MS fica em `shared/config/company-info.ts`. `VITE_WHATSAPP_NUMBER` troca o número sem mexer no código.
- O envio do formulário é simulado por `simulated-demo-request-sender.ts`.
