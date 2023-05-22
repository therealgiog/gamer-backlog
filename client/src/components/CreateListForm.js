import React, { useState } from 'react';
import './CreateListForm.css';

function CreateListForm({ onCreateList }) {
  const [listName, setListName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onCreateList(listName);
    setListName('');
  };

  const handleChange = (e) => {
    setListName(e.target.value);
  };

  return (
    <div className="CreateListForm">
    <form onSubmit={handleSubmit}>
      <label htmlFor="listName">or create a new list:</label>
      <input
        type="text"
        id="listName"
        name="listName"
        value={listName}
        onChange={handleChange}
        />
      <button type="submit">+</button>
    </form>
    </div>
  )
}

export default CreateListForm;


