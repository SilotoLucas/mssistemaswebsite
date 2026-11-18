---
paths:
  - "apps/web/**"
---

# Web

- Leia e siga `docs/design.md`. O design V1 só vale para identidade e conteúdo.
- Em tela interna, parta do `PageHero` e alterne seções `white` e `mist`.
- Confira o resultado no navegador em 390, 768, 1366 e 1920 de largura antes de entregar.
- Use variáveis de `tokens.css`. Para mudar um valor, altere `tokens.json` e rode `bun run tokens`.
- Uma feature importa outra somente pelo `index.ts`.
- Mantenha foco visível, áreas de toque de 44 px e suporte a movimento reduzido.
- Mantenha um único `h1` por página.
