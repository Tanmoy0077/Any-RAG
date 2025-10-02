import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LandingFeatureCard from "../components/LandingFeatureCard";
import Button from "../components/Button";
import {
  FiFileText,
  FiMessageSquare,
  FiZap,
  FiGithub,
  FiArrowRight,
} from "react-icons/fi";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        <div className="relative container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
              Chat with your Documents using AI
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10">
              Upload your PDFs and CSVs, then ask questions and get instant,
              accurate answers powered by advanced AI.
            </p>
            <Link to="/upload">
              <Button
                variant="primary"
                className="inline-flex items-center text-lg px-10 py-4 transform transition-transform duration-300 hover:scale-105"
              >
                Get Started
                <FiArrowRight className="ml-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              An Advanced Agentic RAG System
            </h2>
            <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
              Any RAG provides a seamless experience for turning your documents
              into interactive sources of information.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LandingFeatureCard
              title="Collaborative Agents"
              description="Multiple agents collaborate to understand and solve your queries effectively."
              icon={<FiFileText />}
            />
            <LandingFeatureCard
              title="Cost-Effective Caching"
              description="Utilizes Redis for semantic caching to reduce LLM costs and provide faster responses."
              icon={<FiMessageSquare />}
            />
            <LandingFeatureCard
              title="Up-to-date Information"
              description="Leverages web search to gather the most current information to answer your questions."
              icon={<FiZap />}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">About Any RAG</h2>
          <div className="max-w-3xl mx-auto text-gray-300">
            <p className="mb-6">
              Any RAG (Retrieval-Augmented Generation) is an advanced document
              interaction platform that combines the power of AI with your own
              documents.
            </p>
            <p className="mb-8">
              Our technology processes your PDFs and CSVs, making their content
              available for intelligent querying. Whether you're analyzing
              reports, extracting data from tables, or trying to find specific
              information in lengthy documents, Any RAG makes it simple.
            </p>
            <a
              href="https://github.com/Tanmoy0077/Any-RAG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button
                variant="secondary"
                className="inline-flex items-center text-lg px-8 py-3"
              >
                <FiGithub className="mr-3" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-500">
          <p>© {new Date().getFullYear()} Any RAG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
