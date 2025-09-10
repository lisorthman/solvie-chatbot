import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import { sendQuestion } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text) => {
    if (!text) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text, timestamp }]);
    setIsTyping(true);

    try {
      const answer = await sendQuestion(text);
      const aiTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages((prev) => [...prev, { role: "ai", text: answer, timestamp: aiTimestamp }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error contacting server.", timestamp },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(270deg, #ff6a00, #ee0979, #6a11cb, #2575fc)",
        backgroundSize: "600% 600%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      {/* Chat container */}
      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          padding: "20px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "15px",
            textShadow: "0 0 10px rgba(255,255,255,0.6)",
          }}
        >
          💬 Solvie Chatbot
        </h2>
        <ChatWindow messages={messages} isTyping={isTyping} />
        <InputBox onSend={handleSend} />
      </div>

      {/* CSS for background animation */}
      <style>
        {`
          @keyframes gradientShift {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </div>
  );
}

export default App;
