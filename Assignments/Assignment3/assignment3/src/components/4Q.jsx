import React, { useState } from "react";

function FourQ() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <h2>Display your username</h2>

      <input
        type="text"
        placeholder="Type your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          width: "200px",
        }}
      />

      <p>
        <strong>You typed: </strong> {username}
      </p>
    </div>
  );
}

export default FourQ;
