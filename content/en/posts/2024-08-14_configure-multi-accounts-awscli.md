---
title: "Set Up Multiple AWS Accounts with AWS CLI"
author: 'Julia Furst Morgado'
date: 2024-08-14T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/x.png
toc: true
tags: 
    - AWS
    - Tutorial

slug: /set-up-multiple-aws-accounts-aws-cli
---

Managing multiple AWS accounts can be essential for various reasons, like separating personal projects from work-related tasks. In this guide, we'll show you how to set up multiple AWS accounts in the AWS Command Line Interface (CLI) and switch between them easily.

## Setting Up Multiple AWS Accounts

To work with multiple AWS accounts using the AWS CLI, you need to set up named profiles for each account. Each profile contains the credentials and configuration details for a specific AWS account. Here’s how to do it:

## Step 1: Configure AWS CLI Profiles

You need to create separate profiles for each AWS account. These profiles will store the credentials and configuration for each account. You can do this in your terminal or command prompt using the `aws configure` command. 

1. First set up a profile for your personal AWS account:

   `aws configure --profile personal`

You will be prompted to enter the following information:

- AWS Access Key ID: Enter your personal AWS access key.
- AWS Secret Access Key: Enter your personal AWS secret key.
- Default region name: Enter your preferred AWS region (e.g., us-east-1).
- Default output format: Choose the output format (e.g., json).

2. Then set up your professional for your company's AWS account:
   
   `aws configure --profile company`

Similarly, provide the access key, secret key, region, and output format for your company's AWS account.

## Step 2: Review Your AWS Profile Configuration
To confirm that your profiles are correctly configured, you can manually check the AWS configuration files located in:

- Linux/MacOS: `~/.aws/credentials` and `~/.aws/config`
- Windows: `C:\Users\YourUsername\.aws\credentials` and `C:\Users\YourUsername\.aws\config`
  
The `credentials` file should look something like this:
```
[default]
aws_access_key_id = YOUR_DEFAULT_ACCESS_KEY_ID
aws_secret_access_key = YOUR_DEFAULT_SECRET_ACCESS_KEY

[personal]
aws_access_key_id = YOUR_PERSONAL_ACCESS_KEY_ID
aws_secret_access_key = YOUR_PERSONAL_SECRET_ACCESS_KEY

[work]
aws_access_key_id = YOUR_WORK_ACCESS_KEY_ID
aws_secret_access_key = YOUR_WORK_SECRET_ACCESS_KEY
```

And the `config` file should be structured as follows:
```
[default]
region = us-east-1
output = json

[profile personal]
region = us-east-1
output = json

[profile work]
region = us-west-2
output = json
```



## Step 3: Use Environment Variables to Switch Profiles
Instead of specifying the profile with every command, you can set an environment variable to specify which AWS profile you want to use for your AWS CLI commands. This way, you only need to set the profile once per session, and all subsequent commands will use that profile until you change it.

### Set the environment variable (Unix/Linux/macOS):

The command below sets the AWS_PROFILE environment variable to personal, so all AWS CLI commands will use the personal profile.

`export AWS_PROFILE=personal`

When you need to switch to another profile, update the environment variable: `export AWS_PROFILE=company`

### Check which profile is active:

To see which profile is currently being used: `echo $AWS_PROFILE`

To confirm that your AWS CLI is using the correct profile, use the following command to see details about the active profile: 

`aws sts get-caller-identity`

This will display the AWS account and user/role information for the currently active profile.


## Conclusion
By setting up named profiles and using environment variables, you can easily manage and switch between multiple AWS accounts in the AWS CLI. This setup allows you to streamline your workflow and avoid the hassle of specifying the profile with each command.










