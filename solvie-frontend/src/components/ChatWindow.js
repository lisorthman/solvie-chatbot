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
        flex: 1,
        overflowY: "auto",
        padding: "15px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(15px)",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          {/* AI avatar */}
          <img
            src="https://i.imgur.com/6VBx3io.png"
            alt="AI"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              marginRight: "10px",
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
          />

          {/* Glass bubble typing */}
          <div
            style={{
              display: "flex",
              gap: "5px",
              padding: "8px 12px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
              alignItems: "center",
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
