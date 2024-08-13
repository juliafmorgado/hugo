---
title: "How to Upgrade to Veeam Backup for AWS v8.0"
author: 'Julia Furst Morgado'
date: 2024-07-09T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/upgrade-vbaws-v8.png
toc: true
tags: 
    - Veeam
    - Tutorial
slug: /how-to-upgrade-to-veeam-backup-aws-v8
---

## How and Why to Update Veeam Backup for AWS to Version 8

With the recent launch of Veeam Backup for AWS (VB for AWS) version 8 on July 2nd, it's time to update your setup to take advantage of the latest features and improvements. 

Version 8 introduces several enhancements, including tighter integration with Veeam Backup & Replication (VBR). By connecting VB for AWS with VBR, you can leverage VBR-specific features such as backup copies and central management for your cloud backup appliances. This integration simplifies management and provides additional capabilities that enhance your data protection strategy.

In this guide, I'll walk you through each step to help you successfully upgrade your Veeam Backup for AWS to version 8.

**For more details:**
- **Complete list of new features and enhancements:** [What's New in v8](https://www.veeam.com/whats-new-v8)
- **System requirements, known issues, installation, and upgrade:** [Release Notes](https://www.veeam.com/release-notes-v8)
- **User Guide:** [Online Help](https://helpcenter.veeam.com/docs/backup/vba/introduction.html)
- **All user guides, manuals, and other documentation:** [Veeam Help Center](https://www.veeam.com/documentation-guides-datasheets.html)

## Key Points Before You Begin

1. **VBR Integration:** To benefit from the latest features, you need to connect VB for AWS with your existing VBR installation. There is no need for a dedicated VBR instance.
2. **Standalone Version:** The standalone version of VB for AWS is still available and supported. However, to access new features and updates, integration with VBR is required.
3. **Version Compatibility:** While you are required to deploy VBR to upgrade to version 8, version 7 is still supported and can be used if it meets your protection requirements.
4. **License Requirements:** [Veeam B&R Community Edition (CE)](https://www.veeam.com/products/free/backup-recovery.html) supports managing cloud backup appliances, but it is limited to 10 instances. If you use a VUL key for licensing VB for AWS, you can use the same key for VBR.

## What’s New in Version 8

Veeam Backup for AWS delivers AWS-native backup and disaster recovery that’s easy, cost-effective, and secure. Quickly recover from any cloud data loss scenario - whether due to outages, accidental deletion, malware, and more - in minutes. Here are the main features that you will get with the Version 8 of VB for AWS:

- **Amazon Redshift Cluster protection**
- **Amazon FSx protection**
- **Immutability extension improvements:** Save up to 30% on costs compared to the previous version for backups stored in S3 using immutability. Veeam Backup for AWS will now use a default generation period of up to 25 days for immutability, compared to a fixed 10-day period in previous versions.
- **Imageless deployment:** Deploy backup appliances directly from the Veeam Backup & Replication server to reduce complexity and enhance the efficiency of managing your infrastructure. This method ensures a consistent environment, significantly reducing the likelihood of configuration errors and improving the reliability of your deployments.

## Steps to Upgrade to Version 8

Video version: https://youtu.be/Gc46fGDv15Y

### Step 1: Understanding Update Process

When attempting to update directly from the Veeam Backup for AWS Appliance, you might notice that the update cannot be installed this way anymore. This is because Veeam Backup for AWS is now connected to Veeam Backup & Replication, and the update must be performed through the Veeam Backup & Replication console.

![](https://blog-imgs-23.s3.amazonaws.com/vbaws-v7-error-update.png)

### Step 2: Download the AWS Plugin for Veeam Backup & Replication

1. **Open Documentation**: Make sure to have the [documentation](https://helpcenter.veeam.com/docs/vbaws/guide/upgrading_appliances.html?ver=80) ready for reference.
2. **Download Plugin**: Go to the Veeam Backup & Replication [download](https://login.veeam.com/realms/veeamsso/protocol/openid-connect/auth?client_id=veeam-com&response_type=code&redirect_uri=https%3A%2F%2Fwww.veeam.com%2Foauth&scope=profile&state=0f28367ead8e4abed92be2c653d6e983) page, log into your account, and find the Cloud Plugins section. Locate the AWS plugin for Veeam Backup & Replication and download it.

![](https://blog-imgs-23.s3.amazonaws.com/vbaws-cloud-plugin-page.png)

### Step 3: Install the Plugin

1. **Launch Installation File**: Open the downloaded file and launch the installation.
2. **Make Changes**: When prompted, allow the app to make changes.
3. **Accept License Agreement**: Review and accept the license agreement and policy.
4. **Proceed with Installation**: Click 'Next' and then 'Upgrade'.

![](https://blog-imgs-23.s3.amazonaws.com/upgrade-screen-vbaws-plugin.png)

### Step 4: Complete the Upgrade Process

1. **Finish Installation**: Once the installation is complete, click 'Finish'.
2. **Return to Veeam Backup & Replication Console**: Go back to the Veeam Backup & Replication console.
3. **Upgrade Appliance**: If you already have a Veeam Backup for AWS Appliance, a warning will notify you that the appliance needs to be upgraded. Click 'Apply' and confirm the upgrade.
4. **Complete Upgrade**: After all components have been upgraded, click 'Finish'.

![](https://blog-imgs-23.s3.amazonaws.com/vbr-upgrade-vbaws-appliance.png)

### Step 5: Verify the Update

1. **Open Console**: Open the Veeam Backup for AWS server console.
2. **Update Permissions**: Ensure that necessary permissions are updated.
3. **Check Version**: Navigate to 'Configuration' > 'Support' > 'Updates' to verify that the version has been updated to 8.0.

![](https://blog-imgs-23.s3.amazonaws.com/vbaws-updater-v8.png)

## Benefits of the Update

- **Centralized Management:** Manage your cloud backup appliances from a single VBR console.
- **Enhanced Features:** Access new features and improvements introduced in version 8.
- **Future-proof:** Stay updated with the latest developments and security updates from Veeam.

## Conclusion

Updating Veeam Backup for AWS to version 8 ensures that you are leveraging the latest capabilities and improvements from Veeam. By integrating with Veeam Backup & Replication, you not only gain access to advanced features but also simplify the management of your backup infrastructure. Follow the steps outlined in this guide for a seamless upgrade experience. 

For detailed installation instructions and additional information, refer to the Veeam Backup & Replication User Guide and the Veeam Backup for AWS documentation.

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
