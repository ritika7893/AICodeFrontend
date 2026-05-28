import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/Navbars";
import Chatbot from "./components/Chatbot";
import Footer from "./components/footer/Footer";
import CodeReview from "./components/CodeReview";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/CodeReview" element={<CodeReview />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
