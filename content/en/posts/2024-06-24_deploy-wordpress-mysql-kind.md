---
title: "Deploying WordPress and MySQL on Kubernetes with Kind: A Step-by-Step Guide"
author: "Julia Furst Morgado"
date: 2024-06-24T06:46:05.964Z
draft: false
toc: true
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/wp-mysql-kind-banner.png
tags: 
    - Kubernetes
    - Tutorial
    - Cloud Native
    - Databases
slug: /deploying-wordpress-mysql-on-kubernetes-with-kind
---
This blog is inspired by an [article](https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/) from the Kubernetes website teaching how to deploy WordPress and MySQL on Minikube, but since I found it very confusing and wanted to use Kind, I'm writing this step-by-step guide.

Deploying WordPress and MySQL on Kubernetes using [Kind (Kubernetes IN Docker)](https://kind.sigs.k8s.io/) is an excellent way to create a robust local development environment. This guide walks you through the entire process, from installing the necessary tools to cleaning up your deployment.

## Installation
To use Kind, the first thing you need is a host with Docker. Follow the instructions on the [Docker website](https://docs.docker.com/get-docker/) to install Docker on your machine. Next, you need to install the Kind tool. The installation process varies depending on your operating system. For MacOS, you can use [Homebrew](https://formulae.brew.sh/formula/kind):

`brew install kind`

With Docker and Kind installed, you're ready to create your Kubernetes cluster.

## Create a Cluster with More Than One Node
By default, Kind creates a single-node cluster. To simulate a more complex environment, you can create a multi-node cluster.

Run this command to create a file named `kind-node.yaml` with the following content:

```
cat <<EOF >kind-node.yaml
# three node (two workers) cluster config
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
EOF
```

You can verify that the file was created by running `ls` on your terminal.

Now, in order to apply this configuration and create the cluster, it is necessary to add the `–config` parameter and the name of the file where you have saved it.

So run the following command: `kind create cluster --config=kind-node.yaml`

![](https://blog-imgs-23.s3.amazonaws.com/kind-cluster.png)

Once your cluster has been created, you can verify the nodes in your cluster with the command: `kubectl get nodes`

Alternatively, you can use Docker to see the nodes: `docker ps`

This setup ensures that all three nodes (control-plane and two worker nodes) are running as Docker containers on your host.

## Installing WordPress and MySQL

Now, let's deploy WordPress and MySQL to your cluster. To do so, you'll need two configuration files called manifests that define the settings for the MySQL and WordPress pods.

### Download MySQL Manifest
Begin by downloading the MySQL deployment configuration file:

 `curl -LO https://k8s.io/examples/application/wordpress/mysql-deployment.yaml`

This manifest defines a single-instance MySQL deployment. Within this configuration:

- The MySQL container is set up to use a PersistentVolume located at `/var/lib/mysql` to store its data.
- The `MYSQL_ROOT_PASSWORD` environment variable is crucial as it secures the MySQL database by setting the root password retrieved from a Kubernetes Secret.

### Download WordPress Manifest

Next, retrieve the WordPress deployment configuration file:

`curl -LO https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml`

This manifest details a single-instance WordPress deployment. Key points include:

- The WordPress container utilizes a PersistentVolume mounted at `/var/www/html` to store its website data files.
- The `WORDPRESS_DB_HOST` environment variable specifies the MySQL service name, enabling WordPress to communicate with the MySQL database via Kubernetes service discovery.
- The `WORDPRESS_DB_PASSWORD` environment variable retrieves the database password securely from a Secret managed by Kubernetes.

### PersistentVolumes and Deployment

Both MySQL and WordPress rely on PersistentVolumes to preserve data across pod restarts or rescheduling. Kubernetes manages the creation of PersistentVolumeClaims (PVCs) based on the definitions provided in their respective manifest files during deployment.

By following these steps and deploying these manifests, you establish a robust environment for WordPress and MySQL on Kubernetes. This setup ensures data integrity and availability while leveraging Kubernetes' orchestration capabilities effectively.

### Create a kustomization.yaml
A kustomization file is used to define a set of Kubernetes resources and configuration parameters for deployments. It allows you to customize, manage, and deploy Kubernetes applications in a structured way.

So, create a `kustomization.yaml` file to specify the order of execution and to generate a Secret for the MySQL password. This ensures secure management of sensitive data such as passwords using Kubernetes Secrets.

Replace `YOUR_PASSWORD` with your desired password:

```
cat <<EOF >kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization 
secretGenerator:
- name: mysql-pass
  literals:
  - password=YOUR_PASSWORD
resources:
  - mysql-deployment.yaml
  - wordpress-deployment.yaml
EOF
```

### Apply and Verify
Again, you can verify that the file were created by running `ls` on your terminal. You should see 4 files.

With all configuration files in place, deploy the resources using the following command:

`kubectl apply -k ./`

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp-mysql-dep.png)

Verify that all objects have been created:
```
kubectl get pods
kubectl get secrets
kubectl get pvc
kubectl get services
```

## Expose the WordPress Service
When running Kubernetes on a local development environment such as kind (Kubernetes IN Docker), the LoadBalancer service type won't function as expected because there is no external load balancer available. However, you can still access services running in a Kind cluster without needing built-in LoadBalancer support by using Port Forwarding.

This is a straightforward way to access your service from your local machine.

`kubectl port-forward svc/wordpress 8080:80`

![](https://blog-imgs-23.s3.amazonaws.com/kind-expose-wp-service.png)

VOILÁ! After running this command, you can access your WordPress site at `http://localhost:8080`.

![](https://blog-imgs-23.s3.amazonaws.com/kind-wp.png)

To stop port forwarding, press `Ctrl+C` on your terminal.

## Cleaning Up
Once you're done with your WordPress and MySQL deployment, clean up your resources.

Delete the deployed resources: 

`kubectl delete -k ./`

Delete the Kind cluster: 

`kind delete cluster`

![](https://blog-imgs-23.s3.amazonaws.com/kind-delete.png)

By following these steps, you have successfully deployed WordPress and MySQL on a multi-node Kind cluster. This setup provides a scalable and easily manageable local development environment for your projects.


***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!



