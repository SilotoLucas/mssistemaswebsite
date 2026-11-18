# Deploy na VM

O site é estático. A imagem `deploy/Dockerfile` roda `bun run build` e entrega a pasta `dist` num Caddy pequeno (`deploy/Caddyfile.site`), com fallback para `index.html` por causa das rotas do React Router. O Caddy do Abanou, que já é o proxy único da VM, cuida do HTTPS e encaminha o domínio para esse contêiner pela rede `borda`.

```
internet ──443──> caddy do Abanou ──> mssistemas-web:80 (rede borda)
```

Um timer do systemd confere o GitHub a cada 2 minutos. Quando há commit novo na branch configurada, ele reconstrói a imagem e troca o contêiner. Nenhuma porta é publicada pelo site.

## Antes de começar

- O Abanou precisa estar de pé: ele cria a rede `borda` e o contêiner do Caddy.
- Entre na VM com `ssh root@194.5.152.64` e confira:

```bash
docker network ls | grep borda
docker ps --format '{{.Names}}' | grep caddy
```

Os dois comandos devem mostrar algo. O nome do Caddy esperado é `abanou-caddy-1`. Se for outro, use `MS_CADDY` no passo 6.

## 1. Chave de leitura do repositório

O repositório é privado. A VM precisa de uma chave própria, só de leitura.

```bash
ssh-keygen -t ed25519 -N "" -C "vm-mssistemas" -f ~/.ssh/github_mssistemas
cat >> ~/.ssh/config <<'CFG'
Host github-mssistemas
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_mssistemas
  IdentitiesOnly yes
CFG
cat ~/.ssh/github_mssistemas.pub
```

Copie a linha que aparece. No GitHub, abra `SilotoLucas/mssistemaswebsite`, vá em **Settings > Deploy keys > Add deploy key**, cole a linha, dê o nome `vm-contabo` e **não** marque "Allow write access".

Teste:

```bash
ssh -o StrictHostKeyChecking=accept-new -T git@github-mssistemas
```

A resposta esperada é uma saudação do GitHub dizendo que a autenticação funcionou.

## 2. Código e configuração

```bash
git clone -b feat/redesign-visual git@github-mssistemas:SilotoLucas/mssistemaswebsite.git /opt/mssistemas
cd /opt/mssistemas/deploy
cp .env.example .env
cat .env
```

O `.env` traz `DOMINIO=mssistemas.194.5.152.64.sslip.io`. O sslip.io responde qualquer nome terminado em `194.5.152.64.sslip.io` com o IP da VM, e o Caddy consegue certificado válido para ele. Para usar um domínio próprio, crie um registro A apontando para `194.5.152.64` no provedor do domínio e troque o valor no `.env`.

## 3. Primeiro deploy

```bash
/opt/mssistemas/deploy/atualizar.sh --forcar
```

O primeiro build leva cerca de um minuto e usa em torno de 1 GB de memória. No fim, o script grava `/opt/borda/sites/mssistemas.caddy` e recarrega o Caddy do Abanou, sem derrubá-lo.

## 4. Deploy automático

```bash
cp /opt/mssistemas/deploy/mssistemas-deploy.service /etc/systemd/system/
cp /opt/mssistemas/deploy/mssistemas-deploy.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now mssistemas-deploy.timer
systemctl list-timers | grep mssistemas
```

## 5. Conferir

```bash
curl -sI https://mssistemas.194.5.152.64.sslip.io | head -5
docker ps --format 'table {{.Names}}\t{{.Status}}' | grep mssistemas
journalctl -u mssistemas-deploy -n 20 --no-pager
```

O primeiro acesso por HTTPS pode demorar alguns segundos, porque o Caddy está emitindo o certificado. Abra o endereço no navegador e navegue por `/suporte`, `/clientes` e `/politica-de-privacidade` para confirmar que as rotas funcionam.

## Dia a dia

- **Publicar uma mudança:** faça push na branch configurada. Em até uns 3 minutos o site novo está no ar.
- **Ver o que está rodando:** `cat /var/lib/mssistemas-deploy/ultimo` mostra o commit publicado.
- **Forçar agora:** `/opt/mssistemas/deploy/atualizar.sh --forcar`.
- **Trocar de branch** (por exemplo para `main`): `systemctl edit mssistemas-deploy` e acrescente

```ini
[Service]
Environment=MS_RAMO=main
```

  Depois rode `systemctl daemon-reload` e `/opt/mssistemas/deploy/atualizar.sh --forcar` com `MS_RAMO=main` na frente.
- **Trocar o domínio:** edite `deploy/.env` e rode `atualizar.sh --forcar`. O arquivo do proxy é regenerado sozinho.
- **Variáveis do script:** `MS_RAMO` (branch), `MS_CADDY` (nome do contêiner do Caddy), `MS_SITES` (pasta dos sites do proxy) e `MS_ESTADO` (pasta de estado).

## Se algo falhar

- `network borda not found`: o Abanou não está de pé. Suba o Abanou e rode o script de novo.
- Certificado não sai: confira se o `.env` tem o nome certo e se as portas 80 e 443 estão abertas (`ufw status`).
- Site antigo aparece depois de um deploy: o HTML não fica em cache, então atualize com Ctrl+F5. Os arquivos em `/assets` têm nome com hash e trocam sozinhos.
- Para desfazer: aponte a branch para o commit anterior, ou faça `git revert` e push.
