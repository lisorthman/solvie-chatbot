export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  // Convert message text into paragraphs for newlines
  const formatMessage = (text) => {
    // Split by newlines
    return text.split(/\n/).map((line, idx) => {
      // Check for numbered list
      if (/^\d+\./.test(line.trim())) {
        return <li key={idx}>{line.trim().replace(/^\d+\.\s*/, "")}</li>;
      }
      // Check for bullet points
      if (/^[-*]/.test(line.trim())) {
        return <li key={idx}>{line.trim().replace(/^[-*]\s*/, "")}</li>;
      }
      return <p key={idx} style={{ margin: "2px 0" }}>{line}</p>;
    });
  };

  return (
    <div className={`chat-message ${isUser ? "user" : "ai"}`}>
      {!isUser && <div className="avatar">🤖</div>}

      <div className="bubble">
        {formatMessage(message.text)}
        <div className="timestamp">{message.timestamp}</div>
      </div>

      {isUser && <div className="avatar">👤</div>}
    </div>
  );
}
