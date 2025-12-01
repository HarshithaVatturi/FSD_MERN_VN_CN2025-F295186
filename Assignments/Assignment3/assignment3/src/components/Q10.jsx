import React from "react";
import products from "../data.json";

function TenQ() {
  return (
    <div>
      <h2>Display Products from data.json</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              width: "180px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TenQ;
