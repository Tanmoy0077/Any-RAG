import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf" || file.type === "text/csv"
    );

    if (files.length > 0) {
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf" || file.type === "text/csv"
      );
      setSelectedFiles(files);
      onFilesSelected(files);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
        ${
          dragActive
            ? "border-red-500 bg-gray-800"
            : "border-gray-600 hover:border-red-400"
        }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        multiple
        accept=".pdf,.csv"
        onChange={handleChange}
        className="hidden"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <FiUploadCloud className="mx-auto text-4xl text-red-500 mb-4" />
        <p className="text-white text-lg mb-2">
          Drag and drop your files here or click to browse
        </p>
        <p className="text-gray-400 text-sm">
          Only PDF and CSV files are supported
        </p>

        {selectedFiles.length > 0 && (
          <div className="mt-4 text-left">
            <p className="text-white mb-2">Selected files:</p>
            <ul className="list-disc pl-5 text-gray-300">
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUploader;
