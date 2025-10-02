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
  return (
    <div className="mt-8">
      <h3 className="text-white text-xl mb-4">Processing Documents</h3>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-md
              ${index === currentStep ? "bg-gray-800" : "bg-transparent"}`}
          >
            {index < currentStep ? (
              <FiCheckCircle className="text-green-500 text-xl" />
            ) : index === currentStep ? (
              <FiLoader className="text-red-500 text-xl animate-spin" />
            ) : (
              <div className="w-5 h-5 rounded-full border border-gray-600" />
            )}
            <span
              className={`
              ${
                index < currentStep
                  ? "text-green-500"
                  : index === currentStep
                  ? "text-white"
                  : "text-gray-500"
              }
            `}
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
