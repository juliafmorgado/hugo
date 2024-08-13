---
title: "Implante Facilmente WordPress e MySQL no Amazon EKS"
author: "Julia Furst Morgado"
date: 2024-07-01T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-wp-mysql-eks-thumbnail.png
tags: 
    - Kubernetes
slug: /implante-facilmente-wordpress-mysql-no-amazon-eks
---



[Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) é um serviço gerenciado de Kubernetes que facilita a execução do Kubernetes na AWS sem a necessidade de instalar e operar seu próprio plano de controle do Kubernetes ou nós. Aproveitando o EKS, você se beneficia da escalabilidade, segurança e confiabilidade da AWS, enquanto simplifica suas tarefas de gerenciamento do Kubernetes. Neste guia, vamos percorrer os passos para implantar um site WordPress com estado e seu banco de dados MySQL em um cluster EKS, demonstrando o poder e a facilidade de usar o Kubernetes gerenciado com a AWS.

**Pré-requisitos**

- Você deve ter uma conta AWS criada: [LINK](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- Usuário IAM na AWS com poderes de administrador: [LINK](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
- Para acessar a conta AWS pela CLI, você deve ter AWS CLI instalado na sua máquina. Para instalar AWS CLI siga esta documentação: [LINK](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- Para gerenciar Kubernetes, você precisa do comando `kubectl`: [LINK](https://kubernetes.io/docs/tasks/tools/install-kubectl/) ou [LINK](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
- Instale o comando `eksctl` na sua máquina local para gerenciar clusters EKS: [LINK](https://eksctl.io/installation/)
- Helm instalado para gerenciamento de pacotes do Kubernetes: [LINK](https://formulae.brew.sh/formula/helm) ou [LINK](https://helm.sh/docs/intro/install/)

## Passo 1. Crie cluster EKS

Crie seu cluster Kubernetes com `eksctl` usando os seguintes comandos:

```
eksctl create cluster \
--name eks-wp \
--region us-east-1 \
--zones us-east-1a,us-east-1b \
--managed 
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-ready.png)

Uma vez que seu cluster esteja implantado, você pode verificar a conectividade com o comando: `kubectl cluster-info`

Para ver os nós: `kubectl get nodes`

Para ver os pods que já estão em execução: `kubectl get pods -A`

Para obter informações detalhadas sobre as instâncias nas quais os pods estão sendo executados: `kubectl get pods -o wide -A`

## Passo 2. Crie um Provedor OIDC IAM para seu cluster

Primeiro, crie um [provedor IAM OIDC](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) para seu cluster EKS para permitir o uso de funções IAM para contas de serviço do Kubernetes. Este recurso permite que contas de serviço do Kubernetes assumam funções IAM, permitindo uma gestão de permissões mais granular para pods em execução no seu cluster.

```
oidc_id=$(aws eks describe-cluster --name eks-wp --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4
eksctl utils associate-iam-oidc-provider --cluster eks-wp --approve
```
![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-oidc.png)

## Passo 3. Adicione função IAM usando `eksctl`

Crie uma [conta de serviço IAM](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) com as políticas necessárias anexadas.

```
eksctl create iamserviceaccount \
--name ebs-csi-controller-sa \
--namespace kube-system \
--cluster eks-wp \
--attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
--approve \
--role-name AmazonEKS_EBS_CSI_DriverRole
```

Este comando é essencial para configurar a infraestrutura IAM necessária para permitir que o driver EBS CSI (Elastic Block Store Container Storage Interface) gerencie volumes EBS dentro do seu cluster Kubernetes no AWS EKS. A função IAM (`AmazonEKS_EBS_CSI_DriverRole`) criada aqui terá as permissões definidas pela política anexada (`AmazonEBSCSIDriverPolicy`), permitindo que o driver CSI realize ações como anexar, desanexar e gerenciar volumes EBS como armazenamento persistente para suas cargas de trabalho Kubernetes.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-iamsa-ebs-csi-controller.png)

## Passo 4. Instale o driver EBS CSI

Adicione o driver EBS CSI ao seu cluster EKS usando a função IAM criada.

```
# Obtenha o ARN da função IAM
role_arn=$(aws iam list-roles --query "Roles[?RoleName=='AmazonEKS_EBS_CSI_DriverRole'].Arn" --output text)

# Instale o driver EBS CSI
eksctl create addon --name aws-ebs-csi-driver --cluster eks-wp --service-account-role-arn $role_arn --force

```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-ebs-csi-install.png)

## Passo 5. Implante o driver Amazon EBS CSI no seu cluster Amazon EKS

Adicione e instale o driver EBS CSI usando Helm.

```
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver
helm repo update
helm upgrade --install aws-ebs-csi-driver \
    --namespace kube-system \
    aws-ebs-csi-driver/aws-ebs-csi-driver
```

Uma vez que o driver tenha sido implantado, verifique se os pods estão em execução:

`kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver`

## Passo 6. Implante MySQL e WordPress

Agora, você pode criar os recursos Kubernetes necessários para MySQL e WordPress no cluster. Para isso, você precisa criar dois arquivos. Esses arquivos contêm informações sobre as diferentes configurações a serem aplicadas aos nossos pods MySQL e WordPress, bem como serviços e reivindicações de volumes persistentes.

Baixe os seguintes arquivos de configuração:

- Arquivo de configuração do MySQL: execute o comando

`curl -LO https://k8s.io/examples/application/wordpress/mysql-deployment.yaml`

Este manifesto descreve uma implantação MySQL de instância única. O contêiner MySQL monta o Volume Persistente em /var/lib/mysql. A variável de ambiente `MYSQL_ROOT_PASSWORD` define a senha do banco de dados a partir do Secret.

- Arquivo do WordPress: execute o comando

`curl -LO https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml`

Este manifesto descreve uma implantação WordPress de instância única. O contêiner WordPress monta o Volume Persistente em /var/www/html para arquivos de dados do site. A variável de ambiente `WORDPRESS_DB_HOST` define o nome do Serviço MySQL definido acima, e o WordPress acessará o banco de dados pelo Serviço. A variável de ambiente `WORDPRESS_DB_PASSWORD` define a senha do banco de dados a partir do Secret gerado pelo kustomize.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-curl-wp-mysql.png)

## Passo 7. Crie um kustomization.yaml

Neste arquivo, vamos especificar a ordem de execução dos arquivos baixados acima, junto com a chave secreta.

Um [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) é um objeto que armazena uma informação sensível como uma senha ou chave. Desde a versão 1.14, `kubectl` suporta a gestão de objetos Kubernetes usando um arquivo de kustomization. Você pode criar um Secret por geradores em `kustomization.yaml`.

Adicione um gerador de Secret em `kustomization.yaml` com o seguinte comando (você precisará substituir `YOUR_PASSWORD` pela senha que deseja usar)

```
cat <<EOF >kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization 
secretGenerator:
- name: mysql-pass
  literals:
  - password=YOUR_PASSWORD
resources:
  - mysql-deployment.yaml
  - wordpress-deployment.yaml
EOF
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-kustomization.png)

## Passo 8. Implante os contêineres

Agora, implante os dois contêineres no EKS com o seguinte comando:

```
kubectl apply -k .
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-applyk.png)

Você pode verificar os objetos existentes:

- Pods: `kubectl get pods`
- Secrets: `kubectl get secrets`
- Persistent Volume Claims: `kubectl get pvc`
- Services: `kubectl get services`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-objects.png)

Uma vez que os contêineres tenham sido criados com sucesso e que os pods estejam exibidos como “Running” no Kubernetes, você pode obter o nome DNS do LoadBalancer ELB digitando o seguinte comando:

`kubectl get svc wordpress`

Cole no navegador web.

**Voilá**

Parabéns! Você implantou com sucesso seu site WordPress com estado na AWS no EKS!

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-main-dashboard.png)

Se você estiver se sentindo corajoso, vá para o meu próximo tutorial para aprender a [instalar Kasten neste cluster EKS](https://www.juliafmorgado.com/posts/install-veeam-kasten-on-an-amazon-eks-cluster/)!

## Limpe seu ambiente

Para limpar seu ambiente, siga estas etapas:

1) Exclua os recursos do Kubernetes:

`kubectl delete -k .`

2) Use `eksctl` para excluir seu cluster EKS e todas as suas dependências via CloudFormation:

`eksctl delete cluster eks-wp`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-deleted.png)


***
Se você gostou deste artigo, siga-me no [Twitter](https://twitter.com/juliafmorgado) (onde compartilho minha jornada tecnológica) diariamente, conecte-se comigo no [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), confira meu [IG](https://www.instagram.com/juliafmorgado/), e certifique-se de se inscrever no meu canal [Youtube](https://www.youtube.com/c/JuliaFMorgado) para mais conteúdo incrível!!
