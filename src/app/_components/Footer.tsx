"use client";
import React from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="py-6 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/your-github-username/your-repo-name"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition-colors"
        >
          <FaGithub size={24} />
        </a>
        <span className="font-semibold">SpeakUp</span>
      </div>
      <p>
        © {new Date().getFullYear()} Mohd Ashkan Khan. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
