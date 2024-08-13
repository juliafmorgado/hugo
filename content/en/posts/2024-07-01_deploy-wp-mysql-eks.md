---
title: "Easily Deploy WordPress and MySQL on Amazon EKS"
author: "Julia Furst Morgado"
date: 2024-07-01T06:46:05.964Z
draft: false
toc: true
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-wp-mysql-eks-thumbnail.png
tags: 
    - Kubernetes
    - AWS
    - Tutorial
    - Databases
slug: /easily-deploy-wordpress-mysql-on-amazon-eks
---



[Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/) is a managed Kubernetes service that makes it easy to run Kubernetes on AWS without needing to install and operate your own Kubernetes control plane or nodes. By leveraging EKS, you benefit from the scalability, security, and reliability of AWS, while simplifying your Kubernetes management tasks. In this guide, we'll walk through the steps to deploy a stateful WordPress site and its MySQL database on an EKS cluster, demonstrating the power and ease of using managed Kubernetes with AWS.

**Pre-requisites**

- You should have AWS account created: [LINK](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- IAM user in AWS with admin powers: [LINK](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
- For accessing AWS account from CLI, you should have AWS CLI installed on your machine. To install AWS CLI follow this documentation: [LINK](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- To manage kubernetes, you need `kubectl` command: [LINK](https://kubernetes.io/docs/tasks/tools/install-kubectl/) or [LINK](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
- Install `eksctl` command in your local machine to manage EKS clusters: [LINK](https://eksctl.io/installation/)
- Helm installed for Kubernetes package management: [LINK](https://formulae.brew.sh/formula/helm) or [LINK](https://helm.sh/docs/intro/install/)

## Step 1. Create EKS cluster

Create your Kubernetes cluster through `eksctl` with the following commands:

```
eksctl create cluster \
--name eks-wp \
--region us-east-1 \
--zones us-east-1a,us-east-1b \
--managed 
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-ready.png)

Once your cluster is deployed, you can check the connectivity with the command: `kubectl cluster-info`

To see the nodes: `kubectl get nodes`

To see the pods that are already running: `kubectl get pods -A`

To get detailed information on the instances on which the pods are running: `kubectl get pods -o wide -A`

## Step 2. Create an IAM OIDC Provider for Your Cluster

First, create an [IAM OIDC provider](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html) for your EKS cluster to enable the use of IAM roles for Kubernetes service accounts. This feature allows Kubernetes service accounts to assume IAM roles, enabling fine-grained permissions management for pods running in your cluster.

```
oidc_id=$(aws eks describe-cluster --name eks-wp --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4
eksctl utils associate-iam-oidc-provider --cluster eks-wp --approve
```
![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-oidc.png)

## Step 3. Add IAM Role using `eksctl`

Create an [IAM service account](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) with the necessary policies attached.

```
eksctl create iamserviceaccount \
--name ebs-csi-controller-sa \
--namespace kube-system \
--cluster eks-wp \
--attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
--approve \
--role-name AmazonEKS_EBS_CSI_DriverRole
```

This command is essential for setting up the necessary IAM infrastructure to allow the EBS CSI (Elastic Block Store Container Storage Interface) driver to manage EBS volumes within your Kubernetes cluster on AWS EKS. The IAM role (`AmazonEKS_EBS_CSI_DriverRole`) created here will have the permissions defined by the attached policy (`AmazonEBSCSIDriverPolicy`), enabling the CSI driver to perform actions like attaching, detaching, and managing EBS volumes as persistent storage for your Kubernetes workloads.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-iamsa-ebs-csi-controller.png)

## Step 4. Install the EBS CSI Driver

Add the EBS CSI driver to your EKS cluster using the created IAM role.

```
# Get the ARN of the IAM role
role_arn=$(aws iam list-roles --query "Roles[?RoleName=='AmazonEKS_EBS_CSI_DriverRole'].Arn" --output text)

# Install the EBS CSI driver
eksctl create addon --name aws-ebs-csi-driver --cluster eks-wp --service-account-role-arn $role_arn --force

```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-ebs-csi-install.png)

## Step 5. Deploy the Amazon EBS CSI Driver to your Amazon EKS cluster

Add and install the EBS CSI driver using Helm.

```
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver
helm repo update
helm upgrade --install aws-ebs-csi-driver \
    --namespace kube-system \
    aws-ebs-csi-driver/aws-ebs-csi-driver
```

Once the driver has been deployed, verify the pods are running:

`kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-ebs-csi-driver`

## Step 6. Deploy MySQL and WordPress

Now, you can create the necessary Kubernetes resources for MySQL and WordPress in the cluster. For that, you need to create two files. These files contain information about the different settings to be applied to our MySQL and WordPress pods, as well as services and persistent volume claims.

Download the following configuration files:

- MySQL configuration file:  run the command

`curl -LO https://k8s.io/examples/application/wordpress/mysql-deployment.yaml`

This manifest describes a single-instance MySQL Deployment. The MySQL container mounts the PersistentVolume at /var/lib/mysql. The `MYSQL_ROOT_PASSWORD` environment variable sets the database password from the Secret.

- WordPress file: run the command

`curl -LO https://k8s.io/examples/application/wordpress/wordpress-deployment.yaml`

This manifest describes a single-instance WordPress Deployment. The WordPress container mounts the PersistentVolume at `/var/www/html` for website data files. The `WORDPRESS_DB_HOST` environment variable sets the name of the MySQL Service defined above, and WordPress will access the database by Service. The `WORDPRESS_DB_PASSWORD` environment variable sets the database password from the Secret kustomize generated.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-curl-wp-mysql.png)

## Step 7. Create a kustomization.yaml

In this file, we'll specify the order of execution of the files downloaded above, along with the secret key.

A [Secret](https://kubernetes.io/docs/concepts/configuration/secret/) is an object that stores a piece of sensitive data like a password or key. Since 1.14, `kubectl` supports the management of Kubernetes objects using a kustomization file. You can create a Secret by generators in `kustomization.yaml`.

Add a Secret generator in `kustomization.yaml` with the following command (you will need to replace `YOUR_PASSWORD` with the password you want to use)

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

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-kustomization.png)

## Step 8. Deploy containers

Now deploy both containers to EKS with the following command: 

```
kubectl apply -k .
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-applyk.png)

You can verify that all objects exist:

- Pods: `kubectl get pods`
- Secrets: `kubectl get secrets`
- Persistent Volume Claims: `kubectl get pvc`
- Services: `kubectl get services`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-objects.png)

Once the containers have successfully been created and the Pods show as  “Running” in Kubernetes, you can get the DNS name of the ELB LoadBalancer by typing the following command:

`kubectl get svc wordpress`

Paste it on the web browser.

**Voilá**

Congratulations! You’ve now deployed your stateful WordPress site to AWS on EKS!

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-main-dashboard.png)

If you're feeling brave, head to my next tutorial to learn how to [install Veeam Kasten on this EKS cluster](https://www.juliafmorgado.com/posts/install-veeam-kasten-on-an-amazon-eks-cluster/)!

## Clean up your environment

To clean up your environment, follow these steps:

1) Delete the Kubernetes resources:

`kubectl delete -k .`

2) Use `eksctl` to delete your EKS cluster and all of its dependencies via CloudFormation:

`eksctl delete cluster eks-wp`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-deleted.png)

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
