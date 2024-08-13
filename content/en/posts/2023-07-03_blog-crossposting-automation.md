---
title: "Expand Your Blog's Reach with this AWS Automation Tool"
author: 'Julia Furst Morgado'
date: 2023-07-03T17:46:05.964Z
image: https://blog-imgs-23.s3.amazonaws.com/blog-crossposting-automation.png
tags: 
    - AWS
    - Automation
    - Tutorial
slug: /expand-blog-reach-with-aws-automation-tool




---

Hurrah!! If you're reading this post on Hashnode or Dev.to it means it worked!

![](https://blog-imgs-23.s3.amazonaws.com/blog-crossposting-automation.png)

Now let's start from the beginning (if you want, you can jump to the [tutorial](#tutorial)).

I started my tech journey with [100Devs](https://youtu.be/MhUAKpF47GU), where I used to share coding tips and short tutorials on [Hashnode](https://julia.hashnode.dev/) and [Dev.to](https://dev.to/juliafmorgado). As I gained experience I expanded to [Medium](https://medium.com/@juliafmorgado) as well. However, I soon felt the need to have more control over my publications so I decided also to have my own domain self-host a blog. The goal was to post on my blog but also post on those other platforms. I didn't know how to do it, but I knew I would. At first, I did everything manually by copying and pasting, but it was a hassle and took too much time.  That's when I came across [Allen's](https://twitter.com/allenheltondev) solution—a [serverless app that automatically cross-posts from your blog to Hashnode, Dev and Medium](https://www.readysetcloud.io/blog/allen.helton/how-i-built-a-serverless-automation-to-cross-post-my-blogs/).

In essence, [his solution](https://github.com/aws-community-projects/blog-crossposting-automation) works like an automated assembly line for your blog posts. Once you write a post and commit it to your main branch on GitHub, AWS Amplify verifies the content and if everything checks out, a Lambda function retrieves your post and sets a workflow in motion. This workflow simultaneously transforms and publishes your post across Medium, Hashnode, and Dev.to. 

![](https://blog-imgs-23.s3.amazonaws.com/automation-workflow.png)

Since his solution required the blog to be built with Hugo and hosted on AWS Amplify, those were the platforms I use. I wrote a short blog on [How to Build a Website with Hugo on AWS Amplify](https://www.juliafmorgado.com/posts/build-website-hugo-on-aws-amplify/).

[Matt](https://twitter.com/martzcodes) also had the [brilliant idea](https://matt.martz.codes/improving-a-serverless-app-to-cross-post-blogs) to convert Allen's solution to use AWS CDK (check the code [here](https://github.com/martzcodes/blog-crossposting-automation)). I found it genius and tried implementing it but I am still trying to make it work. Everything is a learning experience. Nothing is wasted time. The good thing is that Matt's solution doesn't require your blog to be built with Hugo or hosted on AWS Amplify.

Before I move on, I want to thank them both for their help. Both of them took their time to check my code over and over and explain me what was wrong. They are incredible people in the AWS community and I recommend everyone check them out (and give them a follow!).

**Some of the challenges I faced:**
- Both Allen and Matt's posts/solutions are more high level and assume you already have an understanding of AWS Lambda at least. Since I didn't have it, I broke my head several times but now I am here to give you that part. The basic part that they forgot to add.
- Secondly, software is always evolving. So while I was implementing Matt's solution, AWS changed something about S3 which made it get an error. Luckily we spotted it and he made the changes on the code base.

**Some things I still need to do:**
- Figure out why the Medium API is not working!! According to their site their [API has been deprecated](https://github.com/Medium/medium-api-docs) so even after reviewing with Allen the whole code, I keep getting an error that my AuthorId is wrong. We believe it's a problem on their side but I still want it to work.
- Get Matt's solution to work. I'm almost there, according to the AWS CloudWatch logs, my "identify-new-content" function is working but I keep getting an error with the Hashnode API.
- Find a way (probably Matt's way) to automate the image hosting. I don't think I want them hosted on GitHub, just on an S3 bucket. But Matt's solution assumes they are hosted on GitHub.
- Import the banner image to the other platforms, so when they are posted on my blog they should also be posted on Hashnode, Medium and Dev.to.
- Set up email notifications for when the crossposting process fails.
- Set up automatic Tweets once a new post is out.

## Tutorial

Now, let's move on to the exciting part. In this blog post, I want to share step by step what I did for Allen's solution (once I get Matt's solution to work I'll write another post). If you have a Hugo site I really urge you to try this solution, and if you don't have a Hugo site, try to make it work for your site! The beauty of open source is that everyone is welcome to try it, modify it, make it better and share it with the world.

And finally, if you get it to work, awesome. Share it with us and write a post about it! And if you don't get it to work don't fret, message us and we will try to help. 

1. [Create or migrate your blog to Hugo and deploy it on AWS Amplify](https://www.juliafmorgado.com/posts/build-website-hugo-on-aws-amplify/). Make sure you have all [the prerequisites](https://github.com/aws-community-projects/blog-crossposting-automation#prerequisites) mentioned in the documentation.

2. Create an [IAM User on IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-started-enable-identity-center.html) with the necessary permissions (you could also create an IAM user or IAM role).

3. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on your machine. This will enable you to interact with AWS services from the command line.

4. Configure the [AWS CLI to authenticate with AWS IAM Identity Center](https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html). If you created an IAM user use [these instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-authentication-user.html), or role use [these instructions](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html).

5. [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html),  which is the command-line tool used for building and deploying serverless applications.

6. Generate API keys for [Hashnode](https://hashnode.com/settings/developer), [Dev.to](https://dev.to/settings/extensions) and [Medium](https://help.medium.com/hc/en-us/articles/213480228-Get-an-integration-token-for-your-writing-app). You'll need these API keys to authenticate and interact with the respective platforms.

7. Clone the [GitHub repo](https://github.com/aws-community-projects/blog-crossposting-automation) containing the blog crossposting automation solution to your local machine using the `git clone` command.

8. Navigate to the project directory using the `cd` command to switch to the cloned repository's directory.

9. Next, you need to initialize an npm project. Run the command npm init and provide the required information about your project. You can press Enter to accept the default values.

10. Deploy the solution by running the following commands in the terminal:
````
sam build --parallel
sam deploy --guided
````
These commands will initiate the deployment process and prompt you with a series of questions. You can press Enter to accept the default values or provide your own answers. The configuration file will be generated at the end of the process.

Once the build process completes successfully, you'll notice a new directory named .aws-sam created in the project's root directory. This directory contains the necessary files for the deployed solution. If the directory doesn't appear in your IDE,you have to enable the visibility of hidden files.

> To create a **GitHubPAT** follow [these instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token).
> 
> The AmplifyProjectID can be found under the app settings of your AWS Amplify blog. It is the last digits on your App ARN: arn:aws:amplify:eu-west-1:xxxxxxxxxx/AMPLIFYPROJECTID
> 
> Your publication ID can be obtained by going to your Blog Dashboard, then copying it from the URL, which will be in this format: wwwhashnode.com/{your publication ID}/dashboard

11. There are some defect environment variables that Allen hasn't changed in the code base yet so we have to change PATH to CONTENT_PATH (in the identify-new-content folder → index.js file - line 40 and 56 AND in the template.yaml file - line 219).

![](https://blog-imgs-23.s3.amazonaws.com/crossposting-envvar.png)

![](https://blog-imgs-23.s3.amazonaws.com/crossposting-var.png)


12. Because Hashnode's API has been updated to support publications, we need to add the following code snippet in the parse-post folder → index.js file – after line 119, to ensure that posts created through our lambda function are properly associated with the appropriate publication on Hashnode. 
```
isPartOfPublication: {
          publicationId: process.env.HASHNODE_PUBLICATION_ID
        },
```

The publicationId key in the isPartOfPublication field specifies the ID of the publication to which the post belongs. By including this field in the request payload, we are telling the Hashnode API that the post should be added to the specified publication.

![](https://blog-imgs-23.s3.amazonaws.com/crossposting-publication.png)


13. Run `sam build` and `sam deploy` again. Anytime you make a change you have to run these commands!

14. Voilá! Now you should test to see if it works. Your blog post must have a **specific set of metadata** in order to work. And in the commit message of the blog post you **must have "[blog]" at the beginning of the message**. So for example: `git commit -m '[blog] new blog post about crossposting automation with Lambda functions'.
````
---
title: My first blog!
description: This is the subtitle that is used for SEO and visible in Medium and Hashnode posts.
image: https://link-to-hero-image.png
image_attribution: Any attribution required for hero image
categories:
  - categoryOne
tags:
  - serverless
  - other tag
slug: /my-first-blog
---
````

## Final notes
As I mentioned at the beginning, the email notification on the status of the cross-posting didn't work for me nor did the crossposting to Medium. Allen and I went through every single line of code, the step functions, and CloudWatch logs and I keep getting the same error – that my userId is invalid.


I hope this post was helpful! I wish you the best in your blogging journey and would love for you to share your journey of automating the blog crossposting workflow.


***
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!


