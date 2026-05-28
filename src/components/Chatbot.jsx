import { useState, useRef, useEffect } from "react";
import axios from "axios";
import baseurl from "./api/Apiaxios";
import "../assets/css/chatbot.css";

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    axios
      .post(`${baseurl}chat/`, {
        prompt: prompt,
      })
      .then((response) => {
        const botReply = response.data.response;
        const botMessage = { text: botReply, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorMessage = { text: "Sorry, something went wrong!", sender: "bot" };
        setMessages((prev) => [...prev, errorMessage]);
      })
      .finally(() => {
        setLoading(false);
        setPrompt("");
      });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chatbot-container">
        <div className="chat-header">
          <div className="chat-avatar">AI</div>
          <h3>Chat Assistant</h3>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <p>Welcome! How can I help you today?</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))
          )}
          {loading && (
            <div className="message bot">
              <div className="message-content typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <input
            type="text"
            value={prompt}
            placeholder="Type your message..."
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
            className="chat-input"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !prompt.trim()}
            className="send-button"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>

      <div className="chat-image">
        <img
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QUklMjBjb2RpbmclMjBpbWFnZSd8ZW58MHx8MHx8fDA%3D"
          alt="AI Assistant"
        />
      </div>
    </div>
  );
}

export default Chatbot;
