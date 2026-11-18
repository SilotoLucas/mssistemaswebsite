---
paths:
  - "tools/quality/**"
---

# Quality

- Toda regra nova nasce com um fixture que a viola e um teste que encontra exatamente essa violação.
- Violações usam o formato `caminho:linha:coluna: error ferramenta(regra): fato fix: ação`.
- Saída `1` indica código errado. Saída `2` indica ferramenta quebrada.
