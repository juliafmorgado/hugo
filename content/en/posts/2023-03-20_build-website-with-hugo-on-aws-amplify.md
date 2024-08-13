---
title: Build a Website with HUGO on AWS Amplify
author: "Julia Furst Morgado"
date: 2023-03-15T17:46:05.964Z
draft: false
cover:
    image: img/hugo-amplify.png
tags: 
    - Tutorial
    - AWS
description: Learn how to build a static site with Hugo and deploy it on AWS Amplify. This is a detailed tutorial to help you start from scratch!
slug: /build-website-hugo-on-aws-amplify



---
A while ago I decided to start publishing post on my own blog and move away from Medium/Hashnode/Dev, so I could have more ownership over my posts. The engagement is great on those platforms, so I plan to cross-post my posts there, but for now I want to show you how to build a static website on [Hugo](https://gohugo.io/) and deploy it on [AWS Amplify](https://aws.amazon.com/amplify/). 

Although Hugo was not the most voted one on Twitter, I chose it because it does exactly what I needed to do, and nothing more. That being said, there is a plethora of other static site generators like Astro, Next.js, Jekyll, Gatsby, Ghost etc.

![Poll twitter](https://blog-imgs-23.s3.amazonaws.com/twitter-hugo.png)

> What is a static site generator?
having a way to store store static content which is just more secure, instead of the web server rendering the web page for every user the static generator renders it once exactly so no need to serve a lot of load on your web server, It allows you to create files in markdown format and using some magic it converts it into HTML. They have an amazing documentation, even a [Quick Start](https://gohugo.io/getting-started/quick-start/) guide.

Ps: I'm using a macOS so if you're using another OS the steps might be slightly different. I recommend checking the documentation on Hugo's website.

### Pre-requisites:
- [Sign up](https://portal.aws.amazon.com/billing/signup?type=enterprise#/start/email) for an AWS Account. There are no upfront charges or any term commitments to create an AWS account and signing up gives you immediate access to the AWS Free Tier.
- Create a GitHub Account or another code repository like GitLab or BitBucket
- Have [Git](https://git-scm.com/downloads) installed on your local machine
- Have HomeBrew installed

## Getting started
### Create a repository on GitHub
Login to GitHub within a web browser and create a new repository creating a repository here because i'm going to be plugging in a hugo to this repo and um setting up a website there, add readme etc

### Clone the repository to your local machine
Clone the repo on your local environment.

`git clone git@github.com:juliafmorgado/hugo.git`

then move to the directory of the repo `cd name-folder`

### Install HUGO
Since I'm using a MacBook I'm going to install hugo to my workstation with Homebrew. If you don't have Homebrew installed I highly recommend it since I use it for everyhting.

`brew install hugo`

### Create directory structure
Create the directory structure for your project in the quickstart directory (you can name it something else):

`hugo new site quickstart`

Then change the current directory to the root of your project:

`cd quickstart`

### Choose a theme
Hugo has many [themes](https://themes.gohugo.io/) that you can choose from to jumpstart your blog. I wanted something simple so I went with the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) one, but you can always change or add extra features.

You can also start a theme from scratch but it's a little harder for your first time.


### Add the theme as a submodule
The reason we added the submodule is because the theme is sitting on a GitHub page and as it updates it's going to update the theme as well.

`git submodule https://github.com/adityatelange/hugo-PaperMod.git`

Most of the Site configuration is handled within config.toml so you have to add the theme to your config:

`echo 'theme = "PaperMod"' >> config.toml`

Great you're website was created, you can even view it by running the site locally on your workstation. starting the server locally:

`hugo server -D` or `hugo server` (-D will show the drafts as well)

Open a web browser and view how the content is rendered by navigating to http://localhost:1313. Press Ctrl + C to stop Hugo’s development server.

Now let's add your first post.

## Create content
To add a new post (or page as they call it) type:

`hugo new posts/build-website-hugo-on-aws-amplify`

Hugo will create the file in the content/posts directory. 

Open the file with your editor and modify the metadata on the header to match your needs:

```
---
title: Build a Website with HUGO on AWS Amplify
author: "Julia Furst Morgado"
date: 2023-03-15T17:46:05.964Z
draft: true
cover:
    image: img/hugo-amplify.png
tags: 
    - Tutorial
    - AWS
categories: 
    - Tech
description: Learn how to build a static site with Hugo and deploy it on AWS Amplify. This is a detailed tutorial to help you start from scratch!
slug: /build-website-hugo-on-aws-amplify
```

To view your site as you make changes, just start the server and go to localhost on your browser. This makes tweaking and testing changes much more convenient. For example, you still need to make some changes to your config.toml, such as update your URL, language, title, etc. You should see these changes reflected immediately.

## Configure GitHub and Commit Code
Push your changes to GitHub by using git.

`git init`

`git add *`
`git commit -m "initial commit to main branch"`
`git push -u origin main`

## Taking over the internet
Now that your site is ready and has some content, you need to move it to the internet. For that you have to host it somewhere, and I've chosen to host it on AWS Amplify.

What will happen is: I'll give it a git repository with my hugo code, aws amplify will take my hugo code, run arbitrary commands and takes the output and post it to the world.

### Publish the site

In this step you will publish your site, but you will not deploy it.

When you publish your site, Hugo creates the entire static site in the public directory in the root of your project. This includes the HTML files, and assets such as images, CSS files, and JavaScript files.

When you publish your site, you typically do not want to include draft, future, or expired content. The command is simple.

`hugo`

### Configure AWS Amplify
Log in to the AWS Management Console and Navigate to AWS Amplify

Go to AWS Amplify console and click get started with hosting.

### Connect to GitHub
Give amplify access to github

On the Install & Authorize AWS Amplify page, Choose Only select repositories, and Select the Repositories that you want to provide AWS Amplify with access too and then Click Install & Authorize.

On the Add repository branch page, Select the Repository of the Blog that we’ve previously committed to and Select the Branch main.

### Configurations

Now on the Configure build settings page (build settings are basically talke my code and do things with it, run a command against it):

```
version: 1
frontend:
  phases:
    # IMPORTANT - Please verify your build commands
    build:
      commands: ['hugo']
  artifacts:
    # IMPORTANT - Please verify your build output directory
    baseDirectory: "/quickstart/public"
    files:
      - '**/*'
  cache:
    paths: []
```

On the Review page, Click Save and deploy.

AWS Amplify will now deploy the Site for the first time to the master environment.

On initial deployment, you will be assigned a URL like https://master.unique-id.amplifyapp.com, but this can and should be changed in the Amplify console. In the main page above your app is a drop-down menu titled “Learn how to get the most our of Amplify Console”. This menu takes you to settings pages to set up custom domain names, free SSL certificates, add password protection, set up test versions of your site, and even enable pull-request reviews. If you already have a hosted zone in AWS Route53, it takes just a few clicks to assign a domain name. SSL takes just a few minutes more. 

### Testing changes on new branch
Before we can continue with any of the additional we need to create a new branch on our repository for staging changes before deploying them to production.

### Password protect your site

## Add a Domain
You can use Route 53 but I already had a domain on Namecheap which I'm moving away from.


***
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
