---
title: "Comment contribuer à la localisation du Glossaire CNCF - Pas de code nécessaire!"
author: "Julia Furst Morgado"
date: 2023-09-26T11:46:05.964Z
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-oss.png
tags: 
    - CNCF
    - Open Source
    - Tutoriel
categories: 
    - Tech
slug: /comment-contribuer-localisation-glossaire-cncf




---

## Introduction

Le [Glossaire de la Cloud Native Computing Foundation (CNCF)](https://glossary.cncf.io/) est une ressource précieuse qui aide à clarifier la terminologie et le jargon utilisés dans le domaine Cloud Native. Il propose des définitions concises et précises de termes essentiels, en faisant un outil indispensable à la fois pour les débutants et les professionnels chevronnés du domaine.

J'encourage toujours tout le monde à commencer à contribuer à l'Open Source dès le début de leur carrière, car cela vous permettra de:
- Apprendre et acquérir de l'expérience
- Rencontrer des personnes intéressées par des sujets similaires aux vôtres
- Trouver des mentors
- Développer votre réputation et valoriser votre carrière
- Obtenir les carrés verts sur GitHub
- Etc

## Localisation ?

La localisation est le processus de traduction et d'adaptation d'un produit ou service à une langue et une culture spécifiques. Dans le contexte du Glossaire de Cloud Native, la localisation consiste à traduire les termes et définitions du glossaire dans d'autres langues. Vous pouvez également contribuer de [différentes manières](https://glossary.cncf.io/contribute/#welcome) si vous ne parlez qu'anglais (et n'oubliez pas de lire mon guide sur [comment devenir contributeur Open Source](https://www.juliafmorgado.com/posts/guide-to-become-open-source-contributor/)).

Contribuer à la localisation du Glossaire CNCF est non seulement une excellente façon de redonner à la communauté Cloud Native, mais c'est aussi une excellente occasion d'approfondir votre compréhension de la technologie et de sa terminologie. En participant à ce projet Open Source, vous le rendez accessible à un public plus large, en particulier à ceux qui préfèrent consommer du contenu dans leur langue maternelle.

![](https://blog-imgs-23.s3.amazonaws.com/glossary-webpage.png)

## Étapes pour contribuer

### **Lisez la documentation**
Consultez la page [Comment contribuer](https://glossary.cncf.io/contribute/) sur le site Web du Glossaire Cloud Native. Cette page fournit des informations sur la manière de localiser le glossaire, y compris le guide de localisation, le guide de style et les meilleures pratiques.

![](https://blog-imgs-23.s3.amazonaws.com/how-to-contribute-webpage.png)

### **Rejoignez la communauté**
Rejoignez l'espace de travail [CNCF Slack](https://cloud-native.slack.com/) et participez aux canaux [#glossary-localizations](https://app.slack.com/client/T08PSQ7BQ/C02N2RGFXDF) et #glossary-localization-[nom de votre langue]. Ces canaux sont l'endroit où vous pouvez vous connecter avec d'autres membres de l'équipe de localisation du Glossaire Cloud Native et obtenir de l'aide pour toutes les questions que vous pourriez avoir. Si le projet Glossaire CNCF n'a pas encore d'équipe de localisation pour votre langue, lisez [ceci](https://github.com/cncf/glossary/blob/main/LOCALIZATION.md#initiating-a-new-localization-team).

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-slack.png)

### **Recherchez les issues ouverts qui n'ont pas encore été assignés**
Vous pouvez trouver des problèmes ouverts en recherchant le [dépôt GitHub du Glossaire Cloud Native](https://github.com/cncf/glossary/issues?q=is%3Aissue+is%3Aopen+label%3Alang%2Fpt+no%3Aassignee+), et en les filtrant avec les libellés `"is:issue is:open label:lang/fr no:assignee"`.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-issues.png)

> **Remarque :** Dans cet exemple, "pt" est pour le portugais, mais vous pouvez changer le libellé pour votre langue. Par exemple, le hindi serait `label:lang/hi`, et le français serait `label:lang/fr`.

### **Si vous ne trouvez aucun issue ouvert**
Si vous ne trouvez aucun problème ouvert, vérifiez le canal Slack dédié à votre langue pour trouver des documents épinglés qui montrent les termes/pages qui doivent encore être traduits. Pensez également à envoyer un message amical et poli dans le canal Slack pour vous présenter, exprimer votre intérêt à contribuer au projet, et demander s'il existe une liste ou un système de suivi des tâches de traduction disponibles.

### **Lorsque vous trouvez un issue**
Une fois que vous avez trouvé un problème, laissez un commentaire indiquant que vous souhaitez prendre en charge cet issue/travailler dessus. Un membre de l'équipe de localisation du Glossaire Cloud Native examinera votre demande et l'approuvera. Attendez d'être accepté, car il peut arriver que quelqu'un d'autre travaille déjà dessus et que vous auriez fait du travail pour rien.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-issue-1209.png)

### **Bifurquez le dépôt GitHub du Glossaire Cloud Native**
Cela créera une copie du dépôt sur votre propre compte GitHub.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-fork-repo.png)

### **Clônez le dépôt forké**
Utilisez la commande `git clone` pour cloner le dépôt forké dans l'IDE de votre machine locale ou dans n'importe quel IDE que vous utilisez. J'utilise [AWS Cloud9](https://aws.amazon.com/cloud9/) depuis quelque temps et je l'aime beaucoup.

![](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-git-clone.png)

### **Créez un nouveau fichier .md**
À l'intérieur du dossier de votre langue, créez un nouveau fichier pour le terme et nommez-le avec le nom en anglais (n'oubliez pas le .md à la fin).

![Nouveau terme](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-new-term.png)

### **Traduisez le terme**
Assurez-vous de suivre le guide de localisation et le guide de style lors de la traduction des termes. Vérifiez les termes qui ont déjà été traduits pour utiliser les mêmes mots. N'oubliez pas de traduire le titre, la catégorie et les tags. Une fois que vous avez terminés, relisez-le attentivement. Les examinateurs et les mainteneurs du projet ont des emplois du temps chargés, et il peut être fastidieux pour eux de demander des corrections mineures telles qu'une virgule manquante ou un accent.

> **Important:** Si votre terme inclut des liens hypertextes vers d'autres termes déjà traduits, assurez-vous de modifier le lien hypertexte pour diriger vers le terme traduit. Par exemple, si vous traduisez un terme en Français, mettez à jour le lien hypertexte de https://glossary.cncf.io/abstraction/ vers https://glossary.cncf.io/fr/abstraction/. Cela contribue à maintenir une expérience fluide pour les utilisateurs accédant au glossaire dans leur langue préférée.

![Terme traduit](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-translated.png)

### **Validez vos modifications et les pousser vers votre dépôt forké**
Tout d'abord, écrivez dans votre terminal : `git add [chemin_vers_votre_fichier]` ou si vous venez de modifier seulement ce fichier, vous pouvez faire `git add .` 
Ensuite, écrivez : `git commit -m 'nouvelle traduction pour [terme]'`.
Et enfin : `git push`.

Une fois que vous avez poussé vos modifications vers votre dépôt forké, vous verrez que votre branche est en avance sur la branche cncf:main et que vous pouvez y contribuer en ouvrant une pull request (également appelée PR).

![Nouvelle validation](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-newcommit.png)

### **Ouvrez une pull request**
Pour ouvrir une PR, cliquez sur le bouton vert pour ouvrir une pull request pointant vers la branche de développement Française (dev-fr) - ou vers n'importe quelle autre langue - afin de fusionner vos modifications dans le référentiel principal du Glossaire Cloud Native.

![Nouvelle pull request](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-newpr.png)

### (facultatif)
Dans le canal Slack de l'équipe (#glossary-localization-french), faites-leur savoir que vous avez soumis votre PR.

### **Attendez que votre pull request soit examinée**
Une fois que vous avez ouvert une pull request, les membres de l'équipe de localisation du Glossaire Cloud Native dans votre langue examineront vos modifications. Ils peuvent fournir des commentaires ou suggérer des modifications à vos traductions. Surveillez fréquemment les notifications situées dans le coin supérieur droit de votre écran, c'est là que vous les trouverez.

![PR du Glossaire CNCF](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-pr.png)

### **Effectuez les modifications nécessaires et mettez à jour votre pull request**

### **Fusionnez votre pull request**
Une fois que votre pull request a été approuvée, vous pouvez la fusionner à au répertoire principal du Glossaire Cloud Native, et vos traductions seront publiées sur le site Web du Glossaire Cloud Native. Si vous avez créé une branche à l'étape 8, vous pouvez également la supprimer maintenant. Et voilà!

![Réussite de la PR du Glossaire CNCF](https://blog-imgs-23.s3.amazonaws.com/ccncf-glossary-successfulpr.png)

## Conseils finaux

* Commencez petit. N'ayez pas l'impression que vous devez traduire l'ensemble du glossaire d'un coup. Commencez par traduire quelques termes ou pages que vous connaissez ou qui sont pertinents pour vos intérêts.
* Utilisez les traductions existantes. Si un terme ou une page a déjà été traduit dans votre langue, vous pouvez utiliser cette traduction comme point de départ. Cependant, assurez-vous de la réviser et d'apporter les modifications nécessaires.
* Soyez cohérent. Lors de la traduction des termes, essayez d'être aussi cohérent que possible. Utilisez la même terminologie dans tout le glossaire et évitez d'utiliser des traductions différentes pour un même terme.
* Si vous avez des questions ou avez besoin d'aide, envoyez un message dans le canal Slack. Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à demander de l'aide dans le canal Slack #glossary-localizations ou dans le canal Slack de votre langue. Les autres membres de l'équipe sont toujours heureux d'aider les nouveaux contributeurs. N'ayez pas honte et n'attendez pas trop longtemps, sinon les examinateurs/mainteneurs du projet penseront que vous l'avez abandonné.

Bonne chance et faites-moi savoir si vous souhaitez connaître d'autres projets auxquels vous pouvez contribuer de cette manière !

*** Si vous avez aimé cet article, suivez-moi sur [Twitter](https://twitter.com/juliafmorgado) (où je partage mon parcours tech) au quotidien, connectez-vous avec moi sur [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), consultez mon [IG](https://www.instagram.com/juliafmorgado/), et assurez-vous de vous abonner à ma chaîne [Youtube](https://www.youtube.com/c/JuliaFMorgado) pour plus de contenu incroyable!!
