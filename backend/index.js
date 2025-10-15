/**
 * index.js
 * @author Gabriel Sessions + Will Soylemez - JumboCode Fall 2025
 * 
 * @description The primary Node.js file to run the backend server
 * for flashcards.
 */

// Just like in React, you can import external functions/packages using the
// `import` keyword!
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Initializes "routing" with express.js
const app = express();

// Add CORS middleware to handle cross-origin requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Change this variable if you want the server hosted on a different port!
const port = 3000;

// Route to respond with "Hello, World!"
// Head to http://localhost:3000 to invoke this endpoint!
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

/**
 * The `/sum` endpoint returns the sum of two numbers
 * 
 * @example http://localhost:3000/sum?value1=1&value2=2
 * should return 3 (not 12). Why might you end up with 12
 * instead of 3?
 * 
 * @todo Complete the function! Add the inputs together
 * and return the value. 
 */
app.get('/sum', (req, res) => {
  const queryParams = req.query;
  const value1 = queryParams.value1;
  const value2 = queryParams.value2;
  if (!value1 || !value2) {
    return res.status(400).send('Missing Parameter(s)!');
  }

  // Return the sum here instead of the query validation message
  return res.send("Query Params are Valid");
});

// This endpoint should only be accessible via POST request
// If a GET request is made, return an error message
app.get('/save-cards', (_, res) => {
  res.send("/save-cards is only accessible via POST request!")
})

/**
 * This endpoint should return save a text version of a flashcard
 * to the backend file system.
 * 
 * Given a `body` with a flashcard as an object, save it as a string
 * and then save it to a .txt file
 * 
 * @todo Add file saving logic!
 */
app.post('/save-cards', (req, res) => {
  const body = req.body;

  // Check if the input is a flashcard object
  if (!body.flashcards || !Array.isArray(body.flashcards)) {
    return res.status(400).send('Bad Request');
  }

  try {
    const cardString = JSON.stringify(body.flashcards, null, 2);
    console.log(cardString);

    // Save it to a file in the backend folder!
    // Hint: check out this tutorial
    // https://www.w3schools.com/nodejs/nodejs_filesystem.asp
    // No need to `require` fs, I've already imported it for you

    return res.status(201).send("OK")
  }
  catch(error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * This endpoint should load the most recently saved 
 * flashcards from your file system and return it as the response.
 */
app.get("/get-cards", (req, res) => {
  // Notice we don't really care about the request body here

  try { // It's always good practice to wrap file I/O in try/catch so a user gets some feedback!
    // Load the flashcards from a file in the backend folder! This will look similar to the save logic

    // Deserialize the flashcards string into an array of objects. Hint: JSON.parse is your friend

    return res.status(200).json({ flashcards: [] }); // TODO: Replace this with the loaded flashcards
  }
  catch(error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

/**
 * CHALLENGE: Use the Trivia DB API (https://opentdb.com/api_config.php) to
 * fetch a random trivia question and return it as the response.
 * 
 * You can use the `fetch` function to make HTTP requests, just like we do from
 * the frontend.
 */

// Start the server and listen at the specified port number
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});