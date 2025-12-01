import React, { useState } from "react";

function EightQ() {
  const products = [
    { name: "TV", category: "Electronics" },
    { name: "Laptop", category: "Electronics" },
    { name: "Shirt", category: "Clothes" },
    { name: "Jeans", category: "Clothes" },
  ];

  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((item) => item.category === filter);

  return (
    <div>
      <h2>Filter Products By Category</h2>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("All")} style={{ marginRight: "10px" }}>
          All
        </button>
        <button
          onClick={() => setFilter("Electronics")}
          style={{ marginRight: "10px" }}
        >
          Electronics
        </button>
        <button onClick={() => setFilter("Clothes")}>Clothes</button>
      </div>

      <ul>
        {filteredProducts.map((item, index) => (
          <li key={index}>
            {item.name} – <strong>{item.category}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EightQ;
