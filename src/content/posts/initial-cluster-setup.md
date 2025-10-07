---
title: 'Configuración de un Cluster K3s en Raspberry Pi'
slug: 'k3s-cluster-setup'
description: 'Guía resumida para instalar y configurar un cluster Kubernetes ligero usando K3s en dos Raspberry Pi, incluyendo el Dashboard de Kubernetes.'
publicationDate: 2025-09-02
tags: [homelab, kubernetes, devops]
public: true
author: 'Ismael Illán García'
---

# Contexto

Hace un tiempo tenía un par de placas Raspberry Pi en casa, principalmente para proyectos pequeños o algún servidor de juegos ligero. En las últimas semanas empecé a pensar en ideas más interesantes, así que decidí aprovecharlas mejor. En lugar de ejecutar todo manualmente y repetir los mismos pasos cada vez, quería algo un poco más organizado, que me permitiera ampliar el cluster fácilmente si añadía más Raspberry Pis en el futuro. Mi objetivo era tener un cluster ligero pero flexible donde pudiera alojar mis servicios en un solo lugar y gestionarlos desde una única interfaz.

# Instalación y Configuración

Para montar el cluster, instalé K3s en el nodo servidor y luego conecté los nodos agentes usando el token y la URL del servidor. Fue necesario habilitar los **cgroups de memoria** en los Raspberry Pis para que K3s funcionara correctamente. Una vez configurados los nodos, el cluster quedó operativo y listo para desplegar pods y servicios.

Posteriormente, instalé el **Kubernetes Dashboard**, lo que permite visualizar y gestionar el cluster desde una interfaz web. Se configuró un usuario administrador y se expuso el Dashboard mediante NodePort para poder acceder desde la red local. Esto facilita la monitorización de pods, servicios y métricas del cluster de forma sencilla y visual.

![alt text](/assets/kubernetes-dashboard.png)

# Conclusión

Con el cluster K3s en funcionamiento y el Dashboard configurado, ya tenemos una base sólida para un homelab. El siguiente paso será optimizar la gestión de despliegues. En lugar de aplicar manifiestos manualmente o editar archivos YAML directamente en los nodos, se implementará un flujo **GitOps** usando Argo CD, que permitirá versionar las configuraciones, enviar actualizaciones desde el equipo local y mantener el cluster sincronizado automáticamente. En la próxima entrada se explicará cómo instalar y configurar Argo CD para un flujo de trabajo más eficiente y automatizado.
