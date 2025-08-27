import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import BuyCredit from "./pages/BuyCredit";
import Result from "./pages/Result";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext, useContext } from "./context/AppContext";
const App = () => {
  const { setShowLogin } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b frm-teal-50 to-orange-50">
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Login />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyCredit />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
