// src/components/ChatWindow.js
export default function ChatWindow({ messages }) {
  return (
    <div
      style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            backgroundColor: msg.role === "user" ? "#007bff" : "#e5e5ea",
            color: msg.role === "user" ? "white" : "black",
            padding: "10px 15px",
            borderRadius: "20px",
            maxWidth: "80%",
            whiteSpace: "pre-line", // preserves line breaks
          }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}
