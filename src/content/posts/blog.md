---
title: 'Deploying my blog on K3s with Argo CD'
slug: 'argo-cd-deploy-blog'
description: 'Deploy my blog on a K3s cluster using Argo CD, setting up a GitOps workflow for easy updates and automatic cluster synchronization.'
publicationDate: 2025-09-3
category: homelab
public: true
author: 'Ismael Illán García'
---

Context

Este post resume cómo desplegué mi blog en un cluster K3s usando Argo CD, incluyendo la configuración de volúmenes persistentes, sidecars para regenerar ficheros estáticos, Ingress con TLS y el workflow de GitOps.

Arquitectura del blog

Cluster K3s en Raspberry Pi (o cualquier nodo ARM/AMD compatible).

Aplicación principal: servidor Astro para el blog.

Volúmenes persistentes para posts y finds.

Sidecar: reconstruye ficheros estáticos automáticamente.

Service ClusterIP para exponer el pod internamente.

Ingress para exponer el blog con TLS usando cert-manager y Let’s Encrypt.

Argo CD para sincronización automática desde GitHub.

Deploying my blog on K3s with Argo CD

1. Preparar el repo de deployment

El repositorio está organizado para GitOps con Argo CD, incluyendo:

apps/blog/ → manifests del blog (Deployment, Service, PVC).

apps/common/ingress/ → ClusterIssuer y Ingress compartido.

argo-apps/ → definiciones de Argo CD Application.

Clonamos el repo y revisamos la estructura:

git clone git@github.com:ismapolis/deployment.git
cd deployment
tree -L 3

2. Manifiestos de Kubernetes para el blog
   Deployment: apps/blog/deployment.yaml

Imagen: ismapolis/polis-blog:latest (multiarch para ARM y AMD).

Contenedor principal con probes de readiness y liveness.

Montaje de volúmenes persistentes para contenido.

Sidecar rebuild automático de ficheros estáticos:

containers:

- name: blog-builder
  image: ismapolis/polis-blog:latest
  command: ["sh", "-c"]
  args:
  - |
    while true; do
    inotifywait -e create,modify,delete -r /app/content/
    echo "Detected change, rebuilding..."
    npm run build
    done
    volumeMounts:
  - name: content
    mountPath: /app/content

Service: apps/blog/service.yaml

Tipo ClusterIP

Puerto 80 apuntando a 4321 del pod

Exposición interna, sin NodePort gracias al Ingress.

PVC: apps/blog/pvc.yaml

Almacena contenido dinámico del blog (posts y finds).

Permite que el sidecar y el contenedor principal compartan el mismo volumen.

Ingress: apps/common/ingress/ingress.yaml

Host: blog.ismapolis.com

TLS con cert-manager y Let’s Encrypt

Permite exponer múltiples aplicaciones (vicios, API) bajo distintos subdominios.

Nota: Se resolvió el error Blocked request. This host añadiendo los hosts permitidos en vite.server.allowedHosts dentro del astro.config.ts.

3. Estructura de repositorio Git
   deployment/
   ├── apps
   │ ├── blog
   │ │ ├── deployment.yaml
   │ │ ├── service.yaml
   │ │ └── pvc.yaml
   │ ├── vicios
   │ │ ├── api-deploy.yaml
   │ │ ├── api-svc.yaml
   │ │ ├── frontend-deploy.yaml
   │ │ └── secrets.yaml
   │ ├── common
   │ │ └── ingress/
   │ │ ├── clusterissuer.yaml
   │ │ └── ingress.yaml
   │ └── namespace.yaml
   └── argo-apps
   └── blog-application.yaml

4. Argo CD
   Crear Application para el blog
   kubectl apply -f argo-apps/blog-application.yaml -n argocd

Apunta a apps/blog del repo privado.

syncPolicy automatizada: automated, prune, selfHeal.

SSH key para repositorios privados: la clave pública en GitHub y la privada en Argo CD.

Comprobar estado desde la UI

Puedes sincronizar, revertir cambios y ver los pods/servicios del blog.

Comandos útiles desde terminal:

kubectl get applications.argoproj.io -n argocd
kubectl get pods -n ismapolis
kubectl get svc -n ismapolis
kubectl get ingress -n ismapolis

5. Acceso desde tu máquina local

Copiar el kubeconfig de K3s:

scp pi@192.168.1.132:/etc/rancher/k3s/k3s.yaml ~/.kube/config-k3s
chmod 600 ~/.kube/config-k3s
export KUBECONFIG=~/.kube/config-k3s
kubectl get nodes

Evitar usar microk8s kubectl porque fuerza un contexto diferente.

6. Comandos útiles adicionales

Forzar un pull de la última imagen latest en el cluster:

kubectl rollout restart deployment blog -n ismapolis

Ver logs de sidecar o contenedor principal:

kubectl logs -n ismapolis blog-xxxxx -c blog
kubectl logs -n ismapolis blog-xxxxx -c blog-builder

Aplicar todos los manifests de common (ClusterIssuer + Ingress):

kubectl apply -f apps/common/

Ver eventos de Ingress / Traefik:

kubectl get events -n kube-system | grep traefik
kubectl describe svc traefik -n kube-system

7. Añadir Ingress a Argo

Puedes crear un Application separado para apps/common/ y sincronizar automáticamente.

Esto permite versionar TLS, ClusterIssuer e Ingress bajo GitOps.

Conclusion and Next Steps

Blog desplegado en K3s con sidecar rebuild, volumen persistente y exposicion vía Ingress TLS.

Argo CD mantiene sincronizados Deployment, Service, PVC e Ingress desde GitHub.

Próximo paso: desplegar otras aplicaciones (vicios) usando el mismo workflow y aplicar GitOps para todo el cluster.
