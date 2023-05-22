import React, { useState } from "react";
import './SelectList.css';

function SelectList({lists, onSelect}) {
  const [selectedList, setSelectedList] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedList(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className="SelectList">
      <select value={selectedList} onChange={handleChange}>
        <option value="">Select a list</option>
        {lists.map((list) => (
          <option key={list._id} value={list.listName}>
            {list.listName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectList;
