---
title: "Desplegando WordPress y MySQL en Kubernetes con Kind: Una Guía Paso a Paso"
author: "Julia Furst Morgado"
date: 2024-06-24T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/wp-mysql-kind-banner.png
tags: 
    - Kubernetes
slug: /desplegando-wordpress-mysql-en-kubernetes-con-kind
---

Este blog está inspirado en un [artículo](https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/) del sitio web de Kubernetes que enseña cómo desplegar WordPress y MySQL en Minikube, pero como lo encontré muy confuso y quería usar Kind, estoy escribiendo esta guía paso a paso.

Desplegar WordPress y MySQL en Kubernetes usando [Kind (Kubernetes IN Docker)](https://kind.sigs.k8s.io/) es una excelente manera de crear un entorno de desarrollo local robusto. Esta guía te lleva a través de todo el proceso, desde la instalación de las herramientas necesarias hasta la limpieza de tu despliegue.

## Instalación

Para usar Kind, lo primero que necesitas es un host con Docker. Sigue las instrucciones en el [sitio web de Docker](https://docs.docker.com/get-docker/) para instalar Docker en tu máquina. Luego, necesitas instalar la herramienta Kind. El proceso de instalación varía dependiendo de tu sistema operativo. Para MacOS, puedes usar [Homebrew](https://formulae.brew.sh/formula/kind):

`brew install kind`

Con Docker y Kind instalados, estás listo para crear tu clúster de Kubernetes.

## Crear un Clúster con Más de un Nodo
Por defecto, Kind crea un clúster de un solo nodo. Para simular un entorno más complejo, puedes crear un clúster multinodo.

Ejecuta este comando para crear un archivo llamado kind-node.yaml con el siguiente contenido:

```
cat <<EOF >kind-node.yaml
# Configuración del clúster de tres nodos (dos trabajadores)
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF
```

Puedes verificar que el archivo fue creado ejecutando `ls` en tu terminal.

Ahora, para aplicar esta configuración y crear el clúster, es necesario agregar el parámetro `–config` y el nombre del archivo donde lo has guardado.

Entonces, ejecuta el siguiente comando: 

`kind create cluster --config=kind-node.yaml`

![](https://blog-imgs-23.s3.amazonaws.com/kind-cluster.png)

Una vez que tu clúster haya sido creado, puedes verificar los nodos en tu clúster con el comando: 

`kubectl get nodes`

Alternativamente, puedes usar Docker para ver los nodos: 

`docker ps`

Esta configuración asegura que los tres nodos (control-plane y dos nodos worker) se estén ejecutando como contenedores Docker en tu host.

## Instalando WordPress y MySQL
Ahora, vamos a desplegar WordPress y MySQL en tu clúster. Para hacerlo, necesitarás dos archivos de configuración llamados manifests que definen las configuraciones para los pods de MySQL y WordPress.

### Descargar el Manifiesto de MySQL
Comienza descargando el archivo de configuración del deployment de MySQL:

`curl -LO https://k8s.io/examples/application/wordpress/mysql-deployment.yaml`

Este manifiesto define un deployment de MySQL de instancia única. Dentro de esta configuración:

- El contenedor de MySQL está configurado para usar un PersistentVolume localizado en `/var/lib/mysql` para almacenar sus datos.
- La variable de entorno `MYSQL_ROOT_PASSWORD` es crucial ya que asegura la base de datos de MySQL estableciendo la contraseña root recuperada de un Secret de Kubernetes.

### Descargar el Manifiesto de WordPress
A continuación, recupera el archivo de configuración del deployment de WordPress:

`curl -LO https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml`

Este manifiesto detalla un deployment de WordPress de instancia única. Los puntos clave incluyen:

- El contenedor de WordPress utiliza un PersistentVolume montado en `/var/www/html` para almacenar sus archivos de datos del sitio web.
- La variable de entorno `WORDPRESS_DB_HOST` especifica el nombre del servicio de MySQL, permitiendo que WordPress se comunique con la base de datos de MySQL a través del descubrimiento de servicios de Kubernetes.
- La variable de entorno `WORDPRESS_DB_PASSWORD` recupera la contraseña de la base de datos de forma segura desde un Secret gestionado por Kubernetes.

### PersistentVolumes y Deployment
Tanto MySQL como WordPress dependen de PersistentVolumes para preservar datos entre reinicios o reprogramaciones de los pods. Kubernetes gestiona la creación de PersistentVolumeClaims (PVCs) basándose en las definiciones proporcionadas en sus respectivos archivos manifest durante el deployment.

Siguiendo estos pasos y desplegando estos manifests, estableces un entorno robusto para WordPress y MySQL en Kubernetes. Esta configuración asegura la integridad y disponibilidad de los datos, aprovechando efectivamente las capacidades de orquestación de Kubernetes.

### Crear un kustomization.yaml
Un archivo kustomization se usa para definir un conjunto de recursos y parámetros de configuración de Kubernetes para deployments. Permite personalizar, gestionar y desplegar aplicaciones de Kubernetes de manera estructurada.

Entonces, crea un archivo `kustomization.yaml` para especificar el orden de ejecución y generar un Secret para la contraseña de MySQL. Esto asegura la gestión segura de datos sensibles, como contraseñas, utilizando Secrets de Kubernetes.

Reemplaza `YOUR_PASSWORD` por tu contraseña deseada:

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

### Aplicar y Verificar
Nuevamente, puedes verificar que el archivo fue creado ejecutando ls en tu terminal. Deberías ver 4 archivos.

Con todos los archivos de configuración en su lugar, despliega los recursos usando el siguiente comando:

`kubectl apply -k ./`

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp-mysql-dep.png)

Verifica que todos los objetos hayan sido creados:

```
kubectl get pods
kubectl get secrets
kubectl get pvc
kubectl get services
```

## Exponer el Servicio de WordPress
Cuando se ejecuta Kubernetes en un entorno de desarrollo local, como Kind (Kubernetes IN Docker), el tipo de servicio LoadBalancer no funcionará como se espera porque no hay un load balancer externo disponible. Sin embargo, aún puedes acceder a servicios en ejecución en un clúster Kind sin necesitar soporte integrado para LoadBalancer utilizando Port Forwarding.

Esta es una forma sencilla de acceder a tu servicio desde tu máquina local.

`kubectl port-forward svc/wordpress 8080:80`

![](https://blog-imgs-23.s3.amazonaws.com/kind-expose-wp-service.png)

¡VOILÁ! Después de ejecutar este comando, puedes acceder a tu sitio de WordPress en http://localhost:8080.

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp.png)

Para detener el port forwarding, presiona `Ctrl+C` en tu terminal.

## Limpiar
Una vez que hayas terminado con tu deployment de WordPress y MySQL, limpia tus recursos.

Elimina los recursos desplegados:

`kubectl delete -k ./`

Elimina el clúster Kind:

`kind delete cluster`


![](https://blog-imgs-23.s3.amazonaws.com/kind-delete.png)

Siguiendo estos pasos, has desplegado con éxito WordPress y MySQL en un clúster multinodo Kind. Esta configuración proporciona un entorno de desarrollo local escalable y fácilmente gestionable para tus proyectos.

---
Si te gustó este artículo, sígueme en [Twitter](https://twitter.com/juliafmorgado) (donde comparto mi trayectoria tecnológica) a diario, conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), visita mi [IG](https://www.instagram.com/juliafmorgado/), ¡y asegúrate de suscribirte a mi canal de [Youtube](https://www.youtube.com/c/JuliaFMorgado) para obtener más contenido increíble!

