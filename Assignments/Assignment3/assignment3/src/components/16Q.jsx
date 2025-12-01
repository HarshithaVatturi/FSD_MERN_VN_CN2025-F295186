import React, { useState } from "react";
import axios from "axios";

function SixteenQ() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("https://dummyjson.com/posts/add", {
        title: title,
        body: body,
        userId: 1,
      });

      setMessage("Post added successfully!");
      setTitle("");
      setBody("");
    } catch (error) {
      console.error(error);
      setMessage("Error adding post.");
    }
  };

  return (
    <div>
      <h2>Add Post using Axios POST</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Title:{" "}
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "250px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Body:{" "}
            <textarea
              value={body}
              required
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              style={{ width: "250px" }}
            />
          </label>
        </div>

        <button type="submit">Add Post</button>
      </form>

      {message && (
        <p style={{ marginTop: "10px" }}>
          <strong>{message}</strong>
        </p>
      )}
    </div>
  );
}

export default SixteenQ;
