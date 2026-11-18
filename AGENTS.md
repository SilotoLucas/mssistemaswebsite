# MS Sistemas Website

Site institucional da MS Consultoria & Sistemas. Nesta fase existe somente o front-end, com as oito telas do plano.

## Comandos

| Comando | Uso |
| --- | --- |
| `bun install` | Instala as dependências com versões fixas |
| `bun run dev` | Abre o site em `http://127.0.0.1:5173` |
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

- O design aprovado está em `docs/referencias/design-v1`.
- Cores, espaçamentos e fontes vêm de `packages/design-tokens/tokens.json`.
- A logo é usada sem alterações, apenas sobre fundos claros.
- Textos em português do Brasil, com WCAG 2.1 AA e áreas de toque de pelo menos 44 px.

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
