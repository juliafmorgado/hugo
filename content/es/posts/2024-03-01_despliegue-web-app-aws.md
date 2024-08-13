---
title: "Despliega tu primera aplicación web en AWS con AWS Amplify, Lambda, DynamoDB y API Gateway"
author: "Julia Furst Morgado"
date: 2024-03-01T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-web-app-aws.png
tags: 
    - AWS
categories: 
    - Tecnología
slug: /despliega-aplicacion-web-en-aws-amplify-lambda-dynamodb-api-gateway
---

¡Hola!

Si has decidido aprender más sobre AWS, ¡entonces has llegado al artículo correcto!

Esta guía está diseñada para principiantes o desarrolladores con alguna experiencia en la nube que deseen aprender los fundamentos de la construcción de aplicaciones web en la plataforma de nube de AWS. Te guiaremos a través del despliegue de un sistema básico de gestión de contactos, presentándote servicios clave de AWS en el camino.

En este proyecto, como puedes adivinar por el título, utilizaremos AWS, que significa Amazon Web Services; una excelente plataforma en la nube con servicios infinitos para tantos casos de uso diversos, desde entrenar modelos de aprendizaje automático hasta alojar sitios web y aplicaciones.

>La computación en la nube proporciona acceso bajo demanda a recursos informáticos como servidores, almacenamiento y bases de datos.
> Las funciones sin servidor son un tipo de servicio de computación en la nube que te permite ejecutar código sin gestionar servidores.

Al final de este tutorial, serás capaz de:

- Desplegar un sitio web estático en AWS Amplify.
- Crear una función sin servidor usando AWS Lambda.
- Construir una API REST con API Gateway.
- Almacenar datos en una base de datos NoSQL usando DynamoDB.
- Gestionar permisos con políticas de IAM.
Integrar tu código frontend con los servicios backend.

Te recomiendo seguir el tutorial una vez y luego intentarlo por ti mismo la segunda vez. Y antes de comenzar, asegúrate de tener una cuenta de AWS. Regístrate para una cuenta gratuita si aún no lo has hecho.

¡Ahora empecemos!

## Paso 1: Desplegar el código frontend en AWS Amplify

En este paso, aprenderemos a desplegar recursos estáticos para nuestra aplicación web utilizando la consola de AWS Amplify.

Conocimientos básicos de desarrollo web serán útiles para esta parte. Crearemos nuestro archivo HTML con el código CSS (estilo) y Javascript (funcionalidad) incrustados en él. He dejado comentarios a lo largo para explicar qué hace cada parte.

Aquí tienes el fragmento de código de la página:

{{< gist juliafmorgado 30d1c59739a8405b86cc107c17d78b05 >}}

Hay múltiples formas de subir nuestro código a la consola de Amplify. Por ejemplo, me gusta usar Git y Github. Para mantener simple este artículo, te mostraré cómo hacerlo directamente por el método de arrastrar y soltar en Amplify. Para hacer esto, tenemos que comprimir nuestro archivo HTML.

![](https://blog-imgs-23.s3.amazonaws.com/compress-index.png)

Ahora, asegúrate de estar en la región más cercana a donde vives. Puedes ver el nombre de la región en la parte superior derecha de la página, justo al lado del nombre de la cuenta. Luego, vamos a la consola de AWS Amplify. Se verá algo así:

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-main-page.png)

Cuando hagamos clic en “Empezar”, nos llevará a la siguiente pantalla (iremos con Alojamiento de Amplify en esta pantalla):

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-host-web-app.png)


![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-deploy-wo-git.png)

Iniciarás un despliegue manual. Dale a tu aplicación un nombre, yo la llamaré "Sistema de Gestión de Contactos", e ignora el nombre del entorno. Luego, suelta el archivo índice comprimido y haz clic en Guardar y Desplegar.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-manual-deployment.png)

Amplify desplegará el código y devolverá una URL de dominio donde podemos acceder al sitio web.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-domain-web-app.png)

Haz clic en el enlace y deberías ver esto:

![Sitio web en vivo por AWS Amplify](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-clicked-web-app.png)

## Paso 2: Crear una función sin servidor AWS Lambda

En este paso, crearemos una función sin servidor usando el servicio AWS Lambda. Una función Lambda es una función sin servidor que ejecuta código en respuesta a eventos. No necesitas gestionar servidores ni preocuparte por la escalabilidad, lo que la convierte en una solución rentable para tareas simples. Para darte una idea, un gran ejemplo de computación sin servidor en la vida real son las máquinas expendedoras. Envían la solicitud a la nube y procesan el trabajo solo cuando alguien comienza a usar la máquina.

Vamos al servicio Lambda dentro de la consola de AWS. Por cierto, asegúrate de estar creando la función en la misma región en la que desplegaste el código de la aplicación web en Amplify.

