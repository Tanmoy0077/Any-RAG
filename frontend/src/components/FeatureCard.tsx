import React from "react";

interface FeatureCardProps {
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  description,
  icon,
  onClick,
}) => {
  return (
    <div
      className="relative p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer w-64"
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-transparent rounded-lg opacity-50"></div>
      <div className="relative z-10 flex items-center">
        <div className="text-red-500 mr-3 text-2xl">{icon}</div>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
