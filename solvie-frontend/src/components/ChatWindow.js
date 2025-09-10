import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages, isTyping }) {
  const chatEndRef = useRef(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

      {/* Typing indicator */}
      {isTyping && (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <img
            src="https://i.imgur.com/6VBx3io.png"
            alt="AI"
            style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "8px" }}
          />
          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
