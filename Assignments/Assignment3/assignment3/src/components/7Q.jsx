import React from "react";

// Child Component
function ChildButton({ showAlert }) {
  return (
    <button
      onClick={showAlert}
      style={{
        padding: "10px 20px",
        marginTop: "10px",
        cursor: "pointer",
      }}
    >
      Click Me (Child)
    </button>
  );
}

// Parent Component
function SevenQ() {
  const showAlert = () => {
    alert("Hello! This alert is triggered from the parent component.");
  };

  return (
    <div>
      <h2>Parent to Child Function</h2>
      <ChildButton showAlert={showAlert} />
    </div>
  );
}

export default SevenQ;
