---
title: "Connecting MongoDB to your app using Node.js"
author: "Julia Furst Morgado"
date: 2022-09-12T17:42:30.360Z
lastmod: 2023-01-08T10:34:15-05:00
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_0.png
tags: ["Tutorial", "NodeJS", "Databases"]

image: "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_0.png" 
images:
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_0.png"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_1.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_2.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_3.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_4.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_5.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_6.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_7.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_8.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_9.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_10.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_11.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_12.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_13.jpg"

---

MongoDB is an open source NoSQL database management program. NoSQL databases are quite useful for working with large sets of distributed data. We can store information in this database, manage it and then retrieve it and display it to people who view our app.

Now, to connect to a Mongo database from a Node.js server, you can either use:

- Mongo, official driver npm package
- Mongoose, elegant object modeling tool for mongo in nodejs

Most online tutorials teach how to set up a Node/Express app with MongoDB using mongoose, which isn’t very helpful for beginners.

In this tutorial, I’ll walk you through the basics of setting up a MongoDB account, generating a connection string, and connecting your MongoDB database to your app without mongoose.

If you prefer to watch a video, check out the tutorial [here](https://youtu.be/Bcg6C0G_tAA).

[https://youtu.be/Bcg6C0G_tAA](https://youtu.be/Bcg6C0G_tAA "Share link")

Let’s get started!

### Step 1. Create an account

Head to MongoDB Atlas’s [website](https://www.mongodb.com/try) and sign up with your email.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_1.jpg#layoutTextWidth)

You might have to answer a short questionnaire to create your account.

### Step 2. Deploy your first cluster

At a high level, a cluster is a set of nodes where copies of your database will be stored.

Click on build a database, and choose the shared database type (the free one!).

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_2.jpg#layoutTextWidth)

It will give you options to customize your cluster, but you can go with the default. Just make sure you’re still in the free tier. After that, click on Create Cluster.

### Step 3. Create a username and password

While your cluster is being created in the background, you must create a database user. The username and password differ from the one you used to login into MongoDB Atlas; they will be used ONLY for this particular database (it helps keep the data secure and helps control who has access to what data).

Make sure to store your password safely since we’ll need it to connect to the database.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_3.jpg#layoutTextWidth)

### Step 4. Add your IP Address

You need to whitelist your IP address before connecting to your cluster. This is a security feature built into MongoDB Atlas. Go ahead and click Add your Current IP Address.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_4.jpg#layoutTextWidth)

After that, just click on Finish and Close, and when the dialog box opens, click on Go to Databases.

### 5. Homepage

Welcome to your database’s homepage; you should see your cluster there. Before connecting it to your app, you have to create a collection inside it.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_5.jpg#layoutTextWidth)

### Step 6. Create a collection

Click on Browse Collections, then Add My Own Data

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_6.jpg#layoutTextWidth)

Type the name of your database and the collection name. In my case, my database name will be ‘to-do-app’, and the collection name ‘tasks’. Click on Create.

Great, you have created a collection where all your objects will be saved.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_7.jpg#layoutTextWidth)

### Step 7. Generate a connection string

Go back to your database homepage (top left, under DEPLOYMENT), and on your cluster’s main page, click Connect. You’ll get three methods to connect to your database.

Choose the “Connect your application” method.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_8.jpg#layoutTextWidth)

The provided connection string will be used on your app (so your app can connect and manipulate the database).

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_9.jpg#layoutTextWidth)

### Step 8. Initialize your project

Now go to your IDE (I use VS Code) and start your app.

If this is your first time developing a full-stack web application, you’ll need to download Node.js to your computer.

You can download it from the [official node website](https://nodejs.org/en/), which will also install npm (Node Package Manager).

> npm is a package manager for Node.js with hundreds of thousands of packages. Although it does create some of your directory structure/organization, this is not the main purpose.

> Its main goal is automated dependency and package management. This means that you can specify all of your project’s dependencies inside your package.json file. Any time you (or anyone else) need to get started with your project, they can just run npm install and immediately have all of the dependencies installed. On top of this, it is also possible to specify what versions your project depends upon to prevent updates from breaking your project.

To initialize your first project with npm, create a project folder, and change the directory to your project’s folder.

Once this is done, you are ready to initialize your first project with:

```
npm init ## triggers the initialization of a project
```

### Step 9. Install local packages

Once you install any package using npm, the package is installed as a dependency in your app inside your package.json file, and its modules are stored inside node_modules folder.

npm install is the standard NPM command to install a package of your choice.

```
npm install <package name>
```

Now let’s install the packages we will use for this project.

Express:

```
npm install express
```

MongoDB:

```
npm install mongodb
```

Dotenv:

```
npm install dotenv
```

> The dotenv package stores sensitive information that we don’t want to share. It creates environment variables and hides them from our main code, so for example, you can secure private keys in an env file and keep it out of sight when pushing it to GitHub.

You can check that everything was successfully installed on your package-lock.json (under packages).

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_10.jpg#layoutTextWidth)

### Step 10. Require dependencies

Once the packages are installed, create a new server.js file and open it with your code editor. Then, add the following lines of code:

```
const express = require('express')    #1const app = express()                        #2const MongoClient = require('mongodb').MongoClient.     #3
```

Code Explanation:

1. In your first line of code, you use the require function to include the “express module.”
2. Before you use the express module, you need to make an object of it.
3. The MongoDB module exports MongoClient, which you’ll use to connect to a MongoDB database. You can use an instance of MongoClient to connect to a cluster, access the database, and close the connection to that cluster.

### Step 11. Connect database

You have to declare a variable for the string given by MongoDB. IMPORTANT: Replace the with the actual password that you created previously.

```
const connectionString = 'mongodb+srv://juliafm:<password>@cluster0.qvesujr.mongodb.net/?retryWrites=true&w=majority'
```

To finish connecting to the external database, add the following lines of code:

```
MongoClient.connect(connectionString)    .then(client => {    console.log(`Connected to Database`)    const db = client.db('to-do-app')    const tasksCollection = db.collection('tasks')    })

//CRUD requests

    .catch(error => console.error(error))
```

Code Explanation:

1. Create a function with a promise
2. Tell what to do next (then) client
3. Pass it as a parameter to the arrow function
4. Create a console.log statement to make sure you’re connected
5. Specify which database and collection you’re connecting to
6. Add a catch statement to see if we get any errors

Awesome, you’re all set. If you run your server now, you should see “Connected to Database” on your terminal.

This is the code you have so far:

```
const express = require('express')const app = express()const MongoClient = require('mongodb').MongoClientconst connectionString = 'mongodb+srv://juliafm:helloworld@cluster0.jgbyhks.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString).then(client => {    console.log('Connected to database')    const db = client.db('to-do-app')    const taskCollection = db.collection('tasks')

    //CRUD request}).catch(error=> console.error(error))
```

### Step 12. Set up .env

For safety reasons, I want to show you how to move your MongoDB connection string to a .env file.

For that, you have to create a .env file inside your project’s folder. In this file, create a variable DB_STRING and paste your connection string (don’t forget to change the placeholder to your actual password).

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_11.jpg#layoutTextWidth)

Go back to your server.js file, remove the variable that holds the connection string, and add this instead:

```
require('dotenv').config()const connectionString = process.env.DB_STRING;
```

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_12.jpg#layoutTextWidth)

Finally, create a .gitignore file and add the .env there (you’ll see I’ve added the node_modules because they are so heavy, and there’s no need to push them to Github).

> A .gitignore file specifies intentionally untracked files that Git should ignore.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-12_connecting-mongodb-to-your-app-using-node.js_13.jpg#layoutTextWidth)

Just remember, if you’re pushing to Heroku, you must remove the .env from the .gitignore file because it needs access to the database. Alternatively, you can add this config var via your app’s “Settings” tab in the Heroku Dashboard.

### Conclusion

I hope this tutorial was helpful. Please let me know if you still have any questions; I am always happy to help!

***
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