Es hora de crear una función. Asígnale un nombre, yo la llamaré "my-web-app-function", y para los parámetros de lenguaje de programación en tiempo de ejecución: he elegido Python 3.12, pero siéntete libre de elegir un lenguaje y versión con los que te sientas más cómodo y familiarizado.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function.png)

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function-step.png)

Después de que nuestra función lambda esté creada, desplázate hacia abajo y verás la siguiente pantalla:

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-new-function.png)

Ahora, vamos a editar la función lambda. Aquí tienes una función que extrae los nombres y apellidos del input JSON del evento. Y luego devuelve un diccionario de contexto. La clave body almacena el JSON, que es una cadena de saludo.

{{< gist juliafmorgado 7e1275b8b00d1dd70c62db47efeec418 >}}

Después de editar, haz clic en Desplegar para guardar "my-web-app-function", y luego haz clic en Probar para crear un evento.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-deploy-test.png)

Para configurar un evento de prueba, da un nombre al evento como "MyEventTest", modifica los atributos del JSON del evento y guárdalo.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-event.png)

Ahora haz clic en el gran botón azul de prueba para que podamos probar la función Lambda.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-succeeded.png)

El resultado de la ejecución tiene los siguientes elementos:

- Nombre del Evento de Prueba
- Respuesta
- Registros de la Función
- ID de Solicitud

## Paso 3: Crear API Rest con API Gateway

Ahora vamos a avanzar y desplegar nuestra función Lambda en la Aplicación Web. Utilizaremos Amazon API Gateway para crear una API REST que nos permita hacer solicitudes desde el navegador web. API Gateway actúa como un puente entre tus servicios backend (como funciones Lambda) y tu aplicación frontend. Te permite crear APIs que exponen funcionalidad a tu aplicación web.

> REST: Transferencia de Estado Representacional.

> API: Interfaz de Programación de Aplicaciones.

Ve a Amazon API Gateway para crear una nueva API REST.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-rest-api.png)

En la página de creación de la API, tenemos que darle un nombre, por ejemplo "Web App API", y elegir un tipo de protocolo y tipo de punto final para la API REST (selecciona optimizado por Edge).

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-api-creation.png)

Ahora tenemos que crear un método POST así que haz clic en Crear método.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-create-method.png)

En la página Crear método, selecciona el tipo de método como POST, el tipo de integración debe ser función Lambda, asegúrate de que la Región sea la misma Región que has usado para crear la función lambda y selecciona la función Lambda que acabamos de crear. Termina haciendo clic en Crear método en la parte inferior de la página.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-method-type-post.png)

Ahora necesitamos habilitar CORS, así que selecciona el / y luego haz clic en habilitar CORS

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-path-cors.png)

En la configuración de CORS, simplemente marca la casilla POST y deja todo lo demás por defecto, luego haz clic en guardar.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-cors-settings.png)

Después de habilitar los encabezados CORS, haz clic en el botón naranja Desplegar API.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-deploy-api2.png)

Aparecerá una ventana, bajo etapa selecciona nueva etapa y da un nombre a la etapa, por ejemplo "web-app-stage", luego haz clic en desplegar.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-new-stage2.png)

Cuando veas la etapa, habrá una URL denominada Invoke URL. Asegúrate de copiar esa URL; la utilizaremos para invocar nuestra función lambda en el paso final de este proyecto.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-invoke-url.png)

## Paso 4: Crear una tabla en DynamoDB

En este paso, crearemos una tabla de datos en Amazon DynamoDB, otro servicio de AWS. DynamoDB es un servicio de base de datos NoSQL que almacena datos en pares clave-valor. Es altamente escalable y flexible, lo que lo hace adecuado para diversas aplicaciones. Haz clic en el botón naranja crear tabla.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-create-table.png)

Ahora tenemos que completar información sobre nuestra tabla de datos, como el nombre "contact-management-system-table", y la clave de partición es ID. El resto déjalo por defecto. Haz clic en Crear tabla.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-settings.png)

Una vez que la tabla se haya creado correctamente, haz clic en ella y se abrirá una nueva ventana con los detalles de la tabla. Expande la Información adicional y copia el Nombre de recurso de Amazon (ARN). Utilizaremos el ARN en el siguiente paso al crear las políticas de acceso IAM.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-arn.png)

## Paso 5: Configurar políticas y permisos de IAM

IAM de AWS es una de las cosas más básicas e importantes que se deben configurar, sin embargo, muchas personas lo descuidan. Para mejorar la seguridad, siempre se recomienda un modelo de acceso de privilegios mínimos, lo que significa no dar a un usuario más acceso del necesario. Por ejemplo, incluso para este proyecto de aplicación web simple, ya hemos trabajado en múltiples servicios de AWS: Amplify, Lambda, DynamoDB y API Gateway. Es esencial comprender cómo se comunican entre sí y qué tipo de información comparten.

