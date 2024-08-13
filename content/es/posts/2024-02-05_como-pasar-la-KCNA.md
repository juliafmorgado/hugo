---
title: "Como Pasar la KCNA - Kubernetes And Cloud Native Associate"
author: "Julia Furst Morgado"
date: 2024-02-05T10:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/how-to-pass-kcna.png
tags: 
    - Kubernetes
    - DevOps
categories: 
    - Tech
slug: /como-pasar-la-kcna-kubernetes-cloud-native-associate
---

Ayer realicé el examen de certificación [Kubernetes and Cloud Native Associate Exam (KCNA)](https://www.cncf.io/training/certification/kcna/), y esta mañana recibí los resultados de que aprobé, ¡yey!
Aunque algunos lo consideren un examen para principiantes, no es tan fácil. El examen realmente requiere una base sólida y experiencia práctica con Kubernetes y proyectos relacionados de código abierto para aprobarlo con éxito.

El examen de certificación KCNA se realiza en línea y tiene un costo de $250, que incluye una segunda oportunidad gratuita. Si no apruebas en tu primer intento, tienes la oportunidad de tomar el examen nuevamente dentro de un año desde tu compra inicial.

He compilado una lista de [15 opciones para construir un playground de Kubernetes](https://www.juliafmorgado.com/posts/15-options-to-build-kubernetes-playground/) y te animo encarecidamente a obtener experiencia práctica jugando con cualquiera de las herramientas mencionadas en mi artículo. Familiarizarte con la línea de comandos kubectl es crucial, y el enfoque práctico consolida tu comprensión de Kubernetes y te permite internalizar los conceptos de manera más efectiva.

Ahora, adentrémonos en los dominios clave cubiertos en el examen KCNA:

## Dominios Clave

### Fundamentos de Kubernetes (46%)

Para destacar en este dominio, necesitas tener una comprensión profunda de:

- El problema que resuelve Kubernetes
- La arquitectura de Kubernetes y los roles de sus componentes
- La jerarquía de los componentes de Kubernetes, desde Cluster hasta Node, pasando por Pod y Container
- Conceptos como services, deployments, replicasets, daemonsets, statefulsets, configmaps, secrets, network policies, RBAC, service discovery, manifests, autoscaling, and load balancing
- Los elementos necesarios en un manifiest de Kubernetes
- El uso de kubectl y comandos comunes de Kubernetes
- Conocimientos de YAML y JSON
- La capacidad de ampliar la API de Kubernetes

### Orquestación de Contenedores (22%)

- Comprender los problemas que resuelve la orquestación de contenedores
- Debes tener una visión general de los diferentes tipos de Open Standards:
  - Container Runtime Interface (CRI) and different runtimes available
  - Container Network Interface (CNI)
  - Container Storage Interface (CSI)
  - Service Mesh Interface (SMI)
- Qué son Namespaces y Cgroups

### Arquitectura Nativa de la Nube (16%)

- Cómo está estructurada la Cloud Native Computing Foundation (CNCF)
- Herramientas sin servidor para Kubernetes
- Helm y gráficos Helm

### Observabilidad Nativa de la Nube (8%)

- Debes poder definir la observabilidad y conocer la diferencia entre registros, métricas y trazas
- Qué son Prometheus y Grafana
- Comandos comunes de kubectl para ver registros de pods, especificaciones, simulación, etc.

### Entrega de Aplicaciones Nativa de la Nube (8%)

Necesitas definir y comprender varias herramientas y conceptos relacionados con la entrega de aplicaciones en un entorno nativo de la nube. Esto incluye:
- DevOps
- GitOps
- CI/CD
- Qué hace un SRE

## Recursos de Estudio

Para mejorar aún más tu comprensión y preparación para el examen de certificación KCNA, aquí tienes algunos recursos recomendados:

- La [documentación oficial de Kubernetes](https://kubernetes.io/docs/home/), aunque densa, es un recurso valioso para estudiar
- El [Landscape de la Cloud Native Computing Foundation](https://landscape.cncf.io/) proporciona una visión general de todos los proyectos y tecnologías de CNCF
- Recomiendo encarecidamente el curso de James Spurin, [Dive Into Cloud Native, Containers, Kubernetes and the KCNA Exam](https://diveinto.com/p/dive-into-cloud-native-containers-kubernetes-and-the-kcna). Es muy detallado, con consejos de estudio, cuestionarios y laboratorios, ¡y el curso ofrece un descuento del 90% si lo compras ahora!
- Si no tienes mucho tiempo para estudiar, te recomiendo el libro [Becoming KCNA Certified](https://www.amazon.com/Becoming-KCNA-Certified-foundation-Kubernetes/dp/1804613398) de Dmitry Galkin

## Consejos para el Examen de Certificación KCNA

- Inicia sesión en tu examen al menos 30-15 minutos antes de la hora de inicio. El supervisor necesita este tiempo para verificar tu identificación y revisar tu espacio de trabajo a través de tu cámara web.
- Dado que el examen KCNA se realiza desde casa, es importante tener un espacio limpio y sin desorden disponible para ti. Asegúrate de preparar tu espacio de trabajo el día anterior al examen. Recuerda, debes estar solo en la habitación durante el examen, así que planifica en consecuencia.
- Ten en cuenta que debes tener tu cámara web y audio encendidos durante todo el examen. Como esto puede agotar tu batería, recuerda tener tu cargador de laptop a mano.

---
¡Sígueme en [Twitter](https://twitter.com/juliafmorgado) (donde comparto mi trayectoria tecnológica) a diario, conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), echa un vistazo a mi [IG](https://www.instagram.com/juliafmorgado/), ¡y asegúrate de suscribirte a mi canal de [YouTube](https://www.youtube.com/c/JuliaFMorgado) para obtener más contenido asombroso!
