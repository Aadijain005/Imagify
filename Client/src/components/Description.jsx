import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const DESCRIPTION_CONTENT = {
  title: "Create AI Images",
  subtitle: "Turn your imagination into visuals",
  article: {
    heading: "Introducing the AI-Powered Text-to-Image Generator",
    paragraph1:
      "Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.",
    paragraph2:
      "Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits—even concepts that don't yet exist—can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless.",
  },
};

const Description = () => {
  return (
    <motion.section
      initial={{ opacity: 0.2, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-center">
        {DESCRIPTION_CONTENT.title}
      </h1>
      <p className="text-gray-500 mb-8 text-center">
        {DESCRIPTION_CONTENT.subtitle}
      </p>

      <article className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src={assets.sample_img_1}
          alt="Example of an AI-generated image"
          className="w-80 xl:w-96 rounded-lg"
          loading="lazy"
        />
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            {DESCRIPTION_CONTENT.article.heading}
          </h2>
          <p className="text-gray-600 mb-4">
            {DESCRIPTION_CONTENT.article.paragraph1}
          </p>
          <p className="text-gray-600">
            {DESCRIPTION_CONTENT.article.paragraph2}
          </p>
        </div>
      </article>
    </motion.section>
  );
};

export default Description;
