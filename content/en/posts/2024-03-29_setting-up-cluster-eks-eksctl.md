---
title: "Setting up a Kubernetes cluster on AWS EKS with eksctl and Deploying an App"
author: 'Julia Furst Morgado'
date: 2024-03-30T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/k8s-cluster-eks.png
tags: 
    - AWS
    - Tutorial
    - Kubernetes

slug: /setting-up-kubernetes-cluster-aws-eks-with-eksctl-and-deploying-app
---

It might come as a surprise, but not too long ago, configuring a Kubernetes cluster on Amazon EKS was quite challenging since you had to create all the components manually by yourself. This changed with the introduction of `eksctl`, a tool written in Go by the community and sponsored by weaveworks that acts as the official AWS CLI for EKS management. `eksctl` allows for the creation and administration of clusters through YAML files, while leveraging CloudFormation stacks behind the scenes to handle the required resources. In this blog post you'll see that using `eksctl` simplifies the creation and deployment of Kubernetes clusters on Amazon EKS.


## Installation
Like other binaries written in Go, installation is super simple:

```
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

Here's a breakdown of what the code snippet does:
1. Downloads and extracts the `eksctl binary`:
  - The `curl` command fetches the latest `eksctl` binary from its GitHub releases page. This binary is compressed in a .tar.gz file for efficient transfer.
  - `--silent --location`: These options ensure that the download process is not only quiet (no progress output) but also follows any redirects, which is crucial for reaching the final download link.
  - The URL contains a dynamic part, `$(uname -s)_amd64`, which automatically adjusts the download link based on your operating system (uname -s outputs your OS name, such as Linux or Darwin) and assumes an amd64 architecture.
  - The downloaded file is piped (`|`) into the `tar` command, which extracts the binary into the `/tmp` directory. This is a temporary location, safe for staging files before moving them to a more permanent location.


2. Moves the binary to `/usr/local/bin`:
  - The `sudo mv /tmp/eksctl /usr/local/bin` command moves the extracted `eksctl` binary from `/tmp` to `/usr/local/bin`. This directory is commonly used for manually installed binaries and is typically included in the system's PATH. Placing `eksctl` here allows you to run it from any terminal without specifying its full path.
  - Using `sudo` is necessary because `/usr/local/bin` is a system directory, and modifying its contents requires administrative privileges.
    
3. Verifies the installation
   - Finally, running `eksctl version` checks the installed version of `eksctl`. This not only confirms that `eksctl` is correctly installed and accessible but also lets you know the exact version you have. It's a good practice to verify installations to ensure everything is set up as expected.

## Configuring an AWS account
Do not use your root account for cluster creation. In fact, avoid using your root account for anything other than creating other accounts or managing very specific AWS resources.

If it's your personal account, create another user. Now, if it's a corporate account, I suggest enabling AWS Organizations.

Create a new user in IAM with the following policies attached to it:

- AmazonEC2FullAccess
- AWSCloudFormationFullAccess
- EksFullAccess
- IamLimitedAccess
  
The first two are AWS-managed policies, so you don't need to create them. The last two will have the following content:

### EksAllAccess
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "eks:*",
            "Resource": "*"
        },
        {
            "Action": [
                "ssm:GetParameter",
                "ssm:GetParameters"
            ],
            "Resource": [
                "arn:aws:ssm:*:<account_id>:parameter/aws/*",
                "arn:aws:ssm:*::parameter/aws/*"
            ],
            "Effect": "Allow"
        },
        {
             "Action": [
               "kms:CreateGrant",
               "kms:DescribeKey"
             ],
             "Resource": "*",
             "Effect": "Allow"
        },
        {
             "Action": [
               "logs:PutRetentionPolicy"
             ],
             "Resource": "*",
             "Effect": "Allow"
        }        
    ]
}
```
### IamLimitedAccess

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateInstanceProfile",
                "iam:DeleteInstanceProfile",
                "iam:GetInstanceProfile",
                "iam:RemoveRoleFromInstanceProfile",
                "iam:GetRole",
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:AttachRolePolicy",
                "iam:PutRolePolicy",
                "iam:ListInstanceProfiles",
                "iam:AddRoleToInstanceProfile",
                "iam:ListInstanceProfilesForRole",
                "iam:PassRole",
                "iam:DetachRolePolicy",
                "iam:DeleteRolePolicy",
                "iam:GetRolePolicy",
                "iam:GetOpenIDConnectProvider",
                "iam:CreateOpenIDConnectProvider",
                "iam:DeleteOpenIDConnectProvider",
                "iam:TagOpenIDConnectProvider",
                "iam:ListAttachedRolePolicies",
                "iam:TagRole",
                "iam:GetPolicy",
                "iam:CreatePolicy",
                "iam:DeletePolicy",
                "iam:ListPolicyVersions"
            ],
            "Resource": [
                "arn:aws:iam::<account_id>:instance-profile/eksctl-*",
                "arn:aws:iam::<account_id>:role/eksctl-*",
                "arn:aws:iam::<account_id>:policy/eksctl-*",
                "arn:aws:iam::<account_id>:oidc-provider/*",
                "arn:aws:iam::<account_id>:role/aws-service-role/eks-nodegroup.amazonaws.com/AWSServiceRoleForAmazonEKSNodegroup",
                "arn:aws:iam::<account_id>:role/eksctl-managed-*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:GetRole"
            ],
            "Resource": [
                "arn:aws:iam::<account_id>:role/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:CreateServiceLinkedRole"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "iam:AWSServiceName": [
                        "eks.amazonaws.com",
                        "eks-nodegroup.amazonaws.com",
                        "eks-fargate.amazonaws.com"
                    ]
                }
            }
        }
    ]
}
```
Replace <account_id> with your AWS account ID.

Now generate credentials for the user and keep the access key ID and secret key. `eksctl` requires the AWS CLI to be installed. If you don't have it installed, run:

```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws configure
```

You'll be prompted for details like the default AWS region (e.g., us-east-1), access key ID, and secret key to create the default profile. Now, if you already have the AWS CLI installed and configured, you can manually create the new profile by editing the `~/.aws/credentials` file.

Attention: when you have multiple profiles within your `~/.aws/credentials` file, specify which one you want to use by setting the value of the `AWS_PROFILE` variable with the command `export AWS_PROFILE=my_profile` and replacing `my_profile` with the name of the AWS profile you want to use. This ensures that any subsequent AWS CLI commands will use the credentials and configuration associated with the specified profile.

## Creating the cluster
By default, **eksctl** will create the cluster in a separate VPC using **m5.large** instances. This has some implications:
- By default quota, you can have a maximum of five VPCs per account;
- If you're using a study, lab, or test environment, this type of instance can be considered somewhat expensive;
- If you need the applications in the cluster to communicate with AWS resources - an instance in RDS, for example - located in another VPC, VPC Peering configuration and routes are necessary for this to happen.

Our cluster will have the following characteristics:
- It will be called **demo-eks** and will be located in **us-east-1** (Northern Virginia);
- Four subnets will be created in the new VPC, two public and two private. By default, **eksctl** allocates the cluster nodes in the private subnets;
- A nodegroup called **ng-01** will be created with an auto scaling group, with a minimum of one instance and a maximum of 5 of type **t3.medium**;
- IAM policies for **external-dns, auto-scaling, cert-manager, ebs**, and **efs**. We'll talk more about them shortly.

Save the file below as `demo-eks.yaml` and then execute `eksctl create cluster -f demo-eks.yaml --kubeconfig=demo-eks-kubeconfig` and let the magic happen. **eksctl** will generate the stack (or stacks) within CloudFormation and create all the necessary resources, which will take about fifteen to twenty minutes (yes, it's a bit slow) and voilà, you'll have a Kubernetes cluster for use in AWS EKS, with credentials for access to it in the `demo-eks-kubeconfig.yaml` file.


```
---
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: demo-eks
  region: us-east-1

