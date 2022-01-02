import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import About from "./pages/About";
import FlashMessage from "./components/flashMessage";

export default function App() {
  return (

     
      <Router>
         <FlashMessage/>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

  );
}



function NotFound() {
  return (
    <div>
      <h2>404 klaida</h2>
    </div>
  );
}
