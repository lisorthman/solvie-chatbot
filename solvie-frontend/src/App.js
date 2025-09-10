import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import { sendQuestion } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text, timestamp }]);

    try {
      const answer = await sendQuestion(text);
      const aiTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [...prev, { role: "ai", text: answer, timestamp: aiTimestamp }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "❌ Error contacting server.", timestamp }]);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Solvie Chatbot</h2>
      <ChatWindow messages={messages} />
      <InputBox onSend={handleSend} />
    </div>
  );
}

export default App;
