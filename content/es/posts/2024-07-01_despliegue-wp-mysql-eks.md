---
title: "Despliegue fácilmente WordPress y MySQL en Amazon EKS"
author: "Julia Furst Morgado"
date: 2024-07-01T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-wp-mysql-eks-thumbnail.png
tags: 
    - Kubernetes
slug: /despliegue-facilmente-wordpress-mysql-en-amazon-eks
---

[Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) es un servicio de Kubernetes gestionado que facilita la ejecución de Kubernetes en AWS sin necesidad de instalar y operar su propio plano de control de Kubernetes o nodos. Al aprovechar EKS, se beneficia de la escalabilidad, seguridad y fiabilidad de AWS, al mismo tiempo que simplifica sus tareas de gestión de Kubernetes. En esta guía, recorreremos los pasos para desplegar un sitio de WordPress con estado y su base de datos MySQL en un clúster EKS, demostrando el poder y la facilidad de usar Kubernetes gestionado con AWS.

**Requisitos previos**

- Debe tener una cuenta en AWS: [ENLACE](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- Usuario de IAM en AWS con poderes de administrador: [ENLACE](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
- Para acceder a la cuenta de AWS desde la CLI, debe tener AWS CLI instalado en su máquina. Para instalar AWS CLI, siga esta documentación: [ENLACE](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- Para gestionar Kubernetes, necesita el comando `kubectl`: [ENLACE](https://kubernetes.io/docs/tasks/tools/install-kubectl/) o [ENLACE](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
- Instale el comando `eksctl` en su máquina local para gestionar clústeres EKS: [ENLACE](https://eksctl.io/installation/)
- Helm instalado para la gestión de paquetes de Kubernetes: [ENLACE](https://formulae.brew.sh/formula/helm) o [ENLACE](https://helm.sh/docs/intro/install/)

## Paso 1. Cree clúster EKS

Cree su clúster de Kubernetes a través de `eksctl` con los siguientes comandos:

```
eksctl create cluster
--name eks-wp
--region us-east-1
--zones us-east-1a,us-east-1b
--managed
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-ready.png)

Una vez que su clúster esté desplegado, puede verificar la conectividad con el comando: `kubectl cluster-info`

Para ver los nodos: `kubectl get nodes`

Para ver los pods que ya están ejecutándose: `kubectl get pods -A`

Para obtener información detallada sobre las instancias en las que se están ejecutando los pods: `kubectl get pods -o wide -A`

## Paso 2. Cree un Proveedor IAM OIDC para su clúster

Primero, cree un [proveedor IAM OIDC](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) para su clúster EKS para habilitar el uso de roles IAM para cuentas de servicio de Kubernetes. Esta característica permite que las cuentas de servicio de Kubernetes asuman roles IAM, permitiendo una gestión de permisos granular para los pods que se ejecutan en su clúster.

```
oidc_id=$(aws eks describe-cluster --name eks-wp --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4
eksctl utils associate-iam-oidc-provider --cluster eks-wp --approve
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-oidc.png)

## Paso 3. Añade un rol IAM usando `eksctl`

Cree una [cuenta de servicio IAM](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) con las políticas necesarias adjuntas.

```
eksctl create iamserviceaccount
--name ebs-csi-controller-sa
--namespace kube-system
--cluster eks-wp
--attach-policy-arn arn:aws:iam::aws
/service-role/AmazonEBSCSIDriverPolicy
--approve
--role-name AmazonEKS_EBS_CSI_DriverRole
```

Este comando es esencial para configurar la infraestructura IAM necesaria para permitir que el controlador EBS CSI (Elastic Block Store Container Storage Interface) gestione los volúmenes EBS dentro de su clúster de Kubernetes en AWS EKS. El rol IAM (`AmazonEKS_EBS_CSI_DriverRole`) creado aquí tendrá los permisos definidos por la política adjunta (`AmazonEBSCSIDriverPolicy`), permitiendo que el controlador CSI realice acciones como adjuntar, separar y gestionar volúmenes EBS como almacenamiento persistente para sus cargas de trabajo en Kubernetes.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-iamsa-ebs-csi-controller.png)

## Paso 4. Instale el controlador EBS CSI

Añada el controlador EBS CSI a su clúster EKS usando el rol IAM creado.

```
# Obtener el ARN del rol IAM
role_arn=$(aws iam list-roles --query "Roles[?RoleName=='AmazonEKS_EBS_CSI_DriverRole'].Arn" --output text)

# Instalar el controlador EBS CSI
eksctl create addon --name aws-ebs-csi-driver --cluster eks-wp --service-account-role-arn $role_arn --force
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-ebs-csi-install.png)

## Paso 5. Despliegue el controlador EBS CSI en su clúster Amazon EKS

Añada e instale el controlador EBS CSI usando Helm.

```
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver
helm repo update
helm upgrade --install aws-ebs-csi-driver
--namespace kube-system
aws-ebs-csi-driver/aws-ebs-csi-driver
```

Una vez que el controlador haya sido desplegado, verifique que los pods estén ejecutándose:

`kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver`

## Paso 6. Despliegue MySQL y WordPress

Ahora, puede crear los recursos necesarios de Kubernetes para MySQL y WordPress en el clúster. Para ello, necesita crear dos archivos. Estos archivos contienen información sobre las diferentes configuraciones que se aplicarán a nuestros pods de MySQL y WordPress, así como servicios y reclamaciones de volúmenes persistentes.

Descargue los siguientes archivos de configuración:

- Archivo de configuración de MySQL: ejecute el comando

`curl -LO [https://k8s.io/examples/application/wordpress/mysql-deployment.yaml](https://k8s.io/examples/application/wordpress/mysql-deployment.yaml)`

Este manifiesto describe un Deployment de MySQL de una sola instancia. El contenedor de MySQL monta el PersistentVolume en /var/lib/mysql. La variable de entorno `MYSQL_ROOT_PASSWORD` establece la contraseña de la base de datos desde el Secret.

- Archivo de WordPress: ejecute el comando

`curl -LO [https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml](https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml)`

Este manifiesto describe un Deployment de WordPress de una sola instancia. El contenedor de WordPress monta el PersistentVolume en `/var/www/html` para archivos de datos del sitio web. La variable de entorno `WORDPRESS_DB_HOST` establece el nombre del Servicio MySQL definido anteriormente, y WordPress accederá a la base de datos por Servicio. La variable de entorno `WORDPRESS_DB_PASSWORD` establece la contraseña de la base de datos desde el Secret generado por kustomize.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-curl-wp-mysql.png)

## Paso 7. Cree un archivo kustomization.yaml

En este archivo, especificaremos el orden de ejecución de los archivos descargados anteriormente, junto con la clave secreta.

Un [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) es un objeto que almacena un dato sensible como una contraseña o clave. Desde la versión 1.14, `kubectl` admite la gestión de objetos de Kubernetes usando un archivo de kustomization. Puede crear un Secret mediante generadores en `kustomization.yaml`.

Añada un generador de Secret en `kustomization.yaml` con el siguiente comando (necesitará reemplazar `YOUR_PASSWORD` con la contraseña que desea usar):

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

## Paso 8. Despliegue contenedores

Ahora despliegue ambos contenedores en EKS con el siguiente comando: `kubectl apply -k .`


![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-applyk.png)

Puede verificar que todos los objetos existan:

- Pods: `kubectl get pods`
- Secrets: `kubectl get secrets`
- Reclamaciones de Volumen Persistente: `kubectl get pvc`
- Servicios: `kubectl get services`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-objects.png)

Una vez que los contenedores hayan sido creados correctamente y los Pods muestren "Running" en Kubernetes, puede obtener el nombre DNS del LoadBalancer ELB escribiendo el siguiente comando:

`kubectl get svc wordpress`

Péguelo en el navegador web.

**¡Voilá!**

¡Felicidades! Ha desplegado con éxito su sitio WordPress con estado en AWS en EKS.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-main-dashboard.png)

Si se siente valiente, ¡diríjase a mi próximo tutorial para aprender a instalar Kasten en este clúster EKS!

## Limpie su entorno

Para limpiar su entorno, siga estos pasos:

1) Elimine los recursos de Kubernetes:

`kubectl delete -k .`

2) Use `eksctl` para eliminar su clúster EKS y todas sus dependencias a través de CloudFormation:

`eksctl delete cluster eks-wp`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-deleted.png)

***

Si te gustó este artículo, sígueme en [Twitter](https://twitter.com/juliafmorgado) (donde comparto mi trayectoria tecnológica) a diario, conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), visita mi [IG](https://www.instagram.com/juliafmorgado/), ¡y asegúrate de suscribirte a mi canal de [Youtube](https://www.youtube.com/c/JuliaFMorgado) para obtener más contenido increíble!


