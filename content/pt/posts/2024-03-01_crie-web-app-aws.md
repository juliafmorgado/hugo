---
title: "Crie Seu Primeiro Aplicativo Web na AWS com AWS Amplify, Lambda, DynamoDB e API Gateway"
author: "Julia Furst Morgado"
date: 2024-03-01T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-web-app-aws.png
tags: 
    - AWS
categories: 
    - Tech
slug: /crie-seu-primeiro-aplicativo-web-na-aws-amplify-lambda-dynamodb-api-gateway
---

Olá!

Se você decidiu aprender mais sobre a AWS, então chegou ao post certo!

Este guia é projetado para iniciantes ou desenvolvedores com alguma experiência em nuvem que querem aprender os fundamentos da construção de aplicações web na plataforma de nuvem da AWS. Vamos guiá-lo através da implantação de um sistema básico de gerenciamento de contatos, apresentando-lhe os principais serviços da AWS ao longo do caminho.

Neste projeto, como você pode deduzir pelo título, usaremos a AWS, que significa Amazon Web Services; uma excelente plataforma de nuvem com serviços infinitos para tantos casos de uso variados, desde treinar modelos de machine learning até hospedar sites e aplicações.

> Computação em nuvem fornece acesso sob demanda a recursos de computação como servidores, armazenamento e bancos de dados.
> Funções sem servidor são um tipo de serviço de computação em nuvem que permite executar código sem gerenciar servidores.

Ao final deste tutorial, você será capaz de:

- Implantar um site estático na AWS Amplify.
- Criar uma função sem servidor usando AWS Lambda.
- Construir uma API REST com API Gateway.
- Armazenar dados em um banco de dados NoSQL usando DynamoDB.
- Gerenciar permissões com políticas IAM.
- Integrar seu código frontend com os serviços de backend.

Recomendo que você siga o tutorial uma vez e depois tente por si mesmo pela segunda vez. E antes de começarmos, certifique-se de ter uma conta AWS. Inscreva-se para uma conta gratuita se você ainda não tem.

Agora vamos começar!

## Passo 1: Implante o código frontend na AWS Amplify

Neste passo, vamos aprender como implantar recursos estáticos para nossa aplicação web usando o console AWS Amplify.

Conhecimentos básicos de desenvolvimento web serão úteis para esta parte. Criaremos nosso arquivo HTML com o código CSS (estilo) e Javascript (funcionalidade) embutidos nele. Deixei comentários ao longo do código para explicar o que cada parte faz.

Aqui está o trecho de código da página:

{{< gist juliafmorgado 30d1c59739a8405b86cc107c17d78b05 >}}

Existem várias maneiras de carregar nosso código no console do Amplify. Por exemplo, gosto de usar Git e Github. Para manter este artigo simples, vou mostrar como fazer isso diretamente pelo método de arrastar e soltar no Amplify. Para isso — temos que comprimir nosso arquivo HTML.

![](https://blog-imgs-23.s3.amazonaws.com/compress-index.png)

Agora, certifique-se de estar na região mais próxima de onde você vive. Você pode ver o nome da região no canto superior direito da página, ao lado do nome da conta. Então, vamos para o console AWS Amplify. Parecerá algo assim:

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-main-page.png)

Quando clicamos em “Começar”, seremos levados para a seguinte tela (iremos com o Hosting do Amplify nesta tela):

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-host-web-app.png)


![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-deploy-wo-git.png)

Você iniciará uma implantação manual. Dê um nome ao seu aplicativo, eu chamarei de "Sistema de Gerenciamento de Contatos", e ignore o nome do ambiente. Então, solte o arquivo index comprimido e clique em Salvar e Implantar.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-manual-deployment.png)

O Amplify implantará o código e retornará uma URL de domínio onde podemos acessar o site.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-domain-web-app.png)

Clique no link e você deverá ver isso:

![Website ao vivo pelo AWS Amplify](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-clicked-web-app.png)

## Passo 2: Criar uma função serverless AWS Lambda

Neste passo, criaremos uma função serverless usando o serviço AWS Lambda. Uma função Lambda é uma função serverless que executa código em resposta a eventos. Você não precisa gerenciar servidores ou se preocupar com escalabilidade, tornando-a uma solução econômica para tarefas simples.

Para lhe dar uma ideia, um ótimo exemplo de computação Serverless na vida real são as máquinas de venda automática. Elas enviam a solicitação para a nuvem e processam o trabalho apenas quando alguém começa a usar a máquina.

