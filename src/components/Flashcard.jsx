/**
 * Flashcard.jsx
 * By: Will Soylemez
 * JumboCode Fall 2025
 * 
 * The Flashcard component represents a single flashcard that can be flipped
 * to show either the question or the answer. It also includes a delete button
 * to remove the flashcard.
 */

import { useState } from "react";
import FavoriteButton from "./FavoriteButton";
import DeleteButton from "./DeleteButton";

export default function Flashcard({ question, answer, favorite, flipped, onDelete, onFavorite, onFlip }) {
  return (
    <div className="w-80 h-48 cursor-pointer mt-5" onClick={onFlip}>

      {/**
        * TODO: flipping animation runs incorrectly when favoriting/deleting
        * You shouldn't have to touch anything below this line. Most of this is CSS used to display the flip animation
        */}
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center p-6">

          {/* Favorite button */}
          <FavoriteButton onFavorite={onFavorite} favorite={favorite} />
          {/* Delete button */}
          <DeleteButton onDelete={onDelete} />

          <h2 className="text-xl font-semibold text-white text-center">{question}</h2>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg flex items-center justify-center p-6 rotate-y-180">
          <FavoriteButton onFavorite={onFavorite} favorite={favorite} />
          <DeleteButton onDelete={onDelete} />
          <p className="text-lg text-white text-center">{answer}</p>
        </div>
      </div>
    </div>
  )
}