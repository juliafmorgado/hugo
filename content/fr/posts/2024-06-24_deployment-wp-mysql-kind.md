---
title: "Déploiement de WordPress et MySQL sur Kubernetes avec Kind : Guide étape par étape"
author: "Julia Furst Morgado"
date: 2024-06-24T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/wp-mysql-kind-banner.png
tags: 
    - Kubernetes
slug: /deploiement-wordpress-mysql-sur-kubernetes-avec-kind
---
Ce blog est inspiré par un [article](https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/) du site Kubernetes qui explique comment déployer WordPress et MySQL sur Minikube, mais comme je l'ai trouvé très confus et que je voulais utiliser Kind, j'ai rédigé ce guide étape par étape.

Déployer WordPress et MySQL sur Kubernetes en utilisant [Kind (Kubernetes IN Docker)](https://kind.sigs.k8s.io/) est une excellente façon de créer un environnement de développement local robuste. Ce guide vous accompagne tout au long du processus, de l'installation des outils nécessaires au nettoyage de votre déploiement.

## Installation
Pour utiliser Kind, vous avez besoin d'un hôte avec Docker. Suivez les instructions sur le [site de Docker](https://docs.docker.com/get-docker/) pour installer Docker sur votre machine. Ensuite, installez l'outil Kind. Le processus d'installation varie selon votre système d'exploitation. Pour MacOS, vous pouvez utiliser [Homebrew](https://formulae.brew.sh/formula/kind):

`brew install kind`

Avec Docker et Kind installés, vous êtes prêt à créer votre cluster Kubernetes.

## Créer un Cluster avec Plusieurs Nœuds
Par défaut, Kind crée un cluster à un seul nœud. Pour simuler un environnement plus complexe, vous pouvez créer un cluster multi-nœuds.

Exécutez cette commande pour créer un fichier nommé `kind-node.yaml` avec le contenu suivant:

```
cat <<EOF >kind-node.yaml
# Configuration d'un cluster à trois nœuds (deux workers)
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF
```

Vous pouvez vérifier que le fichier a été créé en exécutant `ls` dans votre terminal.

Pour appliquer cette configuration et créer le cluster, utilisez la commande suivante:

`kind create cluster --config=kind-node.yaml`

![](https://blog-imgs-23.s3.amazonaws.com/kind-cluster.png)

Une fois votre cluster créé, vous pouvez vérifier les nœuds dans votre cluster avec la commande: `kubectl get nodes`

Alternativement, vous pouvez utiliser Docker pour voir les nœuds: `docker ps`

Cette configuration garantit que les trois nœuds (control-plane et deux nœuds workers) fonctionnent en tant que conteneurs Docker sur votre hôte.

## Installation de WordPress et MySQL

Maintenant, déployons WordPress et MySQL sur votre cluster. Pour ce faire, vous avez besoin de deux fichiers de configuration appelés manifestes qui définissent les paramètres des pods MySQL et WordPress.

### Télécharger le Manifeste MySQL
Commencez par télécharger le fichier de configuration du déploiement MySQL:

`curl -LO https://k8s.io/examples/application/wordpress/mysql-deployment.yaml`

Ce manifeste définit un déploiement MySQL à instance unique. Dans cette configuration:

- Le conteneur MySQL est configuré pour utiliser un PersistentVolume situé à `/var/lib/mysql` pour stocker ses données.
- La variable d'environnement `MYSQL_ROOT_PASSWORD` est cruciale car elle sécurise la base de données MySQL en définissant le mot de passe root récupéré à partir d'un Secret Kubernetes.

### Télécharger le Manifeste WordPress
Ensuite, récupérez le fichier de configuration du déploiement WordPress:

`curl -LO https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml`

Ce manifeste détaille un déploiement WordPress à instance unique. Les points clés incluent:

- Le conteneur WordPress utilise un PersistentVolume monté à `/var/www/html` pour stocker les fichiers de données de son site web.
- La variable d'environnement `WORDPRESS_DB_HOST` spécifie le nom du service MySQL, permettant à WordPress de communiquer avec la base de données MySQL via la découverte de service Kubernetes.
- La variable d'environnement `WORDPRESS_DB_PASSWORD` récupère le mot de passe de la base de données de manière sécurisée à partir d'un Secret géré par Kubernetes.

### PersistentVolumes et Déploiement
MySQL et WordPress dépendent tous deux de PersistentVolumes pour préserver les données à travers les redémarrages des pods ou la reprogrammation. Kubernetes gère la création de PersistentVolumeClaims (PVCs) en fonction des définitions fournies dans leurs fichiers de manifeste respectifs lors du déploiement.

En suivant ces étapes et en déployant ces manifestes, vous établissez un environnement robuste pour WordPress et MySQL sur Kubernetes. Cette configuration assure l'intégrité et la disponibilité des données tout en exploitant efficacement les capacités d'orchestration de Kubernetes.

### Créer un fichier kustomization.yaml
Un fichier kustomization est utilisé pour définir un ensemble de ressources Kubernetes et des paramètres de configuration pour les déploiements. Il vous permet de personnaliser, gérer et déployer des applications Kubernetes de manière structurée.

Ainsi, créez un fichier `kustomization.yaml` pour spécifier l'ordre d'exécution et générer un Secret pour le mot de passe MySQL. Cela assure une gestion sécurisée des données sensibles telles que les mots de passe à l'aide de Secrets Kubernetes.

Remplacez `MOT-DE-PASSE` par votre mot de passe souhaité:

```
cat <<EOF >kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization 
secretGenerator:
- name: mysql-pass
  literals:
  - password=MOT-DE-PASSE
resources:
  - mysql-deployment.yaml
  - wordpress-deployment.yaml
EOF
```

## Appliquer et Vérifier
Encore une fois, vérifiez que les fichiers ont été créés en exécutant ls dans votre terminal. Vous devriez voir 4 fichiers.

Avec tous les fichiers de configuration en place, déployez les ressources en utilisant la commande suivante:
`kubectl apply -k ./`

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp-mysql-dep.png)

Vérifiez que tous les objets ont été créés:
```
kubectl get pods
kubectl get secrets
kubectl get pvc
kubectl get services
```

## Exposer le Service WordPress
Lorsque vous exécutez Kubernetes dans un environnement de développement local comme Kind (Kubernetes IN Docker), le type de service LoadBalancer ne fonctionnera pas comme prévu car il n'y a pas de répartiteur de charge externe disponible. Cependant, vous pouvez toujours accéder aux services s'exécutant dans un cluster Kind sans avoir besoin de prise en charge LoadBalancer intégrée en utilisant le port forwarding.

C'est une façon simple d'accéder à votre service depuis votre machine locale.

`kubectl port-forward svc/wordpress 8080:80`

![](https://blog-imgs-23.s3.amazonaws.com/kind-expose-wp-service.png)

Et voilà! Après avoir exécuté cette commande, vous pouvez accéder à votre site WordPress à l'adresse `http://localhost:8080`.

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp.png)

Pour arrêter le port forwarding, appuyez sur `Ctrl+C` dans votre terminal.

## Nettoyage
Une fois que vous avez terminé avec votre déploiement WordPress et MySQL, nettoyez vos ressources.

Supprimez les ressources déployées:
`kubectl delete -k ./`

Supprimez le cluster Kind:
`kind delete cluster`

![](https://blog-imgs-23.s3.amazonaws.com/kind-delete.png)

En suivant ces étapes, vous avez déployé avec succès WordPress et MySQL sur un cluster Kind multi-nœuds. Cette configuration offre un environnement de développement local évolutif et facilement gérable pour vos projets.

***

Si vous avez aimé cet article, suivez-moi sur [Twitter](https://twitter.com/juliafmorgado) (où je partage mon parcours tech quotidien), connectez-vous avec moi sur [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), consultez mon [IG](https://www.instagram.com/juliafmorgado/), et assurez-vous de vous abonner à ma chaîne [Youtube](https://www.youtube.com/c/JuliaFMorgado) pour plus de contenu incroyable !!
