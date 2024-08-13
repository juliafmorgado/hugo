---
title: "Déployez Facilement WordPress et MySQL sur Amazon EKS"
author: "Julia Furst Morgado"
date: 2024-07-01T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-wp-mysql-eks-thumbnail.png
tags: 
    - Kubernetes
slug: /deployez-facilement-wordpress-mysql-sur-amazon-eks
---



[Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) est un service Kubernetes géré qui facilite l'exécution de Kubernetes sur AWS sans avoir à installer et à gérer votre propre plan de contrôle Kubernetes ou vos nœuds. En tirant parti d'EKS, vous bénéficiez de l'évolutivité, de la sécurité et de la fiabilité d'AWS tout en simplifiant vos tâches de gestion de Kubernetes. Dans ce guide, nous allons passer en revue les étapes pour déployer un site WordPress avec état et sa base de données MySQL sur un cluster EKS, démontrant ainsi la puissance et la simplicité de l'utilisation de Kubernetes géré avec AWS.

**Prérequis**

- Vous devez avoir un compte AWS créé: [LIEN](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- Utilisateur IAM dans AWS avec des pouvoirs d'administrateur: [LIEN](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
- Pour accéder au compte AWS depuis l'interface CLI, vous devez avoir AWS CLI installé sur votre machine. Pour installer AWS CLI, suivez cette documentation: [LIEN](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- Pour gérer Kubernetes, vous avez besoin de la commande `kubectl`: [LIEN](https://kubernetes.io/docs/tasks/tools/install-kubectl/) or [LIEN](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
- Installez la commande `eksctl` sur votre machine locale pour gérer les clusters EKS: [LIEN](https://eksctl.io/installation/)
- Helm installé pour la gestion des packages Kubernetes: [LIEN](https://formulae.brew.sh/formula/helm) or [LIEN](https://helm.sh/docs/intro/install/)

## Étape 1. Créez un cluster EKS

Créez votre cluster Kubernetes avec `eksctl` en utilisant les commandes suivantes :


```
eksctl create cluster \
--name eks-wp \
--region us-east-1 \
--zones us-east-1a,us-east-1b \
--managed 
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-ready.png)

Une fois que votre cluster est déployé, vous pouvez vérifier la connectivité avec la commande: `kubectl cluster-info`

Pour voir les nœuds: `kubectl get nodes`

Pour voir les pods déjà en cours d'exécution: `kubectl get pods -A`

Pour obtenir des informations détaillées sur les instances sur lesquelles les pods s'exécutent: `kubectl get pods -o wide -A`

## Étape 2. Créez un fournisseur OIDC IAM pour votre cluster

Tout d'abord, créez un [fournisseur IAM OIDC](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) pour votre cluster EKS afin de permettre l'utilisation des rôles IAM pour les comptes de service Kubernetes. Cette fonctionnalité permet aux comptes de service Kubernetes d'assumer des rôles IAM, permettant une gestion des autorisations plus fine pour les pods exécutés dans votre cluster.

```
oidc_id=$(aws eks describe-cluster --name eks-wp --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4
eksctl utils associate-iam-oidc-provider --cluster eks-wp --approve
```
![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-oidc.png)

## Étape 3. Ajoutez un rôle IAM avec `eksctl`

Créez un  [compte de service IAM](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) avec les politiques nécessaires attachées.

```
eksctl create iamserviceaccount \
--name ebs-csi-controller-sa \
--namespace kube-system \
--cluster eks-wp \
--attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
--approve \
--role-name AmazonEKS_EBS_CSI_DriverRole
```

Cette commande est essentielle pour configurer l'infrastructure IAM nécessaire permettant au pilote EBS CSI (Elastic Block Store Container Storage Interface) de gérer les volumes EBS dans votre cluster Kubernetes sur AWS EKS. Le rôle IAM (`AmazonEKS_EBS_CSI_DriverRole`) créé ici aura les permissions définies par la politique attachée (`AmazonEBSCSIDriverPolicy`), permettant au pilote CSI d'effectuer des actions comme l'attachement, le détachement et la gestion des volumes EBS en tant que stockage persistant pour vos charges de travail Kubernetes.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-iamsa-ebs-csi-controller.png)

## Étape 4. Installez le pilote EBS CSI

Ajoutez le pilote EBS CSI à votre cluster EKS en utilisant le rôle IAM créé.

```
# Obtenez l'ARN du rôle IAM
role_arn=$(aws iam list-roles --query "Roles[?RoleName=='AmazonEKS_EBS_CSI_DriverRole'].Arn" --output text)

# Installez le pilote EBS CSI
eksctl create addon --name aws-ebs-csi-driver --cluster eks-wp --service-account-role-arn $role_arn --force

```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-ebs-csi-install.png)

## Étape 5. Déployez le pilote EBS CSI sur votre cluster Amazon EKS

Ajoutez et installez le pilote EBS CSI en utilisant Helm.

```
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver
helm repo update
helm upgrade --install aws-ebs-csi-driver \
    --namespace kube-system \
    aws-ebs-csi-driver/aws-ebs-csi-driver
```

Une fois le pilote déployé, vérifiez que les pods sont en cours d'exécution :

`kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver`

## Étape 6. Déployez MySQL et WordPress

Vous pouvez maintenant créer les ressources Kubernetes nécessaires pour MySQL et WordPress dans le cluster. Pour cela, vous devez créer deux fichiers. Ces fichiers contiennent des informations sur les différents paramètres à appliquer à nos pods MySQL et WordPress, ainsi que les services et les revendications de volumes persistants.

Téléchargez les fichiers de configuration suivants:

- Fichier de configuration MySQL : exécutez la commande

`curl -LO [https://k8s.io/examples/application/wordpress/mysql-deployment.yaml](https://k8s.io/examples/application/wordpress/mysql-deployment.yaml)`

Ce manifeste décrit un déploiement MySQL à instance unique. Le conteneur MySQL monte le volume persistant à /var/lib/mysql. La variable d'environnement `MYSQL_ROOT_PASSWORD` définit le mot de passe de la base de données à partir du Secret.

- Fichier WordPress : exécutez la commande

`curl -LO [https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml](https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml)`

Ce manifeste décrit un déploiement WordPress à instance unique. Le conteneur WordPress monte le volume persistant à /var/www/html pour les fichiers de données du site web. La variable d'environnement `WORDPRESS_DB_HOST` définit le nom du service MySQL défini ci-dessus, et WordPress accède à la base de données par service. La variable d'environnement `WORDPRESS_DB_PASSWORD` définit le mot de passe de la base de données à partir du Secret généré par kustomize.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-curl-wp-mysql.png)

## Étape 7. Créez un kustomization.yaml

Dans ce fichier, nous allons spécifier l'ordre d'exécution des fichiers téléchargés ci-dessus, ainsi que la clé secrète.

Un [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) est un objet qui stocke une donnée sensible comme un mot de passe ou une clé. Depuis la version 1.14, `kubectl` prend en charge la gestion des objets Kubernetes en utilisant un fichier de kustomization. Vous pouvez créer un Secret par des générateurs dans `kustomization.yaml`.

Ajoutez un générateur de Secret dans `kustomization.yaml` avec la commande suivante (vous devrez remplacer `YOUR_PASSWORD` par le mot de passe que vous souhaitez utiliser)

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

## Étape 8. Déployez les conteneurs

Déployez maintenant les deux conteneurs sur EKS avec la commande suivante :

```
kubectl apply -k .
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-applyk.png)

Vous pouvez vérifier que tous les objets existent:

- Pods: `kubectl get pods`
- Secrets: `kubectl get secrets`
- Persistent Volume Claims: `kubectl get pvc`
- Services: `kubectl get services`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-objects.png)

Une fois les conteneurs créés avec succès et que les pods sont affichés comme “Running” dans Kubernetes, vous pouvez obtenir le nom DNS du LoadBalancer ELB en tapant la commande suivante:

`kubectl get svc wordpress`

Collez-le dans le navigateur web.

**Voilá**

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-main-dashboard.png)

Si vous vous sentez courageux, consultez mon prochain tutoriel pour apprendre à installer Kasten sur ce cluster EKS!

## Nettoyez votre environnement

Pour nettoyer votre environnement, suivez ces étapes:

1) Supprimez les ressources Kubernetes:

`kubectl delete -k .`

2) Utilisez `eksctl` pour supprimer votre cluster EKS et toutes ses dépendances via CloudFormation:

`eksctl delete cluster eks-wp`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-deleted.png)

***

Si vous avez aimé cet article, suivez-moi sur [Twitter](https://twitter.com/juliafmorgado) (où je partage mon parcours tech quotidien), connectez-vous avec moi sur [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), consultez mon [IG](https://www.instagram.com/juliafmorgado/), et assurez-vous de vous abonner à ma chaîne [Youtube](https://www.youtube.com/c/JuliaFMorgado) pour plus de contenu incroyable!!
