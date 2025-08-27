import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// Externalize static content for better maintainability and i18n
const HEADER_CONTENT = {
  badge: "Best text to image generator",
  heading: {
    part1: "Turn text to ",
    highlight: "image",
    part2: ", in seconds",
  },
  subtext:
    "Unleash your creativity with AI. Turn your imagination into visual art in seconds — just type, and watch the magic happen.",
  button: "Generate Images",
  footer: "Generated images from Imagify",
};

const Header = () => {
  const {
    auth: { user },
    ui: { setShowLogin },
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handleGenerateClick = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Badge */}
      <motion.div
        className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>{HEADER_CONTENT.badge}</p>
        <img src={assets.star_icon} alt="Star icon" />
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {HEADER_CONTENT.heading.part1}
        <br />
        <motion.span
          className="text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.2 }}
        >
          {HEADER_CONTENT.heading.highlight}
        </motion.span>
        {HEADER_CONTENT.heading.part2}
      </motion.h1>

      {/* Subtext */}
      <motion.p
        className="text-center max-w-xl mx-auto mt-5 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        {HEADER_CONTENT.subtext}
      </motion.p>

      {/* CTA Button */}
      <motion.button
        type="button"
        onClick={handleGenerateClick}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        {HEADER_CONTENT.button}
        <img
          className="h-6"
          src={assets.star_group}
          alt="Sparkling stars icon"
        />
      </motion.button>

      {/* Sample Images */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-wrap justify-center mt-16 gap-3"
      >
        {Array(6)
          .fill(null) // Use null instead of "" for clarity
          .map((_, index) => (
            <motion.img
              key={index}
              whileHover={{ scale: 1.05 }}
              className="rounded transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt={`Sample AI image ${index + 1}`}
              width={70}
            />
          ))}
      </motion.div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-2 text-neutral-600"
      >
        {HEADER_CONTENT.footer}
      </motion.p>
    </motion.div>
  );
};

export default Header;