Vamos para o serviço Lambda dentro do console da AWS. A propósito, certifique-se de que você está criando a função na mesma região em que implantou o código da aplicação web no Amplify.

Hora de criar uma função. Dê um nome a ela, eu chamarei de "my-web-app-function", e para os parâmetros de linguagem de programação de runtime: escolhi Python 3.12, mas fique à vontade para escolher a linguagem e versão com as quais você se sente mais confortável e familiarizado.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function.png)

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function-step.png)

Após a nossa função lambda ser criada, desça a página e você verá a seguinte tela:

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-new-function.png)

Agora, vamos editar a função lambda. Aqui está uma função que extrai nomes e sobrenomes do JSON de entrada do evento. E então retorna um dicionário de contexto. A chave body armazena o JSON, que é uma string de saudação.

{{< gist juliafmorgado 7e1275b8b00d1dd70c62db47efeec418 >}}

Após a edição, clique em Deploy para salvar my-web-app-function, e então clique em Test para criar um evento.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-deploy-test.png)

Para configurar um evento de teste, dê um nome ao evento como "MyEventTest", modifique os atributos do Event JSON e salve.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-event.png)

Agora clique no grande botão azul de teste para que possamos testar a função Lambda.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-succeeded.png)

O resultado da execução tem os seguintes elementos:

- Nome do Evento de Teste
- Resposta
- Logs da Função
- ID do Pedido

## Passo 3: Criar API Rest com API Gateway

Agora vamos avançar e implantar nossa função Lambda na Aplicação Web. Usaremos o Amazon API Gateway para criar uma API REST que nos permitirá fazer solicitações a partir do navegador web. O API Gateway atua como uma ponte entre seus serviços de backend (como funções Lambda) e sua aplicação frontend. Ele permite criar APIs que expõem funcionalidades para sua aplicação web.

> REST: Transferência de Estado Representacional.

> API: Interface de Programação de Aplicações.

Vá até o Amazon API Gateway para criar uma nova API REST.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-rest-api.png)

Na página de criação da API, temos que dar um nome, por exemplo "Web App API", e escolher um tipo de protocolo e tipo de endpoint para a API REST (selecione Otimizado para Edge).

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-api-creation.png)

Agora temos que criar um método POST então clique em Criar método.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-create-method.png)

Na página Criar método, selecione o tipo de método como POST, o tipo de integração deve ser função Lambda, garanta que a Região seja a mesma Região que você usou para criar a função lambda e selecione a função Lambda que acabamos de criar. Finalize clicando em Criar método na parte inferior da página.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-method-type-post.png)

Agora precisamos habilitar o CORS, então selecione o / e depois clique em habilitar CORS

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-path-cors.png)

Nas configurações de CORS, apenas marque a caixa POST e deixe tudo o mais como padrão, então clique em salvar.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-cors-settings.png)

Após habilitar os cabeçalhos CORS, clique no botão laranja Deploy API.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-deploy-api2.png)

Uma janela aparecerá, em estágio selecione novo estágio e dê um nome ao estágio, por exemplo "web-app-stage", então clique em implantar.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-new-stage2.png)

Quando você visualizar o estágio, haverá uma URL chamada Invoke URL. Certifique-se de copiar essa URL; usaremos para invocar nossa função lambda na etapa final deste projeto.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-invoke-url.png)

## Passo 4: Criar uma tabela DynamoDB

Neste passo, criaremos uma tabela de dados no Amazon DynamoDB, outro serviço da AWS. O DynamoDB é um serviço de banco de dados NoSQL que armazena dados em pares chave-valor. É altamente escalável e flexível, tornando-o adequado para várias aplicações. Clique no botão laranja criar tabela.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-create-table.png)

Agora temos que preencher algumas informações sobre nossa tabela de dados, como o nome "contact-management-system-table", e a chave de partição é ID. O resto deixe como padrão. Clique em Criar tabela.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-settings.png)

Uma vez que a tabela seja criada com sucesso, clique nela e uma nova janela com os detalhes da tabela se abrirá. Expanda as Informações Adicionais e copie o Nome do Recurso da Amazon (ARN). Usaremos o ARN no próximo passo ao criar políticas de acesso IAM.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-arn.png)

## Etapa 5: Configurar Políticas e Permissões do IAM

AWS IAM é uma das coisas mais básicas e importantes a serem configuradas, mas muitas pessoas negligenciam isso. Para uma segurança aprimorada, sempre é recomendado um modelo de acesso de menor privilégio, o que significa não dar mais acesso do que o necessário a um usuário. Por exemplo, mesmo para este simples projeto de aplicativo web, já trabalhamos com vários serviços da AWS: Amplify, Lambda, DynamoDB e API Gateway. É essencial entender como eles se comunicam entre si e que tipo de informação compartilham.

