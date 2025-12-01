import React from "react";

const students = [
  { name: "Harshitha", dept: "CSE", year: 4 },
  { name: "Vatturi", dept: "IT", year: 3 },
  { name: "Abc", dept: "ECE", year: 2 },
];

function Q1() {
  return (
    
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {students.map((s, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            width: "180px",
          }}
        >
          <h2>Student List</h2>
          <h4>{s.name}</h4>
          <p>Dept: {s.dept}</p>
          <p>Year: {s.year}</p>
        </div>
      ))}
    </div>
  );
}

export default Q1;
