/**
 * FlashcardPage.jsx
 * By: Will Soylemez
 * JumboCode Fall 2025
 * 
 * This is the main page for viewing and managing flashcards! To add missing functionality,
 * you'll need to make changes in this file and in the components it uses. Good luck and have fun!
 * 
 * TODOs:
 * - Add a title to the page
 * - Implement card flipping (is that in this file?)
 * - Implement card deletion
 * - Implement adding new cards
 */

import { useState } from "react";
import PageTitle from "../components/PageTitle";
import Flashcard from "../components/Flashcard";
import AddCardModal from "../components/AddCardModal";
import { saveFlashcards, fetchFlashcards, loadFlashcards } from "../utils/api";

export default function FlashcardPage() {

  const [cards, setCards] = useState([{ question: "What is React?", answer: "A JavaScript library for building user interfaces.", favorite: false }]);

  function favoriteCard(index) {
    // Create a new array with the updated cards
    const newCards = [];
    for (let i = 0; i < cards.length; i++) {
      if (i == index) {
        const card = cards[i];
        newCards.push({ ...card, favorite: !card.favorite });
        continue;
      }

      newCards.push(cards[i]);
    }

    // Update the state with the new array
    newCards.sort((a, b) => (b.favorite === a.favorite)? 0 : b.favorite? 1 : -1);
    setCards(newCards);
  }
  
  function deleteCard(index) {
    // When modifying state that is an array or object, we need to create a new
    // array or object instead of modifying the existing one. This is because
    // React relies on detecting changes to state to know when to re-render
    // components, and it can't detect changes if we modify the existing
    // array or object directly.

    // Create a new array excluding the card at the specified index
    // Hint: you can use the `filter` method on arrays to do this, or you can use
    // a loop to copy all elements except the one at `index`.
    const newCards = [];
    for (let i = 0; i < cards.length; i++) {
      if (i != index) newCards.push(cards[i]);
    }

    // Update the state with the new array
    newCards.sort((a, b) => (b.favorite === a.favorite)? 0 : b.favorite? 1 : -1);
    setCards(newCards);
  }

  function flipCard(index) {
    // Create a new array with the updated cards
    const newCards = [];
    for (let i = 0; i < cards.length; i++) {
      if (i == index) {
        const card = cards[i];
        newCards.push({ ...card, flipped: !card.flipped });
        continue;
      }
      newCards.push(cards[i]);
    }

    // Update the state with the new array
    newCards.sort((a, b) => (b.favorite === a.favorite)? 0 : b.favorite? 1 : -1);
    setCards(newCards);
  }

  function handleAddCard(newCard) {
    // Like with deleteCard, we need to create a new array instead of modifying
    // the existing one directly.

    // Create a new array that includes all existing cards plus the new card
    const newCards = [];
    for (let i = 0; i < cards.length; i++) newCards.push(cards[i]);
    newCards.push(newCard);

    // Update the state with the new array
    newCards.sort((a, b) => (b.favorite === a.favorite)? 0 : b.favorite? 1 : -1);
    setCards(newCards);
  }

  /*
  * This function is called when the "Save Flashcards" button is clicked.
  * It sends the current list of flashcards to the backend server to be saved.
  */
  function handleSave() {
    saveFlashcards(cards)
      .then(response => {
        alert("Flashcards saved successfully!");
      })
      .catch(error => {
        alert("Failed to save flashcards.");
        console.error("Error saving flashcards:", error);
      });
  }

  /*
  * This function is called when the "Load Flashcards" button is clicked.
  * It fetches the list of flashcards from the backend server.
  */
  async function handleLoad() {
    loadFlashcards()
      .then(fetchedCards => {
        // Update the state with the fetched cards
        setCards(fetchedCards);
        alert("Flashcards loaded successfully!");
      })
      .catch(error => {
        alert("Failed to load flashcards.");
        console.error("Error loading flashcards:", error);
      });
  }


  return (
    <div className="flex flex-col items-center m-5">
      {
        /**
         * This is the title for this page defined as a PageTitle component.
         * Can you find where the PageTitle component declaration is?
         */
      }
      <PageTitle contents="Flashcards!" />

      {
        // If there are no cards, display a message saying so
        cards.length === 0 ? (
          <p>No flashcards available. Please add some!</p>
        ) : (
          // Map over the cards and render a Flashcard for each one
          cards.map((card, index) => (
            <Flashcard
              key={index}
              question={card.question}
              answer={card.answer}
              favorite={card.favorite}
              flipped={card.flipped}
              onFavorite={() => favoriteCard(index)}
              onDelete={() => deleteCard(index)}
              onFlip={() => flipCard(index)}
            />
          ))
        )
      }

      {/* AddCardModal component to add new cards */}
      <AddCardModal onAddCard={handleAddCard} />
    </div>
  )
}