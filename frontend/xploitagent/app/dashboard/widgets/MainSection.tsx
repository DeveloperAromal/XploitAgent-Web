"use client";
import { useRef, useState } from "react";
import { UploadCloud, Link } from "lucide-react"; // Import the Link icon

export default function MainSection() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState<string>(""); // State for URL input
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      setUrlInput(""); // Clear URL if a file is dropped
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUrlInput(""); // Clear URL if a file is selected
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setFileName(null); // Clear file name if URL is entered
  };

  const handleSubmitUrl = () => {
    if (urlInput.trim()) {
      console.log("URL Submitted:", urlInput);
      const message = `URL Submitted: ${urlInput}`;
      const messageBox = document.createElement("div");
      messageBox.className =
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      messageBox.innerHTML = `
        <div class="bg-neutral-800 p-6 rounded-lg shadow-xl text-white max-w-sm w-full text-center">
          <p class="mb-4">${message}</p>
          <button id="closeMessageBox" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      `;
      document.body.appendChild(messageBox);
      document
        .getElementById("closeMessageBox")
        ?.addEventListener("click", () => {
          document.body.removeChild(messageBox);
        });
    } else {
      const message = "Please enter a valid URL.";
      const messageBox = document.createElement("div");
      messageBox.className =
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      messageBox.innerHTML = `
        <div class="bg-neutral-800 p-6 rounded-lg shadow-xl text-white max-w-sm w-full text-center">
          <p class="mb-4">${message}</p>
          <button id="closeMessageBox" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      `;
      document.body.appendChild(messageBox);
      document
        .getElementById("closeMessageBox")
        ?.addEventListener("click", () => {
          document.body.removeChild(messageBox);
        });
    }
  };

  return (
    <section
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="h-screen flex items-center justify-center p-4 relative overflow-hidden" // Added relative and overflow-hidden
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center py-20 px-8  border-neutral-700 rounded-lg  bg-opacity-80 shadow-lg text-center w-full max-w-2xl hover:border-blue-500 transition-colors duration-200">
        {" "}
        {/* Added max-w-2xl and bg-opacity */}
        <UploadCloud className="w-16 h-16 text-neutral-500 mb-4" />
        <h2 className="text-2xl font-semibold text-neutral-200 mb-2">
          Drag & Drop Your Project Folder
        </h2>
        <p className="text-neutral-400 mb-4">
          or{" "}
          <span
            onClick={handleBrowse}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            click to browse
          </span>
        </p>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />
        {fileName && (
          <p className="mt-4 text-green-400 text-sm">
            Selected: <span className="font-medium">{fileName}</span>
          </p>
        )}
        <div className="w-full my-6 flex items-center">
          <div className="flex-grow border-t border-neutral-700"></div>
          <span className="mx-4 text-neutral-500 text-sm">OR</span>
          <div className="flex-grow border-t border-neutral-700"></div>
        </div>
        {/* URL Input Section */}
        <div className="w-full flex flex-col gap-3 items-center">
          {" "}
          {/* Added items-center to center the input */}
          <h3 className="text-xl font-semibold text-neutral-200">
            Upload from URL
          </h3>
          <div className="relative flex items-center w-full max-w-sm">
            {" "}
            {/* Constrained width for the input */}
            <Link className="absolute left-3 text-neutral-500 w-5 h-5" />
            <input
              type="url" // Use type="url" for better mobile keyboard and validation
              placeholder="Enter project URL (e.g., GitHub repo)"
              value={urlInput}
              onChange={handleUrlChange}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 border border-neutral-700 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all duration-200"
            />
          </div>
          <button
            onClick={handleSubmitUrl}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-base font-medium max-w-sm w-full" // Constrained width for the button
          >
            Submit URL
          </button>
        </div>
      </div>
    </section>
  );
}
