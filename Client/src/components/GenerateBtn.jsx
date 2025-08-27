import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// Externalize static text for easier maintenance and internationalization
const GENERATE_BTN_CONTENT = {
  title: "See the magic. Try now",
  buttonText: "Generate Images",
  imageAlt: "Sparkling stars icon",
};

const GenerateBtn = () => {
  const { auth, ui } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    if (auth.user) {
      // User is authenticated, navigate to the result page
      navigate("/result");
    } else {
      // User is not authenticated, show the login modal
      ui.setShowLogin(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        {GENERATE_BTN_CONTENT.title}
      </h1>

      <button
        type="button"
        onClick={handleGenerateClick}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500"
      >
        {GENERATE_BTN_CONTENT.buttonText}
        <img
          src={assets.star_group}
          alt={GENERATE_BTN_CONTENT.imageAlt}
          className="h-6"
        />
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
