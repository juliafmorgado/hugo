---
title: "Building Multi-Architecture Images with a Docker Driver"
author: 'Julia Furst Morgado'
date: 2024-08-12T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/x.png
toc: true
tags: 
    - Docker
    - DevOps

slug: /building-multi-architecture-images-docker-builder
---

As we were working on getting our app up and running with Kubernetes on [Challenge 4](https://www.juliafmorgado.com/posts/challenge-4-getting-your-app-to-kubernetes-with-kind/#step-4-push-docker-images-to-a-registry), we built a Docker image, but it was only for ARM architecture. In this blog post, I’ll walk you through how to build a multi-architecture Docker image. This means creating a single Docker image that works across different platforms, such as x86_64 (common in desktops and servers) and ARM64 (found in many mobile devices and newer laptops).

## Why Build Multi-Architecture Images?

Building multi-architecture images is crucial for ensuring that your Docker containers can run on various hardware setups. This approach is particularly useful when you want to:

- **Support Different Hardware:** Run your applications on diverse hardware platforms without needing separate images.
- **Improve Compatibility:** Ensure your Docker images are accessible and functional across a broader range of environments.
- **Simplify Deployment:** Manage a single image instead of multiple versions for different architectures.

## Prerequisites

Before diving into building multi-architecture images, ensure you have the following:

1. **Docker Desktop:** Make sure Docker Desktop is open and running.
2. **Docker Buildx:** Verify that Docker Buildx is installed. You can check this by running: `docker buildx version`
   
If you see a version number, Buildx is installed and ready to use.

## Building the Multi-Architecture Image

To build a multi-architecture Docker image, you need to use Docker Buildx, which extends Docker’s build capabilities.

Use the `--platform` flag to specify which architectures you want to support. For example, to build an image for both `linux/amd64` (common for desktops and servers) and `linux/arm64` (used in ARM-based systems), use the following command:

```
docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/yourimage:tag .
```

In this command, `--platform` specifies the target platforms, `-t yourusername/yourimage:tag` tags the image with a name and tag (you should replace `yourusername` with your Docker Hub username), and `.` refers to the build context, usually the current directory.


## Handling Error About Docker Driver
You might encounter an error indicating that the Docker driver you're using does not support multi-platform builds. This is a common issue with the default Docker driver on certain systems.

![](https://blog-imgs-23.s3.amazonaws.com/docker-multi-arch-error.png)

To resolve this, you need to switch to a different Docker Buildx driver that supports multi-platform builds. The most commonly used driver for this purpose is the `docker-container` driver. Let's see how to do it.

### Fixing Docker Settings
If you're using Docker Desktop, ensure that experimental features are enabled in the Settings section. Set the variable to true, save the settings, apply the changes, and restart Docker.

![](https://blog-imgs-23.s3.amazonaws.com/docker-experimental-feat.png)

### Create a New Buildx Builder with the docker-container Driver
Create a new Buildx builder instance named `mybuilder` and set it as the current active builder: `docker buildx create --name mybuilder --use`

### Inspect the New Builder
Check if the new builder is using the `docker-container` driver and has the necessary platforms enabled: `docker buildx inspect mybuilder --bootstrap`

## Retry the Build Command
With the new builder active, retry your multi-platform build command:

```
docker buildx build --platform linux/amd64,linux/arm64 -t juliafmorgado/challenge-4-app:latest .
```

## Push the Image (if needed)
If you need to push the image to a Docker registry (e.g., Docker Hub), use the --push flag:

```
docker buildx build --platform linux/amd64,linux/arm64 -t yourusername/yourimage:tag --push .
```

![](https://blog-imgs-23.s3.amazonaws.com/docker-multi-arch-app.png)

You can check the image here: [Docker Hub Repository](https://hub.docker.com/repository/docker/juliafmorgado/challenge-4-app/general)

## Cleanup
If you no longer need the builder, you can remove it with: `docker buildx rm mybuilder`

![](https://blog-imgs-23.s3.amazonaws.com/docker-builder-mybuilder.png)

## Conclusion
Building multi-architecture Docker images helps ensure your applications can run seamlessly across various platforms. By using Docker Buildx and the --platform flag, you can create versatile and compatible Docker images. If you encounter any issues, remember to check your Docker settings and switch to the appropriate Buildx driver.

Happy Dockerizing!

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