Agora, voltando ao nosso projeto, precisamos definir uma política do IAM para dar acesso à nossa função lambda para escrever/atualizar os dados na tabela DynamoDB.

Então, volte ao console do AWS Lambda e clique na função lambda que acabamos de criar. Depois, vá para a aba de configuração, e no menu à esquerda clique em Permissões. Sob a Role de execução, você verá um nome de Role.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-permissions.png)

Clique no link, que nos levará às configurações de permissão desta role do IAM. Agora clique em Adicionar permissões, depois crie uma política inline.

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-permissions.png)

Então clique em JSON, apague o que está no editor de Política e cole o seguinte.


Certifique-se de substituir o "YOUR-DB-TABLE-ARN" pelo seu real ARN da tabela DynamoDB. Clique em Próximo, dê um nome à política, como "lambda-dynamodb", e então clique em Criar política. Esta política permitirá que nossa função Lambda leia, edite, delete e atualize itens da tabela de dados DynamoDB.

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-json-permissions.png)

Agora feche esta janela, e de volta à função Lambda, vá para a aba Código e atualizaremos o código python da função lambda com o seguinte.

{{< gist juliafmorgado 8eb027cb9502b88d91d2710fbe99b347 >}}

A resposta está no formato REST API. Após fazer as alterações, certifique-se de implantar o código. Após a conclusão da implantação, podemos Testar o programa clicando no botão de teste azul.

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-new.png)

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-succeeded.png)

Também podemos verificar os resultados na tabela DynamoDB. Quando executamos a função, ela atualiza os dados na nossa tabela. Então, vá para o AWS DynamoDB, clique em explorar itens na barra lateral esquerda, clique na sua tabela. Aqui está o objeto retornado da função lambda:

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-explore-items.png)

## Etapa 6: Atualizar o código frontend com Rest API

Parabéns por chegar até aqui!

Nesta etapa final, veremos tudo o que acabamos de construir em ação. Atualizaremos o front-end para ser capaz de invocar a REST API com a ajuda da nossa função lambda e receber dados.

Primeiro, volte ao seu index.html no seu editor de código. Veja na linha 68 que você tinha "API_KEY"? Vá em frente e substitua isso pela URL de invocação que você copiou do serviço API Gateway em detalhes da sua REST API. Uma vez feito isso, salve e comprima o arquivo novamente, como fizemos na etapa 1, e faça o upload novamente para a AWS usando o console.

![](https://blog-imgs-23.s3.amazonaws.com/index-code-vscode.png)

Clique no novo link que você obteve e vamos testá-lo.

![](https://blog-imgs-23.s3.amazonaws.com/web-app-test.png)

Nossas tabelas de dados recebem a solicitação post com os dados inseridos. A função lambda invoca a API quando o botão “Chamar API” é clicado. Então, usando javascript, enviamos os dados em formato JSON para a API. Você pode encontrar as etapas sob a função callAPI.

Você pode encontrar os itens retornados para minha tabela de dados abaixo:

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-final-result.png)

## Conclusão

Parabéns! Você criou um aplicativo web simples usando a plataforma de nuvem AWS. A computação em nuvem está crescendo rapidamente e se tornando cada vez mais parte do desenvolvimento de novos softwares e tecnologias.

Se você estiver pronto para um desafio, a seguir você poderia:

- Melhorar o design do frontend
- Adicionar autenticação e autorização do usuário
- Configurar painéis de monitoramento e análise
- Implementar pipelines de CI/CD para automatizar os processos de construção, teste e implantação de seu aplicativo web usando serviços como AWS CodePipeline, AWS CodeBuild e AWS CodeDeploy.

Trabalhar em projetos de programação práticos é a melhor maneira de aprimorar suas habilidades.

Estarei abordando alguns outros cenários na AWS em meus próximos posts no blog, então fique de olho!

E novamente, fique à vontade para me dar feedback, e se eu estiver fora do caminho, não hesite em me avisar. Estamos todos juntos nisso, aprendendo e crescendo como uma comunidade!

***

Se você gostou deste artigo, siga-me no [Twitter](https://twitter.com/juliafmorgado) (onde compartilho minha jornada tecnológica diariamente), conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), confira meu [IG](https://www.instagram.com/juliafmorgado/) e não se esqueça de se inscrever no meu canal do [Youtube](https://www.youtube.com/c/JuliaFMorgado) para mais conteúdo incrível!!
