import React from "react";

interface LandingFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const LandingFeatureCard: React.FC<LandingFeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="relative p-6 rounded-lg bg-gray-800/50 border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-transparent rounded-lg opacity-50"></div>
      <div className="relative z-10">
        <div className="text-red-500 mb-4 text-4xl">{icon}</div>
        <h3 className="text-white text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default LandingFeatureCard;
