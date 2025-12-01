import React, { useState } from "react";

function FiveQ() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents page reload
    setSubmittedData({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div>
      <h2>Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "15px" }}>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}

export default FiveQ;
