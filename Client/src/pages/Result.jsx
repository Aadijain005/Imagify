import React, { useContext, useState } from "react";
import { assets } from "../assets/assets"; // make sure this file exports sample_img_1
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const fallbackImg = assets?.sample_img_1 || "https://via.placeholder.com/400"; // ✅ fallback

  const [image, setImage] = useState(fallbackImg);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setImageLoaded(false);

    try {
      const resultImage = await generateImage(input);
      setImage(resultImage || fallbackImg); // ✅ safe fallback
    } catch (err) {
      console.error("Image generation failed:", err);
      setImage(fallbackImg);
    }

    setLoading(false);
  };

  return (
    <motion.main
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col min-h-[90vh] justify-center items-center px-4"
      aria-label="AI image generation result"
    >
      {/* Image Preview */}
      <div>
        <div className="relative">
          <img
            src={image}
            alt="Generated preview"
            className="max-w-sm rounded"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          />
        </div>
        {loading && (
          <p className="mt-2 text-sm text-neutral-600">Generating image...</p>
        )}
      </div>

      {/* Prompt Form (always visible, just disables button) */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full"
        aria-label="Image generation form"
      >
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Describe what you want to generate"
          className="flex-1 bg-transparent outline-none ml-8 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Text prompt"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-10 sm:px-16 py-3 rounded-full transition-all duration-300 ${
            loading
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-zinc-900 hover:bg-zinc-800"
          }`}
          aria-label="Generate image"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {/* Actions */}
      {isImageLoaded && !loading && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <button
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-900"
            onClick={() => {
              setImageLoaded(false);
              setInput("");
              setImage(fallbackImg); // ✅ reset image
            }}
            aria-label="Generate another image"
          >
            Generate Another
          </button>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-900"
            aria-label="Download generated image"
          >
            Download
          </a>
        </div>
      )}
    </motion.main>
  );
};

export default Result;
