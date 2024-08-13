---
title: "L'Ultime Expérience eSport: Dans les Coulisses du Championnat de VALORANT avec AWS 2023"
author: "Julia Furst Morgado"
date: 2023-09-07T11:46:05.964Z
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/valorant2023.png
tags: 
    - AWS
    - eSports
    - Gaming
categories: 
    - Tech
slug: /championnat-valorant-avec-aws-2023
contentDir: "content/french"




---
Si vous pensez que Los Angeles se résume uniquement aux célébrités d'Hollywood et aux palmiers, détrompez-vous. J'ai récemment eu le privilège d'être invitée par AWS - Amazon Web Services, à assister à la finale du VALORANT. Ce furent deux journées pleines d'adrénaline à travers le monde de l'eSport qui m'ont laissé une toute nouvelle perspective sur le jeu vidéo.

![Julia debout au Fanfest Valorant](https://blog-imgs-23.s3.amazonaws.com/LA-valorant2023.png)

## L'eSport, c'est bien plus que des jeux vidéo

Avant de raconter mon expérience de l'évènement, permettez-moi de clarifier quelque chose à propos de [l'eSport](hhttps://www.pedagojeux.fr/comprendre-le-jeu-video/quest-ce-que-l-esport/) : il ne s'agit pas seulement de personnes (des nerds 😝) qui jouent à des jeux vidéo comme hobby. C'est un environnement hautement organisé et compétitif où des joueurs d'élite s'affrontent pour la gloire (oui, ils sont des célébrités) et la fortune. Pensez-y comme les Jeux olympiques des jeux vidéos, où les équipes s'affrontent dans divers titres, et des fans du monde entier se branchent pour regarder.

Au cœur de cette extravagance de l'eSport se trouve Riot Games, une société de développement de jeux qui a conquis le monde du jeu vidéo avec des titres tels que League of Legends et Valorant. Valorant, un  jeu de tir tactique 5v5 basé sur les personnages qui a pris d'assaut l'arène des jeux PC et qui exige précision, travail d'équipe, stratégie et une latence SUPER faible.

![Image du stade pendant le Championnat Valorant](https://blog-imgs-23.s3.amazonaws.com/game-valorant.jpeg)

Pour moi, cet événement a été bien plus qu'une simple partie de jeu (puisque j'ai probablement joué à Mario Kart une seule fois dans ma vie); il s'agit de voir comment AWS et Riot Games ont uni leurs forces pour révolutionner le monde de l'eSport.

## Un Partenariat Révolutionnaire entre AWS et Riot Games

Imaginez ceci: [Riot Games](www.riotgames.com), la société derrière certains des titres les plus populaires du monde du jeu, et [AWS](www.aws.com), un géant de l'informatique en nuage et de l'intelligence artificielle, qui se réunissent pour remodeler le paysage de l'eSport. Le résultat? BOOM, une collaboration dynamique qui élève les jeux vidéo à un autre niveau.

AWS est le pilier de toute l'infrastructure de Riot Games. Sa technologie de pointe optimise l'expérience des joueurs, réduit la latence et garantit que tout fonctionne en douceur. Dans un monde de l'eSport où les millisecondes peuvent faire la différence entre la victoire et la défaite, AWS change la donné. Imaginez regarder vos joueurs préférés se battre en temps réel, avec AWS s'assurant que vous ne manquez aucune action.

## Table ronde technique avec les Geeks et les Gamers

L'un des moments forts de l'événement a été la table ronde technique que nous avons eue la première nuit, où nous avons pu écouter et poser des questions à certaines des plus brillantes personnes de l'industrie du jeu et de la technologie.

[Alex "Goldenboy" Mendez](https://twitter.com/GoldenboyFTW), un hôte d'eSports et commentateur avec une expérience dans le jeu compétitif, a commencé avec une discussion sur comment fonctionne le jeu Valorant. Il a abordé des sujets tels que les différents agents dans le jeu et leurs rôles, certains types d'armes et la structure globale des tournois du Valorant Champions Tour. Ce que j'en ai retenu, c'est que Valorant récompense la stratégie et la réflexion tactique. Cela demande une combinaison de compétences visées, de connaissance des cartes, de compréhension des capacités des agents, de prise de décision et de coopération avec votre équipe (c'est pourquoi les membres de l'équipe se parlent constamment pendant le jeu). C'était aussi génial de lui parler en personne et de le voir le lendemain sur le grand écran narrer le jeu.

Ensuite, il y a eu une table ronde avec des ingénieurs d'AWS ([Jun David](https://www.linkedin.com/in/jundavid/), [Randy James](https://www.linkedin.com/in/randiskull/), et [Shiva Natarajan](https://www.linkedin.com/in/shiva-natarajan-937b6a/)) et de Riot Games ([John Knauss](https://www.linkedin.com/in/jrknauss/), [Brian Miller](https://www.linkedin.com/in/brimil01/), et [Gabriel Isenberg](https://www.linkedin.com/in/gabrielisenberg/)). Ils ont abordé plusieurs sujets techniques, que je vais aborder ensuite, notamment le lancement de VALORANT et la façon dont la plateforme a évolué pour accueillir de nombreux joueurs du monde entier de manière transparente.

### Le Peeker Advantage

Un des plus grands défis techniques en ce qui concerne les jeux de tir comme [Valorant](www.valorant.com) est le Peeker Advantage.

![Image de Riot Games sur l'avantage du peeker](https://blog-imgs-23.s3.amazonaws.com/peekers-advantage.png)

[Le peeker advantage](https://www.mandatory.gg/valorant/guides-valorant/progression-training/quest-ce-que-le-peeker-advantage/) est une notion qui a trait à la connexion entre les joueurs et le serveur de jeu. Dans un sens, il pourrait être considéré comme du lag. Il permet à un joueur de prendre des informations, voire d’attaquer ses adversaires, avant même d’apparaître sur leurs écrans. C’est littéralement un avantage pour le premier joueur à jeter un coup d’œil (« to peek« , en anglais).

Le peeker advantage naît d’une limitation physique que notre technologie ne pourra jamais complètement effacer. Même les meilleurs serveurs et les meilleures connexions au monde subissent ce délai. Ce délai est aussi valable dans les FPS que sur tous les autres jeux en ligne. C’est pourquoi la plupart des compétitions à gros enjeux se jouent en LAN, afin de limiter au maximum les intermédiaires et la distance qui sépare deux informations.

Mais pour essayer de résoudre cela et améliorer le gameplay, Riot Games a mis en œuvre plusieurs modifications:

- **Améliorer la rapidité des serveurs**: Les serveurs de Valorant fonctionnent avec un tick rate de 128 Hertz, ce qui signifie que les serveurs vérifient la position des joueurs 128 fois par seconde.
- **Mélange d'animations** : Riot travaille sur la mise à jour du mélange d'animations pour éliminer les retards lors de la transition de "course" à "debout".
- **Blocage des cadavres** : Ils s'attaquent au problème du "blocage des cadavres" pour assurer une visibilité constante des ennemis même après leur élimination.
- **Délai lors des morts des joueurs** : Riot prévoit d'introduire un léger délai lors des morts des joueurs, ce qui vous permettra de voir ce que fait le joueur qui vous a vaincu.
- **Client de jeu optimisé** : Le client de jeu VALORANT est en cours d'optimisation pour fonctionner à 60 images par seconde sur la plupart des machines modernes, avec des taux de rafraîchissement plus élevés pour les moniteurs à taux de rafraîchissement élevé.
- **Tampon minimal** : Les clients et les serveurs fonctionnent avec un tampon minimal pour garantir un gameplay réactif. Riot vise un tampon d'une image de mouvement pour les clients et en moyenne une demi-image de données de mouvement pour les serveurs.
- **Réduction de la latence** : Riot se concentre sur la réduction de la latence pour les joueurs et l'optimisation des serveurs pour atteindre un ping de 35 ms pour 70 % de la base de joueurs.

Passons maintenant à la latence.

### Réduction de la latence

Riot Games a réalisé d'importants investissements pour réduire la latence des joueurs et optimiser les performances des serveurs. Leur approche comprend à la fois le placement stratégique des serveurs et les améliorations technologiques.

1. **Placement stratégique des serveurs** : Lorsque Riot Games s'est initialement associé à AWS, leur stratégie de placement des serveurs était basée sur l'utilisation des régions AWS. Cependant, grâce à une approche basée sur les données qui a impliqué l'analyse de leur base de joueurs existante de League of Legends, ils ont obtenu des informations précieuses sur la démographie des joueurs et leur distribution géographique. En effectuant des évaluations approfondies de facteurs clés tels que le ping, la perte de paquets et la latence, il est devenu clair que les joueurs situés au-delà des limites de ces régions AWS ne bénéficiaient pas d'une expérience de jeu optimale.

   En réponse, Riot Games est passé des Outposts AWS aux Zones Locales gérées par AWS, ce qui a considérablement étendu leur présence de serveur. Ils opèrent actuellement dans un total de 33 Zones Locales à l'échelle mondiale. Ce changement a permis à Riot de s'adresser aux joueurs dans des régions précédemment négligées, garantissant une expérience plus équitable pour tous. L'identification des joueurs utilisant des VPN dans diverses localités a également éclairé leur stratégie de placement des serveurs. Cette évaluation était basée sur la latence utilisateur par rapport aux joueurs situés physiquement dans des régions spécifiques.

2. **Optimisation du routage du jeu** : Riot a établi son réseau interne, [Riot Direct](https://technology.riotgames.com/news/leveling-networking-multi-game-future), pour assurer un routage efficace des données de jeu. En identifiant les points clés de présence et en établissant des connexions directes en fibre optique, ils ont créé un réseau haute vitesse qui privilégie le trafic de jeu. Ce réseau permet une perte minimale de paquets et une latence plus faible, améliorant ainsi l'expérience globale de jeu.

### Matchmaking

En ce qui concerne le matchmaking (la mise en relation des joueurs avec une partie), Riot dispose de services dédiés pour mettre en relation les joueurs en fonction de leur niveau de compétence et, plus important encore, de leur latence. Lorsque les joueurs essaient de rejoindre une partie, ils vérifient leur ping par rapport aux serveurs de jeu, puis tiennent également compte de la manière dont cela se traduit avec les personnes de leur groupe. Par exemple, s'ils se trouvent dans des États ou des pays différents, il est impératif de les connecter à un serveur de jeu capable d'offrir des performances satisfaisantes pour tous les participants, afin de garantir une expérience de jeu équitable.

### Apprentissage automatique (ML)

En collaboration avec les Laboratoires d'Apprentissage Automatique d'AWS, Riot Games s'est aventuré dans le monde de l'apprentissage automatique pour prédire la probabilité de victoire d'une équipe, d'abord dans League of Legends, et maintenant dans Valorant. Cette initiative vise à créer une API dynamique offrant des mises à jour en temps réel sur les chances de gagner, enrichissant ainsi l'expérience pour les commentateurs en direct et les spectateurs.

De plus, l'apprentissage automatique est utilisé pour la [Détection Automatisée des Smurfs](https://playvalorant.com/en-us/news/dev/valorant-systems-health-series-smurf-detection/), pour surveiller les MMR (rangs de matchmaking) des comptes Smurf. Le système de détection des Smurfs fonctionne de manière à détecter le niveau de compétence des comptes nouvellement créés et à les faire monter en grade plus rapidement pour réduire l'écart de compétence.

## Le Jeu en tant que Carrière

Maintenant, permettez-moi de dissiper une idée fausse courante que j'ai toujours eue, et que beaucoup d'entre vous ont peut-être aussi : l'idée que le jeu n'est qu'un passe-temps. D'après ce que j'ai appris lors de l'événement, le jeu peut être une véritable carrière.

Aujourd'hui, les joueurs peuvent signer des contrats avec des équipes professionnelles, bénéficier de l'encadrement de coachs, de nutritionnistes, d'entraîneurs personnels et de physiothérapeutes, et avoir la possibilité de gagner des millions grâce à des partenariats, à la diffusion en continu et à des championnats compétitifs. J'ai eu le privilège de discuter avec des partenaires de l'équipe [Loud](https://liquipedia.net/valorant/LOUD), l'équipe brésilienne qui a remporté la troisième place au championnat, et ils m'ont éclairée sur l'immersion intense nécessaire, où les joueurs se plongent jour après jour dans le jeu, reçoivent un coaching expert, et bien plus encore.

Pourtant, ne pensez pas que devenir un joueur célèbre est facile. Cela demande une quantité incroyable de temps, d'efforts, et une multitude d'autres facteurs, dont beaucoup me restent mystérieux (sinon, je serais là avec eux lol !).

## Tournoi des Champions VALORANT et exécution

Passons maintenant à l'action de ce voyage. Regardez un résumé du premier jour [ici](https://www.instagram.com/p/CwWnVDxrhLK/). Le match de demi-finale entre LOUD et Evil Geniuses nous a tenus en haleine. En tant que supportrice de [LOUD](https://loud.gg), j'ai rejoint la foule enthousiaste des Brésiliens dans le stade. Malheureusement, [Evil Geniuses](https://evilgeniuses.gg/) est sorti vainqueur d'une fin à couper le souffle sur le score de 3-2.

Lors d'une visite exclusive des coulisses du Kia Forum, nous avons exploré les rouages internes du tournoi (aucune photo n'était autorisée). Cela comprenait une visite de la salle des serveurs, gardée en permanence par un agent de sécurité. Seules quelques personnes avaient accès à cet endroit. La raison des serveurs physiques est qu'ils offrent des performances prévisibles et une latence réduite, essentielles pour le championnat.

Dans le parking du stade se trouvaient les camions de diffusion. Ces camions sont connectés à un centre principal à Dublin pour une couverture mondiale, atteignant des millions de téléspectateurs en ligne. L'équipe mondiale d'événements de Riot travaille avec 22 partenaires de diffusion dans 21 langues.

![Statistiques de Valorant](https://blog-imgs-23.s3.amazonaws.com/valorant-stats.png)

La diffusion commence à l'arène et est intégrée dans une diffusion mondiale via Riot Direct (la même infrastructure de serveur utilisée pour les jeux). De là, elle est distribuée aux équipes régionales du monde entier, chacune proposant des diffusions dans leur langue maternelle avec des récits spécifiques à la région.

Le lendemain, c'était le match de championnat final entre Evil Geniuses et [Paper Rex](https://www.pprx.team/) de Singapour. Nous étions tous impatients de savoir qui remporterait le grand trophée en or et un prix d'un million de dollars. Nous avons assisté de nouveau au Kia Forum, où nous avons regardé la cérémonie d'ouverture des Champions Valorant, avec une performance en direct de chanteurs et de danseurs, dont l'hymne officiel ["Ticking Away" ft. Grabbitz & bbno](https://www.youtube.com/watch?v=CdZN8PI3MqM), un remix Ignition avec [@its_emei](https://www.instagram.com/its.emei/?hl=en) et [Jazz Alonso](https://www.instagram.com/jazz_alonso_/?hl=en), et la chanson ["Greater Than One" de @ericdoa3347](https://www.youtube.com/watch?v=N7dUOC4x55E). La cérémonie d'ouverture ressemblait à une finale du Super Bowl, avec une présentation extravagante de feu, de fumée et de lumières qui a enthousiasmé le public !

Vous pouvez la regarder ici : ![Cérémonie d'ouverture des Champions Valorant](https://www.youtube.com/watch?app=desktop&v=dWXDui9Cjmg)

C'était un combat d'intelligence et de compétences, et Evil Geniuses a remporté le titre avec une victoire 3-1. C'était un moment historique pour l'industrie du jeu, car l'entraîneuse de l'équipe, [Christine Chi](https://www.instagram.com/omgitspotter/?hl=en), alias Potter, est devenue la première entraîneuse féminine à remporter un championnat majeur d'eSports.

![Collage Evil Geniuses](https://blog-imgs-23.s3.amazonaws.com/evil-geniuses.png)

## Un Avenir Brillant pour le Jeu

En résumé, mon expérience en tant qu'invitée VIP au championnat de VALORANT par AWS a été merveilleuse et remplie de surprises délicieuses. Du kit de bienvenue réfléchi aux délicieux repas que nous avons partagés, en passant par le fan fest animé, les discussions animées en panel, les visites VIP éclairantes et les affrontements de jeu palpitants - chaque moment a été inoubliable.

![Fanfest Valorant au Kia Forum](https://blog-imgs-23.s3.amazonaws.com/fanfest-valorant.png)

Partager ce voyage incroyable avec d'autres AWS Community Builders et Heroes a été un véritable plaisir.

![Communauté AWS](https://blog-imgs-23.s3.amazonaws.com/aws-community-valorant.png)

Je tiens à exprimer ma gratitude sincère à toute l'équipe AWS pour leur invitation et leur organisation impeccable de cette expérience extraordinaire, ne laissant aucun détail au hasard. J'attends avec impatience l'opportunité de participer à un autre événement Riot Games à l'avenir.

Ma vidéo de blog arrive bientôt, alors restez connectés sur ma [chaîne Youtube](https://www.youtube.com/c/JuliaFMorgado) ou sur mes réseaux sociaux où je la partagerai dès qu'elle sera en ligne !

Avez-vous des questions sur l'eSport, le jeu basé sur le cloud et la technologie qui sous-tend tout cela? 🤔💭

![Julia dans le stade de Valorant](https://blog-imgs-23.s3.amazonaws.com/kia-valorant-j.jpeg)

---

Si vous avez aimé cet article, suivez-moi sur [Twitter](https://twitter.com/juliafmorgado) (où je partage mon parcours technologique) chaque jour, connectez-vous avec moi sur [LinkedIn](https://www.linkedin.com/in/juliafurstmorgado/), consultez mon [IG](https://www.instagram.com/juliafmorgado/), et assurez-vous de vous abonner à ma chaîne [Youtube](https://www.youtube.com/c/JuliaFMorgado) pour plus de contenu incroyable ! 🚀📰👩‍💻
