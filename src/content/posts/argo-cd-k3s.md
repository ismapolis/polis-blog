---
title: 'Installing Argo CD on Cluster'
slug: 'argo-cd-k3s'
description: 'A step-by-step guide to installing and exposing Argo CD a cluster, including access configuration and usage tips.'
publicationDate: 2025-09-03
category: homelab
public: true
author: 'Ismael Illán García'
---

# Context

Once our cluster is ready, the next step is to start deploying the services we want to run. I already have some deployment files prepared on my computer, and I could simply copy them to the server node using scp over the SSH connection I already use. However, that would mean editing the deployments directly on the server using a terminal-based editor, which isn’t very convenient.

To avoid this, my friend Ximo recommended Argo.

Argo allows the cluster to stay in sync with a GitHub repository that contains all the deployment manifests. This way, instead of logging in via SSH and editing files with vi, I can comfortably update the configurations on my local machine and simply push the changes. Argo will then synchronize them automatically with the cluster.

Another advantage is that Argo provides a web interface that uses a username and password for authentication, instead of a token that needs to be regenerated like in the Kubernetes Dashboard. Additionally, Argo generates a clean dashboard with visual metrics and graphs, similar to the Kubernetes Dashboard, for monitoring and managing the cluster more intuitively.

# Installing Argo CD on a K3s Cluster

This guide explains how to install Argo CD in a K3s cluster running on Raspberry Pi devices, how to expose the service for external access, and how to retrieve the initial admin credentials.

## 1. Create the Argo CD namespace

On the server node:

```bash
sudo k3s kubectl create namespace argocd
```

This will create a dedicated namespace where all Argo CD components will be deployed, keeping the cluster organized.

## 2. Install Argo CD (Official Manifest)

```bash
sudo k3s kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

This command deploys the official set of manifests to install Argo CD, including its web server, controllers, and supporting services.

## 3. Check Pod Status

Confirm that all pods in the namespace are running:

```bash
sudo k3s kubectl get pods -n argocd
```

Typical output right after installation:

```bash
pi@pi1:~$ sudo k3s kubectl get pods -n argocd
NAME                                                READY   STATUS              RESTARTS   AGE
argocd-application-controller-0                     0/1     ContainerCreating   0          15s
argocd-applicationset-controller-64b8948d8b-xjgqd   0/1     ContainerCreating   0          20s
argocd-dex-server-6f48b6c5c7-vqct7                  0/1     Init:0/1            0          20s
argocd-notifications-controller-6c4547fb9c-6f99j    0/1     ContainerCreating   0          19s
argocd-redis-78b9ff5487-m4dxk                       0/1     Init:0/1            0          19s
argocd-repo-server-67d8c6bbf6-bkk5h                 0/1     Init:0/1            0          18s
argocd-server-577756d78b-8gx6j                      0/1     ContainerCreating   0          18s

```

| Pod                             | Role                                |
| ------------------------------- | ----------------------------------- |
| `argocd-server`                 | Web UI and API interface            |
| `argocd-repo-server`            | Handles Git repository operations   |
| `argocd-application-controller` | Manages application synchronization |
| `argocd-dex-server`             | Authentication and single sign-on   |

## 4. Expose Argo CD via NodePort

By default, the Argo CD server is created as a ClusterIP service, which is only accessible inside the cluster.
To make it accessible externally, edit the service:

```bash
sudo k3s kubectl -n argocd edit svc argocd-server
```

Change this:

```yaml
type: ClusterIP
```

to:

```yaml
type: NodePort
```

## 5. Retrieve the Initial Admin Password

To log in, you’ll need the initial admin password, stored as a Kubernetes secret:

```bash
sudo k3s kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

## 6. Access the Web Interface

Open your browser and go to:

`https://<IP_DEL_SERVER>:<NodePort>`

Use the following credentials:

```yaml
Username: admin
Password: the decoded string from the previous step.
```

![alt text](/assets/argo-main-page.png)

# Conclusion and Next Steps

Now that we have a convenient and fast way to modify our deployments, the next step will be to start with the first of the web services I want to host in the cluster. In the next post, we’ll take a look at how this very blog is implemented.
