---
title: "Creating Immutable Backup Repositories with Amazon S3 and Veeam"
author: 'Julia Furst Morgado'
date: 2024-09-08T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/x.png
toc: true
tags: 
    - Veeam
    - Tutorial

slug: /creating-immutable-backup-repositories-with-amazons3-veeam
---

In today's data-centric world, securing your information is more critical than ever. [Amazon S3 (Simple Storage Service)](https://aws.amazon.com/pm/serv-s3) provides a robust, scalable, and cost-effective solution for data storage, with the added advantage of immutability. When paired with [Veeam Backup & Replication (VBR)](https://www.veeam.com/products/veeam-data-platform/backup-recovery.html), it not only strengthens your backup strategy but also ensures that your data remains unaltered and protected against tampering. This guide will walk you through setting up an immutable Amazon S3 bucket, integrating it with Veeam, and leveraging best practices to maximize the security and efficiency of your backup solutions.


# Understanding Cloud Object Storage Options

Before diving into the setup, let’s explore the different strategies for using cloud object storage with Veeam:

## A. Direct Backup to Cloud Storage
**Overview:** Directly back up your data to Amazon S3 without intermediate local storage.

**Pros:**

- **Simplified Architecture:** Streamlines the backup process by eliminating the need for local storage.
- **Cost-Efficiency for Small Datasets:** Effective for environments with limited data or infrequent backups.

**Cons:**

- **Potential Latency:** May experience higher latency compared to local backups. Ensure a stable internet connection.
- **Data Transfer Costs:** Regular or large backups can lead to significant transfer costs.

## B. Tiered Backup to Cloud Storage
**Overview:** Back up data locally first and then transition it to Amazon S3.

**Pros:**

- **Performance Boost:** Fast backups and restores due to local storage of recent backups.
- **Cost Management:** Economical for long-term storage by moving older backups to the cloud.

**Cons:**

- **Complex Setup:** Requires configuration of both local and cloud storage.
- **Transfer Costs:** Additional costs for data migration to the cloud.

## C. Backup Copy to Cloud Storage
**Overview:** Create an additional copy of backups in Amazon S3 for redundancy.

**Pros:**

- **Enhanced Disaster Recovery:** Provides extra protection with off-site copies, crucial for disaster recovery.
- **Regulatory Compliance:** Meets standards for off-site data storage.

**Cons:**

- **Increased Storage Costs:** Higher costs due to additional storage needs.
- **Management Overhead:** More data to monitor and manage.

# Step-by-Step Guide to Setting Up Amazon S3 with Veeam Backup & Replication

## Setting Up an S3 Bucket on the AWS Management Console

- Log in to your AWS Management Console.
- Navigate to the **S3 service**.
- Click **"Create bucket"**.
- **Configure Bucket Settings.** Enter a **unique bucket name**, review and adjust other settings as necessary.
![](https://blog-imgs-23.s3.amazonaws.com/imm-bucket-s3.png)
- Enable Versioning: Under "Bucket Versioning” select **"Enable"** to activate versioning.

> **Why Enable Versioning?**: Versioning allows you to preserve, retrieve, and restore every version of every object stored in your bucket. It safeguards against accidental deletions or overwrites, ensuring data recovery options.

- Configure Object Lock: In **Advanced Settings,** Enable **"Object Lock"** and check the checkbox to acknowledge that enabling Object Lock will permanently allow objects in this bucket to be locked.

> **Why Configure Object Lock?**: Object Lock provides immutability for your data, ensuring that it cannot be deleted or modified for a specified retention period. This feature is crucial for protecting against ransomware attacks and accidental deletions.
![](https://blog-imgs-23.s3.amazonaws.com/amazons3-object-lock.png)

- Click “Create bucket”

## Integrating Amazon S3 with Veeam Backup & Replication
Once your S3 bucket is configured, you can integrate it with Veeam Backup & Replication to use it as a storage repository.

1. **Access Veeam Backup & Replication Console:**
   - Open the Veeam Backup & Replication console and go to "Backup Infrastructure", where you'll manage your storage repositories.

2. **Add a New Repository:**
   - Right-click "Backup Repositories" and select "Add Backup Repository".
   ![](https://blog-imgs-23.s3.amazonaws.com/vbr-add-backuprepo.png)
   - Choose "Object storage" and then "Amazon S3".
   ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-storage-vbr.png)
   - Select the type of Amazon storage you want to use as a backup repository.

3. **Configure Repository Settings:**
   - **Bucket Configuration:** Enter your S3 bucket name.
     
   - **Authentication:** Enter your IAM User Access Key ID and Secret Access Key to establish a connection with your bucket.
   ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-repo-account.png)

   - **Region:** Default to a global region setting unless your operations require specific regions like GovCloud or China.
     
   - **Connection Mode:** Select the appropriate option to determine how Veeam Backup & Replication will transfer data to the object storage repository:
       - **Direct:** Opt for this option to instantly move data from processed VMs or file shares to object storage repositories. The method used depends on the job type, utilizing either a backup proxy or a gateway server.
       - **Through gateway server:** Choose this option if you prefer Veeam Backup & Replication to utilize a gateway server for transferring data from processed VMs or file shares to object storage repositories. From the Name list, designate the gateway servers for data transfer operations.
   ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-vbr-connectionmode.png)

   - **Data Center:** Choose the data center location where your S3 bucket is hosted to optimize latency and compliance with data residency requirements.
     
   - **Bucket and Folder:** Navigate and select your desired bucket and folder. If necessary, create a new folder within your bucket for organized storage.
   ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-vbr-selectbucket.png)

   - **Bucket Settings:**
     - **Limit Object Storage Consumption:** Check the box to limit object storage consumption, allowing you to set a soft limit. If this limit is surpassed during a job run, Veeam Backup & Replication will permit job completion. However, a new job won’t initiate until you address the excess data by either removing it or adjusting the soft limit settings. Specify the value in TB or PB.
     - **Immutability:** Check the box to prevent the deletion of data blocks from object storage. Specify the immutability period, noting that the UI allows a maximum immutability period of 90 days. For longer periods, utilize the Set-VBRAmazonS3CompatibleRepository cmdlet.
     > **Note:** Implementing immutability incurs additional API costs associated with maintaining data integrity. These costs are equivalent to conducting a full backup every 10 days, irrespective of the immutability period set (e.g., 3, 14, or 30 days). This frequency is necessary to ensure all relevant data blocks remain protected, optimizing the operation to balance disk space usage against cost.
     
     - **Infrequent Access Storage Class:** If backups are accessed infrequently, select this option to reduce storage costs. Be aware of potential costs for early data deletion. If you choose S3 One Zone-IA, backups will be stored in a single availability zone.
     > **Note:** S3 IA is suitable for long-term storage of GFS full backups. Avoid using it for short-term storage of recent backups due to minimum retention and deletion charges. For GFS backups, large block sizes can help reduce costs, though they increase storage and reduce granularity.
     
      ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-vbr-bucketsettings.png)
     
   - **Mount Server**: At the Mount Server step of the wizard, define settings for the mount server intended for restore operations and set up a helper appliance. This temporary host, deployed by Veeam Backup & Replication on the Amazon S3 storage, performs health checks on backup files and applies retention to unstructured data backup files. Once these operations are completed, Veeam Backup & Replication automatically removes the helper appliance from the Amazon S3 storage. To configure the mount server settings, follow these steps:
       - **Mount Server Selection:** From the Mount Server drop-down list, choose a server designated as the mount server. This server is utilized during restore operations to directly mount VM disks from objects within object storage repositories.
       >**Note:** The Mount Server list displays only Microsoft Windows servers added to the backup infrastructure. If the server is not yet added, click “Add New” on the right to open the New Windows Server wizard.
       - **Instant Recovery Write Cache Folder:** Specify a folder for the Instant Recovery write cache, where cache data is stored during mount operations.
       - **Enable vPower NFS Service:**
           - Check the box to enable the Veeam vPower NFS Service on the mount server, granting access to the object storage repository. Veeam Backup & Replication will automatically activate the Veeam vPower NFS Service on the designated mount server.
           - Click “Ports” to customize network ports used by the Veeam vPower NFS Service. In the vPower NFS Port Settings window, specify the mount port and vPower NFS port settings.
       - **Helper Appliance Configuration:** To specify helper appliance settings, click “Configure.” From the Managed server drop-down list, choose a server designated as the helper appliance.
       > **IMPORTANT:** Avoid enabling Microsoft Windows NFS services on the machine where you install the Veeam vPower NFS Service. Enabling both Microsoft NFS services and Veeam vPower NFS Service on the same machine may lead to issues with both services functioning correctly.

   ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-vbr-mountserver.png)
    
