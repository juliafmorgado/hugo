---
title: "Como passar o exame KCNA - Kubernetes And Cloud Native Associate"
author: "Julia Furst Morgado"
date: 2024-02-05T10:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/how-to-pass-kcna.png
tags: 
    - Kubernetes
    - DevOps
categories: 
    - Tech
slug: /como-passar-o-exame-kcna-kubernetes-cloud-native-associate
---

Ontem fiz o exame de certificação [Kubernetes and Cloud Native Associate Exam (KCNA)](https://www.cncf.io/training/certification/kcna/), e esta manhã recebi os resultados de que passei, yay! Embora alguns consideram que o exame é para iniciantes, não é tão moleza nao! Ele requer uma base sólida e experiência prática com o Kubernetes e projetos Open Source relacionados para ser aprovado com sucesso.

O exame de certificação KCNA é realizado online e custa $250 (R$1246 caraca), o que inclui uma segunda tentativa gratuita. Se você não passar na primeira tentativa, terá a oportunidade de refazer o exame dentro de um ano da compra inicial.

Para facilitar sua vida, compilei uma lista de [15 opções para criar um ambiente para brincar com o Kubernetes](https://www.juliafmorgado.com/posts/15-options-to-build-kubernetes-playground/) e recomendo fortemente que você ganhe experiência prática usando qualquer uma das ferramentas mencionadas no meu post no blog. Familiarizar-se com a linha de comando kubectl é crucial e a abordagem prática e direta solidifica sua compreensão do Kubernetes e permite que você internalize os conceitos de maneira mais eficaz.

Agora, vamos nos aprofundar nos principais domínios abordados no exame KCNA:

## Principais Domínios

### Fundamentos do Kubernetes (46%)

Compreender profundamente:
- O problema que o Kubernetes resolve
- A arquitetura do Kubernetes e os papéis de seus componentes
- A hierarquia dos componentes do Kubernetes, do Cluster ao Node ao Pod ao Contêiner
- Conceitos como services, deployments, replicasets, daemonsets, statefulsets, configmaps, secrets, network policies, RBAC, service discovery, manifests, autoscaling, e load balancing
- Elementos necessários em um manifest do Kubernetes
- O uso do kubectl e comandos comuns do Kubernetes
- Conhecimento de YAML e JSON
- A capacidade de estender a API do Kubernetes

### Orquestração de Contêineres (22%)

- Compreender os problemas que a Orquestração de Contêineres resolve
- Visão geral dos diferentes tipos de Padrões Abertos:
  - Interface de Runtime de Contêiner (CRI) e runtimes disponíveis
  - Interface de Rede de Contêiner (CNI)
  - Interface de Armazenamento de Contêiner (CSI)
  - Interface de Malha de Serviço (SMI)
- Entender o que são Namespaces e Cgroups

### Arquitetura Cloud Native (16%)

- Estrutura da Cloud Native Computing Foundation (CNCF)
- Ferramentas serverless para o Kubernetes
- Helm e gráficos Helm

### Observabilidade Cloud Native (8%)

- Capacidade de definir observabilidade e conhecer a diferença entre logs, métricas e traces
- O que é Prometheus e Grafana
- Comandos comuns do kubectl para visualizar logs de pods, especificações, dry-run, etc.

### Entrega de Aplicações Cloud Native (8%)

Definir e entender várias ferramentas e conceitos relacionados à entrega de aplicativos em um ambiente Cloud Native:
- DevOps
- GitOps
- CI/CD
- O que um SRE faz

## Recursos para Estudo

- A [documentação oficial do Kubernetes](https://kubernetes.io/docs/home/), embora densa, é uma valiosa fonte de estudo.
- O [Landscape da Cloud Native Computing Foundation](https://landscape.cncf.io/) fornece uma visão geral de todos os projetos e tecnologias da CNCF.
- Recomendo o curso [Dive Into Cloud Native, Containers, Kubernetes and the KCNA Exam](https://diveinto.com/p/dive-into-cloud-native-containers-kubernetes-and-the-kcna), do James Spurin, ele é super detalhado está com um desconto de 90% se você o comprar agora (é em ingles)
- Se você não tem tanto tempo para estudar, recomendo o livro [Becoming KCNA Certified](https://www.amazon.com/Becoming-KCNA-Certified-foundation-Kubernetes/dp/1804613398), do Dmitry Galkin (é em ingles)

## Dicas para o Exame de Certificação KCNA

- Faça login no seu exame pelo menos 30-15 minutos antes do horário de início. O fiscal precisa desse tempo para verificar sua identidade e revisar seu espaço de trabalho via webcam.
- Como o exame KCNA é realizado em casa, é importante ter um espaço limpo e sem desordem disponível. Certifique-se de preparar seu espaço de trabalho no dia anterior ao exame. Lembre-se, você deve estar sozinho no quarto durante o exame, então planeje adequadamente.
- Lembre-se de que é necessário manter sua webcam e áudio ligados durante todo o exame. Como isso pode consumir a bateria do seu laptop, lembre-se de ter seu carregador à mão.
- BOA SORTE, VAI QUE VAI!

***
Se você gostou deste artigo, siga-me no [Twitter](https://twitter.com/juliafmorgado) (onde compartilho minha jornada tecnológica) diariamente, conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), confira meu [IG](https://www.instagram.com/juliafmorgado/), e certifique-se de se inscrever no meu canal [Youtube](https://www.youtube.com/c/JuliaFMorgado) para mais conteúdo incrível!!

