/**
 * App.jsx
 * 
 * Root React Component that wraps and renders the main application.
 * Handles routing and global layouts for the client-side app.
 */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import Transactions from "./components/Transactions";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/bar-chart" element={<BarChart />} />
          <Route path="/pie-chart" element={<PieChart />} />
          <Route path="/contact" element={<Contact />} />
         </Routes>
      </Router>
    </>
  )
}

export default App
