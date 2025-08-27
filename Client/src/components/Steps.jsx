import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const Steps = () => {
  return (
    <section
      className="flex flex-col items-center justify-center my-32 px-4"
      aria-labelledby="steps-heading"
    >
      <h1
        id="steps-heading"
        className="text-3xl sm:text-4xl font-semibold mb-2 text-center"
      >
        How it works?
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Transform words into stunning images
      </p>

      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => (
          <motion.article
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="flex items-center gap-4 p-5 px-8 bg-white shadow-md border rounded-lg hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              width={40}
              src={item.icon}
              alt="" // decorative, since title/description already provide context
              aria-hidden="true"
              className="flex-shrink-0"
            />
            <div>
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="text-gray-500">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Steps;
