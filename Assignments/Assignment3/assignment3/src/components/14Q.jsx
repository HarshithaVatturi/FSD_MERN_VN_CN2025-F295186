import React, { useState } from "react";

function FourteenQ() {
  const [fruits, setFruits] = useState(["Apple", "Banana", "Mango"]);
  const [newFruit, setNewFruit] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newFruit.trim()) return;
    setFruits([...fruits, newFruit.trim()]);
    setNewFruit("");
  };

  const handleDelete = (fruitToRemove) => {
    setFruits(fruits.filter((fruit) => fruit !== fruitToRemove));
  };

  return (
    <div>
      <h2>Add & Delete Fruits</h2>

      <form onSubmit={handleAdd} style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Enter fruit name"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit">Add Fruit</button>
      </form>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            {fruit}{" "}
            <button onClick={() => handleDelete(fruit)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FourteenQ;
