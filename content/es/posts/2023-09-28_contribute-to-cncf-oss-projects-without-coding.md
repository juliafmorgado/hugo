---
title: "Como contribuir a la localización del glosario de la CNCF - sin código!"
author: "Julia Furst Morgado"
date: 2023-09-26T11:46:05.964Z
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-oss.png
tags: 
    - CNCF
    - Open Source
    - Tutorial
categories: 
    - Tech
slug: /como-contribuir-localizacion-glosario-cncf-sin-codigo


---

## Introducción

El [Glosario de la Fundación de Computación Nativa en la Nube (CNCF)](https://glossary.cncf.io/) es un recurso valioso que ayuda a aclarar la terminología y el argot utilizados en el mundo de la informática nativa en la nube. Proporciona definiciones concisas y precisas de términos esenciales, convirtiéndose en una herramienta indispensable tanto para recién llegados como para profesionales experimentados en el campo.

Siempre animo a todos a empezar a contribuir al código abierto temprano en su carrera porque podrás:

- Aprender y adquirir experiencia
- Conocer a personas interesadas en cosas similares a ti
- Encontrar mentores
- Construir una reputación y potenciar tu carrera
- Obtener esos cuadrados verdes en GitHub
- ¡Beneficiarte mucho más!

## ¿Localización?

La localización es el proceso de traducir y adaptar un producto o servicio a un idioma y cultura específicos. En el contexto del Glosario de Cloud Native, la localización se refiere a traducir los términos y definiciones del glosario a otros idiomas. También puedes contribuir de [diferentes maneras](https://glossary.cncf.io/contribute/#welcome) si solo hablas inglés (y no olvides leer mi guía sobre [cómo convertirse en un colaborador de código abierto](https://www.juliafmorgado.com/posts/guide-to-become-open-source-contributor/)).

Contribuir a la localización del Glosario CNCF no es solo una forma fantástica de devolver a la comunidad nativa en la nube, sino también una excelente oportunidad para profundizar tu comprensión de la tecnología y su terminología. Al participar en este proyecto de código abierto, lo haces accesible para un público más amplio, especialmente para aquellos que prefieren consumir contenido en sus idiomas nativos.

![Glosario de Cloud Native](https://blog-imgs-23.s3.amazonaws.com/glossary-webpage.png)

## Pasos para contribuir

### **Lee la documentación**

Lee la página [Cómo contribuir](https://glossary.cncf.io/contribute/) en el sitio web del Glosario de Cloud Native. Esta página proporciona información sobre cómo localizar el glosario, incluyendo la guía de localización, la guía de estilo y las mejores prácticas.

![Cómo contribuir](https://blog-imgs-23.s3.amazonaws.com/how-to-contribute-webpage.png)

### **Únete a la comunidad**

Únete al espacio de trabajo de [CNCF en Slack](https://cloud-native.slack.com/) y únete a los canales [#glossary-localizations](https://app.slack.com/client/T08PSQ7BQ/C02N2RGFXDF) y #glossary-localization-[nombre de tu idioma]. Estos canales son donde puedes conectar con otros miembros del equipo de localización del Glosario de Cloud Native y obtener ayuda con cualquier pregunta que tengas. Si el proyecto del Glosario CNCF no tiene un equipo de localización para tu idioma todavía, lee [esto](https://github.com/cncf/glossary/blob/main/LOCALIZATION.md#initiating-a-new-localization-team).

![CNCF Slack](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-slack.png)

### **Busca problemas abiertos que no hayan sido asignados**

Puedes encontrar problemas abiertos buscando en el repositorio GitHub del Glosario de Cloud Native [repository](https://github.com/cncf/glossary/issues?q=is%3Aissue+is%3Aopen+label%3Alang%2Fes+no%3Aassignee+), y filtrándolos con las etiquetas `"is:issue is:open label:lang/es no:assignee"`.

![Problemas abiertos](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-issues.png)

> **Nota:** En este ejemplo, "es" es para español, pero puedes cambiar la etiqueta a tu idioma. Por ejemplo, hindi sería `label:lang/hi` y francés sería `label:lang/fr`.

### **Si no encuentras problemas abiertos**

En caso de que no haya problemas abiertos, verifica el canal Slack dedicado a tu idioma para ver documentos fijados que muestren los términos/páginas que aún necesitan ser traducidos. También considera enviar un mensaje amable y educado en el canal Slack para presentarte, expresar tu interés en contribuir al proyecto e investigar si hay una lista o sistema de seguimiento disponible para tareas de traducción.

### **Si encontraste un problema**

Una vez que hayas encontrado un problema, deja un comentario diciendo que te gustaría asumir ese problema/trabajar en él. Un miembro del equipo de localización del Glosario de Cloud Native revisará tu solicitud y la aprobará. Espera ser aceptado porque a veces ya hay alguien trabajando en ello y habrías trabajado en vano.

![Ejemplo de problema](https://blog-imgs-23.s3.amazonaws.com/cncf-issue-1209.png)

### **Bifurca el repositorio GitHub del Glosario de Cloud Native**

Esto creará una copia del repositorio en tu propia cuenta de GitHub.

![Bifurcar repositorio](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-fork-repo.png)

### **Clona el repositorio bifurcado**

Utiliza el comando `git clone` para clonar el repositorio bifurcado en tu entorno de desarrollo integrado (IDE) en tu máquina local o en cualquier IDE que estés utilizando. Últimamente he estado utilizando [AWS Cloud9](https://aws.amazon.com/cloud9/) y realmente me gusta.

![Clonar repositorio](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-git-clone.png)

### **Crea una rama de trabajo**

Por ejemplo, si estás traduciendo al español, crearías una rama a partir de la rama `dev-es`. Si no estás familiarizado con el flujo de trabajo de Git y GitHub, puedes omitir este paso.

### **Crea un nuevo archivo .md**

Dentro de la carpeta de tu idioma, crea un nuevo archivo para el término y nómbralo con el nombre en inglés (no olvides la extensión .md al final).

![Nuevo término](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-new-term.png)

### **Traduce el término**

Asegúrate de seguir la guía de localización y la guía de estilo al traducir los términos. Comprueba los términos que ya han sido traducidos para utilizar las mismas palabras. No olvides traducir el título, la categoría y las etiquetas. Una vez que te asegures de revisarlo cuidadosamente. Los revisores y mantenedores del proyecto tienen agendas ocupadas, y puede ser molesto para ellos solicitar correcciones menores como una coma faltante o una tilde.

> **Importante:** 
Si tu término incluye hipervínculos a otros términos y esos términos ya han sido traducidos, asegúrate de modificar el hipervínculo para que dirija al término traducido. Por ejemplo, si estás traduciendo un término al español, actualiza el hipervínculo de https://glossary.cncf.io/abstraction/ a https://glossary.cncf.io/es/abstraction/. Esto ayuda a mantener una experiencia sin problemas para los usuarios que acceden al glosario en su idioma preferido.

![Término traducido](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-translated.png)

### **Confirma tus cambios y súbelos a tu repositorio bifurcado**

Primero, escribe en tu terminal: `git add [ruta a tu archivo]` o si acabas de cambiar ese archivo, puedes hacer `git add .`.
Luego escribe: `git commit -m 'nueva traducción para [término]'`.
Y finalmente: `git push`.

Una vez que hayas subido tus cambios a tu repositorio bifurcado, verás que tu rama está por delante de la rama cncf:main y que puedes contribuir abriendo una solicitud de extracción (también conocida como PR).

![Nuevo commit](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-newcommit.png)

### **Abre una solicitud de extracción**

Para abrir una PR, haz clic en el botón verde para abrir una solicitud de extracción que apunte a la rama de desarrollo en español (dev-es) - o en cualquier otro idioma, para fusionar tus cambios en el repositorio principal del Glosario de Cloud Native.

![Nueva solicitud de extracción](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-newpr.png)

(opcional) 
En el canal Slack del equipo (#glossary-localization-spanish), házles saber que has enviado tu PR.

### **Espera a que tu solicitud de extracción sea revisada**

Una vez que hayas abierto una solicitud de extracción, los miembros del equipo de localización del Glosario de Cloud Native en tu idioma revisarán tus cambios. Pueden proporcionar comentarios o sugerir cambios en tus traducciones. Monitorea con frecuencia las notificaciones ubicadas en la esquina superior derecha de tu pantalla; allí las encontrarás.

![PR del Glosario de Cloud Native](https://blog-imgs-23.s3.amazonaws.com/cncf-glossary-pr.png)

### **Realiza los cambios necesarios y actualiza tu solicitud de extracción**

### **Fusiona tu solicitud de extracción**

Una vez que tu solicitud de extracción haya sido aprobada, puedes fusionarla en el repositorio principal del Glosario de Cloud Native y tus traducciones se publicarán en el sitio web del Glosario de Cloud Native. Si creaste una rama en el paso 8, también puedes eliminarla ahora. ¡Y voilá!

![Solicitud de extracción exitosa](https://blog-imgs-23.s3.amazonaws.com/ccncf-glossary-successfulpr.png)

## Consejos finales

* Comienza poco a poco. No sientas que necesitas traducir todo el glosario de una vez. Comienza traduciendo algunos términos o páginas con los que estás familiarizado o que sean relevantes para tus intereses.
* Utiliza las traducciones existentes. Si un término o página ya ha sido traducido a tu idioma, puedes utilizar esa traducción como punto de partida. Sin embargo, asegúrate de revisar la traducción existente y realizar los cambios necesarios.
* Sé consistente. Al traducir términos, trata de ser lo más consistente posible. Utiliza la misma terminología en todo el glosario y evita utilizar diferentes traducciones para el mismo término.
* Si tienes alguna pregunta o necesitas ayuda con algo, envía un mensaje en el canal Slack. Si tienes alguna pregunta o necesitas ayuda con algo, no dudes en pedir ayuda en el canal de Slack #glossary-localizations o en el canal de Slack para tu idioma. Los demás miembros del equipo siempre están dispuestos a ayudar a los nuevos colaboradores. No te avergüences y no esperes demasiado; de lo contrario, los revisores/mantenedores del proyecto pensarán que lo has abandonado.

¡Buena suerte y avísame si te gustaría conocer otros proyectos a los que puedas contribuir de la misma manera!

---
Si te gustó este artículo, sígueme en [Twitter](https://twitter.com/juliafmorgado) (donde comparto mi trayectoria tecnológica) a diario, conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), visita mi [IG](https://www.instagram.com/juliafmorgado/), ¡y asegúrate de suscribirte a mi canal de [Youtube](https://www.youtube.com/c/JuliaFMorgado) para obtener más contenido increíble!
