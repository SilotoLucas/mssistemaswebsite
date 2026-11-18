---
name: gate
description: Roda o gate de qualidade do projeto e corrige as violações pela causa raiz. Use antes de concluir uma alteração ou propor commit.
---

1. Rode `bun run validate:quick` durante a alteração.
2. Rode `bun run validate` antes de concluir.
3. Se a fase de tipos falhar, corrija os tipos primeiro.
4. Corrija a causa de cada violação, sem desativar regra ou remover verificação.
5. Relate uma linha por fase reprovada, com o número de violações.
