import React, { useEffect, useState } from "react";
import axios from "axios";

function TwelveQ() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3 style={{ color: "red" }}>{error}</h3>;
  }

  return (
    <div>
      <h2>API with Loading & Error Handling</h2>

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

export default TwelveQ;
