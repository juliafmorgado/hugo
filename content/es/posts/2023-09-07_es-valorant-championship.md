---
title: "El mundo de los eSports: Mi experiencia en el campeonato de VALORANT con AWS 2023"
author: "Julia Furst Morgado"
date: 2023-09-07T07:46:05.964Z
cover:
  image: https://blog-imgs-23.s3.amazonaws.com/valorant2023.png
tags:
  - AWS
  - eSports
  - Juegos
categories:
  - Tecnología
slug: /dentro-del-campeonato-valorant-con-aws-2023
contentDir: "content/spanish"
---

Si crees que Los Ángeles se reduce solo a celebridades de Hollywood y palmeras, estás equivocado. Recientemente, tuve el privilegio de ser invitada por AWS - Amazon Web Services a la final del Campeonato VALORANT. Fueron dos días llenos de adrenalina en el mundo de los eSports, que me brindaron una perspectiva completamente nueva sobre los videojuegos.

![Julia de pie en el Fanfest de Valorant](https://blog-imgs-23.s3.amazonaws.com/LA-valorant2023.png)

## Los eSports son Más que Solo Juegos

Antes de contar cómo fue mi experiencia, quiero aclarar algo sobre la industria de los [eSports](https://www.esports.net/wiki/guides/what-is-esports/). No se trata solo de un grupo de personas (¡nerds! 😝) jugando videojuegos; es un entorno altamente organizado y competitivo, donde los jugadores de élite luchan por la fama (sí, son celebridades) y la fortuna. Piénsalo como las Olimpiadas de los juegos, donde los equipos compiten en varios títulos y fans de todo el mundo sintonizan para ver.

En la cima de la industria de los eSports se encuentra Riot Games, una empresa desarrolladora de juegos que conquistó el mundo de los juegos con League of Legends y Valorant. Valorant es un juego de disparos táctico en primera persona (FPS), gratuito, que tiene una gran base de jugadores, requiere una precisión increíble, trabajo en equipo, estrategia y una latencia MUY baja.

![Imagen del estadio durante el Campeonato Valorant](https://blog-imgs-23.s3.amazonaws.com/game-valorant.jpeg)

Para mí, este evento fue más que simplemente ver a personas jugar el juego, fue presenciar cómo AWS y Riot Games se unieron para revolucionar el mundo de los eSports.

## Una Revolucionaria Asociación entre AWS y Riot Games

Uno de los problemas más comunes en los juegos en línea que dependen del tiempo de respuesta del jugador es la alta latencia, el retraso en que la información llega al servidor puede ser muy frustrante para quienes desean jugar a nivel competitivo.

Ahora, imagina lo siguiente: [Riot Games](www.riotgames.com), el gigante detrás de algunos de los títulos más populares en el mundo de los videojuegos, y [AWS](www.aws.com), un gigante en la nube y la inteligencia artificial, uniendo fuerzas para remodelar el panorama de los eSports. ¿El resultado? BOOM, una colaboración dinámica que está llevando los juegos a un nuevo nivel.

AWS es el pilar principal detrás de Riot, proporcionando una infraestructura de primera clase. Su tecnología de vanguardia optimiza la experiencia del jugador, reduce la latencia y garantiza que todo funcione sin problemas. En un mundo de eSports donde los milisegundos pueden marcar la diferencia entre la victoria y la derrota, AWS marca la diferencia. Imagina ver a tus jugadores favoritos competir en tiempo real, con AWS asegurando que no te pierdas ni un solo momento de la acción.

## Panel Técnico con Geeks y Jugadores

Uno de los aspectos más destacados del evento fue el Panel Técnico que tuvimos la primera noche, donde pudimos escuchar y hacer preguntas a algunas de las mentes más brillantes de los juegos y la tecnología.

[Alex "Goldenboy" Mendez](https://twitter.com/GoldenboyFTW), un presentador de eSports y comentarista con experiencia en juegos competitivos, comenzó dirigiendo la discusión y explicando cómo funciona el juego Valorant. Abordó temas como los diferentes agentes en el juego y sus funciones, algunos tipos de armas y la estructura general de los torneos del Valorant Champions Tour. Lo que entendí de esto es: Valorant recompensa la estrategia y el pensamiento táctico. Esto requiere una combinación de habilidades de puntería, conciencia del mapa, comprensión de las habilidades de los agentes, toma de decisiones y cooperación con tu equipo (por eso los jugadores de equipo siempre están hablando durante el juego). También fue increíble hablar con él en persona y verlo en la pantalla del estadio narrando el juego.

![Conferencia de Golden Boy](https://blog-imgs-23.s3.amazonaws.com/golden-boy.png)

Luego, hubo un panel con ingenieros de AWS ([Jun David](https://www.linkedin.com/in/jundavid/), [Randy James](https://www.linkedin.com/in/randiskull/), y [Shiva Natarajan](https://www.linkedin.com/in/shiva-natarajan-937b6a/)) y de Riot Games ([John Knauss](https://www.linkedin.com/in/jrknauss/), [Brian Miller](https://www.linkedin.com/in/brimil01/), y [Gabriel Isenberg](https://www.linkedin.com/in/gabrielisenberg/)). Exploraron varios temas, que abordaré a continuación, incluido el lanzamiento de VALORANT y cómo la plataforma de jugadores de Riot evolucionó para acomodar a jugadores de todo el mundo de manera perfecta.

![Panel Técnico de Ingenieros de AWS y Riot Games](https://blog-imgs-23.s3.amazonaws.com/panel-valorant.jpeg)

### Ventaja del "Peekers"

Uno de los mayores desafíos técnicos cuando se trata de juegos de disparos como [Valorant](www.valorant.com) es la ventaja de los "peekers" o el efecto llamado en inglés "Peekers advantage".

![Imagen de Riot Games sobre la Ventaja de los "Peekers"](https://blog-imgs-23.s3.amazonaws.com/peekers-advantage.png)

La [ventaja de los "peekers"](https://jovemnerd.com.br/nerdbunker/como-a-riot-games-investiu-em-tecnologias-para-minimizar-influencias-externas-em-valorant/) es una situación común en los juegos de disparos, cuando alguien que sale de un escondite puede ver a alguien al otro lado antes de que esa persona pueda reaccionar. Esto está directamente relacionado con el tiempo que lleva al juego enviar información a los servidores, por lo que es importante reducir al máximo ese tiempo.

Para abordar esta característica a menudo indeseada y mejorar la jugabilidad, Riot Games está implementando varios cambios:

- **Mezcla de Animación**: Riot está trabajando en actualizar la mezcla de animaciones para eliminar la latencia al pasar de "correr" a "estar quieto".
- **Bloqueo de Cadáveres**: Están abordando el problema del bloqueo de cadáveres para garantizar una visibilidad constante del enemigo incluso después de ser eliminado.
- **Retraso cuando los Jugadores Mueren**: Riot planea introducir un pequeño retraso en las muertes de los jugadores, lo que te permitirá ver lo que hace el jugador que te derrotó.
- **Experiencia del cliente optimizada**: La experiencia del cliente del juego se está optimizando para funcionar a 60FPS en la mayoría de las máquinas modernas, con tasas de cuadros más altas para monitores de alta frecuencia de actualización.
- **Reducción del tamaño de búfer**: Tanto los clientes como los servidores se están ejecutando con un búfer mínimo para garantizar una jugabilidad más receptiva. Riot apunta a un búfer de datos de movimiento de cuadro completo para los clientes y un promedio de medio cuadro de datos de movimiento para los servidores.
- **Reducción de la Latencia**: Riot se está centrando en reducir la latencia para los jugadores y optimizar los servidores para lograr un ping de 35 ms para el 70% de la base de jugadores.

Ahora, hablemos de la latencia.

### Reducción de la Latencia

Riot Games ha realizado inversiones significativas en la reducción de la latencia para los jugadores y la optimización del rendimiento de los servidores. Su enfoque incluye tanto la ubicación estratégica de los servidores como mejoras tecnológicas.

1. **Ubicación Estratégica de los Servidores**: Cuando Riot Games se asoció inicialmente con AWS, su estrategia de ubicación de servidores se basaba en el uso de las regiones de AWS. Sin embargo, a través de un enfoque basado en datos que utilizaba un análisis de la base de jugadores de League of Legends, obtuvieron información valiosa sobre la demografía de los jugadores y su distribución geográfica. Al realizar evaluaciones detalladas de factores como el ping, la pérdida de paquetes y la latencia, quedó claro que los jugadores ubicados más allá de las fronteras de esas regiones de AWS no estaban teniendo una experiencia de juego óptima.

En respuesta, Riot Games hizo la transición de Outposts de AWS a las Local Zones administradas por AWS, lo que amplió significativamente su presencia de servidores. Actualmente, operan en un total de 33 Local Zones en todo el mundo. Este cambio permitió a Riot atender a los jugadores en regiones que anteriormente habían sido descuidadas, garantizando una experiencia más equitativa para todos. La identificación de jugadores que utilizan VPN en varias ubicaciones también informó su estrategia de ubicación de servidores. Esta evaluación se basó en la latencia del usuario en comparación con los jugadores ubicados físicamente en regiones específicas.

2. **Optimización de Juego**: Llamado [Riot Direct](https://technology.riotgames.com/news/leveling-networking-multi-game-future), este proyecto analiza el flujo de red y elige las mejores rutas entre los servidores de la empresa y el proveedor de Internet de los jugadores, evitando congestiones y utilizando otros circuitos para minimizar problemas que puedan afectar la experiencia de los jugadores.

### Emparejamiento de Jugadores

En términos de emparejamiento de jugadores (conectar jugadores a un juego), Riot tiene servicios dedicados para emparejar jugadores en función del nivel de habilidad y, lo que es más importante, de la latencia. Cuando los jugadores intentan unirse a un juego, verifican el ping a los servidores del juego y también consideran cómo se correlaciona esto con las personas en su grupo. Por ejemplo, si están en estados o países diferentes, es imperativo conectarlos a un servidor de juego que pueda proporcionar un rendimiento satisfactorio para todos los participantes, garantizando una experiencia de juego justa.

### Aprendizaje Automático (ML)

En colaboración con el Laboratorio de Soluciones de Aprendizaje Automático de Amazon AWS, Riot Games se aventuró en el mundo del aprendizaje automático para predecir la probabilidad de victoria de un equipo, inicialmente en League of Legends y ahora expandiéndose a Valorant. Esta iniciativa tiene como objetivo crear una API dinámica que brinde actualizaciones en tiempo real sobre la expectativa de victoria, enriqueciendo la experiencia para los comentaristas en vivo y los espectadores.

Además, el ML se utiliza para la detección de trampas o [Detección Automática de Smurfs](https://playvalorant.com/en-us/news/dev/valorant-systems-health-series-smurf-detection/). Es imposible hablar de juegos en línea competitivos sin mencionar a los tramposos y hacks. Estos mecanismos monitorean las clasificaciones de emparejamiento de las cuentas Smurf. El sistema de detección de Smurfs funciona de manera que detecta el nivel de habilidad de las cuentas recién creadas y las clasifica más rápidamente para equilibrar la diferencia de habilidad.

## Jugar Como Carrera

Ahora, permíteme aclarar un error que siempre tuve y que probablemente muchos de ustedes también tienen: la idea de que jugar videojuegos es solo un pasatiempo. Por lo que vi y aprendí en el evento, jugar a videojuegos puede ser una verdadera carrera.

Los jugadores de hoy firman contratos con equipos profesionales, cuentan con el apoyo de entrenadores, nutricionistas, entrenadores personales y fisioterapeutas, y ganan millones a través de asociaciones, transmisiones en vivo y campeonatos competitivos. Tuve el privilegio de hablar con personas del [equipo Loud](https://liquipedia.net/valorant/LOUD), el equipo brasileño que logró el tercer lugar en el campeonato, y me informaron sobre la dedicación involucrada, donde los jugadores juegan hasta 10 horas al día, reciben capacitación especializada y mucho más.

Sin embargo, no pienses que es fácil convertirse en un jugador famoso. Esto requiere una habilidad excepcional, resistencia mental, trabajo en equipo y la capacidad de mantener la calma bajo una presión intensa. En los momentos críticos de un juego, un solo error puede costarle a tu equipo el campeonato. Es como ser un atleta de élite, pero en lugar de una cancha o una pista, estás en un mundo virtual.

## Hospitalidad VIP de AWS

¡Y ahora lo más emocionante de mi experiencia! Fui invitada por AWS a la hospitalidad VIP del evento, lo que significaba que tenía acceso a áreas exclusivas, asientos privilegiados y una visión detrás de escena de cómo se desarrolla un evento de esta magnitud.

### Acceso a Zona VIP

Nuestra aventura comenzó en el Fanfest, un área exclusiva donde los patrocinadores del evento tenían sus stands. Aquí, pude interactuar con otros fanáticos, experimentar demostraciones tecnológicas y recoger algunos obsequios geniales de AWS y Riot Games.

![Imagen de Julia en el Fanfest](https://blog-imgs-23.s3.amazonaws.com/Fanfest.png)

Después del Fanfest, fuimos conducidos a nuestra Zona VIP en el estadio. Esto significaba asientos premium con una vista perfecta de la acción y acceso a una experiencia de visualización inigualable.

![Asientos VIP en el estadio](https://blog-imgs-23.s3.amazonaws.com/VIP-seats.png)

### Conocimiento Entre Bastidores

Además de disfrutar del juego, también tuvimos la oportunidad de conocer a algunos de los ingenieros y ejecutivos de AWS y Riot Games. Pudimos hacer preguntas y aprender más sobre la tecnología detrás de la experiencia del juego y la colaboración entre estas dos grandes empresas.

### Comida y Bebida Exclusiva

Por último, pero no menos importante, la hospitalidad VIP incluyó una deliciosa comida y bebida durante todo el evento. Fue una experiencia realmente inmersiva, y me sentí muy agradecida por la oportunidad de vivir el campeonato de esta manera.

![Comida y bebida en la hospitalidad VIP](https://blog-imgs-23.s3.amazonaws.com/VIP-food.png)

## Conclusión

Mi experiencia en la hospitalidad VIP del AWS VALORANT Champions 2023 fue inolvidable. Me dio una visión profunda de la industria de los eSports, la tecnología detrás de los juegos y cómo AWS está haciendo una diferencia significativa en la experiencia del jugador. Valorant es más que un juego; es un deporte digital en rápido crecimiento que combina habilidad, estrategia y tecnología de vanguardia.

Estoy emocionada por el futuro de los eSports y agradecida a AWS por esta oportunidad única. Y, por supuesto, un agradecimiento especial a Riot Games por crear juegos que inspiran a millones y hacen posible eventos como el AWS VALORANT Champions.

¡No puedo esperar para ver qué nos depara el futuro en el mundo de los eSports!

