import React from "react";
import { FiLoader, FiCheckCircle } from "react-icons/fi";

interface ProcessingStatusProps {
  currentStep: number;
  steps: string[];
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  currentStep,
  steps,
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h3 className="text-white text-2xl font-bold mb-6 text-center">
        Processing Documents
      </h3>
      <div className="relative w-full h-2 bg-gray-700 rounded-full mb-6">
        <div
          className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
              index === currentStep
                ? "bg-gray-800 shadow-md"
                : "bg-transparent"
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 mr-4">
              {index < currentStep ? (
                <FiCheckCircle className="text-green-500 text-xl" />
              ) : index === currentStep ? (
                <FiLoader className="text-red-500 text-xl animate-spin" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
              )}
            </div>
            <span
              className={`font-medium ${
                index < currentStep
                  ? "text-green-500"
                  : index === currentStep
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessingStatus;