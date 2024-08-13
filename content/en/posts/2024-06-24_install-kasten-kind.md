---
title: "Install Veeam Kasten on a Kubernetes cluster running on kind"
author: "Julia Furst Morgado"
date: 2024-06-24T07:46:05.964Z
draft: false
toc: true
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/x
tags: 
    - Kubernetes
    - Veeam
    - Cloud Native
slug: /install-veeam-kasten-on-kubernetes-cluster-running-on-kind
---

In this guide, we'll walk through the process of installing [Veeam Kasten](https://docs.kasten.io/latest/) on a Kubernetes cluster running on kind (Kubernetes in Docker). Kind provides a lightweight way to create Kubernetes clusters for testing and development purposes.

Before proceeding, ensure you have an active Kubernetes cluster running. If you're new to deploying applications on Kubernetes using kind, you may want to first follow my [step-by-step guide on deploying a WordPress application with MySQL](https://www.juliafmorgado.com/posts/deploying-wordpress-mysql-on-kubernetes-with-kind/). This guide will help you familiarize yourself with Kubernetes concepts and KIND's setup.

## Step 1: Setup Snapshot Controller and CRDs
First, install the necessary CRDs and Snapshot Controller for Kubernetes CSI snapshots:

```
# Install a recent version of the CSI snapshotter
SNAPSHOTTER_VERSION=v4.2.1

# Apply VolumeSnapshot CRDs
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/${SNAPSHOTTER_VERSION}/config/crd/snapshot.storage.k8s.io_volumesnapshotclasses.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/${SNAPSHOTTER_VERSION}/config/crd/snapshot.storage.k8s.io_volumesnapshotcontents.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/${SNAPSHOTTER_VERSION}/config/crd/snapshot.storage.k8s.io_volumesnapshots.yaml

# Create Snapshot Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/${SNAPSHOTTER_VERSION}/deploy/kubernetes/snapshot-controller/rbac-snapshot-controller.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-csi/external-snapshotter/${SNAPSHOTTER_VERSION}/deploy/kubernetes/snapshot-controller/setup-snapshot-controller.yaml
```

Verify the installation by checking the CRDs and ensuring the Snapshot Controller is running:

```
kubectl get crd | grep volumesnapshot
kubectl get pods -n kube-system | grep snapshot-controller
```

## Step 2: Install CSI Hostpath Driver
Clone the CSI Hostpath Driver repository and deploy it to your KIND cluster:

```
git clone https://github.com/kubernetes-csi/csi-driver-host-path.git
cd csi-driver-host-path
./deploy/kubernetes-1.28/deploy.sh
```

This script sets up the CSI Hostpath Driver and its necessary resources in your Kubernetes cluster.

## Step 3: Configure StorageClass
After installing the CSI Hostpath Driver, configure a StorageClass and set it as default:

```
kubectl apply -f ./examples/csi-storageclass.yaml

# Make CSI Hostpath Driver StorageClass default
kubectl patch storageclass standard -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
kubectl patch storageclass csi-hostpath-sc -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

Ensure the default StorageClass is correctly set by checking its status:

`kubectl get storageclass`

## Step 4: Install Veeam Kasten
### Add the Kasten Helm Repository
Add the Kasten Helm repository to your Helm setup:

`helm repo add kasten https://charts.kasten.io/`

### Create Namespace and Install Kasten

Create a kasten namespace manually using kubectl before installing Kasten:

`kubectl create namespace kasten`

Now, install Kasten into the `kasten` namespace:

`helm install k10 kasten/k10 --namespace=kasten`

## Step 5: Annotate VolumeSnapshotClass for K10
Annotate the CSI Hostpath VolumeSnapshotClass to enable its use with Kasten:

`kubectl annotate volumesnapshotclass csi-hostpath-snapclass k10.kasten.io/is-snapshot-class=true

## Step 6: Validate the Installation
Check the status of Kasten pods to ensure they are running:

`kubectl get pods --namespace kasten --watch

## Step 7: Access the Veeam Kasten Dashboard
To access the Veeam Kasten dashboard, forward a local port to the Kasten service:

`kubectl --namespace kasten port-forward service/gateway 8080:80`

The Veeam Kasten dashboard will now be available locally at http://127.0.0.1:8080/k10/#/.

![](https://blog-imgs-23.s3.amazonaws.com/kasten-dash-kind.png)

## Conclusion
By following these steps, you've successfully installed Veeam Kasten on your kind Kubernetes cluster, configured with the CSI Hostpath Driver for storage snapshots. Kasten provides powerful data management capabilities for Kubernetes, enabling backup, restore, and disaster recovery solutions for your applications and data.

Now it's your time to explore!

Check the [Veeam Kasten's documentation](https://docs.kasten.io/latest/) for more!


***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
