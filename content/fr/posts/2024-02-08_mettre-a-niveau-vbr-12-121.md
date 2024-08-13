---
title: "Comment Mettre à Niveau Veeam Backup and Replication du 12.0 au 12.1"
author: "Julia Furst Morgado"
date: 2024-02-08T10:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/upgrade-vbr-121.png
tags: 
    - Veeam
categories: 
    - Tech
slug: /comment-mettre-a-niveau-veeam-backup-replication-12-0-au-12-1
---

Veeam Backup and Replication a publié la version 12.1 avec des [nouvelles fonctionnalités et améliorations excitantes](https://www.veeam.com/whats-new-backup-replication.html), notamment dans le domaine de la cybersécurité. Dans ce tutoriel, nous vous guiderons à travers le processus de mise à niveau de la version 12.0 vers la 12.1 de manière rapide et fluide.

## Étape 1 : Préparation
Avant de commencer le processus de mise à niveau, assurez-vous que vos sauvegardes sont à jour, fournissant une option de secours en cas de besoin. De plus, si vous avez des tâches en cours d'exécution en continu, désactivez-les temporairement ou arrêtez-les pour éviter toute interruption pendant la mise à niveau.

## Étape 2 : Vérifier la Version Actuelle et Télécharger l'ISO
Ouvrez votre console Veeam Backup and Replication et vérifiez que vous utilisez la version 10a à 12 pour utiliser le programme de mise à niveau sur place. Si vous utilisez une version antérieure, le processus de mise à niveau sera différent. Ensuite, rendez-vous sur la page [Informations de Publication pour Veeam Backup & Replication 12.1 et Mises à Jour](https://www.veeam.com/kb4510) sur le site de Veeam et téléchargez le dernier ISO 12.1.

![Télécharger l'ISO 12.1](https://blog-imgs-23.s3.amazonaws.com/download-iso-121.png)

## Étape 3 : Monter l'ISO et Lancer la Configuration
Cliquez avec le bouton droit sur le fichier ISO téléchargé et montez-le. Ensuite, accédez à l'ISO monté et lancez le fichier setup.exe pour démarrer le processus de mise à niveau.

![Monter l'ISO 12.1](https://blog-imgs-23.s3.amazonaws.com/mount-iso-121.png)

![Lancer la Configuration 12.1](https://blog-imgs-23.s3.amazonaws.com/launch-setup-121.png)

## Étape 4 : Accepter les Accords de Licence
Une fois l'installateur initialisé, vous serez invité à accepter les termes des Accords de Licence. Examinez et acceptez les accords pour procéder à la mise à niveau.

## Étape 5 : Vérifier les Composants et Installer les Composants Distants
Vérifiez les versions de votre Catalogue de Sauvegarde Veeam, du Serveur VBR et de la Console VBR. Optionnellement, cochez la case pour installer automatiquement les composants distants si nécessaire pour votre configuration.

![Mettre à Jour les Composants 12.1](https://blog-imgs-23.s3.amazonaws.com/update-components-121.png)

## Étape 6 : Spécifier le Compte de Service et le Backend PostgreSQL
Spécifiez le compte de service à utiliser pendant le processus de mise à niveau. L'installateur énumérera l'instance actuelle du backend PostgreSQL, qui ne nécessitera généralement aucun changement pour une mise à niveau sur place. Cependant, si une erreur "Authentification SSPI échouée pour l'utilisateur" se produit, suivez les étapes fournies dans l'[article de la Base de Connaissances](https://www.veeam.com/kb4542) lié pour la résoudre.

![Erreur SSPI 12.1](https://blog-imgs-23.s3.amazonaws.com/error-sspi-121.png)

## Étape 7 : Terminer le Processus de Mise à Niveau
Une fenêtre contextuelle apparaîtra indiquant que la base de données sera automatiquement mise à niveau vers la nouvelle version. Cliquez sur "Oui" pour continuer, puis sur "Mettre à Niveau" dans la fenêtre suivante.

L'installateur arrêtera les services backend, effectuera les mises à niveau nécessaires et mettra automatiquement à niveau tous les composants en arrière-plan. La durée de ce processus peut varier en fonction de votre environnement et des performances du serveur.

![Mise à Niveau 12.1](https://blog-imgs-23.s3.amazonaws.com/upgraded-121.png)

## Étape 8 : Réactiver les Tâches et Vérifier le Fonctionnement
Une fois le processus de mise à niveau terminé, rouvrez l'interface VBR et réactivez toutes les tâches précédemment désactivées. Vérifiez que la mise à niveau a réussi en vous assurant que toutes les fonctions sont opérationnelles.

![Vérifier Nouveau 12.1](https://blog-imgs-23.s3.amazonaws.com/verify-new-121.png)

La mise à niveau de Veeam Backup and Replication de la version 12.0 vers la 12.1 est un processus simple en suivant ces étapes. En garantissant une préparation adéquate et en suivant chaque étape attentivement, vous pouvez mettre à niveau rapidement vers la dernière version, bénéficiant de fonctionnalités améliorées et de mises à jour de sécurité.