Ahora volvamos a nuestro proyecto, tenemos que definir una política IAM para dar acceso a nuestra función lambda para escribir/actualizar los datos en la tabla DynamoDB.

Así que regresa a la consola de AWS Lambda, y haz clic en la función lambda que acabamos de crear. Luego ve a la pestaña de configuración, y en el menú izquierdo haz clic en Permisos. Bajo Rol de ejecución, verás un nombre de Rol.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-permissions.png)

Haz clic en el enlace, lo que nos llevará a la configuración de permisos de este rol IAM. Ahora haz clic en Agregar permisos, luego crea una política en línea.

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-permissions.png)

Luego haz clic en JSON, elimina lo que está en el editor de Política y pega lo siguiente.

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

Asegúrate de sustituir "TU-ARN-DE-TABLA-DB" con el ARN real de tu tabla DynamoDB. Haz clic en Siguiente, dale a la política un nombre, como "lambda-dynamodb", y luego haz clic en Crear política. Esta política permitirá que nuestra función Lambda lea, edite, elimine y actualice elementos de la tabla de datos DynamoDB.

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-json-permissions.png)

Ahora cierra esta ventana, y vuelve a la función Lambda, ve a la pestaña de Código y actualizaremos el código Python de la función lambda con lo siguiente.

{{< gist juliafmorgado 8eb027cb9502b88d91d2710fbe99b347 >}}

La respuesta está en formato de API REST. Después de hacer los cambios, asegúrate de desplegar el código. Después de que se concluya el despliegue, podemos Probar el programa haciendo clic en el botón azul de prueba.

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-new.png)

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-succeeded.png)

También podemos verificar los resultados en la tabla DynamoDB. Cuando ejecutamos la función, actualiza los datos en nuestra tabla. Así que ve a AWS DynamoDB, haz clic en explorar elementos en la barra de navegación izquierda, haz clic en tu tabla. Aquí está el objeto devuelto por la función lambda:

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-explore-items.png)

## Paso 6: Actualizar el código frontal con la API Rest

¡Felicidades por haber llegado tan lejos!

En este último paso, veremos todo lo que acabamos de construir en acción. Actualizaremos el frontend para poder invocar la API REST con la ayuda de nuestra función lambda y recibir datos.

Primero, vuelve a tu index.html en tu editor de código. ¿Ves en la línea 68 que tenías "API_KEY"? Adelante y cámbialo por la URL de invocación que copiaste del servicio de API Gateway en los detalles de tu API REST. Una vez que hayas hecho eso, guarda y comprime el archivo nuevamente, como hicimos en el paso 1, y súbelo nuevamente a AWS usando la consola.

![](https://blog-imgs-23.s3.amazonaws.com/index-code-vscode.png)

Haz clic en el nuevo enlace que obtuviste y vamos a probarlo.

![](https://blog-imgs-23.s3.amazonaws.com/web-app-test.png)

Nuestras tablas de datos reciben la solicitud POST con los datos introducidos. La función lambda invoca la API cuando se hace clic en el botón “Llamar API”. Luego, utilizando javascript, enviamos los datos en formato JSON a la API. Puedes encontrar los pasos bajo la función callAPI.

Puedes encontrar los elementos devueltos a mi tabla de datos a continuación:

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-final-result.png)

## Conclusión

¡Felicidades! Has creado una aplicación web simple utilizando la plataforma de la nube de AWS. La informática en la nube está creciendo y se está convirtiendo cada vez más en parte del desarrollo de nuevos software y tecnologías.

Si te sientes preparado para un desafío, a continuación podrías:

- Mejorar el diseño del frontend
- Agregar autenticación y autorización de usuarios
- Configurar paneles de monitoreo y análisis
- Implementar canalizaciones de CI/CD para automatizar los procesos de compilación, prueba y despliegue de tu aplicación web utilizando servicios como AWS CodePipeline, AWS CodeBuild y AWS CodeDeploy.

Trabajar en proyectos de programación prácticos es la mejor manera de mejorar tus habilidades.

Estaré cubriendo algunos otros escenarios en AWS en mis próximas publicaciones en el blog, ¡así que estate atento!

Y nuevamente, siéntete libre de darme retroalimentación, y si estoy fuera de rumbo, no dudes en hacérmelo saber. Todos estamos juntos en esto, aprendiendo y creciendo como comunidad.

***

Si te gustó este artículo, sígueme en [Twitter](https://twitter.com/juliafmorgado) (donde comparto mi viaje tecnológico diario), conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), visita mi [IG](https://www.instagram.com/juliafmorgado/), y asegúrate de suscribirte a mi canal de [Youtube](https://www.youtube.com/c/JuliaFMorgado) para más contenido increíble!

