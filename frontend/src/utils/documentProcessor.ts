const API_BASE_URL = "http://localhost:8000/api";

interface UploadResponse {
  status: string;
  results?: Array<{
    filename: string;
    status: string;
    chunks_processed?: number;
    message?: string;
  }>;
  message?: string;
  filename?: string;
  chunks_processed?: number;
}

/**
 * Processes uploaded documents and prepares them for AI interaction
 */
export const processDocuments = async (
  files: File[],
  onProgress: (step: number) => void
): Promise<void> => {
  try {
    // Step 1: Preparing upload
    onProgress(0);

    // Create FormData for batch upload
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    // Step 2: Uploading documents
    onProgress(1);
    const response = await fetch(`${API_BASE_URL}/data/upload/batch`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to upload documents");
    }

    const data: UploadResponse = await response.json();

    // Check for any errors in the results
    if (data.results) {
      const errors = data.results.filter((result) => result.status === "error");
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => `${error.filename}: ${error.message}`)
          .join("\n");
        throw new Error(`Some files failed to process:\n${errorMessages}`);
      }
    }

    // Step 3: Processing content
    onProgress(2);

    // Step 4: Building knowledge base
    onProgress(3);

    // Step 5: Ready for chat
    onProgress(4);

    // Save success flag
    localStorage.setItem("documentsLoaded", "true");

    return Promise.resolve();
  } catch (error) {
    console.error("Error processing documents:", error);
    throw error;
  }
};
