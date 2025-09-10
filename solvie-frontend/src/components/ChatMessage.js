export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className="message-appear"
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "10px",
        alignItems: "flex-end",
      }}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div style={{ marginRight: "10px" }}>
          <img
            src="https://i.imgur.com/6VBx3io.png"
            alt="AI"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}

      {/* Chat Bubble */}
      <div
        style={{
          background: isUser
            ? "linear-gradient(135deg, #6a11cb, #2575fc)"
            : "rgba(255, 255, 255, 0.85)",
          color: isUser ? "white" : "black",
          padding: "12px 18px",
          borderRadius: "25px",
          maxWidth: "75%",
          whiteSpace: "pre-line",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          animation: "fadeIn 0.4s ease forwards",
          wordBreak: "break-word",
        }}
      >
        {message.text}

        {/* Timestamp */}
        <div
          style={{
            fontSize: "10px",
            textAlign: "right",
            marginTop: "6px",
            opacity: 0.6,
          }}
        >
          {message.timestamp}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div style={{ marginLeft: "10px" }}>
          <img
            src="https://i.imgur.com/8Km9tLL.png"
            alt="User"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
}
