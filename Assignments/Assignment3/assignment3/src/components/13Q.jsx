import React, { useState } from "react";

function ThirteenQ() {
  const [fruits] = useState(["Apple", "Banana", "Mango", "Orange"]);

  return (
    <div>
      <h2>Display Fruits List</h2>

      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default ThirteenQ;
