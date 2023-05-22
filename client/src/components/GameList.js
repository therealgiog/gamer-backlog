import React from 'react';
import './GameList.css';

function GameList({ gameList }) {
  console.log("GameList", gameList);

  return (
    <ul>
      {gameList.map((game) => (
        <li key={game._id}>{game.title}</li>
      ))}
    </ul>
  )
}

export default GameList;