import React, { useState } from "react";
import axios from "axios";
import baseurl from "./api/Apiaxios";
import "../assets/css/chatbot.css";

function Chatbot() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (!prompt.trim()) return;

    setLoading(true);
    
    axios
      .post(`${baseurl}chat/`, {
        prompt: prompt,
      })
      .then((response) => {
        console.log(`${baseurl}chat/`);
        console.log(response.data);
        setReply(response.data.response);
      })
      .catch((error) => {
        console.log(`${baseurl}chat/`);
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="chatbot">
      <h2>Chatbot Component</h2>

      <div>
        <strong>User:</strong> {prompt}
      </div>

      <div>
        <strong>Bot:</strong> {loading ? "Typing..." : reply}
      </div>

      <input
        type="text"
        value={prompt}
        placeholder="Type your message..."
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
