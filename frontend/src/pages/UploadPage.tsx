import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FileUploader from "../components/FileUploader";
import ProcessingStatus from "../components/ProcessingStatus";
import Button from "../components/Button";
import { processDocuments } from "../utils/documentProcessor";
import { FiArrowRight } from "react-icons/fi";
// import { toast } from "react-toastify";

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const processingSteps = [
    "Preparing upload",
    "Uploading documents",
    "Processing content",
    "Building knowledge base",
    "Ready for chat",
  ];

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);

    try {
      await processDocuments(files, (step) => {
        setCurrentStep(step);
      });

      // Navigate to chat page after processing is complete
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    } catch (error) {
      console.error("Error processing documents:", error);
      setError(
        error instanceof Error ? error.message : "Failed to process documents"
      );
      setIsProcessing(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar />

      <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center">
        {!isProcessing && (
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-white">
              Upload Your Documents
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12">
              Select up to 5 PDF or CSV files to begin the analysis.
            </p>
          </div>
        )}

        <div className="max-w-2xl w-full mx-auto">
          {isProcessing ? (
            <ProcessingStatus
              currentStep={currentStep}
              steps={processingSteps}
            />
          ) : (
            <div>
              <FileUploader onFilesSelected={handleFilesSelected} />
              {error && (
                <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300">
                  {error}
                </div>
              )}
              <div className="mt-8 text-center">
                <Button
                  onClick={handleSubmit}
                  disabled={files.length === 0}
                  variant="primary"
                  className="inline-flex items-center text-lg px-10 py-4 transform transition-transform duration-300 hover:scale-105"
                >
                  Process Documents
                  <FiArrowRight className="ml-3" />
                </Button>
                <p className="mt-6 text-gray-400 text-sm">
                  Maximum 5 files, 10MB each.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
