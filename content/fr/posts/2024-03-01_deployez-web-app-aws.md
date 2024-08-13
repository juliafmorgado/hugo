---
title: "Déployez votre première application web sur AWS avec AWS Amplify, Lambda, DynamoDB et API Gateway"
author: "Julia Furst Morgado"
date: 2024-03-01T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-web-app-aws.png
tags: 
    - AWS
categories: 
    - Technologie
slug: /deployez-premiere-web-app-sur-aws-avec-amplify-lambda-dynamodb-api-gateway
---


Salut !

Si vous avez décidé d'en apprendre davantage sur AWS, alors vous êtes au bon endroit!

Ce guide est conçu pour les débutants ou les développeurs ayant une certaine expérience du cloud qui souhaitent apprendre les fondamentaux de la construction d'applications web sur la plateforme cloud AWS. Nous vous guiderons dans le déploiement d'un système de gestion de contacts de base, en vous présentant en chemin les principaux services AWS.

Dans ce projet, comme vous pouvez le deviner d'après le titre, nous utiliserons AWS, qui signifie Amazon Web Services ; une excellente plateforme cloud avec une multitude de services pour de nombreux cas d'utilisation différents, de la formation de modèles d'apprentissage automatique à l'hébergement de sites Web et d'applications.

>L'informatique en nuage offre un accès à la demande à des ressources informatiques telles que des serveurs, du stockage et des bases de données.
>Les fonctions sans serveur sont un type de service informatique en nuage qui vous permet d'exécuter du code sans gérer de serveurs.

À la fin de ce tutoriel, vous serez en mesure de :

- Déployer un site Web statique sur AWS Amplify.
- Créer une fonction sans serveur à l'aide d'AWS Lambda.
- Construire une API REST avec API Gateway.
- Stocker des données dans une base de données NoSQL à l'aide de DynamoDB.
- Gérer les autorisations avec des stratégies IAM.
- Intégrer votre code frontend avec les services backend.

Je vous recommande de suivre le tutoriel une première fois, puis de l'essayer par vous-même la deuxième fois. Et avant de commencer, assurez-vous d'avoir un compte AWS. Inscrivez-vous pour un compte gratuit si ce n'est pas déjà fait.

Maintenant, commençons !

## Étape 1 : Déployer le code frontend sur AWS Amplify

Dans cette étape, nous apprendrons à déployer des ressources statiques pour notre application web en utilisant la console AWS Amplify.

Des connaissances de base en développement web seront utiles pour cette partie. Nous créerons notre fichier HTML avec le CSS (style) et le code Javascript (fonctionnalité) intégrés. J'ai laissé des commentaires tout au long pour expliquer ce que chaque partie fait.

Voici un extrait de code de la page :

{{< gist juliafmorgado 30d1c59739a8405b86cc107c17d78b05 >}}

Il existe plusieurs façons de télécharger notre code dans la console Amplify. Par exemple, j'aime utiliser Git et Github. Pour simplifier cet article, je vous montrerai comment le faire directement par la méthode de glisser-déposer dans Amplify. Pour ce faire, nous devons compresser notre fichier HTML.

![](https://blog-imgs-23.s3.amazonaws.com/compress-index.png)

Assurez-vous maintenant d'être dans la région la plus proche de chez vous. Vous pouvez voir le nom de la région en haut à droite de la page, juste à côté du nom du compte. Ensuite, allons à la console AWS Amplify. Ça ressemblera à quelque chose comme ça :

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-main-page.png)

Lorsque nous cliquons sur "Commencer", cela nous amènera à l'écran suivant (nous choisirons Amplify Hosting sur cet écran) :

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-host-web-app.png)


![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-deploy-wo-git.png)

Vous commencerez un déploiement manuel. Donnez un nom à votre application, je l'appellerai "Système de gestion de contacts", et ignorez le nom de l'environnement. Ensuite, déposez le fichier index compressé et cliquez sur Enregistrer et Déployer.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-manual-deployment.png)

Amplify déploiera le code et renverra une URL de domaine où nous pourrons accéder au site Web.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-domain-web-app.png)

Cliquez sur le lien et vous devriez voir ceci :

![Site Web en direct par aws Amplify](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-clicked-web-app.png)

## Étape 2 : Créer une fonction sans serveur AWS Lambda

Nous allons créer une fonction sans serveur en utilisant le service AWS Lambda dans cette étape. Une fonction Lambda est une fonction sans serveur qui exécute du code en réponse à des événements. Vous n'avez pas besoin de gérer des serveurs ou de vous soucier de l'évolutivité, ce qui en fait une solution rentable pour des tâches simples. Pour vous donner une idée, un excellent exemple de calcul sans serveur dans la vie réelle est celui des distributeurs automatiques. Ils envoient la demande au cloud et traitent le travail uniquement lorsque quelqu'un commence à utiliser la machine.

Allons maintenant dans le service Lambda à l'intérieur de la console AWS. Au fait, assurez-vous de créer la fonction dans la même région que celle dans laquelle vous avez déployé le code de l'application web dans Amplify.

