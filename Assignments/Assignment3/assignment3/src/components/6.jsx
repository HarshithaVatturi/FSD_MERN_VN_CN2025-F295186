import React from "react";

function SixQ() {
  const products = [
    { id: 1, name: "Dresses", price: 600 },
    { id: 2, name: "Accesorry", price: 250 },
    { id: 3, name: "Shoes", price: 300 },
  ];

  return (
    <div>
      <h2>Products Table</h2>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", marginTop: "10px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Price (₹)</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SixQ;
