import React from "react";
import { assets, testimonialsData } from "../assets/assets";

const Testimonials = () => {
  return (
    <section
      className="flex flex-col items-center justify-center my-20 px-4 sm:px-12"
      aria-label="Customer testimonials section"
    >
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
          Customer Testimonials
        </h1>
        <p className="text-gray-500">What our users are saying</p>
      </header>

      <div className="flex flex-wrap justify-center gap-8" role="list">
        {testimonialsData.map((testimonial, index) => (
          <figure
            key={index}
            role="listitem"
            className="bg-white p-8 rounded-xl shadow-md max-w-sm flex-1 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={testimonial.image}
                alt={`Portrait of ${testimonial.name}`}
                className="rounded-full w-14 h-14 object-cover"
                loading="lazy"
              />
              <figcaption className="mt-3">
                <h2 className="text-xl font-semibold">{testimonial.name}</h2>
                <p className="text-gray-500">{testimonial.role}</p>
              </figcaption>

              <div
                className="flex my-3"
                aria-label={`Rated ${testimonial.stars} out of 5 stars`}
              >
                {Array.from({ length: testimonial.stars }).map(
                  (_, starIndex) => (
                    <img
                      key={starIndex}
                      src={assets.rating_star}
                      alt=""
                      aria-hidden="true"
                      className="w-4 h-4"
                      loading="lazy"
                    />
                  )
                )}
              </div>

              <blockquote className="text-sm text-gray-600 italic">
                “{testimonial.text}”
              </blockquote>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
