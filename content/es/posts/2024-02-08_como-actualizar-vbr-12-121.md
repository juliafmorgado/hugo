---
title: "Como Actualizar Rapidamente Veeam Backup and Replication 12.0 a 12.1"
author: "Julia Furst Morgado"
date: 2024-02-08T10:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/upgrade-vbr-121.png
tags: 
    - Veeam
categories: 
    - Tech
slug: /como-actualizar-veeam-backup-replication-12-0-to-12-1
---

Veeam Backup and Replication ha lanzado la versión 12.1 con emocionantes [nuevas características y mejoras](https://www.veeam.com/whats-new-backup-replication.html), especialmente en el ámbito de la ciberseguridad. En este tutorial, te guiaremos a través del proceso de actualización de la versión 12.0 a la 12.1 de manera rápida y sin contratiempos.

## Paso 1: Preparación
Antes de comenzar el proceso de actualización, asegúrate de que tus copias de seguridad estén actualizadas, proporcionando una opción de seguridad para revertir si es necesario. Además, si tienes trabajos en ejecución continua, desactívalos temporalmente o apágalos para evitar cualquier interrupción durante la actualización.

## Paso 2: Verificar la Versión Actual y Descargar el ISO
Abre tu consola de Veeam Backup and Replication y verifica que estés ejecutando la versión 10a a 12 para utilizar el actualizador in situ. Si estás ejecutando una versión anterior, el proceso de actualización será diferente. A continuación, visita la página de [Información de Lanzamiento para Veeam Backup & Replication 12.1 y Actualizaciones](https://www.veeam.com/kb4510) en el sitio web de Veeam y descarga el último ISO 12.1.

![Descargar ISO 12.1](https://blog-imgs-23.s3.amazonaws.com/download-iso-121.png)

## Paso 3: Montar el ISO y Lanzar la Configuración
Haz clic derecho en el archivo ISO descargado y móntalo. Luego, navega hasta el ISO montado y ejecuta el archivo setup.exe para comenzar el proceso de actualización.

![Montar ISO 12.1](https://blog-imgs-23.s3.amazonaws.com/mount-iso-121.png)

![Lanzar Configuración 12.1](https://blog-imgs-23.s3.amazonaws.com/launch-setup-121.png)

## Paso 4: Aceptar los Acuerdos de Licencia
Una vez que el instalador se inicialice, se te pedirá que aceptes los términos de los Acuerdos de Licencia. Revisa y acepta los acuerdos para proceder con la actualización.

## Paso 5: Verificar Componentes e Instalar Componentes Remotos
Verifica las versiones de tu Catálogo de Copias de Seguridad de Veeam, Servidor VBR y Consola VBR. Opcionalmente, marca la casilla para instalar automáticamente componentes remotos si es necesario para tu configuración.

![Actualizar Componentes 12.1](https://blog-imgs-23.s3.amazonaws.com/update-components-121.png)

## Paso 6: Especificar Cuenta de Servicio y Backend de PostgreSQL
Especifica la cuenta de servicio que se utilizará durante el proceso de actualización. El instalador enumerará la instancia actual de PostgreSQL en el backend, que normalmente no requerirá cambios para una actualización in situ. Sin embargo, si ocurre un error de "Autenticación SSPI fallida para el usuario", sigue los pasos proporcionados en el [artículo de KB](https://www.veeam.com/kb4542) vinculado para resolverlo.

![Error SSPI 12.1](https://blog-imgs-23.s3.amazonaws.com/error-sspi-121.png)

## Paso 7: Completar el Proceso de Actualización
Aparecerá una ventana emergente indicando que la base de datos se actualizará automáticamente a la nueva versión. Haz clic en "Sí" para continuar, y luego en "Actualizar" en la ventana siguiente.

El instalador apagará los servicios en el backend, realizará las actualizaciones necesarias y actualizará automáticamente todos los componentes en segundo plano. La duración de este proceso puede variar según tu entorno y el rendimiento del servidor.

![Actualizado 12.1](https://blog-imgs-23.s3.amazonaws.com/upgraded-121.png)

## Paso 8: Reactivar Trabajos y Verificar la Operación
Una vez completado el proceso de actualización, vuelve a abrir la interfaz de VBR y reactiva cualquier trabajo que hayas desactivado previamente. Verifica que la actualización haya sido exitosa asegurándote de que todas las funciones estén operativas.

![Verificar Nuevo 12.1](https://blog-imgs-23.s3.amazonaws.com/verify-new-121.png)

Actualizar Veeam Backup and Replication de la versión 12.0 a la 12.1 es un proceso sencillo si sigues estos pasos. Al asegurar una preparación adecuada y seguir cada paso cuidadosamente, puedes actualizar rápidamente a la última versión, beneficiándote de características mejoradas y actualizaciones de seguridad.
