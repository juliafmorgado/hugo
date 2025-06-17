---
title: "Running Kubernetes on AWS Just Got Easier with EKS Auto Mode and Karpenter"
author: "Julia Furst Morgado"
date: 2025-06-06T00:20:56.762Z
cover:
tags: ["AWS", "Kubernetes"]

---

# Running Kubernetes on AWS Just Got Easier with EKS Auto Mode and Karpenter

If you’ve ever worked with Kubernetes in production, you already know: **it’s powerful, but it can also be painful**. We love the control it gives us, but that control comes with complexity. Infrastructure setup. Autoscaling policies. Node group management. Networking. Security patching. Cost optimization. All that overhead gets in the way of what we really want to do — **run applications reliably and efficiently**.

That’s why I gave a talk at AWS Midwest Community Day called *“The Lazy Guide to Kubernetes”*. Not because we’re lazy, but because we’re practical. We want to work smarter, not harder. We want to build great software — not spend hours fine-tuning EC2 node groups or debugging IAM roles just to get a pod scheduled.

So in this post, I’m going to go deeper than I could in the talk and explain the concepts behind **EKS Auto Mode** and **Karpenter**, the problems they solve, how they work, and when you should use them.

---

## The Challenges We Face with Kubernetes on AWS

Running Kubernetes on AWS has traditionally meant managing a lot of infrastructure (even with a managed control plane like EKS). You’d typically use **Managed Node Groups** or **Auto Scaling Groups (ASGs)** to run your workloads. And while those are fine, they come with problems:

- **Overprovisioning**: You scale up “just in case,” and end up with idle nodes and higher bills.
- **Slow autoscaling**: The Cluster Autoscaler (CA) only works with ASGs and reacts slowly to pending pods.
- **Rigid capacity planning**: You define instance types, zones, and sizes ahead of time. Not flexible.
- **Operational overhead**: You manage node group versions, patch nodes, rotate AMIs, and write scaling policies.
- **Fragility**: One misconfigured label or wrong IAM role, and pods stay pending with no obvious reason why.

In short: we spend too much time on infrastructure, and not enough time delivering value.

---

## Enter: EKS Auto Mode

**Amazon EKS Auto Mode**, launched in late 2024 at [re:Invent](https://www.youtube.com/watch?v=a_aDPo9oTMo), is a new way to run Kubernetes clusters without managing worker nodes or worrying about capacity. It’s AWS’s answer to “Kubernetes for teams who don’t want to become EC2 experts.”

Auto Mode runs your pods on managed compute pools provisioned behind the scenes, powered by **Bottlerocket** (AWS’s container-optimized OS) and designed for zero-touch security and performance.

### Here’s what it gives you:

- **No node groups**: You don’t create or manage ASGs or EC2 instances.
- **Fast provisioning**: Pods get scheduled quickly onto elastic, optimized infrastructure.
- **Zero patching**: Nodes rotate every 21 days with the latest updates.
- **Secure by default**: Only ECR access by default, IAM roles per pod, immutable AMIs.
- **Sane defaults**: General-purpose node pools and optional custom node pools.

### Under the hood

Auto Mode creates managed EC2-based compute pools that are completely abstracted from the user. You don’t see the nodes, but they're still there. AWS takes care of:

- Choosing instance types and AZs
- Launching and rotating nodes
- Enforcing lifecycle policies (like auto-recycling)
- Injecting minimal runtime agents
- Enabling observability via CloudWatch and IMDS

It supports a **limited but practical feature set**: you can use DaemonSets, custom node pools, tolerations, and basic scheduling rules — but no custom AMIs or GPUs (yet).

### When Auto Mode makes sense

If your team doesn’t want to manage infrastructure — or you’re building a dev/test cluster, running internal apps, or just want to go fast — Auto Mode is brilliant. You don’t need a platform team. You don’t need Terraform. You just deploy your app and go.

---

## Karpenter: Smarter, Flexible Autoscaling

Karpenter is an open-source autoscaler built by AWS that dynamically launches EC2 nodes in response to your pods’ needs — with **zero pre-configured ASGs**. It watches the Kubernetes scheduler and provisions exactly the right capacity: right size, right zone, right price, in real-time.

### What makes Karpenter special?

- **No ASGs**: Karpenter works directly with the EC2 API, launching instances instantly.
- **Instance type flexibility**: You don’t have to pick a list — Karpenter can choose from the entire EC2 fleet.
- **Spot-aware**: It can prioritize Spot instances when available, saving you serious money.
- **Binpacking**: It tries to fit workloads tightly on nodes to reduce waste.
- **Workload consolidation**: It can actively terminate underutilized nodes and shift workloads.

### How it works

Karpenter installs as a controller in your EKS cluster. You define:

- A `Provisioner`: this sets high-level rules (e.g. "use Spot if possible", "allow x86 and ARM", "AZ=a, b, c")
- Optionally, a `NodePool` and `NodeClass` (for more advanced usage)
- Pod-level scheduling requirements (requests, limits, tolerations, taints, etc.)

Then, whenever a pod is unschedulable (i.e., it needs a node), Karpenter springs into action:

1. It queries the EC2 API for available capacity that fits the workload.
2. It provisions the most efficient instance type (e.g., `c6a.large` Spot).
3. It bootstraps the node and joins it to the cluster.
4. When no longer needed, it drains and terminates the node.

All within seconds so much faster than the Cluster Autoscaler.

---

## EKS Auto Mode vs Self Managed Karpenter

| Feature                        | EKS Auto Mode                              | Self Managed Karpenter                                  |
|-------------------------------|--------------------------------------------|--------------------------------------------|
| Infra to manage?              | None (fully managed)                       | Some (you configure Provisioners)          |
| Backing compute               | Bottlerocket on Fargate-like pools         | EC2 (Spot or On-Demand)                    |
| Cost model                    | Pay-per-pod (per second)                   | Pay-per-instance (cheaper with Spot)       |
| Start time                    | Very fast                                  | Near-instant EC2 launches                  |
| Custom AMIs/Agents            | ❌ Not supported                            | ✅ Fully supported                          |
| GPUs, Arm, advanced options   | ❌ Not yet                                  | ✅ Yes                                      |
| Ideal for                     | Simplicity, dev/test, fast onboarding      | Flexibility, production, big scale         |

---

## Why This Matters

As engineers, we’re constantly balancing flexibility, performance, and simplicity. Kubernetes gives us flexibility — but often at the cost of simplicity. EKS Auto Mode and Karpenter shift that balance.

They’re not silver bullets. But they **remove the undifferentiated heavy lifting**. They free us from managing things we don’t need to manage anymore — and let us focus on what really matters: **shipping value**.

In my experience, the best tools are the ones that *fade into the background*. EKS Auto Mode and Karpenter aren’t just tools; they’re signs that the Kubernetes experience on AWS is finally evolving to match how we want to work today.

---

## Resources to Get Started

- [EKS Auto Mode docs](https://docs.aws.amazon.com/eks/latest/userguide/auto-mode.html)
- [Karpenter project](https://karpenter.sh)
- [EKS Auto Mode Workshop](https://catalog.workshops.aws/eks-auto-mode/en-US)
- [AWS Containers Blog – EKS Auto Mode Overview](https://aws.amazon.com/blogs/containers/amazon-eks-auto-mode/)
- [GitHub – Karpenter examples](https://github.com/aws/karpenter)


---

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
