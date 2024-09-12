---
title: "Challenge 4 - Getting Your App to Kubernetes with Amazon EKS"
author: 'Julia Furst Morgado'
date: 2024-09-12T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/cloud-native-dev-challenge.png
toc: true
tags: 
    - Kubernetes
    - AWS
slug: /challenge-4-getting-your-app-to-kubernetes-with-eks
---

Welcome to the second post on [challenge 4](https://github.com/juliafmorgado/cloudnative-dev/tree/main/challenge-4)! In the [last post](https://www.juliafmorgado.com/posts/challenge-4-getting-your-app-to-kubernetes-with-kind/), we deployed our application (app & dashboard) on a local Kubernetes cluster using KinD (Kubernetes in Docker). Since the instructions also suggested running the application on a remote cluster, Im now going to show you how to do that using Amazon EKS.

You can review the Challenge 4 [instructions](https://github.com/salaboy/cloud-native-dev/tree/main/4) from Salaboy for more context.

Here you have two options:
- If you've already completed challenge 4 by deploying to KinD, you can skip steps 1 to 6 and follow along with this blog from where I start.
- If you want to skip the local KinD deployment and only deploy the application on EKS, start from step 1 and skip [step 5](https://www.juliafmorgado.com/posts/challenge-4-getting-your-app-to-kubernetes-with-kind/#step-5-load-docker-images-into-kind), then continue with this blog.

In this post, I’ll be using the Docker image I built previously and the files already in the Challenge 4 directory.

![](https://blog-imgs-23.s3.amazonaws.com/ch4-eks-directories.png)

**Pre-requisites**

- Ensure you have an AWS account set up with an IAM user or role with enough permissions to create EKS cluster: [LINK](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- To access your AWS account via the Command Line Interface (CLI), make sure AWS CLI is installed on your machine. Follow the installation guide here: [LINK](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Configure environment variables for your IAM user to enable CLI access to your AWS account: [LINK](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html)
- Install the `kubectl` command-line tool to manage Kubernetes clusters: [LINK](https://kubernetes.io/docs/tasks/tools/install-kubectl/) or [LINK](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
- Install the `eksctl` CLI to manage EKS clusters: [LINK](https://eksctl.io/installation/)
- Ensure Helm is installed for Kubernetes package management: [LINK](https://formulae.brew.sh/formula/helm) or [LINK](https://helm.sh/docs/intro/install/)

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

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-ch4-console.png)

Once your cluster is deployed, you can check the connectivity with the command: `kubectl cluster-info`

To view the nodes: `kubectl get nodes`

To list all running pods: `kubectl get pods -A`

To get more detailed information on the nodes (instances) hosting the pods: `kubectl get pods -o wide -A`

## Step 2. Deploy the App

Here we should have the already-created files so we only need to deploy all the YAML files to our AWS EKS cluster using:

`kubectl apply -f k8s/`

This will deploy all the necessary services and pods for the app, dashboard, and database.

![](https://blog-imgs-23.s3.amazonaws.com/ch4-applyk8s.png)


## Step 3. Access the App

Now comes the tricky part. Since our services are of type NodePort, we should be able to access them using the public IP addresses of the nodes. With NodePort, the services are exposed on the node’s IP addresses at specific ports. 

- **App Service:** The app service is exposed on NodePort `30000`.
- **Dashboard Service:** The dashboard service is exposed on NodePort `30001`.

Here’s how we should be able to access the services externally:

1. Find the public IP of the EKS worker nodes (EC2 instances). We can get these from the AWS console under the EC2 section or use the AWS CLI to retrieve them:

`aws ec2 describe-instances --region us-east-1 --query 'Reservations[*].Instances[*].[PublicIpAddress]' --output text`

2. Once we have the public IP of the nodes, we can access the services by navigating to the following URLs on the browser:

`http://<public-ip>:30000 for the app`
`http://<public-ip>:30001 for the dashboard`

### **Debugging Access Issues**

Unfortunately, this didn’t work for me. I suspected that the issue was with the security group settings on the EKS nodes. By default, security groups might block traffic on the NodePort range (30000-32767).

To fix that, I found the security group associated with your EKS worker nodes: `aws eks describe-cluster --name eks-wp --region us-east-1 --query 'cluster.resourcesVpcConfig.securityGroupIds' --output text`

And added an inbound rule to allow traffic on the NodePort range (30000-32767) from any IP (0.0.0.0/0).

However, even after fixing the security group, I still couldn’t access the services!

### **Using a LoadBalancer Instead of NodePort**
Next I tried changing the service type from NodePort to LoadBalancer. This will automatically create an external load balancer (usually an AWS ELB) and assign a public IP that we can use to access the services externally.

To do so I had to update the app and dashboard service YAML files:

**app-service.yaml**
```
apiVersion: v1
kind: Service
metadata:
  name: app
spec:
  selector:
    app: app
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

**dashboard-service.yaml**
```
apiVersion: v1
kind: Service
metadata:
  name: dashboard
spec:
  selector:
    app: dashboard
  ports:
    - port: 80
      targetPort: 3001
  type: LoadBalancer
```

Then apply the new configurations:

```
kubectl apply -f k8s/app-service.yaml
kubectl apply -f k8s/dashboard-service.yaml
```

After applying the changes, Kubernetes will create an AWS LoadBalancer. We can check the external IP by running: `kubectl get services`

![](https://blog-imgs-23.s3.amazonaws.com/ch4-externalip-lb.png)

Once the EXTERNAL-IP is available, a field is populated with a public IP or DNS name for our services. With that, we can copy and paste them into the web browser and see our app and dashboard.

### **Debugging Connectivity Issues**

Even after accessing the services, I ran into **ANOTHER** issue: the dashboard wasn’t showing any data from the app. This usually points to a problem with how the dashboard connects to the app.

![](https://blog-imgs-23.s3.amazonaws.com/ch4-app-eks.png)
![](https://blog-imgs-23.s3.amazonaws.com/ch4-dashboard-eks.png)

Honestly I was a little bit tired mentally so I asked Salaboy for help. Upon inspecting the developer tools console, he found that the dashboard was still trying to connect to `localhost:3001`, which won’t work in a remote environment because now it should connect to the external IP address.

![](https://blog-imgs-23.s3.amazonaws.com/dev-tools-ch4-connection.png)

The issue was in the `index.html` of the dashboard, where the socket connection was hardcoded (`const socket = io('http://localhost:3001');`)

![](https://blog-imgs-23.s3.amazonaws.com/ch4-dashboard-html.png)

**How To Fix It**
We need to create an environment variable so we can parameterize that, or a variable for the client. Remember that the HTML is sent from the server to the client. An alternative is to use the browser to detect the URL where the page is hosted.


To resolve this, we need to **dynamically set the server address** in the HTML, instead of hardcoding `localhost`. Because remember that the loadbalancer will always change so we need to write a variable that retrieves the loadbalancer every time. This way, the connection will always use the correct address, even when the load balancer IP changes.

Here’s how we could approach it:

1. **Environment Variables:**
Create an environment variable that stores the app’s address, which will be passed to the HTML at runtime. This allows flexibility in different environments.

```
const socket = io(window.location.origin); // Dynamically use the host where the app is deployed
```

2. **Browser-Based Detection:**
Alternatively, you can use JavaScript in the browser to detect the server’s address and automatically adjust the connection string:

```
const socket = io(`${window.location.protocol}//${window.location.hostname}:${window.location.port}`);
```

Now once we change the code, **remember** that we need to:
- Create a new [multi-architecture docker image](https://www.juliafmorgado.com/posts/building-multi-architecture-images-with-a-docker-driver/)
- [Push it to docker hub](https://www.juliafmorgado.com/posts/challenge-4-getting-your-app-to-kubernetes-with-kind/#step-4-push-docker-images-to-a-registry)
- Update the `dashboard-deployment.yaml` with the new docker image name
- Apply the file

If you follow all these steps you should get your dashboard working!!

## Step 4. Clean up your environment

To clean up your environment, follow these steps:

1) Delete the Kubernetes resources:

`kubectl delete -f k8s/`

2) Use `eksctl` to delete your EKS cluster and all of its dependencies via CloudFormation:

`eksctl delete cluster eks-wp`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-cluster-deleted.png)


## Questions
1. Am I missing anything between Step 1 and Step 2? Should I have created an IAM OIDC Provider for the cluster, add an IAM service account, install EBS CSI Driver and deploy the Amazon EBS CSI Driver to the cluster like I did here: https://www.juliafmorgado.com/posts/easily-deploy-wordpress-and-mysql-on-amazon-eks/
  What is the purpose of these steps?
2. How should I manage the database secrets? In this current blog post, I put the db credentials directly on the deployment.yaml file, but on the other blog (mentioned above), I created a kustomization file with the db secret.  Which approach is better? What are the best practices?
3. What should I do about the database issue? How can I debug it?
   
***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
