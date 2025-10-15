/**
 * api.js
 * @author By: Will Soylemez - JumboCode Fall 2025
 * 
 * @description This file contains utility functions to interact with the backend API.
 * 
 * TODO: Update these functions and add them to the flashcard page!
 */

const BASE_URL = "http://localhost:3000";

/**
 * Saves the given flashcards to the backend server.
 * 
 * @param {Array} flashcards - An array of flashcard objects to be saved.
 * Each flashcard object should have the following structure:
 * {
 *   question: "Question text",
 *   answer: "Answer text"
 * }
 * 
 * @returns {Promise} A promise that resolves to the server's response.
 */
export async function saveFlashcards(flashcards) {
  try {
    const response = await fetch(`${BASE_URL}/save-cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ flashcards })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Failed to save flashcards:", error);
    throw error;
  }
}

/**
 * Fetches flashcards from the backend server.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of flashcard objects.
 * Each flashcard object has the following structure:
 * {
 *   question: "Question text",
 *   answer: "Answer text"
 * }
 * @todo Implement this function to fetch flashcards from the backend.
 * Currently, it returns a static array for demonstration purposes.
 * You will need to modify the backend to support fetching flashcards.
 * 
 * Hint: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * This doesn't match the tutorial exactly, but it's a good reference :)
 */
export async function loadFlashcards() {
  try { // TODO here
    // Make a GET request to the backend endpoint for fetching flashcards

    // Check that response is OK

    // Parse JSON data (must be awaited)

    // Return the array of flashcards
    
  } catch (error) {
    console.error("Failed to fetch flashcards:", error);
    throw error;
  }
  
  // Placeholder - delete when you implement the function
  return [
    { question: "What is React?", answer: "A JavaScript library for building user interfaces." }
  ];
}