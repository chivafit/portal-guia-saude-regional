# Operação sem GitHub Actions

O GitHub Actions está desativado por enquanto (sem plano pago). Os workflows em
`.github/workflows/` continuam no repositório, mas só rodam se alguém clicar em
*Run workflow*; nada roda sozinho a cada push. Tudo o que eles faziam tem uma
alternativa gratuita, descrita abaixo.

## 1. Validação e publicação do site: Vercel

A Vercel já compila e publica o site a cada push no `main`, e cria um **preview** a cada
pull request. O build (`npm run build:pages`) roda, nesta ordem:

1. busca de episódios novos do podcast (ver seção 2);
2. lint;
3. validações do diretório, da busca, da auditoria e do podcast;
4. build do Next.js e geração de `/app-data/`;
5. validação de SEO e testes automatizados.

Se qualquer etapa falhar, **o deploy falha e o site no ar continua o anterior**. Num pull
request, o check da Vercel fica vermelho: esse é o sinal para não fazer o merge.

Para validar no seu computador antes de enviar:

```bash
APPLY_PUBLIC_SITE=1 npm run validate:release
```

## 2. Podcast: episódios novos do YouTube

### Como funciona

Em cada deploy da Vercel, o build lê o feed do canal da Rede Megga no YouTube e inclui os
episódios novos do **Conexão Saúde**. Não precisa de commit: a lista completa fica
publicada em `/app-data/podcast-youtube.json`, e o deploy seguinte parte dela. O app lê
`/app-data/podcasts.json` e mostra o episódio novo sem atualização na loja.

Se o YouTube estiver fora do ar na hora do build, o site é publicado normalmente com os
episódios que já conhecia; o próximo deploy traz os novos.

### Agendar o deploy semanal (configuração única, ~5 minutos)

O programa é quinzenal, às terças à noite. Um deploy toda **quarta de manhã** garante que o
episódio entre no dia seguinte, mesmo se um programa atrasar ou mudar de semana.

1. **Criar o Deploy Hook na Vercel.** No projeto do site: *Settings → Git → Deploy Hooks*.
   Nome: `podcast-semanal`. Branch: `main`. Clique em *Create Hook* e copie a URL
   (começa com `https://api.vercel.com/v1/integrations/deploy/...`).
   **Trate essa URL como senha**: quem a tiver consegue disparar deploys.

2. **Agendar em https://cron-job.org** (gratuito):
   - crie a conta e clique em *Create cronjob*;
   - *URL*: cole a URL do Deploy Hook;
   - *Execution schedule*: *Custom* → toda **quarta-feira às 08:00**,
     fuso **America/Sao_Paulo**;
   - em *Advanced*, mude o método de requisição para **POST**;
   - salve e use *Test run*: um deploy novo deve aparecer na Vercel.

   Por que semanal se o programa é quinzenal? Na semana sem episódio o deploy só
   republica o mesmo conteúdo, sem custo no plano gratuito, e nenhum episódio fica de fora
   se o programa mudar de semana.

### Atualizar na hora (manual)

- Na Vercel: *Deployments* → no deploy mais recente, menu **⋯ → Redeploy**.
  Desmarque *Use existing Build Cache* para garantir a busca nova.
- Ou abra o cron-job.org e clique em *Test run* no agendamento.

### Completar um episódio automático

Os episódios automáticos entram com o nome do convidado e a miniatura do YouTube, porque o
canal não publica descrição. Para colocar tema, cargo e foto, cadastre o episódio em
`editorialPodcasts` (`lib/data.ts`) com o mesmo link do YouTube: o cadastro editorial
tem prioridade e o automático deixa de aparecer em duplicidade.

Para gravar a lista automática no repositório (opcional, cópia de segurança):

```bash
npm run podcast:sync
git add lib/data/podcast-youtube.json && git commit -m "Podcast: episódios novos" && git push
```

## 3. Fotos dos profissionais

O painel `/atualizar-fotos` (só em `npm run dev`, no seu computador) grava a foto direto no
`main` pelo GitHub; a Vercel publica em seguida. Não depende do GitHub Actions.

## 4. Aplicativo Android

Requer Android Studio instalado no computador.

- **APK de teste** (instalar no seu celular):

  ```bash
  npm run app:android:apk
  ```

  O arquivo sai em `android/app/build/outputs/apk/debug/app-debug.apk`.

- **Pacote para a Play Store (AAB assinado)**, pelo próprio Android Studio, que é o
  jeito mais simples: `npm run app:android` (gera o site e abre o projeto), depois
  *Build → Generate Signed App Bundle or APK → Android App Bundle*, escolha o arquivo
  `.jks` e as senhas, e selecione *release*.

  Ou pelo terminal (macOS/Linux), com a chave:

  ```bash
  export ANDROID_KEYSTORE_PATH=/caminho/guia-saude-release.jks
  export ANDROID_KEYSTORE_PASSWORD=... ANDROID_KEY_ALIAS=guia-saude ANDROID_KEY_PASSWORD=...
  export ANDROID_VERSION_CODE=2 ANDROID_VERSION_NAME=1.0.1
  npm run app:android:release
  ```

  O `.aab` sai em `android/app/build/outputs/bundle/release/app-release.aab`.
  **A cada envio à Play Store, aumente `ANDROID_VERSION_CODE`** (1, 2, 3...); a loja
  recusa números repetidos. No Android Studio, o número fica em `android/app/build.gradle`
  (`versionCode`).

Na primeira compilação o Gradle baixa muitas dependências e o Maven Central às vezes
responde **429 (Too Many Requests)**. Não é erro do projeto: espere um minuto e rode de
novo (as dependências já baixadas ficam guardadas). Para baixar menos coisas ao mesmo
tempo: `cd android && ./gradlew assembleDebug --max-workers=2`.

## 5. Aplicativo iOS

Requer um Mac com Xcode: `npm run app:ios` e depois *Product → Archive → Distribute App*.
Detalhes em [lojas.md](lojas.md).

## 6. Quando o GitHub Actions voltar

Basta trocar `on: workflow_dispatch:` de volta pelos gatilhos de push/agenda em cada
arquivo de `.github/workflows/`. O agendamento do cron-job.org pode então ser removido.
