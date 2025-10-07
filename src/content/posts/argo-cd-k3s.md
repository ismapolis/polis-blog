---
title: 'Instalando Argo CD en el Cluster'
slug: 'argo-cd-k3s'
description: 'Guía resumida para instalar y exponer Argo CD en un cluster, con configuración de acceso y consejos de uso.'
publicationDate: 2025-09-03
tags: [homelab, kubernetes, devops]
public: true
author: 'Ismael Illán García'
---

# Contexto

Tras tener nuestro cluster listo, el siguiente paso es desplegar los servicios que queremos ejecutar. Para evitar trabajar directamente en los nodos mediante SSH, utilizamos Argo CD, que permite mantener el cluster sincronizado con un repositorio de GitHub que contiene todos los manifiestos de despliegue. Además, Argo CD ofrece una interfaz web con métricas y gráficos, facilitando la gestión del cluster de forma más cómoda que la consola tradicional.

# Instalación de Argo CD en un Cluster K3s

La guía explica cómo instalar Argo CD en un cluster K3s, cómo exponer el servicio para acceso externo y cómo obtener las credenciales iniciales de administrador.

Se crea un namespace específico para Argo CD, se despliega el conjunto oficial de manifiestos y se comprueba que los pods estén en ejecución. Argo CD permite exponer su interfaz mediante NodePort y acceder con usuario y contraseña desde cualquier navegador.

![alt text](/assets/argo-main-page.png)

# Conclusión

Con Argo CD instalado, disponemos de una forma rápida y conveniente de gestionar nuestros despliegues. En el siguiente post exploraremos cómo se implementa este mismo blog utilizando este flujo automatizado.