managedNodeGroups:
  - name: ng-01
    instanceType: t3.medium
    desiredCapacity: 2
    minSize: 1
    maxSize: 5
    iam:
      withAddonPolicies:
        autoScaler: true
        externalDNS: true
        certManager: true
        ebs: true
        efs: true
```

>Important: If the `--kubeconfig` option is omitted, eksctl will generate the access file in `~/.kube/config`, which can be a problem if you already have other clusters configured. If that's the case, you can create a directory called `~/.kube/configs` to store the files and switch between them by setting the `KUBECONFIG` variable pointing to the desired file path (e.g., `export KUBECONFIG=${HOME}/.kube/configs/demo-eks-kubeconfig`). This step is essential for `kubectl` to be able to connect to the cluster.
>
>If you're still getting an error suggesting that `kubectl` is trying to connect to a Kubernetes cluster on your local machine (localhost, IP address 127.0.0.1) instead of connecting to your Amazon EKS cluster, run the command `export KUBECONFIG=demo-eks-kubeconfig`.


## Helm Installation
You've probably heard of Helm, but if not, don't worry. Helm is, in essence, a package manager for Kubernetes. These packages are provided in the form of charts, and with Helm, we can create manifests for our applications in a more dynamic, organized, parameterizable way, and then host them in repositories for deployment.

You can quickly install it using `curl`and `bash`:
```
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

