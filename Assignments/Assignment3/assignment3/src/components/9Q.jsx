import React, { useState } from "react";

function NineQ() {
  const students = ["Harshitha","Vatturi", "Abc", "Xyz","Lmn"];

  const [search, setSearch] = useState("");

  const filtered = students.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Search Student Names</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
      />

      <ul>
        {filtered.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NineQ;
