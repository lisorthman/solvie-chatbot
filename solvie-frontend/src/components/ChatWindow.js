import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatWindow({ messages, isTyping }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <ChatMessage key={idx} message={msg} />
      ))}

      {isTyping && (
        <div className="chat-message ai typing">
          <div className="avatar">🤖</div>
          <div className="typing-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
}