4. **Review Components**

At the Review step of the wizard, carefully examine the components slated for processing on the mount server and their current status.

If your backup repository already holds backups, consider selecting the **“Search the repository for existing backups and import them automatically”** checkbox. Enabling this option prompts Veeam Backup & Replication to conduct a thorough scan of the backup repository, identifying and automatically displaying existing backup files in the Veeam Backup & Replication console under the “Backups > Object Storage (Imported)” node.

For repositories containing guest file system index files, you can choose the **“Import guest file system index data to the catalog”** checkbox. This enables Veeam Backup & Replication to import index files alongside backup files so you can search for guest OS files inside imported backups, enhancing overall accessibility and search functionalities. For more information, see the [Guest OS File Restore](https://helpcenter.veeam.com/docs/backup/em/searching_restoring_vm_guest_files.html?ver=120) section.

   ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-vbr-review.png)

6. **Apply Settings**
In the **Apply** step, wait for Veeam Backup & Replication to save your settings to the configuration database and create backup infrastructure objects.
   ![](https://blog-imgs-23.s3.amazonaws.com/amazons3-vbr-finish.png)

Upon completion, you will see a message indicating that the Amazon S3 object storage has been added as a Veeam backup repository.

# 3. Best Practices and Considerations

To maximize the benefits of using Amazon S3 with Veeam, consider these best practices:

- **Monitor Costs:** Regularly review data transfer and storage costs to stay within budget.
- **Optimize Backup Frequency:** Adjust backup schedules based on your data volume and importance.
- **Regularly Test Restores:** Ensure that you can successfully restore data from your backups to verify their integrity.
- **Stay Informed:** Keep up-to-date with AWS and Veeam updates for any new features or changes.

# 4. Additional Resources

For more detailed guidance, check out these resources:

- [Veeam and Amazon S3 Integration](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/back-up-and-archive-data-to-amazon-s3-with-veeam-backup-replication.html)
- [Reducing API Calls](https://forums.veeam.com/object-storage-as-a-backup-target-f52/aws-s3-how-to-reduce-the-number-of-api-calls-t68858.html)
- [Supported Storage Classes](https://forums.veeam.com/object-storage-as-a-backup-target-f52/question-about-supported-aws-s3-standard-ia-t79462.html)
- [Veeam Backup for Hyper-V](https://helpcenter.veeam.com/docs/backup/hyperv/amazon_storage_details.html?ver=120) and [Veeam Backup for VMware](https://helpcenter.veeam.com/docs/backup/vsphere/amazon_storage_details.html?ver=120)

**Conclusion**

By following this guide, you’ll be well-equipped to leverage Amazon S3 for your backup needs effectively. The integration with Veeam Backup & Replication will enhance your data protection strategy, ensuring robustness and compliance.


***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
