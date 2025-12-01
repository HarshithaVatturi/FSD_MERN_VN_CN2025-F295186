import React from "react";

function ProfileCard({ name, role, image }) {
  return (
    <div
      style={{
        width: "200px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
      />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

function ThreeQ() {
  return (
    <div>
      <h2>Profile Cards</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <ProfileCard
          name="Harshitha"
          role="Student"
        //   image="assignment3\src\components\1Q.jsx"
        image="/5.jpg"

        />
        <ProfileCard
          name="Vatturi"
          role="Student"
           image="/3.jpg"
        />
        <ProfileCard
          name="Abc"
          role="Student"
        image="/4.jpg"
        />
      </div>
    </div>
  );
}

export default ThreeQ;
