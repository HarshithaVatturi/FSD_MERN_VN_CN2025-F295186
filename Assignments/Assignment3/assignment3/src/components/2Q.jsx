import React from "react";

function LoginMessage() {
  const isLoggedIn = true; // change to false to test

  return (
    <div>
      <h2> Login </h2>
      {isLoggedIn ? (
        <p style={{ color: "lightgreen" }}>Welcome back!</p>
      ) : (
        <p style={{ color: "tomato" }}>Please log in.</p>
      )}
    </div>
  );
}

export default LoginMessage;
