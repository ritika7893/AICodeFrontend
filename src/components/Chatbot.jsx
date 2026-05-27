import React, { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "./api/Apiaxios";
import "../assets/css/chatbot.css";

function Chatbot() {
  const [reply, setReply] = useState("");

  useEffect(() => {
    axios
      .post(`${baseurl}chatbot/`, {
        prompt: "Hello Gemini",
      })
      .then((response) => {
        console.log(response.data);
        setReply(response.data.response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="chatbot">
      <h2>Chatbot Component</h2>

      <div>
        <strong>User:</strong> Hello Gemini
      </div>

      <div>
        <strong>Bot:</strong> {reply}
      </div>
    </div>
  );
}

export default Chatbot;