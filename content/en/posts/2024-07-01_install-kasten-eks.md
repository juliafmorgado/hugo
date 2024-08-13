---
title: "Install Veeam Kasten on an Amazon EKS cluster"
author: "Julia Furst Morgado"
date: 2024-07-01T06:48:05.964Z
draft: false
toc: true
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/veeam-kasten-install-banner.png
tags: 
    - Kubernetes
    - Veeam
    - AWS
    - Tutorial
slug: /install-veeam-kasten-on-an-amazon-eks-cluster
---

In this guide, we will walk through the process of installing Veeam Kasten on an Amazon EKS cluster. Veeam Kasten is a data management platform designed for Kubernetes environments, providing capabilities for backup, recovery, and application mobility.

View the documentation [here](https://docs.kasten.io/latest/install/aws/aws.html).

## Pre-requisites

Before getting started, ensure you have the following prerequisites:

- You should have AWS account created: [LINK](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)
- IAM user in AWS with admin powers: [LINK](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html)
- For accessing AWS account from CLI, you should have AWS CLI installed on your machine. To install AWS CLI follow this documentation: [LINK](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- To manage kubernetes, you need `kubectl` command: [LINK](https://kubernetes.io/docs/tasks/tools/install-kubectl/) or [LINK](https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html)
- Install `eksctl` command in your local machine to manage EKS clusters: [LINK](https://eksctl.io/installation/)
- Helm installed for Kubernetes package management: [LINK](https://formulae.brew.sh/formula/helm) or [LINK](https://helm.sh/docs/intro/install/)


## Step 1. Create the IAM Role and Policy

To interact with AWS services securely, Veeam Kasten needs an IAM role with an attached policy that grants necessary permissions.

So first, create an IAM role `eks-wp-kasten-role` with a trust policy that allows Amazon EKS to assume this role.

```
# Define the trust policy document
cat <<EOF > trust-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

# Create the IAM role
aws iam create-role \
    --role-name eks-wp-kasten-role \
    --assume-role-policy-document file://trust-policy.json

```

## Step 2. Create an IAM Policy

Next, create an IAM policy `k10-policy.json` that defines the permissions required by Veeam Kasten for managing AWS resources like EC2 and S3:

```
# Save the policy JSON to a file
cat <<EOF > k10-policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CopySnapshot",
                "ec2:CreateSnapshot",
                "ec2:CreateTags",
                "ec2:CreateVolume",
                "ec2:DeleteTags",
                "ec2:DeleteVolume",
                "ec2:DescribeSnapshotAttribute",
                "ec2:ModifySnapshotAttribute",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeRegions",
                "ec2:DescribeSnapshots",
                "ec2:DescribeTags",
                "ec2:DescribeVolumeAttribute",
                "ec2:DescribeVolumesModifications",
                "ec2:DescribeVolumeStatus",
                "ec2:DescribeVolumes"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "ec2:DeleteSnapshot",
            "Resource": "*",
            "Condition": {
                "StringLike": {
                    "ec2:ResourceTag/name": "kasten__snapshot*"
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": "ec2:DeleteSnapshot",
            "Resource": "*",
            "Condition": {
                "StringLike": {
                    "ec2:ResourceTag/Name": "Kasten: Snapshot*"
                }
            }
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:CreateBucket",
                "s3:PutObject",
                "s3:GetObject",
                "s3:PutBucketPolicy",
                "s3:ListBucket",
                "s3:DeleteObject",
                "s3:DeleteBucketPolicy",
                "s3:GetBucketLocation",
                "s3:GetBucketPolicy"
            ],
            "Resource": "*"
        }
    ]
}
EOF

# Create the policy in AWS
aws iam create-policy \
    --policy-name k10-policy \
    --policy-document file://k10-policy.json

```
![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-k10-policy.png)

## Step 3. Attach the Policy to the Role

Finally, attach the created IAM policy `k10-policy` to the IAM role `eks-wp-kasten-role`:

```
# Retrieve the policy ARN
POLICY_ARN=$(aws iam list-policies --query "Policies[?PolicyName=='k10-policy'].Arn" --output text)

# Attach the policy to the role
aws iam attach-role-policy \
    --role-name eks-wp-kasten-role \
    --policy-arn $POLICY_ARN
```

Verify that the role and policy were successfully created and attached:

```
# Verify role creation
aws iam list-roles --query "Roles[?RoleName=='eks-wp-kasten-role']"

# Verify policy attachment
aws iam list-attached-role-policies --role-name eks-wp-kasten-role
```

## Configure Kubernetes
Now that the IAM role and policy are set up, configure Kubernetes to integrate with Veeam Kasten.

## Step 4. Enable IAM OIDC Provider for Your Cluster
Ensure that IAM OIDC provider is enabled for your Amazon EKS cluster. This step is essential for Kubernetes service accounts to securely assume IAM roles.

If you've deployed your EKS cluster through my [Easily Deploy WordPress and MySQL on Amazon EKS](https://www.juliafmorgado.com/posts/easily-deploy-wordpress-mysql-on-amazon-eks/) tutorial, you can skip this step.

Otherwise, paste the following command on your terminal and replace the name of the cluster `eks-wp` with the name of your own cluster:

```
oidc_id=$(aws eks describe-cluster --name eks-wp --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4
eksctl utils associate-iam-oidc-provider --cluster eks-wp --approve
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-oidc.png)

## Step 5. Install Veeam Kasten

First, create the Kubernetes namespace `kasten-io` where Veeam Kasten will be installed: `kubectl create ns kasten-io`

### Generate service account
Then, generate a Kubernetes service account `k10-k10` in the `kasten-io` namespace and associate it with the IAM role we created earlier:

```
eksctl create iamserviceaccount \
 --name k10-k10 \
 --namespace kasten-io \
 --cluster eks-wp \
 --attach-policy-arn arn:aws:iam::625306814630:policy/k10-policy \
 --approve \
 --override-existing-serviceaccounts
```

### Install Veeam Kasten Using Helm
Finally, use Helm to install Veeam Kasten (k10) in the `kasten-io` namespace, specifying the service account `k10-k10`.

```
helm install k10 kasten/k10 -n kasten-io \
    --set serviceAccount.create=false \
    --set serviceAccount.name=k10-k10
```

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-helm-install-k10.png)

You can see the necessary pods running on the `kasten-io` kubernetes namespace.

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-pods-n-kasten-io.png)

## Access Veeam Kasten Dashboard
Once installed, access the Veeam Kasten dashboard to manage backup and recovery operations.

### Port Forwarding
You can use port forwarding to access the Kasten gateway service locally: `kubectl --namespace kasten-io port-forward service/gateway 8080:80`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-port-listening-dashboard.png)

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-veeam-kasten-dashboard.png)

### Install Load Balancer (Optional)
Alternatively, you can install a load balancer to obtain an external IP for the Kasten dashboard: 

```
helm upgrade k10 kasten/k10 --namespace=kasten-io \
     --reuse-values \
     --set externalGateway.create=true \
     --set auth.tokenAuth.enabled=true
```
![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-load-balancer-helm.png)

Retrieve the external IP address: `kubectl get svc gateway-ext -n kasten-io`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-load-balancer.png)

And access the dashboard using the external IP by pasting the following on your browser:  `http://SERVICE_EXTERNAL_IP/k10/#/`

![](https://blog-imgs-23.s3.amazonaws.com/eks-wp-veeam-kasten-dashboard-lb.png)

This completes the installation and setup of Veeam Kasten on your Amazon EKS cluster, enabling robust data management capabilities for your Kubernetes applications.

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
