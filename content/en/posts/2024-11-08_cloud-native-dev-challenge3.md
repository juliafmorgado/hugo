---
title: "Challenge 3 - Creating Real-Time Web Applications with Docker and PostgreSQL"
author: 'Julia Furst Morgado'
date: 2024-11-08T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/cloud-native-dev-3challenge.png
toc: true
tags:
- Cloud Native
- Tutorial
- DevOps
- Databases
slug: /challenge-3-creating-real-time-web-applications-with-docker-and-postgresql
---


Welcome to Challenge 3 in our cloud-native application development journey, where we integrate real-time interactions using Docker and PostgreSQL!

In this [challenge 3](https://www.juliafmorgado.com/posts/challenge-3-creating-real-time-web-applications-with-docker-and-postgresql/), we're enhancing the SQL-based application from [Challenge 2](https://www.juliafmorgado.com/posts/challenge-2-application-persistence-with-fs-sql-db/) by introducing a new component called the dashboard. This dashboard will continuously poll a PostgreSQL database every 2 seconds to count the number of texts stored. Instead of the client-side requesting this information from the backend, the dashboard will push updates via websockets directly to the client-side (HTML/JS).

Check the Challenge 3 [instructions](https://github.com/salaboy/cloud-native-dev/tree/main/3) from Salaboy.

## Setup
In this setup guide, we'll configure both the main application and a dashboard application to connect to a Dockerized PostgreSQL database. The dashboard will continuously poll a PostgreSQL database every 2 seconds to count the number of texts stored. Instead of the client-side requesting this information from the backend, the dashboard will push updates via websockets directly to the client-side (HTML/JS).

## Step 1: Set Up Your Directory Structure

1. From your project root, create a new `challenge-3` directory: `mkdir challenge-3`

2. While on the `sql` branch, copy the content from the `sql` branch of Challenge 2 to the new `challenge-3` directory: `cp -r challenge-2/app challenge-3`

3. Switch to the main branch: `git checkout main`

4. Push changes to GitHub (you should get the content from the `sql` branch into challenge-3 saved in your main branch) .

5. Now Navigate to the challenge-3 directory: `cd challenge-3`

6. Create a directory for the dashboard application: `mkdir dashboard`

## Step 2: Install and start Docker

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) from the official Docker website if not already installed. If Docker is installed, you need to start the Docker daemon. On macOS, you can usually start Docker from the Applications folder.

2. Ensure Docker is running with the command: `docker --version`

If Docker is running, this command should return the version of Docker installed.

## Step 3: Create Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. It allows you to define a set of services (containers) that make up your application and how they interact with each other. With Docker Compose, we don’t need to run `npm install` manually because Docker will handle the installation of dependencies. The `docker-compose.yml` file will build the Docker images and set up the containers.

Create a `docker-compose.yml` file in the challenge-3 directory with the following content:

```
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: challenge3
    ports:
      - "5432:5432"
    volumes:
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Mount SQL initialization script

  app:
    build: ./app
    command: npm start
    ports:
      - "3000:3000"
    depends_on:
      - db

  dashboard:
    build: ./dashboard
    command: npm start
    ports:
      - "3001:3001"
    depends_on:
      - db

volumes:
  postgres-data:
```

In this `docker-compose.yml` file: 

- We defined a PostgreSQL service
- When we run `docker-compose up`, Docker will pull the PostgreSQL image and start a container with a new database.
- **Initialization Script**: Initial setup, such as creating tables, must be automated using initialization scripts or performed manually each time the container is recreated. Without an initialization script, you would need to manually create the database tables each time the container is started. With the initialization script, tables are automatically created when the container is started for the first time.
- Application connection: Both our main app and the dashboard app connect to this PostgreSQL container. Data is stored and retrieved from the containerized PostgreSQL database.

## Step 4: Ensure Database Initialization:

Now at this step, we could manually create the `texts` Table every time, but it would be annoying, so we're going to automate that. We need to ensure that the table is created when the containers start up. You can automate the table creation by adding an SQL script to initialize the database.

Create a file named `init.sql` in the `challenge-3` directory with the following content:
```
CREATE TABLE IF NOT EXISTS texts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Step 5: Dockerfile for App and Dashboard

A Dockerfile is a text document that contains instructions for building a Docker image. An image is a lightweight, standalone, executable package that includes everything needed to run a piece of software, including the code, runtime, libraries, and dependencies.

Docker manages dependencies internally during the image build process using the instructions specified in your Dockerfile (`COPY package*.json ./` and `RUN npm install`). This approach ensures that your Dockerized applications have all required dependencies encapsulated within their respective Docker images, without the need for manual management of `node_modules` or `package-lock.json` outside of Docker.

Create a Dockerfile in both your `app` and `dashboard` directories with the following content:
```
# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "node", "server.js" ]
```

## Step 6: Set up `package.json` in each application directory
This needs to be done initially to ensure the `package.json` and `package-lock.json` files are present and correctly configured. After that, when others clone your repo and run `docker-compose up --build`, Docker will automatically handle installing dependencies inside the containers based on your `Dockerfile` and `package.json` files.

### For the `app` directory
1. **Navigate into the `app` directory: cd app**
2. **Initialize a new Node.js project:** `npm init -y`
    
    This command initializes a new `package.json` file with default values (`-y` flag skips the interactive prompts).
    
3. **Install necessary dependencies for your Node.js application (if not already specified in `package.json`):** `npm install express pg`
    
    Replace `express` and `pg` with any additional dependencies your application requires.
    
4. **Navigate back to the `challenge-3` directory:** `cd ..`

### For the `dashboard` directory
1. **Navigate into the `dashboard` directory:** `cd dashboard`
2. **Initialize a new Node.js project:** `npm init -y`
    
    Similarly, this command initializes a new `package.json` file for your dashboard application.
    
3. **Install necessary dependencies for your dashboard application:** `npm install express socket.io pg`
    
    Adjust the dependencies (`express`, `socket.io`, `pg`) as needed for your dashboard application.

## Step 7: Connect Main Application PostgreSQL
Modify the file `server.js` in the `app` directory to connect to the Dockerized PostgreSQL database. Update the database configuration on line 7:

```
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'challenge3',
  password: 'password',
  port: 5432,
});
```

## Step 8: Create the Dashboard Application
1. Create a new directory for the dashboard application: `mkdir dashboard`
    
2. Initialize a new Node.js project in the `dashboard` directory:
    
    ```
    cd dashboard
    npm init -y
    npm install express socket.io pg
    ```
    
3. Create a `server.js` file in the `dashboard` directory with the following content:
```
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { Pool } = require('pg');
const path = require('path');
const PORT = 3001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pool = new Pool({
  user: 'postgres',
  host: 'db', // 'db' is the name of the service in docker-compose.yml
  database: 'challenge3',
  password: 'password',
  port: 5432,
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Example route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Dashboard!');
});

