import React, { useState } from "react";

function FifteenQ() {
  const [profile, setProfile] = useState({
    name: "Harshitha",
    email: "harshi@example.com",
    phone: "9876543210",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Profile Object in State</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Name:{" "}
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={{ marginBottom: "5px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Email:{" "}
          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            style={{ marginBottom: "5px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Phone:{" "}
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </label>
      </div>

      <h3>Preview:</h3>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
    </div>
  );
}

export default FifteenQ;
