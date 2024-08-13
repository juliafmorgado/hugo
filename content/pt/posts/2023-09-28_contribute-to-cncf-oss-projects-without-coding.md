---
title: "Como Contribuir à Localização do Glossário da CNCF - Sem Ter Que Codar!"
author: "Julia Furst Morgado"
date: 2023-09-26T11:46:05.964Z
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-oss.png
tags: 
    - CNCF
    - Open Source
    - Tutorial
categories: 
    - Tech
slug: /como-contribuir-a-localizacao-glossario-cncf

---

## Introdução

O [Glossário da Cloud Native Computing Foundation (CNCF)](https://glossary.cncf.io/) é um recurso valioso que ajuda a esclarecer a terminologia e a gíria usada no mundo da computação nativa da nuvem. Ele fornece definições concisas de termos essenciais, tornando-se uma ferramenta indispensável tanto para noviços quanto para profissionais experientes no campo.

Sempre encorajo todos a começar a contribuir para o código aberto desde cedo em suas carreiras porque você irá:
- Aprender e ganhar experiência
- Conhecer pessoas interessadas nas mesmas coisas que você
- Encontrar mentores
- Construir uma reputação e alavancar sua carreira
- Conseguir aqueles quadradinhos verdes no GitHub
- Obter muito mais!

## Localização?

Localização é o processo de traduzir e adaptar um produto ou serviço para um idioma e cultura específicos. No contexto do Glossário da Cloud Native, a localização refere-se à tradução dos termos e definições do glossário para outros idiomas. Você também pode contribuir de [outras maneiras](https://glossary.cncf.io/contribute/#welcome) se você só fala inglês (e não se esqueça de ler meu guia sobre [como se tornar um contribuinte de código aberto](https://www.juliafmorgado.com/posts/guide-to-become-open-source-contributor/)).

Contribuir para a localização do Glossário da CNCF é não apenas uma forma fantástica de retribuir à comunidade nativa de nuvem, mas também uma excelente oportunidade para aprofundar seu entendimento da tecnologia e sua terminologia. Ao participar deste projeto de código aberto, você estará tornando-o acessível a um público mais amplo, especialmente àqueles que preferem consumir conteúdo em seus idiomas nativos.

![](https://blog-imgs-23.s3.amazonaws.com/glossary-webpage.png)

## Passos para contribuir

### **Leia a documentação**
Leia a página [Como Contribuir](https://glossary.cncf.io/contribute/) no site do Glossário da Cloud Native. Esta página fornece informações sobre como localizar o glossário, incluindo o guia de localização, o guia de estilo e as melhores práticas.

![](https://blog-imgs-23.s3.amazonaws.com/how-to-contribute-webpage.png)

### **Junte-se à comunidade**
Junte-se ao [espaço de trabalho CNCF Slack](https://cloud-native.slack.com/) e participe dos canais [#glossary-localizations](https://app.slack.com/client/T08PSQ7BQ/C02N2RGFXDF) e #glossary-localization-[nome do seu idioma]. Esses canais são onde você pode se conectar com outros membros da equipe de localização do Glossário da Cloud Native e obter ajuda com quaisquer perguntas que você tenha. Se o projeto do Glossário da CNCF não tiver uma equipe de localização para o seu idioma, leia [isso](https://github.com/cncf/glossary/blob/main/LOCALIZATION.md#initiating-a-new-localization-team).

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-slack.png)

### **Procure issues em aberto que não foram atribuídos** 
Você pode encontrar issues em aberto pesquisando no repositório GitHub do Glossário da Cloud Native [aqui](https://github.com/cncf/glossary/issues?q=is%3Aissue+is%3Aopen+label%3Alang%2Fpt+no%3Aassignee+), e filtrando-os com as tags `"is:issue is:open label:lang/pt no:assignee"`.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-issues.png)

> **Nota:** Neste exemplo, "pt" é para o português, mas você pode alterar a tag para o seu idioma. Por exemplo, Hindi seria `label:lang/hi` e francês seria `label:lang/fr`.
    

### **Se você não encontrar issues em aberto**
Caso não encontre issues em aberto, verifique o canal Slack dedicado ao seu idioma para ver documentos fixados no topo que mostram os termos/páginas que ainda precisam ser traduzidos. Também envie uma mensagem amigável e educada no canal Slack para se apresentar, expressar seu interesse em contribuir para o projeto e perguntar se há uma lista ou sistema de rastreamento disponível para tarefas de tradução.

### **Quando encontrar um issue**
Depois de encontrar um problema, deixe um comentário dizendo que você gostaria de assumir esse problema/trabalho. Um membro da equipe de localização do Glossário da Cloud Native revisará sua solicitação e a aprovará. Espere ser aceito, porque às vezes já há alguém trabalhando nisso e você terá feito trabalho à toa.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-issue-1209.png)

### **Faça um fork do repositório GitHub do Glossário da Cloud Native** 
Isso criará uma cópia do repositório em sua própria conta do GitHub.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-fork-repo.png)

### **Clone o repositório forked** 
Use o comando `git clone` para clonar o repositório forked no IDE em sua máquina local ou em qualquer IDE que você estiver usando. Eu tenho usado o [AWS Cloud9](https://aws.amazon.com/cloud9/) ultimamente e estou gostando bastante.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-git-clone.png)

### **Crie uma branch de trabalho** 
Por exemplo, se você estiver traduzindo para o português, crie uma branch a partir da branch `dev-pt`. Se você não estiver familiarizado com o fluxo de trabalho do Git e GitHub, você pode pular esta etapa.

### **Crie um novo arquivo .md** 
Dentro da pasta do seu idioma, crie um novo arquivo para o termo e nomeie-o com o nome em inglês (não se esqueça do .md no final).

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-new-term.png)

### **Traduza o termo** 
Certifique-se de seguir o guia de localização e o guia de estilo ao traduzir os termos. Verifique os termos que já foram traduzidos para usar as mesmas palavras. Não se esqueça de traduzir o título, a categoria e as tags. Depois de ter certeza, revise-o cuidadosamente. Os revisores e mantenedores do projeto têm agendas ocupadas e pode ser oneroso para eles solicitar correções menores, como uma vírgula ausente ou um acento.

> **Importante:** 
Se o seu termo incluir hiperlinks para outros termos e esses termos já estiverem traduzidos, certifique-se de modificar o hiperlink para direcionar para o termo traduzido. Por exemplo, se você estiver traduzindo um termo para o português, atualize o hiperlink de https://glossary.cncf.io/abstraction/ para https://glossary.cncf.io/pt-br/abstraction/. Isso ajuda a manter uma experiência contínua para os usuários que acessam o glossário em seu idioma preferido.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-translated.png)

### **Faça commit de suas alterações e as envie para seu repositório forked**
Primeiro, escreva em seu terminal: `git add [caminho_para_seu_arquivo]` ou se você apenas mudou esse arquivo, você pode fazer `git add .` .
Então escreva: `git commit -m 'nova tradução para [termo]'` .
E finalmente: `git push`.

Depois de enviar suas alterações para seu repositório forked, você verá que sua branch está à frente da branch cncf:main e que você pode contribuir para ela abrindo um pull request (também conhecido como PR).

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-newcommit.png)


### **Abra um pull request.** 
Para abrir um PR, clique no botão verde para abrir um pull request direcionando para a branch de desenvolvimento em português (dev-pt) - ou qualquer outro idioma - para mesclar suas alterações no repositório principal do Glossário Cloud Native.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-newpr.png)

### (opcional) 
No canal Slack da equipe (#glossary-localization-portuguese), avise que você enviou seu PR.

### **Aguarde a revisão de seu pull request** 
Após abrir um pull request, os membros da equipe de localização do Glossário Cloud Native em seu idioma revisarão suas alterações. Eles podem fornecer feedback ou sugerir alterações em suas traduções. Monitore frequentemente as notificações localizadas no canto superior direito de sua tela; é aí que você as encontrará.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-pr.png)

### **Faça as alterações necessárias e atualize seu pull request**


### **Mescle seu pull request** 
Após a aprovação do seu pull request, você pode mesclá-lo no repositório principal do Glossário Cloud Native e sua tradução será publicada no site do Glossário Cloud Native. Se você criou uma branch na etapa 8, você também pode excluí-la agora. E voilá!

![](https://blog-imgs-23.s3.amazonaws.com/ccncf-glossary-successfulpr.png)

## Dicas finais

* Comece devagar e pequeno. Não sinta que você precisa traduzir o glossário inteiro de uma vez. Comece traduzindo alguns termos ou páginas com os quais você está familiarizado ou que sejam relevantes para seus interesses.
* Use as traduções existentes. Se um termo ou página já foi traduzido para o seu idioma, você pode usar essa tradução como ponto de partida. No entanto, certifique-se de revisar a tradução existente e fazer as alterações necessárias.
* Seja consistente. Ao traduzir termos, tente ser o mais consistente possível. Use a mesma terminologia em todo o glossário e evite usar diferentes traduções para o mesmo termo.
* Se você tiver alguma pergunta ou precisar de ajuda, envie uma mensagem no canal Slack. Se você tiver alguma pergunta ou precisar de ajuda, não hesite em pedir ajuda no canal Slack #glossary-localizations ou no canal Slack do seu idioma. Os outros membros da equipe estão sempre felizes em ajudar novos colaboradores. Não se envergonhe e não espere muito; caso contrário, os revisores/mantenedores do projeto pensarão que você o abandonou.

Boa sorte e me avise se você gostaria de saber de outros projetos aos quais você pode contribuir da mesma forma!

***
Se você gostou deste artigo, siga-me no [Twitter](https://twitter.com/juliafmorgado) (onde compartilho minha jornada tecnológica) diariamente, conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), confira meu [IG](https://www.instagram.com/juliafmorgado/), e certifique-se de se inscrever no meu canal [Youtube](https://www.youtube.com/c/JuliaFMorgado) para mais conteúdo incrível!!
