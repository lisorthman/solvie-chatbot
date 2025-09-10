export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className="message-appear"
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "8px",
      }}
    >
      {!isUser && (
        <div style={{ marginRight: "8px" }}>
          <img
            src="https://i.imgur.com/6VBx3io.png"
            alt="AI"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        </div>
      )}
      <div
        style={{
          backgroundColor: isUser ? "#007bff" : "#e5e5ea",
          color: isUser ? "white" : "black",
          padding: "10px 15px",
          borderRadius: "20px",
          maxWidth: "70%",
          whiteSpace: "pre-line",
        }}
      >
        {message.text}
        <div
          style={{
            fontSize: "10px",
            textAlign: "right",
            marginTop: "5px",
            opacity: 0.6,
          }}
        >
          {message.timestamp}
        </div>
      </div>
      {isUser && (
        <div style={{ marginLeft: "8px" }}>
          <img
            src="https://i.imgur.com/8Km9tLL.png"
            alt="User"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
          />
        </div>
      )}
    </div>
  );
}
