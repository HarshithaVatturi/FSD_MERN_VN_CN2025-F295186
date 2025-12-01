import React, { useEffect, useState } from "react";
import axios from "axios";

function SeventeenQ() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users/1")
      .then((res) => {
        const { firstName, lastName, email } = res.data;
        setUser({ firstName, lastName, email });
      })
      .catch((err) => {
        console.error(err);
        setStatus("Error fetching user details");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setStatus("");

    axios
      .put("https://dummyjson.com/users/1", user)
      .then(() => {
        setStatus("User updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        setStatus("Error updating user");
      });
  };

  return (
    <div>
      <h2>Edit & Update User (PUT)</h2>

      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            First Name:{" "}
            <input
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Last Name:{" "}
            <input
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:{" "}
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit">Update User</button>
      </form>

      {status && (
        <p style={{ marginTop: "10px" }}>
          <strong>{status}</strong>
        </p>
      )}
    </div>
  );
}

export default SeventeenQ;
