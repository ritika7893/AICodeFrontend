import React, { useState } from "react";
import axios from "axios";
import baseurl from "./api/Apiaxios";

function CodeReview() {
  const [file, setFile] = useState(null);
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(`${baseurl}review/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setReply(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <h2>Code Review Component</h2>

      <div>
        <strong>Selected File:</strong> {file ? file.name : "No file selected"}
      </div>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button onClick={sendFile} disabled={loading}>
        {loading ? "Reviewing..." : "Send"}
      </button>

      {reply && (
        <div style={{ marginTop: "20px" }}>
          <h2>Code Review Report</h2>

          {/* Functions */}
          <div>
            <h3>Functions</h3>
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Line</th>
                </tr>
              </thead>
              <tbody>
                {reply.functions?.map((func, index) => (
                  <tr key={index}>
                    <td>{func.name}</td>
                    <td>{func.line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Classes */}
          <div style={{ marginTop: "20px" }}>
            <h3>Classes</h3>
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Line</th>
                </tr>
              </thead>
              <tbody>
                {reply.classes?.map((cls, index) => (
                  <tr key={index}>
                    <td>{cls.name}</td>
                    <td>{cls.line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Imports */}
          <div style={{ marginTop: "20px" }}>
            <h3>Imports</h3>
            <ul>
              {reply.imports?.map((imp, index) => (
                <li key={index}>{imp}</li>
              ))}
            </ul>
          </div>

          {/* Security Issues */}
          <div style={{ marginTop: "20px" }}>
            <h3>Security Issues</h3>

            {reply.static_issues?.map((issue, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid red",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Type:</strong> {issue.type}
                </p>

                <p>
                  <strong>Severity:</strong> {issue.severity}
                </p>

                <p>
                  <strong>Description:</strong> {issue.description}
                </p>
              </div>
            ))}
          </div>

          {/* AI Review */}
          <div style={{ marginTop: "20px" }}>
            <h3>AI Review Suggestions</h3>

            {reply.ai_review?.issues?.map((issue, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Line:</strong> {issue.line}
                </p>

                <p>
                  <strong>Issue:</strong> {issue.error}
                </p>

                <p>
                  <strong>Suggested Fix:</strong> {issue.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeReview;
