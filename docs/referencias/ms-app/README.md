# MS App: imagens originais

A pasta `originais` guarda as imagens do MS App exatamente como foram enviadas pelo dono do site, sem nenhum tratamento. Elas servem só de referência e nunca são usadas pelo site.

| Original | Versão tratada usada no site | O que foi feito |
| --- | --- | --- |
| `originais/app-login-original.jpg` | `apps/web/src/assets/app/app-login.webp` | Recorte só da tela, sem a moldura do celular |
| `originais/app-inicio-original.jpg` | `apps/web/src/assets/app/app-inicio.webp` | Corte das barras de status e de navegação do celular e remoção do "??" depois de "Que bom ter você por aqui!" |
| `originais/app-lembrete-original.jpg` | `apps/web/src/assets/app/app-lembrete.webp` | Corte das barras do celular e troca do nome do associado pelo nome de exemplo "José da Silva" |
| `originais/ms-app-logo-original.jpg` | `apps/web/src/assets/app/ms-app-logo.webp` | Fundo removido (transparente) e tamanho reduzido |

Para trocar uma tela do site, trate a imagem a partir do original e salve a versão nova em `apps/web/src/assets/app`, mantendo o mesmo nome. Os originais mostram o nome de um associado real e ícones pessoais da barra do celular, por isso nunca devem aparecer no site.
