---
title: 'Desplegando mi blog en K3s con Argo CD'
slug: 'argo-cd-deploy-blog'
description: 'Desplegar mi blog en un cluster K3s usando Argo CD, configurando un flujo GitOps para actualizaciones fáciles y sincronización automática del cluster.'
publicationDate: 2025-09-05
tags: [homelab, kubernetes, devops, blog]
public: true
author: 'Ismael Illán García'
---

# Contexto

Este post resume cómo desplegué mi blog en un cluster K3s usando Argo CD. Se configuraron volúmenes persistentes para almacenar los contenidos del blog, sidecars para regenerar automáticamente los ficheros estáticos, Ingress con TLS mediante cert-manager y Let’s Encrypt, y un flujo GitOps para mantener el cluster sincronizado con el repositorio de GitHub. La arquitectura está basada en un cluster K3s en Raspberry Pi, con el servidor Astro como aplicación principal, y un Service ClusterIP interno gestionado por un Ingress que permite exponer el blog de forma segura.

# Instalación y Configuración

Para desplegar el blog, primero se preparó un repositorio organizado para GitOps con Argo CD, incluyendo los manifests de Deployment, Service y PersistentVolumeClaim del blog, así como los recursos compartidos de Ingress y TLS. Una vez clonado el repositorio, se aplicaron los manifiestos de Kubernetes para crear los pods, montar los volúmenes persistentes y configurar el sidecar que detecta cambios en el contenido y recompila los ficheros estáticos automáticamente.

Argo CD se configuró creando una Application que apunta al directorio del blog en el repositorio privado, con política de sincronización automatizada y auto-reparación. Esto permite que cualquier cambio enviado a GitHub se aplique automáticamente en el cluster. Finalmente, se expuso el blog mediante Ingress TLS, permitiendo acceder desde la red local o Internet de manera segura. La UI de Argo CD permite controlar el estado de los pods, servicios e Ingress de forma visual y cómoda.

# Próximos pasos

El blog quedó desplegado en el cluster K3s. Argo CD mantiene sincronizados Deployment, Service, PVC e Ingress desde GitHub, simplificando la gestión y las actualizaciones.

El siguiente paso será mejorar el flujo de despliegue del blog automatizando la construcción de la imagen Docker y la actualización de los manifiestos en el cluster. Para ello, en el próximo post veremos cómo configurar **workflows GitOps**, que permiten que cada cambio en el repositorio construya automáticamente la nueva imagen y actualice la aplicación en el cluster mediante Argo CD, sin intervención manual.
