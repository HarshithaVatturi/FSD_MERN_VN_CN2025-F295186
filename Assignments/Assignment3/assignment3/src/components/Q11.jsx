import React, { useEffect, useState } from "react";
import axios from "axios";

function ElevenQ() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div>
      <h2>Products from API using Axios</h2>

      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.title} – ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ElevenQ;
