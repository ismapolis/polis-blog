---
title: 'K3s Cluster Setup on Raspberry Pi'
slug: 'k3s-cluster-setup'
description: 'Guide to installing and configuring a Kubernetes cluster using K3s on two Raspberry Pi devices, including server and agent setup dashboard installation.'
publicationDate: 2025-09-02
category: homelab
public: true
author: 'Ismael Illán García'
---

# Context

I’ve had a couple of Raspberry Pi boards at home for a while, mostly using them for small side projects or the occasional lightweight game server. Over the past few weeks, I started thinking about more interesting ideas, so I figured it was the right moment to put them to better use. Instead of running everything manually and having to repeat the same setup steps each time, I wanted something a bit more organized, a setup that would let me easily expand if I decide to add more Raspberry Pis in the future. My goal was to have a lightweight but flexible cluster where I could host my services in one place and manage them from a single interface.

In this post, I’ll walk you through how I set up my K3s cluster using two Raspberry Pis, one acting as the server and the other as an agent. To finish things off, we’ll also install the Kubernetes Dashboard to make monitoring and managing the cluster much more convenient.

# Setting Up a K3s Cluster

K3s is a lightweight Kubernetes distribution designed for edge devices and small-scale deployments. In this post, I’ll walk through installing a K3s cluster on Raspberry Pi nodes, covering both server and agent configuration, and highlighting common issues like kernel cgroups.

## 1. Server Node Setup

On the server node, install K3s with the official script:

```bash
curl -sfL https://get.k3s.io | sh -
```

You may see a warning like:

`Failed to find memory cgroup, you may need to add "cgroup_memory=1 cgroup_enable=memory" to your linux cmdline (/boot/cmdline.txt on a Raspberry Pi)`

This means the memory cgroup feature required by K3s is not enabled.

### Enabling Memory Cgroups

Edit the cmdline file on the server:

```bash
sudo nano /boot/firmware/cmdline.txt
```

Append the following to the end of the existing line:

`cgroup_enable=memory cgroup_memory=1`

For example, if your current line is:

`console=serial0,115200 console=tty1 root=PARTUUID=df75038e-02 rootfstype=ext4 fsck.repair=yes rootwait`

It becomes:

`console=serial0,115200 console=tty1 root=PARTUUID=df75038e-02 rootfstype=ext4 fsck.repair=yes rootwait cgroup_enable=memory cgroup_memory=1`

Make sure the entire line stays on a single line, with no line breaks.

Save and exit (`Ctrl+O`, Enter, `Ctrl+X`) and reboot.

### Starting K3s on the Server

After the reboot, start K3s and verify it’s running:

```bash
sudo systemctl start k3s
sudo systemctl status k3s
```

## 2. Agent Node Setup

On agent nodes, connect each to the server using the K3S_URL and K3S_TOKEN:

```

curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -

```

`K3S_URL` configures the node as an agent connected to the specified server.

`K3S_TOKEN` is found on the server at:

`/var/lib/rancher/k3s/server/node-token
`

Check the agent’s status:

```
sudo systemctl status k3s-agent
```

Once registered, your K3s cluster is operational, ready for deploying pods and services.

```bash
pi@polis:~$ sudo k3s kubectl get nodes -o wide
NAME   STATUS   ROLES                  AGE   VERSION        INTERNAL-IP     EXTERNAL-IP   OS-IMAGE       KERNEL-VERSION      CONTAINER-RUNTIME
pi1    Ready    control-plane,master   27m   v1.33.4+k3s1   192.168.1.132 <none>        Ubuntu 25.04   6.14.0-1005-raspi   containerd://2.0.5-k3s2
pi2    Ready    <none>                 23s   v1.33.4+k3s1   192.168.1.141   <none>        Ubuntu 25.04   6.14.0-1013-raspi   containerd://2.0.5-k3s2
```

Mejor una visualizacion mas comoda tambien se podria instalar la dashboard de kubernetes, no tiene mucho misterio

# Installing Kubernetes Dashboard on K3s

Setting up the Kubernetes Dashboard allows you to **visualize and manage your cluster** via a web interface.

### **1. Deploy the Dashboard**

On your K3s server node, run:

```bash
sudo k3s kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

This creates all necessary resources in the kubernetes-dashboard namespace.

```bash
namespace/kubernetes-dashboard created
serviceaccount/kubernetes-dashboard created
service/kubernetes-dashboard created
secret/kubernetes-dashboard-certs created
secret/kubernetes-dashboard-csrf created
secret/kubernetes-dashboard-key-holder created
configmap/kubernetes-dashboard-settings created
role.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrole.rbac.authorization.k8s.io/kubernetes-dashboard created
rolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
clusterrolebinding.rbac.authorization.k8s.io/kubernetes-dashboard created
deployment.apps/kubernetes-dashboard created
service/dashboard-metrics-scraper created
deployment.apps/dashboard-metrics-scraper created
```

## 2. Create an Admin User

```yaml
sudo k3s kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF
```

This allows you to log in with administrative privileges.

## 3. Expose the Dashboard via NodePort

By default, the Dashboard is only accessible inside the cluster (ClusterIP). To access it from your LAN, create a NodePort service:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubernetes-dashboard
  namespace: kubernetes-dashboard
  labels:
    k8s-app: kubernetes-dashboard
spec:
  type: NodePort
  selector:
    k8s-app: kubernetes-dashboard
  ports:
    - port: 443
      targetPort: 8443
      protocol: TCP
      nodePort: 30000
```

Apply it:

```bash
sudo k3s kubectl -n kubernetes-dashboard delete svc kubernetes-dashboard
sudo k3s kubectl apply -f dashboard-nodeport.yaml
```

You can now access it in your browser:

`https://192.168.1.132:30000`

Accept the self-signed certificate warning if prompted.

Obtain the Login Token.

```
sudo k3s kubectl -n kubernetes-dashboard create token admin-user
```

Use this token to log in to the Dashboard.

![alt text](/assets/kubernetes-dashboard.png)

# Core Pods in a K3s Cluster

After installation, a K3s cluster running on Raspberry Pis typically includes the following pods:

| Pod Name                  | Image                                   | Role                                                                                  |
| ------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------- |
| svclb-traefik-\*          | rancher/klipper-lb:v0.4.13              | Service LoadBalancer, routes external traffic to Traefik or other services.           |
| traefik-\*                | rancher/mirrored-library-traefik:3.3.6  | Ingress controller, manages HTTP/HTTPS traffic into the cluster.                      |
| coredns-\*                | rancher/mirrored-coredns-coredns:1.12.3 | Internal DNS for service discovery inside the cluster.                                |
| helm-install-traefik-\*   | rancher/klipper-helm:v0.9.8             | Temporary job for installing Traefik via Helm.                                        |
| local-path-provisioner-\* | rancher/local-path-provisioner:v0.0.31  | Provides dynamic PersistentVolumes using local storage.                               |
| metrics-server-\*         | rancher/mirrored-metrics-server:v0.8.0  | Collects CPU/memory metrics for pods and nodes, used by `kubectl top` or autoscaling. |

# Conclusion and Next Steps

With our K3s cluster up and running, and the Kubernetes Dashboard providing an easy way to monitor nodes and pods, we now have a the foundation for our homelab environment.

The next step will be to streamline how we manage deployments. Instead of manually applying manifests or editing YAML files directly on the nodes, we’ll set up a GitOps workflow using Argo CD. This will allow us to version-control our configurations, push updates from our local machine, and let the cluster automatically stay in sync.

In the next post, we’ll explore how to install and configure Argo, and how it integrates seamlessly with our cluster for a more efficient and automated workflow.
