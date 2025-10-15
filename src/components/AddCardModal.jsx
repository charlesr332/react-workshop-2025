/**
 * AddCardModal.jsx
 * By: Will Soylemez
 * JumboCode Fall 2025
 *
 * This component renders a modal for adding a new flashcard.
 */

import { useState } from "react";

export default function AddCardModal({ onAddCard }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    // Validate input: neither field can be empty. If either is empty, do nothing (return null).
    if (question.length == 0 || answer == 0) return null;

    // This function cannot manipulate the cards array directly (think about why!).
    // Instead, it needs to call the onAddCard function passed down from FlashcardPage and
    // provide the new card data as an argument. Call onAddCard with the new card data here:
    onAddCard({question, answer});

    // Clear the input fields after submission
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="m-5 flex flex-col gap-3 w-80 border border-black p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium">Add New Card</h3>

        {/* Input for question */}
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)} // e.target.value is the current value of the input field
          placeholder="Question"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Input for answer. Notice that this looks similar to the question input. Could it be worth
          * making a shared component for these inputs? */}
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Add a submit button to the form. Remember to call handleSubmit on click! */}
        <button
          onClick={handleSubmit}
          className="active:scale-95 transition cursor-pointer border-green-500 bg-green-500 hover:bg-green-600 rounded h-10 text-white font-bold"
        >
          Add Card
        </button>

    </div>
  );
}