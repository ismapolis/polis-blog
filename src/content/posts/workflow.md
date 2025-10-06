---
title: 'Workflows GitOps para el blog'
slug: 'workflows-gitops-blog-astro'
description: 'Automatizando la construcción de la imagen de mi blog en Astro y el despliegue automático en el cluster con Argo CD.'
publicationDate: 2025-10-06
category: homelab
public: true
author: 'Ismael Illán García'
---

El blog está hecho con Astro y cada cambio, con cada push al github se activa workflow que construye y publica en Docker Hub la nueva imagen. Una vez generada la imagen, un segundo workflow en el repositorio de despliegue del cluster actualiza automáticamente la referencia de la imagen en los manifiestos de Kubernetes, haciendo un commit desde el workflow. Argo CD detecta este cambio y sincroniza la aplicación en el cluster sin intervención manual. Para detectar los cambios de imagen docker Argo tiene una extensión pero preferí usar esta por sencillez y para practicar con los workflows.

![alt text](/assets/arch-black.png)
