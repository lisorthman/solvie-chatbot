import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import { sendQuestion } from "./services/api";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
  if (!text) return;

  setMessages((prev) => [...prev, { role: "user", text }]);

  try {
    const answer = await sendQuestion(text);

    // Preserve line breaks and bullet points
    const formattedAnswer = answer.replace(/\n/g, "\n");

    setMessages((prev) => [...prev, { role: "ai", text: formattedAnswer }]);
  } catch (error) {
    console.error(error);
    setMessages((prev) => [...prev, { role: "ai", text: "❌ Error contacting server." }]);
  }
};


  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Solvie Chatbot</h2>
      <ChatWindow messages={messages} />
      <InputBox onSend={handleSend} />
    </div>
  );
}

export default App;