Il est temps de créer une fonction. Donnez-lui un nom, je l'appellerai "ma-fonction-web-app", et pour les paramètres de langage de programmation d'exécution : j'ai choisi Python 3.12, mais choisissez librement un langage et une version avec lesquels vous êtes plus à l'aise et familiers.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function.png)

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function-step.png)

Après la création de notre fonction lambda, faites défiler vers le bas et vous verrez l'écran suivant :

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-new-function.png)

Maintenant, modifions la fonction lambda. Voici une fonction qui extrait les prénoms et noms de famille à partir de l'entrée JSON de l'événement. Puis elle retourne un dictionnaire de contexte. La clé body stocke le JSON, qui est une chaîne de salutation.

{{< gist juliafmorgado 7e1275b8b00d1dd70c62db47efeec418 >}}

Après avoir modifié, cliquez sur Déployer pour sauvegarder my-web-app-function, puis cliquez sur Tester pour créer un événement.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-deploy-test.png)

Pour configurer un événement de test, donnez un nom à l'événement comme "MyEventTest", modifiez les attributs JSON de l'événement et sauvegardez-le.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-event.png)

Maintenant, cliquez sur le grand bouton de test bleu pour que nous puissions tester la fonction Lambda.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-succeeded.png)

Le résultat de l'exécution a les éléments suivants :

- Nom de l'événement de test
- Réponse
- Journaux de la fonction
- ID de la requête

## Étape 3 : Créer une API REST avec API Gateway

Allons-y et déployons notre fonction Lambda sur l'application Web. Nous utiliserons Amazon API Gateway pour créer une API REST qui nous permettra de faire des requêtes depuis le navigateur web. API Gateway agit comme un pont entre vos services backend (comme les fonctions Lambda) et votre application frontend. Cela vous permet de créer des API qui exposent des fonctionnalités à votre application web.

> REST : Representational State Transfer.

> API : Application Programming Interface.

Rendez-vous sur Amazon API Gateway pour créer une nouvelle API REST.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-rest-api.png)

À la page de création de l'API, nous devons lui donner un nom, par exemple "Web App API", et choisir un type de protocole et un type de point de terminaison pour l'API REST (sélectionnez Edge-optimized).

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-api-creation.png)

Maintenant, nous devons créer une méthode POST donc cliquez sur Créer une méthode.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-create-method.png)

Dans la page Créer une méthode, sélectionnez le type de méthode comme POST, le type d'intégration devrait être fonction Lambda, assurez-vous que la région est la même région que vous avez utilisée pour créer la fonction lambda et sélectionnez la fonction Lambda que nous venons de créer. Terminez en cliquant sur Créer une méthode en bas de la page.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-method-type-post.png)

Maintenant, nous devons activer CORS, donc sélectionnez le / puis cliquez sur activer CORS

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-path-cors.png)

Dans les paramètres CORS, cochez juste la case POST et laissez tout le reste par défaut, puis cliquez sur sauvegarder.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-cors-settings.png)

Après avoir activé les en-têtes CORS, cliquez sur le bouton orange Déployer l'API.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-deploy-api2.png)

Une fenêtre apparaîtra, sous étape sélectionnez nouvelle étape et donnez un nom à l'étape, par exemple "web-app-stage", puis cliquez sur déployer.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-new-stage2.png)

Lorsque vous visualisez l'étape, il y aura une URL nommée Invoke URL. Assurez-vous de copier cette URL ; nous l'utiliserons pour invoquer notre fonction lambda dans la dernière étape de ce projet.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-invoke-url.png)

## Étape 4 : Créer une table DynamoDB

Dans cette étape, nous allons créer une table de données dans Amazon DynamoDB, un autre service AWS. DynamoDB est un service de base de données NoSQL qui stocke les données en paires clé-valeur. Il est hautement scalable et flexible, ce qui le rend adapté à diverses applications. Cliquez sur le bouton orange créer une table.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-create-table.png)

Maintenant, nous devons remplir certaines informations sur notre table de données, comme le nom "contact-management-system-table", et la clé de partition est ID. Le reste laissez par défaut. Cliquez sur Créer la table.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-settings.png)

Une fois la table créée avec succès, cliquez dessus et une nouvelle fenêtre avec les détails de la table s'ouvrira. Développez les informations supplémentaires et copiez le nom de ressource Amazon (ARN). Nous utiliserons l'ARN dans l'étape suivante lors de la création des politiques d'accès IAM.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-arn.png)

## Étape 5 : Configurer les politiques et permissions IAM

AWS IAM est l'une des choses les plus basiques et importantes à configurer, pourtant beaucoup de gens la négligent. Pour une meilleure sécurité, il est toujours recommandé un modèle d'accès de moindre privilège, ce qui signifie ne pas donner à un utilisateur plus d'accès que nécessaire. Par exemple, même pour ce simple projet d'application web, nous avons déjà travaillé sur plusieurs services AWS : Amplify, Lambda, DynamoDB et API Gateway. Il est essentiel de comprendre comment ils communiquent entre eux et quel type d'informations ils partagent.

Revenons à notre projet, nous devons définir une politique IAM pour donner accès à notre fonction lambda pour écrire/mettre à jour les données dans la table DynamoDB.

