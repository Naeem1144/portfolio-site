
"use client";
import { Link } from "@heroui/react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Naeem1144"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/naeemnagori/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </Link>
            <Link href="mailto:aknaeem246@gmail.com" aria-label="Email">
              <FaEnvelope size={24} />
            </Link>
          </div>
          <div>
            <p className="text-sm text-gray-400">
              © {year} Naeem. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