Here's what the command does:
1. `curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3`: This part of the command uses `curl`, a command-line tool for transferring data using various network protocols. Here, it's used to download the installation script for Helm 3 from its official GitHub repository. The URL points to the raw version of the `get-helm-3` script, which is intended to be executed directly.

2. `| bash`: This pipe (|) takes the output of the `curl` command (which is the Helm 3 installation script) and feeds it directly into `bash`, the Bourne Again SHell. Running a script in this manner executes the script's contents.

Here's what happens when you run the command:

- The `get-helm-3` script is fetched from the Helm GitHub repository using `curl`.
- The script is then immediately executed in your shell (`bash`) without needing to be saved to a file on your disk.
- The script performs several actions to install Helm 3:
  - It checks your system to ensure it meets the prerequisites for installing Helm.
  - It determines the latest version of Helm 3 if not specified.
  - It downloads the correct Helm 3 binary for your operating system and architecture.
  - It places the Helm binary in a location on your system where executable files are typically stored, making it accessible from anywhere in your terminal.
  - It might also perform some additional setup tasks, such as setting up autocomplete features for Helm commands.

Or, if you're using a Debian-like distribution and want to use a package you can install it with the following commands:
```
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

## Add-ons Installation
### Metrics Server
The **Metrics Server** is a necessary resource for using HPAs (Horizontal Pod Autoscalers). HPAs are extremely useful when we want to scale our applications horizontally when they need more resources.

```
helm repo add metrics-server https://kubernetes-sigs.github.io/metrics-server/
helm upgrade --install --create-namespace -n metrics-server metrics-server metrics-server/metrics-server
```

### Prometheus
**Prometheus** is a monitoring solution. If you use Lens or another dashboard for monitoring your clusters, it will provide CPU, memory, network, and disk usage graphs for the cluster, nodes, controllers, and pods. Prometheus is commonly used alongside Grafana.

```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install --create-namespace -n kube-prometheus prometheus bitnami/kube-prometheus
```

### ExternalDNS
**ExternalDNS** synchronizes Kubernetes resources with external DNS records hosted on providers like AWS Route 53, Google Cloud DNS, AzureDNS, etc. With it, we don't need to manually create DNS entries every time we deploy a new application to our cluster. Cool, right?

```
helm install external-dns stable/external-dns \
  --create-namespace \
  --namespace external-dns \
  --set provider=aws \
  --set aws.zoneType=public \
  --set txtOwnerId=<ZONE_ID>
  --set policy=sync
  --set registry=txt
  --set interval=20s
  --set domainFilters[0]=<DOMAIN>
```

Replace `<ZONE_ID>` with your AWS Route 53 zone ID and `<DOMAIN>` with your domain in the format `domain.com`.

### cert-manager
**cert-manager** is a CRD (Custom Resource Definition) that dynamically generates TLS/SSL certificates for our applications using [Let's Encrypt](https://letsencrypt.org/) (although it also supports other issuers).
```
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install --create-namespace -n cert-manager cert-manager bitnami/cert-manager \
  --create-namespace \
  --namespace cert-manager \
  --set installCRDs=true
```

With the chart installed, it's necessary to create two CRDs, each representing a different issuer from Let's Encrypt, one for production and one for staging. The difference between them is the request limit we can make. In a test environment, prefer to use the staging environment.
```
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <meu_email>
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

```
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    email: <meu_email>
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
```

> Note: Replace `<my_email>` with your email address. If you're using an Ingress other than Nginx, you need to change the manifests above by setting the appropriate class.

Run the command `kubectl apply -f cert-manager-staging.yaml -f cert-manager-prod.yaml` to create them in the cluster.

