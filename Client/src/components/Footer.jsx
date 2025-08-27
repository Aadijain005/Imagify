import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 py-4 mt-20 px-6 border-t border-gray-200 bg-white">
      <img
        src={assets.logo}
        alt="AI Image Generator logo"
        className="h-8"
        loading="lazy"
      />

      {/* Corrected the copyright text by removing the unnecessary period */}
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        © 2025 AI Image Generator | All rights reserved.
      </p>

      <nav aria-label="Social media links">
        <ul className="flex gap-2.5">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Facebook"
            >
              <img
                src={assets.facebook_icon}
                alt=""
                width={35}
                loading="lazy"
              />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Instagram"
            >
              <img
                src={assets.instagram_icon}
                alt=""
                width={35}
                loading="lazy"
              />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Twitter"
            >
              <img src={assets.twitter_icon} alt="" width={35} loading="lazy" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
