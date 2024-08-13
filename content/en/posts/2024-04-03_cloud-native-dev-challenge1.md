---
title: "Challenge 1 - Create a simple app with HTTP endpoints and host in GitHub"
author: 'Julia Furst Morgado'
date: 2024-04-03T06:46:05.964Z
draft: false
image: https://blog-imgs-23.s3.amazonaws.com/cloud-native-dev-1challenge.png
tags:
- Tutorial

slug: /challenge-1-create-simple-web-app-http-endpoints-host-github
---

It's been a while since I last caught up with [Mauricio Salatino](https://www.salaboy.com/about/), known as Salaboy, to delve deeper into enhancing my Cloud Native skills. Recently, he proposed a series of challenges designed to provide hands-on learning experiences.

# Cloud Native Developer - Challenge 1
The first challenge detailed [here](https://github.com/salaboy/cloud-native-dev/tree/main/1) focuses on building a straightforward web application with HTTP endpoints and hosting it in a GitHub repository. You can find my repository [here](https://github.com/juliafmorgado/cloudnative-dev). 

Disclaimer: I utilized ChatGPT for assistance, with Salaboy's permission, to deepen my understanding of the project as I progressed.

In this blog, I'll guide you through the step-by-step process I undertook to successfully complete the challenge-1.

## Step 1: Setting up the Environment
**1. Install Node.js**
Since we are going to build the web app with Node.js we need to install it on our machine. You can install it using [Homebrew](https://formulae.brew.sh/formula/node) with the command `brew install node`.

**2. Create and Navigate to Project Directory**
After installing Node.js, create a directory for your project (in your case, cloud-native-dev) and navigate into it.
```
mkdir cloud-native-dev
cd cloud-native-dev
```
**3. Initialize Node.js Project**
Once inside your project directory (cloud-native-dev), initialize a Node.js project using `npm init -y`. The `-y` flag automatically generates a `package.json` file with default values.

**4. Install Express**
After initializing the Node.js project, install Express using npm: `npm install express`.

This command installs Express locally in the cloud-native-dev directory and updates your `package.json` file with the dependency.

At this point, we're all set to start writing our code. You can start by creating the directories and files that you're going to need or create them as you go, but basically, our directory structure will be as follows (notice I'm following best practices for separating concerns by keeping static files in a `public` directory):

```
cloud-native-dev/
└── challenge-1/
    ├── README.md
    └── app/
        ├── public/
        │   ├── index.html
        │   └── app.js
        └── server.js
    ├── node_modules/  (created after npm install express)
    ├── package.json   (created after npm init -y)
    └── package-lock.json  (created after npm install express)
```

## Step 2: Writing the Backend Code
Inside the `app` directory, run the following command on your terminal:

```
cat <<EOF >server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store
const texts = [];

// Endpoint to save text
app.post('/save', (req, res) => {
  const { text } = req.body;
  texts.push(text);
  res.status(201).send({ message: 'Text saved successfully' });
});

// Endpoint to get all texts
app.get('/all', (req, res) => {
  res.status(200).json(texts);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
EOF
```
This command creates a file named server.js and writes the provided JavaScript code into it.

> This script essentially sets up a basic Express.js server with two endpoints (/save for saving text and /all for retrieving all saved texts) and serves static files from a public directory.


## Step 3: Setting Up The Frontend
Create a new file named index.html inside a public folder by running the command `mkdir -p public && touch public/index.html`. 

Paste the following code:

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>To-Do App</title>
</head>
<body>
<h2>My To-Do List</h2>
<textarea id="textArea"></textarea><br>
<button onclick="saveText()">Save Text</button>
<ul id="textsList"></ul>

<script src="app.js"></script>
</body>
</html>
```
> This HTML file sets up a simple user interface for a To-Do List application that allows inputting, saving and displaying text.

Now create a new file named app.js in the project directory (again, I'm keeping my static files under a public folder) by running the command `touch public/app.js`.

Paste the following code:

```
// Function to save text
async function saveText() {
    const text = document.getElementById('textArea').value;
    await fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    fetchAllTexts(); // Refresh the list after saving
  }
  
  // Function to fetch all texts
  async function fetchAllTexts() {
    const response = await fetch('/all');
    const texts = await response.json();
    const list = document.getElementById('textsList');
    list.innerHTML = ''; // Clear existing list
    texts.forEach((text) => {
      const item = document.createElement('li');
      item.textContent = text;
      list.appendChild(item);
    });
  }
  
  // Load all texts on initial load
  document.addEventListener('DOMContentLoaded', fetchAllTexts);
```

> These JavaScript functions complement the HTML code provided above. They implement the functionality to save texts via the `/save` endpoint and fetch them from the `/all` endpoint. This facilitates the interaction between our frontend and backend.

## Step 4: Running the Application
Let's start our Node.js server by running `node server.js` and then navigating to http://localhost:3000 in our web browser. You should see your To-Do application user interface, ready to accept input. 

Here's what you should do next to test the full functionality:

1. Type some text into the text area.
2. Click the "Save Text" button. This sends your text to the server, saving it in memory.
3. The page should automatically update to list your saved text below the text area.

![](https://blog-imgs-23.s3.amazonaws.com/web-server-1challenge.png)

To stop running the server just press `ctl+C`

## Step 5: Add .gitignore
Before pushing our code to a GitHub repository, we want to add the `node_modules` in a `.gitignore` file. This prevents unnecessary and bulky dependencies from being included in version control, keeping the repository clean and reducing its size.

In the root directory of our project (cloud-native-dev) create a `.gitignore` file and add `node_modules/` by running the command: `echo "node_modules/" >> .gitignore`.


## Step 6: Push the Code to GitHub
**1. Install and Initialize Git**
If you're using a Mac you can install Git via Homebrew with the command `brew install git`, and then navigate to the project directory (cloud-native-dev/1-challenge/) in your terminal and initialize Git: `git init`.

**2. Create a Repository on GitHub**
Go to [GitHub](https://github.com/) and log in. Click on the "+" sign in the upper right corner and select "New repository". Give your repository a name (e.g., cloud-native-dev). Optionally, add a description, choose public or private, and initialize with a README if needed.

**3. Clone the Repository**
Once you have created the repository on GitHub, clone it to your local machine. So type in your terminal: `git clone https://github.com/yourusername/cloud-native-dev.git`. Replace `yourusername` with your GitHub username.

**4. Commit Changes**
Ensure all your project files are saved in the cloud-native-dev/1-challenge/ directory. Add all files to Git, commit your changes, and provide a commit message:

```
git add .
git commit -m "Initial commit: Added project files"
```

**5. Set Up Remote Repository and push to GitHub**
Link your local repository to the GitHub repository you created: `git remote add origin https://github.com/yourusername/cloud-native-dev.git`

Push your committed changes to GitHub: `git push -u origin main`. This command pushes your changes to the main branch of your GitHub repository.

Once all done, go to your GitHub repository page and verify that your files have been successfully pushed. Now, your code including the `server.js`, `index.html`, `app.js`, and other necessary files should be available on your GitHub repository under cloud-native-dev.

## Understanding What We Built
- **Backend (Node.js + Express):** Our server handles HTTP requests, serves static files, and provides two API endpoints. One endpoint saves text sent in a POST request; the other returns all saved texts in a GET request.
- **Frontend (HTML + JavaScript):** The user interface where users can input text to be saved. It interacts with the backend via API calls to save and retrieve texts.

## Why This Matters
Building this simple application demonstrates several foundational concepts in web development and cloud-native applications, including:

- Client-server architecture: Understanding how the frontend (client) interacts with the backend (server) is crucial for web development.
- RESTful API design: Our endpoints follow REST principles, making them predictable and easy to use.
- State management: We manage application state (saved texts) in memory, which while not persistent across server restarts, teaches the basics of data handling.

## Conclusion
Through challenges like these, we're not only learning about technology but also about structuring projects and thinking critically about design and architecture. Feel free to clone the repository, try out the challenge yourself, and share your thoughts and suggestions!

Happy coding, and see you in the next challenge!

***

If you liked this article, follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey daily), connect with me on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
