---
title: 'Workflows GitOps para el blog'
slug: 'workflows-gitops-blog-astro'
description: 'Automatizando la construcción de la imagen de mi blog en Astro y el despliegue automático en el cluster con Argo CD.'
publicationDate: 2025-10-06
tags: [homelab, devops, blog]
public: true
author: 'Ismael Illán García'
---

# Contexto

Necesitaba una forma de simplificar el flujo de desarrollo de mi blog. Al principio utilizaba Astro en modo desarrollo, pero esto no era del todo óptimo: en producción conviene usar el modo de compilación, donde se generan los archivos estáticos que luego pueden servirse eficientemente con Nginx. Inicialmente planteé un diseño más complejo, en el que los archivos estáticos se montaban en un volumen de Kubernetes y este volumen se compartía entre los diferentes pods. Sin embargo, este enfoque me dio bastantes problemas de sincronización y rendimiento, por lo que decidí explorar alternativas más sencillas y robustas.

# Flujo

Cada cambio en el repositorio activa un workflow que construye y publica automáticamente una nueva imagen Docker en Docker Hub. Una vez que la imagen está disponible, un segundo workflow en el repositorio de despliegue del cluster actualiza automáticamente la referencia de la imagen en los manifiestos de Kubernetes, haciendo un commit desde el propio workflow. Esto permite que Argo CD detecte el cambio y sincronice la aplicación en el cluster de manera totalmente automática, sin intervención manual. Aunque Argo CD ofrece extensiones para detectar cambios de imagen Docker directamente, opté por esta solución porque es más sencilla de implementar y me permitía practicar con los workflows de GitHub.

<div style="text-align: center;">
  <img src="/assets/workflow.png" alt="Flujo GitOps" style="max-width: 800px; width: 100%; height: auto; border-radius: 8px;" />
</div>
