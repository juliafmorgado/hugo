---
title: "Deploy Your First Web App on AWS with AWS Amplify, Lambda, DynamoDB and API Gateway"
author: "Julia Furst Morgado"
date: 2024-03-01T06:46:05.964Z
draft: false
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/deploy-web-app-aws.png
tags: 
    - AWS
    - Tutorial

slug: /deploy-your-first-web-app-on-aws-amplify-lambda-dynamodb-api-gateway
---

Hey there!

If you've decided to learn more about AWS, then you've landed on the right blog post!

This guide is designed for beginners or developers with some cloud experience who want to learn the fundamentals of building web applications on the AWS cloud platform. We'll walk you through deploying a basic contact management system, introducing you to key AWS services along the way.

In this project, as you can guess from the title, we will use AWS, which stands for Amazon Web Services; an excellent cloud platform with endless services for so many various use cases from training machine learning models to hosting websites and applications.

>Cloud computing provides on-demand access to computing resources like servers, storage, and databases. 
> Serverless functions are a type of cloud computing service that allows you to run code without managing servers.

By the end of this tutorial, you'll be able to:

- Deploy a static website to AWS Amplify.
- Create a serverless function using AWS Lambda.
- Build a REST API with API Gateway.
- Store data in a NoSQL database using DynamoDB.
- Manage permissions with IAM policies.
Integrate your frontend code with the backend services.

I recommend you follow the tutorial one time and then try it by yourself the second time. And before we begin, ensure you have an AWS account. Sign up for a free tier account if you haven't already.

Now let's get started!

## Step 1: Deploy the frontend code on AWS Amplify

In this step, we will learn how to deploy static resources for our web application using the AWS Amplify console. 

Basic web development knowledge will be helpful for this part. We will create our HTML file with the CSS (style) and Javascript code (functionality) embedded in it. I have left comments throughout to explain what each part does. 

Here is the code snippet of the page:

{{< gist juliafmorgado 30d1c59739a8405b86cc107c17d78b05 >}}

There are multiple ways to upload our code into Amplify console. For example, I like using Git and Github. To keep this article simple, I will show you how to do it directly by drag and drop method into Amplify. To do this — we have to compress our HTML file.

![](https://blog-imgs-23.s3.amazonaws.com/compress-index.png)

Now, make sure you're in the closest region to where you live, You can see the region name at the top right of the page, right next to the account name. Then let’s go to the AWS Amplify console. It will look something like this:

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-main-page.png)

When we click “Get Started,” it will take us to the following screen (we will go with Amplify Hosting on this screen):

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-host-web-app.png)


![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-deploy-wo-git.png)

You will start a manual deployment. Give your app a name, I'll call it "Contact Management System", and ignore the environment name. Then, drop the compressed index file and click Save and Deploy.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-manual-deployment.png)

Amplify will deploy the code, and return a domain URL where we can access the website.

![](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-domain-web-app.png)

Click on the link and you should see this:

![Website domain live by aws Amplify](https://blog-imgs-23.s3.amazonaws.com/aws-amplify-clicked-web-app.png)

## Step 2: Create an AWS Lambda Serverless function

We will create a serverless function using the AWS Lambda service in this step. A Lambda function is a serverless function that executes code in response to events. You don't need to manage servers or worry about scaling, making it a cost-effective solution for simple tasks. To give you some idea, a great example of Serverless computing in real life is vending machines. They send the request to the cloud and process the job only somebody starts using the machine.

Let’s go to the Lambda service inside the AWS console. By the way, make sure you are creating the function in the same region in which you deployed the web application code in Amplify. 

Time to create a function. Give it a name, I'll call it "my-web-app-function", and for runtime programming language parameters: I’ve chosen Python 3.12, but feel free to choose a language and version that you are more comfortable and familiar with.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function.png)

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-create-function-step.png)

After our lambda function is created, scroll down and you will see the following screen:

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-new-function.png)

Now, let’s edit the lambda function. Here is a function that extracts first and last names from the event JSON input. And then returns a context dictionary. The body key stores the JSON, which is a greeting string.

{{< gist juliafmorgado 7e1275b8b00d1dd70c62db47efeec418 >}}

After editing, click Deploy to save my-web-app-function, and then click Test to create an event.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-deploy-test.png)

To configure a test event, give the event a name like "MyEventTest", modify the Event JSON attributes and save it.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-event.png)

Now click on the big blue test button so we can test the Lambda function.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-test-succeeded.png)

The execution result has the following elements:

- Test Event Name
- Response
- Function Logs
- Request ID

## Step 3: Create Rest API with API Gateway

Now let's go ahead and deploy our Lambda function to the Web Application. We will use Amazon API Gateway to create a REST API that will let us make requests from the web browser. API Gateway acts as a bridge between your backend services (like Lambda functions) and your frontend application. It allows you to create APIs that expose functionality to your web app.

> REST: Representational State Transfer. 

> API: Application Programming Interface.

Go to the Amazon API Gateway to create a new REST API.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-rest-api.png)

At the API creation page, we have to give it a name for example "Web App API", and choose a protocol type and endpoint type for the REST API (select Edge-optimized). 

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-api-creation.png)

Now we have to create a POST method so click on Create method.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-create-method.png)

In the Create method page, select the method type as POST, the integration type should be Lambda function, ensure the Region is the same Region you’ve used to create the lambda function and select the Lambda function we just created. Finish by clicking on Create method at the bottom of the page.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-method-type-post.png)

