import { useState } from "react";

export default function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSend(text.trim());
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", marginTop: "10px" }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: "10px 15px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: "20px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </form>
  );
}
