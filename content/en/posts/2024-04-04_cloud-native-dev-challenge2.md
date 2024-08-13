---
title: "Challenge 2 - Application Persistence with FS and SQL DB"
author: 'Julia Furst Morgado'
date: 2024-04-04T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/cloud-native-dev-2challenge.png
toc: true
tags:
- Tutorial
- Databases
slug: /challenge-2-application-persistence-with-fs-sql-db
---

Ok let's continue with our Cloud Native Dev challenges. We're not beating around the bush here!

## Cloud Native Developer - Challenge 2
The second challenge can be found [here](https://github.com/salaboy/cloud-native-dev/tree/main/2) and is about adding persistence to my simple web application. My repo can be found [here](https://github.com/juliafmorgado/cloud-native-dev/tree/main/2-challenge).

## Step 1: Create new directory and copy code
1. From the root directory of our project, create a new directory named challenge-2: `mkdir challenge-2`
2. Copy all the files from the challenge-1 directory (server.js, index.html, app.js) into this new directory by running the command: `cp -R challenge-1/ challenge-2/` (on MacOS).
3. Push that to git

```
git add challenge-2
git commit -m "Add challenge-2 directory with copied code from challenge-1"
git push
```

## Step 2: Branching and Implementing Filesystem Persistence
1. Navigate to the new challenge-2 directory: `cd challenge-2`
2. Create a new branch named `fs` from the main branch by running the command `git checkout -b fs`
3. Modify the backend (server.js) to implement filesystem persistence so it saves texts into a file using filesystem APIs and reads from it, instead of using an in-memory store. This will involve changes primarily to our `/save` and `/all` endpoints.

The new `server.js` file should look like this:

```
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the file path for storing data
const FILE_PATH = path.join(__dirname, 'texts.json');

// Initialize the file with an empty array if it doesn't exist
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]), 'utf8');
}

// Helper function to read texts from file
function readTextsFromFile() {
    const fileContents = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(fileContents);
}

// Helper function to save texts to file
function saveTextsToFile(texts) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(texts, null, 2), 'utf8');
}

// Endpoint to save text
app.post('/save', (req, res) => {
    const { text } = req.body;
    const texts = readTextsFromFile();
    texts.push(text);
    saveTextsToFile(texts);
    res.status(201).send({ message: 'Text saved successfully' });
});

// Endpoint to get all texts
app.get('/all', (req, res) => {
    const texts = readTextsFromFile();
    res.status(200).json(texts);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

4. Save and push the changes to GitHub
After implementing the filesystem approach, let's add, commit and push our changes:
```
git add .
git commit -m "Implement storing texts in a file for filesystem approach"
git push origin fs
```


### Changes Made
- **File Path Definition:** Specified `FILE_PATH` using `path.join` for compatibility across different operating systems.
- **File Initialization:** Ensured the file exists at the start. If not, it creates an empty array in it.
- **Reading and Writing Helper Functions:** Created `readTextsFromFile` and `saveTextsToFile` to encapsulate file operations, making the code cleaner and more reusable.
- **Modified `/save` and `/all` Endpoints:** These now use the helper functions to read from and write to the file, respectively, instead of using an in-memory array.

### Testing the Application
1. Start the server with `node server.js`.
2. Open your web browser to view your front-end application or use tools like Postman to make requests to your server.
3. Use the `/save` endpoint to save texts and `/all` to retrieve them. You should see that texts persist across server restarts, as they're now stored in a file.
4. To stop the server just press `ctl+C`

## Step 3: Branching and Implementing Database Persistence
Create a new branch named `sql` by running the command `git checkout -b sql`

### Set up PostgreSQL
**1. Install PostgreSQL on Local Machine**
Install it with Homebrew by running `brew install postgresql@15` or follow the installation instructions provided in the [official documentation](https://www.postgresqltutorial.com/postgresql-getting-started/install-postgresql-macos/).

**2. Start PostgreSQL** 
Start the PostgreSQL service using Homebrew: `brew services start postgresql@15`

**3. Add PostgreSQL client tools (binaries) to PATH**

To use the psql command, ensure PostgreSQL client tools are in your system's PATH. Add the following line to your shell profile file (~/.zshrc for Z shell):

`echo 'export PATH="/opt/homebrew/opt/postgresql@15/bin:$PATH"' >> ~/.zshrc`. 

This command appends the specified directory to your ~/.zshrc file, which is the configuration file for the Z shell (assuming you are using the Z shell). It ensures that every time you open a new terminal session, the PostgreSQL binaries will be included in your PATH, allowing you to use commands like `psql`.

After running this command, remember to restart your terminal or source the `~/.zshrc` file to apply the changes by running `source ~/.zshrc`.

**4. Access the PostgreSQL CLI**
Access the command line interface by running `psql postgres`. This command connects you to the PostgreSQL database server, and you'll be logged into the `postgres` database by default as the `postgres` user. The `postgres` database is a default database meant for administrative purposes.

**5. Create a New PostgreSQL Database**
From the PostgreSQL CLI, create a new database for your application by running the command `CREATE DATABASE your_database_name;`. Replace `your_database_name` with your preferred database name, I've named it challenge2.

**6. Connect to Your New Database**
To connect to the database you just created, use the following command `\c challenge2`.

**7. Create a Table**
Once connected to challenge2, create a table named texts to store the text content. Here’s an example command to create a simple table:

```
CREATE TABLE texts (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

This table has three columns:
- id: A unique identifier for each text, which automatically increments for each new row.
- content: A text column to store the text content.
- created_at: A timestamp column that records when each text was saved.

**8. Verify the Table Creation**
To ensure your table was created successfully, use the `\d` command to list all tables in your current database. You should see the `texts` table listed.

### Connect to PostgreSQL from Node.js
1. In our project directory we have to install the `pg` package by running `npm install pg`.
2. At this point I should have created a username and password to connect to it, but I'm afraid of getting confused in the process creation and after will have to create a `.env` file to save them so I'll try to skip it and use my operating system's current username, and no password for local connections.
3. Then we can set up the database connection in our `server.js`.

Here's the adjusted server.js:

```
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = 3000;

// Configure PostgreSQL connection
// This configuration assumes your PostgreSQL server allows you to connect using the default method.
const pool = new Pool({
  database: 'challenge2', // Ensure this database exists in your PostgreSQL server
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to save text
app.post('/save', async (req, res) => {
  const { text } = req.body;
  try {
    const result = await pool.query('INSERT INTO texts (content) VALUES ($1) RETURNING *', [text]);
    res.status(201).send({ message: 'Text saved successfully', text: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to save text' });
  }
});

// Endpoint to get all texts
app.get('/all', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM texts ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to retrieve texts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```
Also modify line 22 in the `app.js` file to this: `item.textContent = `${text.content}`; // Display specific properties`

### Run the Node.js Application
Now that our PostgreSQL server is up and running and we've modified our Node.js app we can run the command `node server.js`. You should see the message "Server running on http://localhost:3000" logged into the console.
Open the browser and interact with the application.
![](https://blog-imgs-23.s3.amazonaws.com/web-server-challenge22.png)

### Verify Data has been Saved
To verify that your data has been saved in the PostgreSQL database, you can use the `psql` command-line interface to query the database directly.
1. Connect to the PostgreSQL database by running the command `psql -d challenge2`
2. Once connected, you can run SQL queries directly. To see the contents of the texts table (assuming that's the name of your table where texts are stored), execute `SELECT * FROM texts;`
You should see this on the terminal:
![](https://blog-imgs-23.s3.amazonaws.com/web-server-challenge2-terminal.png)

3. After checking your data, you can exit the `psql` interface by typing `\q`.

Remember, every time your application handles a POST request to the `/save` endpoint and successfully processes it, a new record should be inserted into your database. You can keep the `psql` interface open and run the `SELECT` command as many times as you like to see new records as they are added.

## Conclusion
### Application Connection
- The Node.js application connected to the locally installed PostgreSQL database.
- The application stored and retrieved data directly from the local database.

### Persistence
- Data is stored on your local machine’s file system where PostgreSQL is configured to store its data files.
- The table exists persistently in the local database unless manually dropped or the database is deleted.

Happy coding, and see you in the next challenge!

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
