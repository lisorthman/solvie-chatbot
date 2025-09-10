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
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "15px",
        paddingTop: "10px",
      }}
    >
      {/* Glass-style input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        style={{
          flex: 1,
          padding: "12px 18px",
          borderRadius: "25px",
          border: "none",
          outline: "none",
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          color: "white",
          fontSize: "16px",
        }}
      />

      {/* Gradient send button */}
      <button
        type="submit"
        style={{
          padding: "12px 20px",
          borderRadius: "25px",
          border: "none",
          background: "linear-gradient(135deg, #00c6ff, #0072ff)",

          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Send
      </button>
    </form>
  );
}