Alors retournez à la console AWS Lambda, et cliquez sur la fonction lambda que nous venons de créer. Puis allez à l'onglet configuration, et dans le menu de gauche cliquez sur Permissions. Sous Rôle d'exécution, vous verrez un nom de rôle.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-permissions.png)

Cliquez sur le lien, ce qui nous amènera aux paramètres de configuration des permissions de ce rôle IAM spécifique. Sous les politiques, cliquez sur Ajouter une politique.

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-permissions.png)

Cliquez sur JSON, remplacez la politique courante avec celle-ci:

```
{
"Version": "2012-10-17",
"Statement": [
    {
        "Sid": "VisualEditor0",
        "Effect": "Allow",
        "Action": [
            "dynamodb:PutItem",
            "dynamodb:DeleteItem",
            "dynamodb:GetItem",
            "dynamodb:Scan",
            "dynamodb:Query",
            "dynamodb:UpdateItem"
        ],
        "Resource": "YOUR-DB-TABLE-ARN"
    }
    ]
}
```

Cette politique permet à la fonction Lambda d'écrire dans la table DynamoDB que nous avons créée. Assurez-vous de spécifier l'ARN de la table DynamoDB dans la politique.

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-json-permissions.png)

Maintenant, fermez cette fenêtre et revenez à la fonction Lambda, allez dans l'onglet Code et nous mettrons à jour le code Python de la fonction lambda avec le suivant.

{{< gist juliafmorgado 8eb027cb9502b88d91d2710fbe99b347 >}}

La réponse est au format API REST. Après avoir effectué les modifications, assurez-vous de déployer le code. Une fois le déploiement terminé, nous pouvons tester le programme en cliquant sur le bouton de test bleu.

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-new.png)

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-succeeded.png)

Nous pouvons également vérifier les résultats sur la table DynamoDB. Lorsque nous exécutons la fonction, elle met à jour les données de notre table. Alors, allez sur AWS DynamoDB, cliquez sur explorer les éléments dans la barre de navigation de gauche, cliquez sur votre table. Voici l'objet retourné par la fonction lambda :

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-explore-items.png)

## Étape 6 : Mettre à jour le code frontend avec l'API Rest

Félicitations d'être arrivé jusqu'ici !

Dans cette dernière étape, nous verrons tout ce que nous venons de construire en action. Nous mettrons à jour le frontend pour pouvoir invoquer l'API REST avec l'aide de notre fonction lambda et recevoir des données.

D'abord, retournez à votre index.html sur votre éditeur de code. Voyez à la ligne 68 vous aviez "API_KEY" ? Allez-y et remplacez cela par l'URL d'invocation que vous avez copiée du service API Gateway sous les détails de votre API REST. Une fois que vous avez fait cela, enregistrez et compressez à nouveau le fichier, comme nous l'avons fait à l'étape 1, et téléchargez-le à nouveau sur AWS en utilisant la console.

![](https://blog-imgs-23.s3.amazonaws.com/index-code-vscode.png)

Cliquez sur le nouveau lien que vous avez obtenu et testons-le.

![](https://blog-imgs-23.s3.amazonaws.com/web-app-test.png)

Nos tables de données reçoivent la requête post avec les données entrées. La fonction lambda invoque l'API lorsque le bouton « Appeler API » est cliqué. Ensuite, en utilisant javascript, nous envoyons les données au format JSON à l'API. Vous pouvez trouver les étapes sous la fonction callAPI.

Vous pouvez trouver ci-dessous les éléments retournés à ma table de données :

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-final-result.png)

## Conclusion

Félicitations ! Vous avez créé une application web simple en utilisant la plateforme cloud AWS. Le cloud computing se développe rapidement et devient de plus en plus une partie intégrante du développement de nouveaux logiciels et technologies.

Si vous vous sentez prêt pour un défi, vous pourriez ensuite :

- Améliorer le design du frontend
- Ajouter une authentification et une autorisation utilisateur
- Mettre en place des tableaux de bord de surveillance et d'analyse
- Implémenter des pipelines CI/CD pour automatiser les processus de construction, de test et de déploiement de votre application web à l'aide de services comme AWS CodePipeline, AWS CodeBuild et AWS CodeDeploy.

Travailler sur des projets de programmation pratiques est le meilleur moyen d'aiguiser vos compétences.

Je couvrirai d'autres scénarios sur AWS dans mes prochains articles de blog, alors restez à l'écoute !

Et encore, n'hésitez pas à me faire part de vos commentaires, et si je suis hors sujet, n'hésitez pas à me le faire savoir. Nous sommes tous dans le même bateau, apprenant et grandissant en tant que communauté !

***

Si vous avez aimé cet article, suivez-moi sur [Twitter](https://twitter.com/juliafmorgado) (où je partage mon parcours tech quotidien), connectez-vous avec moi sur [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), consultez mon [IG](https://www.instagram.com/juliafmorgado/), et assurez-vous de vous abonner à ma chaîne [Youtube](https://www.youtube.com/c/JuliaFMorgado) pour plus de contenu incroyable !!
