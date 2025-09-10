import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages }) {
  const chatEndRef = useRef(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      }}
    >
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
