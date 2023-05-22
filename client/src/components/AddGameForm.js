import React, { useState } from 'react';
import './AddGameForm.css';

function AddGameForm({ onAddGame }) {
  const [gameTitle, setGameTitle] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onAddGame(gameTitle);
    setGameTitle('');
  };

  const handleChange = (e) => {
    setGameTitle(e.target.value);
    console.log(gameTitle);
  };

  return (
    <div className="AddGameForm">
    <form onSubmit={handleSubmit}>
      <label htmlFor="gameTitle">Add a game:</label>
      <input
        type="text"
        id="gameTitle"
        name="gameTitle"
        value={gameTitle}
        onChange={handleChange}
        />
      <button type="submit">+</button>
    </form>
    </div>
  )
}

export default AddGameForm;