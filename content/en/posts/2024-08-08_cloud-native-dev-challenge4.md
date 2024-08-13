---
title: "Challenge 4 - Getting Your App to Kubernetes with KinD"
author: 'Julia Furst Morgado'
date: 2024-08-08T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/cloud-native-dev-challenge.png
toc: true
tags: 
    - Kubernetes
slug: /challenge-4-getting-your-app-to-kubernetes-with-kind
---

Welcome to the [challenge 4](https://github.com/juliafmorgado/cloudnative-dev/tree/main/challenge-4) in our series! In this challenge, we’re taking the leap from running our applications locally to deploying them in a Kubernetes cluster. For this blog, I'll use a local cluster with KinD (Kubernetes in Docker) and will guide you through the deployment process and help you ensure everything is up and running smoothly.

Check the Challenge 4 [instructions](https://github.com/salaboy/cloud-native-dev/tree/main/4) from Salaboy.


## Step 1: Copy the Files
First things first, let’s set up our working directory for this challenge.

**1. Create a New Directory:**

Open your terminal or command prompt and run the following command to create a new directory for Challenge 4:
`mkdir challenge-4`

**2. Copy Files**
 
We need to copy the files from Challenge 3 to our new directory. You can copy them using:
`cp -r challenge-3/* challenge-4/`

> You can delete the `init.sql` and `docker-compose.yml` files since we won't need them anymore. Here's why:
> `docker-compose.yml`: This file is typically used for defining and running multi-container Docker applications on our local machine. It’s great for local development and testing with Docker Compose. However, since we're deploying our applications using Kubernetes and KinD (Kubernetes in Docker) now, Kubernetes manages the configuration and orchestration of your containers. Therefore, you don’t need the Docker Compose file in this setup.
> `init.sql`: This SQL script is used to initialize our database schema. But in our following Kubernetes setup, we will handle database initialization with a Kubernetes ConfigMap. This ConfigMap is used by the PostgreSQL container to set up the database schema when the container starts. So, the `init.sql` file is no longer needed in your project directory because its contents are managed directly through Kubernetes.


## Step 2: Set Up Your Kubernetes Cluster
> Before anything, ensure that the Docker Daemon is running on your machine. You can do this by opening Docker Desktop on your machine.

For this tutorial, we'll be using KinD (Kubernetes in Docker), and you can follow the setup instructions from my [previous blog post](https://www.juliafmorgado.com/posts/deploying-wordpress-mysql-on-kubernetes-with-kind/) to create a local multi-node Kubernetes cluster.

![](https://blog-imgs-23.s3.amazonaws.com/ch4-kind-cluster.png)

> If you’re working with a remote cluster, make sure you have access and the necessary permissions to deploy your applications.

## Step 3: Build Your Docker Images
Next, we need to build Docker images for our `app` and `dashboard`. Docker images are like snapshots of our applications, which we’ll deploy to the cluster.

> **Recommended:** If you want to build and push multi-architecture images follow these [quick steps](https://www.juliafmorgado.com/posts/building-multi-architecture-images-docker-builder/).

Go to the `app` directory and build the Docker image:
```
cd challenge-4/app
docker build -t dockerhub-username/challenge-4-app .
```

Repeat this for the `dashboard` directory:
```
cd ../dashboard
docker build -t dockerhub-username/challenge-4-dashboard .
```

Remember to replace `dockerhub-username` with your Docker Hub username.

> Since we didn't specify a tag, the `latest` tag will be applied by default.

## Step 4: Push Docker Images to a Registry
If you want to share your Docker images with others or need a centralized repository, you can push them to a registry, such as [Docker Hub](https://hub.docker.com/) or [Amazon ECR](https://aws.amazon.com/ecr/). We'll push our images to Docker Hub.

**1. Log In to Docker Hub**
`docker login`

**2. Push the Images**
```
docker push dockerhub-username/challenge-4-app:latest
docker push dockerhub-username/challenge-4-dashboard:latest
```

![](https://blog-imgs-23.s3.amazonaws.com/ch4-docker-push.png)

You can check the App Docker Image [here](https://hub.docker.com/repository/docker/juliafmorgado/challenge-4-app/general), and the Dashboard Docker Image [here](https://hub.docker.com/repository/docker/juliafmorgado/challenge-4-dashboard/general).

## Step 5: Load Docker Images into KinD
If you have pushed your images to Docker Hub or another registry, you can pull them directly into your Kind cluster. 
```
kind load docker-image dockerhub-username/challenge-4-app:latest
kind load docker-image dockerhub-username/challenge-4-dashboard:latest
```

![](https://blog-imgs-23.s3.amazonaws.com/ch4-kind-load.png)

## Step 6: Set Up Kubernetes Deployment and Service YAML Files
Kubernetes uses configuration files, written in YAML, to manage our applications’ deployments and services. These YAML files define how your applications should run and how they should be exposed.

### Create a `k8s` Directory
Make sure you’re in the `challenge-4` directory and create a new directory for your Kubernetes configuration files:
```
mkdir k8s
cd k8s
```

![](https://blog-imgs-23.s3.amazonaws.com/ch4-k8s-dir.png)

### App Manifests
Let's create the Deployment and Service files for the app. Remember to replace `dockerhub-username` with your Docker Hub username.

**1. App Deployment File**
Create a file named `app-deployment.yaml` inside the `k8s` directory. This file defines how to deploy your app:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: app
  template:
    metadata:
      labels:
        app: app
    spec:
      containers:
      - name: app
        image: dockerhub-username/challenge-4-app:latest
        env:
        - name: DATABASE_URL
          value: postgres://postgres:password@postgres:5432/challenge4
        ports:
        - containerPort: 3000
```

**2. App Service File**
Create a file named `app-service.yaml` in the `k8s` directory. This file defines how to expose your app so it can be accessed from outside the cluster:
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
      nodePort: 30000
  type: NodePort
```

### Dashboard Manifests
Let's create the Deployment and Service files for the dashboard. Remember to replace `dockerhub-username` with your Docker Hub username.

**1. Dashboard Deployment File**

Create a `dashboard-deployment.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dashboard
spec:
  replicas: 1
  selector:
    matchLabels:
      app: dashboard
  template:
    metadata:
      labels:
        app: dashboard
    spec:
      containers:
      - name: dashboard
        image: dockerhub-username/challenge-4-dashboard:latest
        env:
        - name: DATABASE_URL
          value: postgres://postgres:password@postgres:5432/challenge4
        ports:
        - containerPort: 3001
```

**2. Dashboard Service File**

Create a `dashboard-service.yaml`:

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
      nodePort: 30001
  type: NodePort
```

### Database Manifests
Let's create the Deployment, ConfigMap and Service files for the PostgreSQL database.

**1. Database Deployment and ConfigMap File**

Create a `db-deployment.yaml`:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        - name: POSTGRES_DB
          value: challenge4
        - name: POSTGRES_USER
          value: postgres
        - name: POSTGRES_PASSWORD
          value: password
        ports:
        - containerPort: 5432
        volumeMounts:
        - name: init-sql
          mountPath: /docker-entrypoint-initdb.d
      volumes:
      - name: init-sql
        configMap:
          name: init-sql-configmap
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: init-sql-configmap
data:
  init.sql: |
    -- init.sql
    CREATE TABLE IF NOT EXISTS texts (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
```

In the `Deployment` configuration for PostgreSQL, we’ve included a `ConfigMap` to manage the database initialization. While we could have used a separate file for this, embedding the `ConfigMap` directly in the `Deployment` simplifies the setup.

The `ConfigMap` holds the SQL commands from `init.sql`, which is used to initialize our PostgreSQL database schema. By mounting this `ConfigMap` to `/docker-entrypoint-initdb.d`, PostgreSQL automatically executes these SQL scripts when it starts up.

Using a `ConfigMap` is a standard practice in Kubernetes for managing configuration data, such as initialization scripts. It allows us to easily inject and manage configuration within our containers, ensuring that our database is properly set up each time it starts.

**2. Database Service File**
Create a `db-service.yaml`:

```
apiVersion: v1
kind: Service
metadata:
  name: db
spec:
  ports:
    - port: 5432
      targetPort: 5432
  selector:
    app: postgres
  type: ClusterIP
```

## Step 7: Deploy the Manifests
Apply the YAML files to your Kubernetes cluster:
`kubectl apply -f k8s/`

![](https://blog-imgs-23.s3.amazonaws.com/ch4-applyk8s.png)

To check the status of our deployments and services:
```
kubectl get pods
kubectl get services
```

![](https://blog-imgs-23.s3.amazonaws.com/ch4-verify-deployments.png)

## Step 8: Access the Apps
To access them locally, use port forwarding:
```
kubectl port-forward svc/app 3000:80
kubectl port-forward svc/dashboard 3001:80
```
This will make the services available on `http://localhost:3000` for the `app` and `http://localhost:3001` for the `dashboard`. To exit just press `^C`.

![](https://blog-imgs-23.s3.amazonaws.com/ch4-port-forwarding.png)

> Yes, when using Kind, port forwarding with `localhost` is a common method for accessing services because Kind runs in a local environment and doesn’t provide external IPs by default. You could also use an ingress controller but I'll leave this for another blog post.

## Verify the Database
If you need to verify the database to ensure that the PostgreSQL instance is correctly set up and functioning as expected run:
`kubectl exec -it <postgres-pod-name> -- psql -U postgres -d challenge4`

Then inside the `psql` shell:
```
-- List all databases
\l

-- Connect to the challenge4 database
\c challenge4

-- List all tables
\dt

-- Describe a specific table
\d your_table_name

-- View data in a specific table
SELECT * FROM your_table_name;
```

## Step 9: Clean Up
To delete files: `kubectl delete -f k8s`

To delete the Kind cluster: `kind delete cluster`

![](https://blog-imgs-23.s3.amazonaws.com/ch4-cleanup.png)

## Conclusion
Awesome! We’ve successfully taken our application from running locally to deploying it on a Kubernetes cluster. We’ve navigated through setting up our environment, building and pushing Docker images, and configuring Kubernetes deployments.

With these steps, you’re now better equipped to handle cloud-native deployments and have made significant progress on your journey to mastering Kubernetes.

Keep an eye out for upcoming challenges and continue exploring the world of cloud-native development. Happy coding!


***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