// Serve Socket.IO client library
app.get('/socket.io/socket.io.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, '/node_modules/socket.io/client-dist/socket.io.js'));
});


// Socket.io logic for sending text count to clients
io.on('connection', (socket) => {
  console.log('New client connected');

  const sendTextCount = async () => {
    try {
      const result = await pool.query('SELECT COUNT(*) FROM texts');
      io.emit('textCount', { count: result.rows[0].count });
    } catch (error) {
      console.error('Error sending text count:', error.message);
    }
  };

  // Initial call and every 2 seconds thereafter
  sendTextCount();
  setInterval(sendTextCount, 2000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});



server.listen(PORT, () => {
  console.log(`Dashboard server running on http://localhost:${PORT}`);
});
```

4. Create a `public/index.html` file in the `dashboard` directory with the following content:
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>
</head>
<body>
  <h1>Dashboard</h1>
  <p id="textCount">Text Count: Loading...</p>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('textCount', (data) => {
      document.getElementById('textCount').textContent = `Text Count: ${data.count}`;
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  </script>
</body>
</html>
```

## Step 9: Build and Start the Docker Containers

Now you can proceed with building and running your Docker containers using Docker Compose:
    
```
docker compose up --build
```

> Depending on the version of Docker Compose you're using the command might be `docker-compose up --build`.
> Read more about it [here](https://docs.docker.com/compose/migrate/).
    
This command will:
    
- Build the Docker images for the `app` and `dashboard` services.
- Start the PostgreSQL container and initialize the database with your provided SQL script.
- Start the `app` and `dashboard` containers, each with their respective dependencies.

To stop any running Docker containers: `docker compose down`

## Conclusion
In Challenge 3, we successfully connected a dashboard to our main application using Docker and PostgreSQL. This setup lets both apps work together smoothly by sharing a database. It means updates happen in real time without the client needing to ask repeatedly.

Using Docker Compose makes deploying everything simpler. We set up the database automatically, which keeps things consistent and reliable. WebSockets help the apps talk to each other quickly and efficiently.

This challenge showed how using containers and smart setups can make apps easier to scale and manage. It also improves how fast users get updates, making for a better overall experience.

Happy coding, and see you in the next challenge!

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
