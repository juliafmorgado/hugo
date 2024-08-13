---
title: "15 Options To Build A Kubernetes Playground"
author: "Julia Furst Morgado"
date: 2024-01-25T10:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/
tags: 
    - Kubernetes
    - Cloud Native
    - DevOps

slug: /15-options-to-build-kubernetes-playground
---

## Why a Kubernetes Playground

As a beginner, having a playground environment is crucial for experimenting and learning about Kubernetes without the fear of breaking anything. A Kubernetes playground provides a safe and controlled space to explore the various features and functionalities of Kubernetes. When starting out, the choice between hosting everything on your own machine, in a virtual machine (VM) on your machine, or in the cloud can be overwhelming. In this article, I will discuss some popular options for setting up your Kubernetes playground.

When it comes to running Kubernetes clusters, there are several options available, depending on your specific requirements and environment. In this article, we will explore some popular tools for running Kubernetes clusters and discuss their pros and cons.

If you want to build a little testing/dev/learning cluster for yourself, this article is for you!

## Setting Up Without Installation

Playing in the browser is ideal for beginners who want to get a bigger picture without the need for installations. Here are some options:

- [Play with Kubernetes Classroom](https://training.play-with-kubernetes.com/): is a site provided by Docker that offers hands-on experience using Kubernetes. The workshop allows you, in the browser, to follow a Kubernetes tutorial without installing anything. It's free.

- [Play with Kubernetes](https://labs.play-with-k8s.com/): is another lab provided by Docker that allows users to run K8s clusters in the browser. It provides the experience of having a free Alpine Linux Virtual Machine. Under the hood, Docker-in-Docker (DinD) is used to give the effect of multiple VMs/PCs. It's free.

- [Killercoda](https://killercoda.com/playgrounds/course/kubernetes-playgrounds): offers different Kubernetes playgrounds like single and multi-node. It's free but with limitations.

### Pros
**Easy to start:** No complex configuration is required. The Kubernetes clusters are available with a click of a button.

**Runs in a browser:** It does not consume the resources of your laptop and can be launched from any location and any operating system.

**Free:** You can use it without any obligations and you don’t even have to provide your email to start using it.

### Cons
**Limited functionality:** It's a sandbox suitable only for getting started with Kubernetes. You can't customize the environment, scale the cluster, or deploy any meaningful workload to this platform.

**Deployments are not persisted:** Every time you close or restart your browser, the progress will be lost.

## On your workstation

- [Docker desktop](https://www.docker.com/products/docker-desktop/): is a widely used tool that allows you to enable Kubernetes with just a simple checkbox. It provides an easy way to run Kubernetes on your workstation, especially if you are already using Docker. Docker Desktop is known for its user-friendly interface and seamless integration with Docker containers. Just tick the checkbox on Docker desktop to enable Kubernetes. It seems the easiest way to go, especially if you are already using Docker.

### Pros
**Easy to install and configure**
**Works well if you are already using Docker**
**Provides a familiar development environment**

### Cons
**Limited functionality compared to other tools**
**Can consume a significant amount of system resources**

- [Rancher desktop](https://rancherdesktop.io/)

- Minikube (see below as they can run on a VM as well)

- Kind (see below as they can run on a VM as well)

## On a virtual machine (cloud servers or VMs)

- [Minikube](https://minikube.sigs.k8s.io/docs/start/): is a popular tool for running Kubernetes locally. It sets up a single-node Kubernetes cluster inside a virtual machine on your laptop. Minikube is easy to install and is available as an open-source tool.

### Pros
**Easy to start and configure:** Easy to install it, although it requires extra configuration.

**Free and open source:** Minikube is an open-source tool so you can download, use, and even modify it as you see fit without restrictions or limitations.

**Suitable for local development and testing**

### Cons
**Limited functionality compared to full-scale Kubernetes clusters:** Some features are not supported or do not work well in Minikube.

**Requires a fair amount of system resources:** Requires a fair amount of resources, such as CPU and memory.

**Not recommended for production environments:** Good only for local development,


- [Kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/): is a tool designed to bootstrap a full-scale Kubernetes cluster. It is a production-grade solution that supports all the features of Kubernetes and passes the Kubernetes Conformance tests.

### Pros
**Supports all features of Kubernetes:** Clusters created with kubeadm are fully functional and pass all the [Kubernetes Conformance tests](https://github.com/cncf/k8s-conformance).

**Suitable for production environments:** It is absolutely safe to use kubeadm-created clusters not just in sandboxes and pet projects, but in real-world, production enviroments as well.

**Provides a fully functional and reliable cluster**

### Cons
**Requires additional resources and multiple nodes for optimal performance:** Even though you can create a single-node cluster on your laptop – kubeadm is usually run on multiple nodes. The most obvious choice is to rent servers from a cloud provider. However, if there is some spare hardware on your geek shelf – you can repurpose it and build your Kubernetes lab out of it.

**Installation process can be complex:** The process of provisioning can be difficult because you need to install kubeadm itself, as well kubectl, container runtime, and a handful of supporting packages.

**Maintenance can be challenging, requiring manual intervention in some cases:** Kubeadm is not declarative. You can’t save the applied configuration anywhere. If your node goes away, you will have to bring up a replacement and perform the manual join again (unless you have automated it further). Also, even though the creation process is automated, you will still have to deal with all the burdens related to maintaining a self-hosted Kubernetes cluster (maintaining quorum, backing up etcd, and so on)


- [Kind](https://kind.sigs.k8s.io/): is a tool for running local Kubernetes clusters using Docker container "nodes." It was primarily designed for testing Kubernetes itself but can also be used for local development or continuous integration.

- [K3S](https://k3s.io/): is a lightweight distribution of Kubernetes that is designed for resource-constrained environments. It is an excellent option for running Kubernetes on a virtual machine or cloud server.

- [K3D](https://k3d.io/): is a lightweight distribution of Kubernetes designed for resource-constrained environments. It is an excellent option for running Kubernetes on virtual machines or cloud servers.

## Managed Kubernetes

Managed Kubernetes, also known as Kubernetes as a Service (KaaS), is a cloud-based offering that simplifies the management and operation of Kubernetes clusters. It allows users to focus on deploying and managing their applications without the need to worry about the underlying infrastructure and maintenance tasks.

- [AWS Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/)
AWS Elastic Kubernetes Service (EKS) is a managed Kubernetes service provided by Amazon Web Services (AWS). It simplifies the process of deploying, managing, and scaling containerized applications using Kubernetes on AWS. EKS integrates with other AWS services, such as Elastic Load Balancing, Amazon RDS, and Amazon S3, providing a seamless experience for running containerized workloads in the AWS ecosystem.

**Key Features of AWS EKS:**

Automated Kubernetes cluster management
Integration with AWS services and tools
High availability and scalability
Support for multiple availability zones
Seamless integration with AWS IAM for access control

- [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/products/kubernetes-service)
Azure Kubernetes Service (AKS) is a managed Kubernetes offering from Microsoft Azure. It enables users to deploy and manage containerized applications using Kubernetes without the need to manage the underlying infrastructure. AKS integrates with Azure services like Azure Container Registry, Azure Monitor, and Azure Active Directory, providing a comprehensive solution for deploying and managing applications on Azure.

**Key Features of Azure AKS:**
Simplified cluster creation and management
Seamless integration with Azure services
Automated scaling and self-healing capabilities
Built-in monitoring and diagnostics
Integration with Azure Active Directory for access control

- [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)
Google Kubernetes Engine (GKE) is a managed Kubernetes service on the Google Cloud Platform (GCP). It offers a fully managed, scalable, and secure environment for running containerized applications with Kubernetes. GKE provides seamless integration with other GCP services like Google Cloud Storage, Stackdriver Logging, and Cloud IAM, making it easy to build and deploy applications on GCP.

**Key Features of Google GKE:**

Automated cluster management and scaling
Seamless integration with GCP services
Automatic upgrades and security patching
Monitoring and logging with Stackdriver
Role-based access control with Cloud IAM

- [Civo](https://www.civo.com/)
Civo is a cloud-native, managed Kubernetes service offered by Civo Ltd. It provides a user-friendly platform for deploying, scaling, and managing containerized applications with Kubernetes. Civo offers a simple and streamlined experience with its intuitive UI, CLI, and API. It also provides integration with popular tools like Helm and Prometheus for application deployment and monitoring.

**Key Features of Civo:**

Easy cluster creation and management
User-friendly interface and API
Integration with Helm and Prometheus
High availability and scalability
Cost-effective pricing model

- [DigitalOcean Kubernetes (DOKS)](https://www.digitalocean.com/products/kubernetes)
DigitalOcean Kubernetes (DOKS) is a managed Kubernetes service provided by DigitalOcean. It allows users to deploy, manage, and scale containerized applications using Kubernetes on the DigitalOcean cloud platform. DOKS integrates with other DigitalOcean services like Block Storage, Load Balancers, and Spaces, providing a seamless experience for deploying and managing applications on DigitalOcean.

**Key Features of DigitalOcean DOKS:**

Simplified Kubernetes cluster management
Seamless integration with DigitalOcean services
Automated scaling and load balancing
Monitoring and alerting capabilities
Cost-effective pricing model

### Pros
**Production-grade solution:** It’s not the best option, however, some companies use it as a go-to method for provisioning their Kubernetes infrastructure. It can be scaled to a certain extent, however, it requires some extra scripting and configuration.

**Easy to start:** Creating a basic cluster takes seconds, making it a perfect option when you need to build a cluster quickly.

### Cons
**Require a cloud account:** If you haven’t yet started your cloud journey, this option will require some extra steps to create your cloud account and users.

**Not maintainable:** The CLI or any script based on CLI is not declarative and does not highlight the state of your infrastructure. This means you will require additional efforts to make sure the automation is applied in an idempotent way.

**Can be expensive:** Managed Kubernetes clusters are relatively expensive. So, you should never forget to turn down your infrastructure when you are not working with your lab. In AWS, you pay not for what you use but for what you have forgotten to terminate.

In summary, choosing the right tool for running Kubernetes clusters depends on your specific requirements and environment. I hope this article helps someone out! Feel free to give me feedback, and if I'm off track, don't hesitate to let me know. We're all in this together, learning and growing as a community!


***

Follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
