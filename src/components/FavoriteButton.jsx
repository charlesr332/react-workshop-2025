/**
 * FavoriteButton.jsx
 * By: Charles Rowe
 * JumboCode Fall 2025
 *
 * Favorite button component for flashcards. Devs shouldn't
 * need to modify this file to favorite cards!
 */

export default function FavoriteButton({ onFavorite, favorite }) {

  // Function to handle favorite button click
  const handleFavorite = (e) => {
    e.stopPropagation(); // This prevents the card from flipping when the favorite button is clicked
    onFavorite();
  };

  return (
    <button
      onClick={handleFavorite}
      className={
        `text-xl absolute top-2 left-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center font-bold transition-colors
            ${favorite ? 'text-yellow-400' : 'text-white'}`
      }
    >
      ♥
    </button>
  );
}