# Publicação nas lojas (App Store e Google Play)

Tudo o que dá para preparar no código já está pronto. O que falta depende das contas
de desenvolvedor, que só o responsável pelo Guia Saúde pode criar e pagar.

## 1. O que você precisa providenciar

| Item | Onde | Custo |
| --- | --- | --- |
| Conta de desenvolvedor Google Play | play.google.com/console | US$ 25, pagamento único |
| Conta Apple Developer | developer.apple.com/programs | US$ 99 por ano |
| Um Mac com Xcode (só para o envio do iOS) | — | — |
| Chave de assinatura do Android (keystore) | gerada uma vez, guardada com segurança | — |

Conta de pessoa jurídica (CNPJ) é recomendada para apps de saúde: as duas lojas pedem
mais verificações de contas pessoais nessa categoria.

## 2. Android — gerar o pacote da Play Store

1. Gere a chave uma única vez (num computador com Java):

   ```bash
   keytool -genkeypair -v -keystore guia-saude-release.jks -alias guia-saude -keyalg RSA -keysize 2048 -validity 10000
   ```

   **Guarde o arquivo `.jks` e as senhas em dois lugares seguros.** Sem eles não é possível
   publicar atualizações do app.

2. Gere o pacote no computador, pelo Android Studio (*Build → Generate Signed App Bundle*)
   ou pelo terminal com `npm run app:android:release`. O passo a passo está em
   [sem-github-actions.md](sem-github-actions.md#4-aplicativo-android).

3. A cada envio, aumente o número interno da versão (`versionCode`): a Play Store recusa
   números repetidos.

4. Na Play Console: crie o app, envie o `.aab` em *Teste interno* primeiro, instale no
   seu celular pelo link de teste e só depois promova para *Produção*.

Ative a **Assinatura de apps do Google Play** quando a Play Console oferecer: assim o
Google guarda a chave final e a sua vira apenas a chave de envio.

## 3. iOS — enviar pela App Store Connect

1. No Mac: `npm install`, depois `npm run app:ios` (gera o site e abre o Xcode).
2. No Xcode, em *Signing & Capabilities*, escolha a equipe da conta Apple Developer.
3. Selecione *Any iOS Device*, depois *Product → Archive → Distribute App → App Store Connect*.
4. Na App Store Connect, preencha a ficha (seção 4) e envie para revisão. Teste antes pelo
   TestFlight.

> **Atenção à regra 4.2 da Apple.** A Apple recusa apps que são só um site dentro de um
> app. O Guia Saúde funciona sem internet (o diretório vai no pacote), salva favoritos no
> aparelho e abre telefone, WhatsApp, mapas e compartilhamento nativos; mencione isso nas
> notas para o revisor. Se mesmo assim houver recusa, o caminho é acrescentar recursos
> nativos (por exemplo, notificações de episódio novo do podcast).

## 4. Ficha das lojas (textos prontos)

**Nome:** Guia Saúde

**Subtítulo (App Store, até 30 caracteres):** Saúde de Piumhi e região

**Descrição curta (Google Play, até 80 caracteres):**
Profissionais, clínicas, farmácias e conteúdo de saúde de Piumhi e região.

**Descrição completa:**

> Encontre o cuidado certo, perto de você.
>
> O Guia Saúde reúne profissionais, clínicas, farmácias, laboratórios e serviços de saúde
> de Piumhi e região em um só lugar, com informações conferidas em fontes públicas.
>
> • Busque por especialidade, nome ou serviço
> • Veja onde cada profissional atende, com telefone, WhatsApp e rota
> • Salve seus profissionais favoritos no próprio celular
> • Ouça o Podcast Conexão Saúde, com profissionais da região
> • Folheie todas as edições da Revista Guia Saúde
> • Leia matérias sobre prevenção e cuidados com a saúde
>
> O diretório funciona mesmo sem internet. Os perfis e os episódios novos do podcast são
> atualizados automaticamente.
>
> O Guia Saúde é um portal informativo: não realiza agendamentos e não substitui a
> avaliação de um profissional de saúde.

**Palavras-chave (App Store, até 100 caracteres):**
`piumhi,saúde,médico,dentista,psicólogo,clínica,farmácia,especialista,podcast,revista`

**Categoria:** Medicina (App Store) · Medicina (Google Play)

**Classificação etária:** Livre / 4+ (sem conteúdo sensível).

**Links:**
- Política de privacidade: `https://www.guiasaude.app.br/privacidade/`
- Site de suporte e marketing: `https://www.guiasaude.app.br/aplicativo/`
- E-mail de contato: `rmproguia@gmail.com`

## 5. Privacidade (respostas para os formulários das lojas)

- **App Store, "Privacidade do app":** *Dados não coletados.*
- **Google Play, "Segurança dos dados":** o app **não coleta nem compartilha** dados.
  Criptografia em trânsito: sim (HTTPS). Exclusão de dados: não se aplica (não há conta).

Por quê: os favoritos ficam só no aparelho; os formulários apenas abrem o e-mail ou o
WhatsApp do próprio usuário; não há login, anúncios, analytics nem rastreamento. Os vídeos
do podcast usam o player do YouTube em modo de privacidade reforçada (`youtube-nocookie`).

**Declaração de saúde (Google Play):** o app não é dispositivo médico; oferece informações
e contatos de serviços de saúde.

**Criptografia (App Store):** já declarado no `Info.plist`
(`ITSAppUsesNonExemptEncryption = false`, só HTTPS padrão), então a pergunta de exportação
não aparece a cada envio.

## 6. Capturas de tela

Já geradas a partir do app, em `store/screenshots/`:

- `iphone-6.7-*.jpg` — 1290 × 2796 (iPhone 6,7"/6,9", aceito pela App Store)
- `android-*.jpg` — 1080 × 1920 (telefone, Google Play)

Telas: início, busca, perfil, podcast e revista. Para gerar de novo depois de mudanças
visuais, rode o build e capture as mesmas rotas com o Playwright no tamanho acima.

A Google Play pede também um **ícone de 512 × 512** (`public/app-icon-512.png`) e uma
**imagem de destaque de 1024 × 500**, que precisa ser criada com a identidade visual.

## 7. Antes de enviar — roteiro de teste no celular

- [ ] Primeira abertura, início, busca e filtros
- [ ] Perfil: ligar, WhatsApp, "Como chegar" e compartilhar
- [ ] Favoritos continuam salvos depois de fechar e abrir o app
- [ ] Podcast toca; episódio novo aparece sem atualizar o app
- [ ] Revista abre e folheia; sem internet mostra o aviso
- [ ] Modo avião: o diretório continua funcionando
- [ ] Fonte grande do sistema e leitor de tela (VoiceOver/TalkBack)
