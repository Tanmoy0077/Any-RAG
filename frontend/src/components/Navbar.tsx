import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
          <span
            className="text-xl font-bold"
            style={{ fontFamily: '"Orbitron", sans-serif' }}
          >
            Any RAG
          </span>
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-red-500 transition-colors">
            Home
          </Link>
          <a href="/#features" className="hover:text-red-500 transition-colors">
            Features
          </a>
          <a href="/#about" className="hover:text-red-500 transition-colors">
            About
          </a>
          <Link
            to="/upload"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
