# MS App: imagens originais

A pasta `originais` guarda as imagens do MS App exatamente como foram enviadas pelo dono do site, sem nenhum tratamento. Elas servem só de referência e nunca são usadas pelo site.

| Original | Versão tratada usada no site | O que foi feito |
| --- | --- | --- |
| `originais/app-login-original.jpg` | `apps/web/src/assets/app/app-login.webp` | Recorte só da tela (x 168, y 190, 566×1260), sem a moldura do celular |
| `originais/app-inicio-original.jpg` | `apps/web/src/assets/app/app-inicio.webp` | Corte das barras de status e de navegação do celular (y 62 a 1503) e remoção do "??" depois de "Que bom ter você por aqui!" e uma faixa de 44 px no topo, com a cor do cabeçalho esticada, para o conteúdo não encostar na borda da moldura |
| `originais/app-lembrete-original.jpg` | `apps/web/src/assets/app/app-lembrete.webp` | Corte das barras do celular (y 62 a 1503) e troca do nome do associado pelo nome de exemplo "José da Silva" |
| `originais/ms-app-logo-original.jpg` | `apps/web/src/assets/app/ms-app-logo.webp` | Fundo removido (transparente) e tamanho reduzido |

Para trocar uma tela do site, trate a imagem a partir do original e salve a versão nova em `apps/web/src/assets/app`, mantendo o mesmo nome. Os originais mostram o nome de um associado real e ícones pessoais da barra do celular, por isso nunca devem aparecer no site.

As telas do site são refeitas a partir dos originais e salvas em WebP com qualidade 96 (`sharp_yuv`), perto do tamanho do original e sem a perda da compressão antiga. As regiões editadas (o nome em `app-lembrete` e o "??" em `app-inicio`) vêm da versão tratada anterior.
