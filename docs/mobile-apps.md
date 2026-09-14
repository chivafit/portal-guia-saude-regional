# Aplicativos do Guia Saúde

O portal usa uma única base para três formatos:

- site responsivo;
- PWA instalável pelo navegador;
- aplicativos Android e iOS empacotados com Capacitor.

## Identidade do aplicativo

- Nome: `Guia Saúde`
- Identificador: `br.com.guiasaude.portal`
- Conteúdo web empacotado: `out`

O identificador deve permanecer estável após a primeira publicação nas lojas.

## Gerar e sincronizar

```bash
npm install
npm run build:app
```

O comando valida o diretório, a busca, a auditoria e o podcast antes de atualizar os projetos nativos.

## Android

Requer Android Studio, SDK Android e uma versão atual do JDK compatível com o Android Gradle Plugin.

```bash
npm run app:android
```

No Android Studio, selecione um emulador ou aparelho para testar. Para a Play Store, gere um Android App Bundle assinado e mantenha a chave de assinatura em armazenamento seguro, fora do repositório.

## iOS

Requer Xcode, uma conta Apple Developer e configuração de assinatura.

```bash
npm run app:ios
```

No Xcode, escolha a equipe de desenvolvimento, teste em simulador e aparelho e envie a versão pelo fluxo Archive/Distribute App.

## Atualizações do portal

Depois de qualquer mudança no conteúdo ou na interface, execute novamente:

```bash
npm run build:app
```

Isso copia a versão mais recente do portal para Android e iOS. Ícones ou telas de abertura só precisam ser regenerados quando a identidade visual mudar:

```bash
npm run app:assets
```

## PWA

O manifesto e o service worker permitem instalar o Guia Saúde pela tela inicial. As páginas já visitadas e os recursos estáticos utilizados ficam disponíveis no cache; quando há conexão, a navegação busca sempre a versão mais recente.

## Experiência no aplicativo

O aplicativo oferece navegação inferior com acesso rápido ao início, busca, favoritos e conteúdos. Os favoritos são armazenados somente no aparelho, sem conta e sem envio da lista ao Guia Saúde. A política de privacidade pública descreve esse funcionamento.

## Antes de enviar às lojas

- confirmar que `br.com.guiasaude.portal` será o identificador definitivo;
- testar telefone, WhatsApp, mapas, compartilhamento e links externos em aparelhos reais;
- preparar nome, descrição, categoria, classificação etária e capturas de tela;
- informar a política pública em `https://guiasaude.app.br/privacidade/`;
- gerar e guardar com segurança a chave de assinatura do Android;
- configurar a equipe e os certificados da conta Apple Developer;
- preencher as declarações de privacidade e conteúdo de saúde nas duas lojas.
