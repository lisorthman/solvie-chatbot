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
    <div className="chat-app">
      {/* Header */}
      <header className="chat-header">💬 Solvie Chatbot</header>

      {/* Chat Window */}
      <ChatWindow messages={messages} isTyping={isTyping} />

      {/* Input */}
      <InputBox onSend={handleSend} />
    </div>
  );
}

export default App;