## NGINX Ingress Controller
We allow access to our applications through the **NGINX Ingress Controller**. You can think of an Ingress as a reverse proxy.

```
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx \
  --create-namespace
```

## Auto Scaling Group
One of the coolest features of cloud computing is **elasticity**. Imagine that throughout the year, we have a relatively constant demand, but at certain times - like Black Friday - it can increase considerably, and soon you'll need more nodes within your nodegroups to meet the needs of your pods. So that we don't have to do this manually, let's add automatic scaling functionality to our nodegroup.

```
helm repo add autoscaler https://kubernetes.github.io/autoscaler
helm install --create-namespace -n cluster-autoscaler autoscaler/cluster-autoscaler \
  --set 'autoDiscovery.clusterName=<cluster_name>'
```

> Note: Replace `<cluster_name>` with the name of your cluster (in this case, `demo-eks`).

To test, after deploying any application, increase the number of replicas to a number not met by the resources available in your nodegroup. The **cluster-autoscaler** will provide new nodes up to the maximum number set in the nodegroup. When the number of pods consumes less than 50% of the resources of a node for more than 10 minutes, this node will be removed from the nodegroup. Cool, right?

## Deploying an Application
With our cluster set up and the add-ons installed, it's time to launch a test application. Below are the manifests within a single file named `hello-kubernetes.yaml`:
```
apiVersion: v1
kind: Namespace
metadata:
  name: hello-kubernetes
---
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: hello-kubernetes
  name: hello-kubernetes
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hello-kubernetes
  template:
    metadata:
      labels:
        app: hello-kubernetes
    spec:
      containers:
      - name: hello-kubernetes
        image: paulbouwer/hello-kubernetes:1.5
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  namespace: hello-kubernetes
  name: hello-kubernetes
spec:
  type: ClusterIP
  selector:
    app: hello-kubernetes
  ports:
  - port: 80
    targetPort: 8080
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: hello-kubernetes
  name: hello-kubernetes-ingress
  annotations:
    nginx.ingress.kubernetes.io/ingress-class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    external-dns.alpha.kubernetes.io/hostname: <app.DOMAIN>
spec:
  tls:
    - hosts:
        - <app.DOMAIN>
      secretName: <app.DOMAIN>
  rules:
    - host: <app.DOMAIN>
      http:
        paths:
        - path: /
          pathType: Prefix
          backend:
            service:
              name: hello-kubernetes
              port: 
                number: 80
```
> Note: Replace <app.DOMAIN> with the domain you want to use for your application, something like app.juliaK8s.net.

Once you've created the manifest and saved it, deploy the YAML file using `kubectl apply`:
```
kubectl apply -f hello-kubernetes.yaml
```
This command will create the resources defined in the YAML file (Namespace, Deployment, Service, Ingress) in your Kubernetes cluster.

After applying the YAML file, you can verify that the resources have been created successfully by running the command `kubectl get all -n hello-kubernetes
`.

If everything goes well, here's what should happen:

- Entries will be created in your DNS zone inside AWS Route 53 according to what was configured in your ingress and the settings of your ExternalDNS, and within a few minutes, you will be able to access your application by that name. You can monitor the propagation using the dig tool;
- A certificate will be automatically generated for your application. This can take some time for new applications;
- We allocate two replicas for the application, and here's a very important caveat: Kubernetes will by default perform round-robin load balancing between the pods. In most of today's web applications, we work with sessions and, as a result, there may be scenarios where a user authenticates on one pod, and the next request, is redirected to another where the session does not exist. As a consequence, strange behaviors are presented to the user, such as redirection to the login screen, "Unauthorized" messages, intermittent access, etc. To prevent this, we usually use some service like **Redis, memcached** (which may or may not be on AWS ElastiCache), or the sticky-sessions feature, where a user is consistently sent to the same pod.

## Deleting Cluster
If you want to delete the cluster and resources you've just created, run the following command:
```
eksctl delete cluster --name demo-eks --region us-east-1
```

## Conclusion
Kubernetes is an extremely extensive and complex subject with a myriad of possibilities. I presented some of them here that can be used not only in AWS EKS but also in on-premises installations (except for the **cluster-autoscaler**, unless you are using **OpenStack** in your company). There is also a series of security improvements that can be made to the cluster setup in this article. I hope you enjoyed it!

References
- [eksctl](https://eksctl.io/)
- [Getting started with Amazon EKS – eksctl](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html)

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
