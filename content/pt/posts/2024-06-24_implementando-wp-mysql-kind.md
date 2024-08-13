---
title: "Implantando WordPress e MySQL no Kubernetes com Kind: Um Guia Passo a Passo"
author: "Julia Furst Morgado"
date: 2024-06-24T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/wp-mysql-kind-banner.png
tags: 
    - Kubernetes
slug: /implantando-wordpress-mysql-no-kubernetes-com-kind
---

Este blog é inspirado por um [artigo](https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/) do site do Kubernetes que ensina como implantar WordPress e MySQL no Minikube, mas como achei muito confuso e queria usar Kind, estou escrevendo este guia passo a passo.

Implantar WordPress e MySQL no Kubernetes usando [Kind (Kubernetes IN Docker)](https://kind.sigs.k8s.io/) é uma excelente maneira de criar um ambiente de desenvolvimento local robusto. Este guia o acompanha em todo o processo, desde a instalação das ferramentas necessárias até a limpeza do seu deployment.

## Instalação

Para usar Kind, a primeira coisa que você precisa é de um host com Docker. Siga as instruções no [site do Docker](https://docs.docker.com/get-docker/) para instalar o Docker na sua máquina. Em seguida, você precisa instalar a ferramenta Kind. O processo de instalação varia dependendo do seu sistema operacional. Para MacOS, você pode usar [Homebrew](https://formulae.brew.sh/formula/kind):

`brew install kind`

Com Docker e Kind instalados, você está pronto para criar seu cluster Kubernetes.

## Crie um Cluster com Mais de um Nó
Por padrão, Kind cria um cluster de nó único. Para simular um ambiente mais complexo, você pode criar um cluster multinó.

Execute este comando para criar um arquivo chamado `kind-node.yaml` com o seguinte conteúdo:

```
cat <<EOF >kind-node.yaml
# Configuração de cluster de três nós (dois workers)
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF
```

Você pode verificar se o arquivo foi criado executando `ls` no seu terminal.

Agora, para aplicar essa configuração e criar o cluster, é necessário adicionar o parâmetro `–config` e o nome do arquivo onde você o salvou.

Então, execute o seguinte comando:

`kind create cluster --config=kind-node.yaml`

![](https://blog-imgs-23.s3.amazonaws.com/kind-cluster.png)

Uma vez que seu cluster foi criado, você pode verificar os nós no seu cluster com o comando: 

`kubectl get nodes`

Alternativamente, você pode usar o Docker para ver os nós: 

`docker ps`

Essa configuração garante que todos os três nós (control-plane e dois nós worker) estejam sendo executados como containers Docker no seu host.

## Instalando WordPress e MySQL
Agora, vamos implantar WordPress e MySQL no seu cluster. Para fazer isso, você precisará de dois arquivos de configuração chamados manifests que definem as configurações para os pods MySQL e WordPress.

## Baixe o Manifesto MySQL
Comece baixando o arquivo de configuração de deployment do MySQL:

`curl -LO https://k8s.io/examples/application/wordpress/mysql-deployment.yaml`

Este manifesto define um deployment MySQL de instância única. Dentro dessa configuração:

- O container MySQL está configurado para usar um PersistentVolume localizado em `/var/lib/mysql` para armazenar seus dados.
- A variável de ambiente `MYSQL_ROOT_PASSWORD` é crucial, pois protege o banco de dados MySQL definindo a senha root recuperada de um Secret do Kubernetes.


## Baixe o Manifesto WordPress
Em seguida, recupere o arquivo de configuração de deployment do WordPress:

`curl -LO https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml`

Este manifesto detalha um deployment WordPress de instância única. Pontos-chave incluem:

- O container WordPress utiliza um PersistentVolume montado em `/var/www/html` para armazenar seus arquivos de dados do site.
- A variável de ambiente `WORDPRESS_DB_HOST` especifica o nome do serviço MySQL, permitindo que o WordPress se comunique com o banco de dados MySQL via descoberta de serviços do Kubernetes.
- A variável de ambiente `WORDPRESS_DB_PASSWORD` recupera a senha do banco de dados com segurança de um Secret gerenciado pelo Kubernetes.

### PersistentVolumes e Deployment
Tanto o MySQL quanto o WordPress dependem de PersistentVolumes para preservar dados entre reinicializações ou reprogramações dos pods. O Kubernetes gerencia a criação de PersistentVolumeClaims (PVCs) com base nas definições fornecidas em seus respectivos arquivos manifest durante o deployment.

Seguindo esses passos e implantando esses manifests, você estabelece um ambiente robusto para WordPress e MySQL no Kubernetes. Essa configuração garante a integridade e disponibilidade dos dados, aproveitando efetivamente as capacidades de orquestração do Kubernetes.

### Crie um kustomization.yaml
Um arquivo kustomization é usado para definir um conjunto de recursos e parâmetros de configuração do Kubernetes para deployments. Ele permite que você personalize, gerencie e implante aplicações Kubernetes de maneira estruturada.

Então, crie um arquivo `kustomization.yaml` para especificar a ordem de execução e gerar um Secret para a senha do MySQL. Isso garante a gestão segura de dados sensíveis, como senhas, usando Secrets do Kubernetes.

Substitua `SUA_SENHA` pela sua senha desejada:

```
cat <<EOF >kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization 
secretGenerator:
- name: mysql-pass
  literals:
  - password=SUA_SENHA
resources:
  - mysql-deployment.yaml
  - wordpress-deployment.yaml
EOF
```

## Aplique e Verifique
Novamente, você pode verificar se o arquivo foi criado executando `ls` no seu terminal. Você deve ver 4 arquivos.

Com todos os arquivos de configuração no lugar, implante os recursos usando o seguinte comando:

`kubectl apply -k ./`

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp-mysql-dep.png)

Verifique se todos os objetos foram criados:

```
kubectl get pods
kubectl get secrets
kubectl get pvc
kubectl get services
```

## Exponha o Serviço WordPress
Quando executando Kubernetes em um ambiente de desenvolvimento local, como Kind (Kubernetes IN Docker), o tipo de serviço LoadBalancer não funcionará como esperado porque não há um load balancer externo disponível. No entanto, você ainda pode acessar serviços em execução em um cluster Kind sem precisar de suporte embutido para LoadBalancer usando Port Forwarding.

Esta é uma maneira simples de acessar seu serviço a partir da sua máquina local.

`kubectl port-forward svc/wordpress 8080:80`

![](https://blog-imgs-23.s3.amazonaws.com/kind-expose-wp-service.png)

VOILÁ! Depois de executar este comando, você pode acessar seu site WordPress em http://localhost:8080.

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp.png)

Para parar o port forwarding, pressione `Ctrl+C` no seu terminal.

## Limpeza
Depois de terminar com seu deployment de WordPress e MySQL, limpe seus recursos.

Exclua os recursos implantados:

`kubectl delete -k ./`

Exclua o cluster Kind:

`kind delete cluster`

Seguindo esses passos, você implantou com sucesso WordPress e MySQL em um cluster multinó Kind. Esta configuração proporciona um ambiente de desenvolvimento local escalável e facilmente gerenciável para seus projetos.


***
Se você gostou deste artigo, siga-me no [Twitter](https://twitter.com/juliafmorgado) (onde compartilho minha jornada tecnológica) diariamente, conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), confira meu [IG](https://www.instagram.com/juliafmorgado/), e certifique-se de se inscrever no meu canal [Youtube](https://www.youtube.com/c/JuliaFMorgado) para mais conteúdo incrível!!