Now we need to enable CORS, so select the / and then click enable CORS

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-path-cors.png)

In the CORS settings, just tick the POST box and leave everything else as default, then click save.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-cors-settings.png)

After enabling CORS headers, click on the orange Deploy API button. 

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-deploy-api2.png)

A window will pop up, under stage select new stage and give the stage a name, for example "web-app-stage", then click deploy.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-new-stage2.png)

When you view the stage, there will be a URL named Invoke URL. Make sure to copy that URL; we will use it to invoke our lambda function in the final step of this project.

![](https://blog-imgs-23.s3.amazonaws.com/api-gateway-invoke-url.png)

## Step 4: Create a DynamoDB table

In this step, we will create a data table in Amazon DynamoDB, another AWS service. DynamoDB is a NoSQL database service that stores data in key-value pairs. It's highly scalable and flexible, making it suitable for various applications. Click on the orange create table button.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-create-table.png)

Now we have to fill out some information about our data table, like the name "contact-management-system-table", and the partition key is ID. The rest leave as default. Click Create table.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-settings.png)

Once the table is successfully created, click on it and a new window with the details of the table will open up. Expand the Additional info and copy the Amazon Resource Name (ARN). We will use the ARN in the next step when creating IAM access policies.

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-table-arn.png)

## Step 5: Set up IAM Policies and Permissions

AWS IAM is one of the most basic and important things to be set up, yet a lot of people neglect it. For improved security, it's always recommended a least-privilege access model, which means not giving a user more than needed access. For example, even for this simple web application project, we have already worked on multiple AWS services: Amplify, Lambda, DynamoDB, and API Gateway. It’s essential to understand how they communicate with each other and what kind of information they share. 

Now back to our project, we have to define an IAM policy to give access to our lambda function to write/update the data in the DynamoDB table. 

So go back to the AWS Lambda console, and click on the lambda function we just created. Then go to the configuration tab, and on the left menu click on Permissions. Under Execution role, you will see a Role name.

![](https://blog-imgs-23.s3.amazonaws.com/aws-lambda-permissions.png)

Click on the link, which will take us to the permissions configuration settings of this IAM role. Now click on Add permissions, then create an inline policy.

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-permissions.png)

Then click on JSON, delete what's on the Policy editor and paste the following. 

```
{
"Version": "2012-10-17",
"Statement": [
    {
        "Sid": "VisualEditor0",
        "Effect": "Allow",
        "Action": [
            "dynamodb:PutItem",
            "dynamodb:DeleteItem",
            "dynamodb:GetItem",
            "dynamodb:Scan",
            "dynamodb:Query",
            "dynamodb:UpdateItem"
        ],
        "Resource": "YOUR-DB-TABLE-ARN"
    }
    ]
}
```

Make sure to substitute the "YOUR-DB-TABLE-ARN" with your real DynamoDB table ARN. Click Next, give the policy a name, like "lambda-dynamodb", and then click Create policy. This policy will allow our Lambda function to read, edit, delete, and update items from the DynamoDB data table. 

![](https://blog-imgs-23.s3.amazonaws.com/iam-role-json-permissions.png)

Now close this window, and back to the Lambda function, go to the Code tab and we will update the lambda function python code with the following.

{{< gist juliafmorgado 8eb027cb9502b88d91d2710fbe99b347 >}}

The response is in REST API format. After making the changes, make sure to deploy the code. After the deployment is concluded, we can Test the program by clicking on the blue test button.

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-new.png)

![](https://blog-imgs-23.s3.amazonaws.com/lambda-test-succeeded.png)

We can also check the results on the DynamoDB table. When we run the function it updates the data on our table. So go to AWS DynamoDB, click on explore items in the left nav bar, click on your table. Here is the object returned from the lambda function:

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-explore-items.png)

## Step 6: Update frontend code with Rest API

Congrats on making it this far! 

In this final step, we will see everything we just built in action. We will update the front-end to be able to invoke the REST API with the help of our lambda function and receive data.

First, go back to your index.html on your code editor. See on line 68 you had "API_KEY"? Go ahead and swap that with the invoke URL you copied from the API Gateway service under your REST API details. Once you've done that, save and compress the file again, like we did in step 1, and upload it again to AWS using the console.

![](https://blog-imgs-23.s3.amazonaws.com/index-code-vscode.png)

Click on the new link you got and let's test it.

![](https://blog-imgs-23.s3.amazonaws.com/web-app-test.png)

Our data tables receive the post request with the entered data. The lambda function invokes the API when the “Call API” button is clicked. Then using javascript, we send the data in JSON format to the API. You can find the steps under the callAPI function.

You can find the items returned to my data table below:

![](https://blog-imgs-23.s3.amazonaws.com/dynamodb-final-result.png)

## Conclusion

Congrats! You have created a simple web application using the AWS cloud platform. Cloud computing is snowballing and becoming more and more part of developing new software and technologies.

If you feel up for a challenge, next you could:

- Enhance the frontend design
- Add user authentication and authorization
- Set up monitoring and analytics dashboards
- Implement CI/CD pipelines to automate the build, test, and deployment processes of your web application using services like AWS CodePipeline, AWS CodeBuild, and AWS CodeDeploy.

Working on hands-on programming projects is the best way to sharpen your skills.

I'll be covering some other scenarios on AWS in my next blog posts, so keep an eye out!

And again, feel free to give me feedback, and if I’m off track, don’t hesitate to let me know. We’re all in this together, learning and growing as a community!

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
