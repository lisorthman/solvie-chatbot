import axios from "axios";

export async function sendQuestion(question) {
  try {
    const response = await axios.post("http://localhost:8000/api/chat", { question });
    return response.data.answer; // response from backend
  } catch (error) {
    console.error("Error sending question:", error);
    return "❌ Sorry, there was an error processing your request.";
  }
}
