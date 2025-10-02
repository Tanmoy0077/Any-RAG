import React from "react";

export const Logo: React.FC = () => {
  return (
    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-md flex items-center justify-center shadow-lg">
      <span
        className="text-white font-bold text-sm"
        style={{ fontFamily: '"Orbitron", sans-serif' }}
      >
        AR
      </span>
    </div>
  );
};
