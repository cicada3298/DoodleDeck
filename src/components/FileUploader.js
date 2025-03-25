"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FileUploader() {
  const [isDragging, setIsDragging] = useState(null);
  const router = useRouter();

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if(file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave = () => {
    setIsDragging(false);
  }

  const processFile = (file) => {
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        localStorage.setItem("uploadedImage", imageUrl);
        router.push("/editor");
      };
    }
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    processFile(file);
  }

  return (
    <div>
      <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`p-6 border-2 border-dashed rounded cursor-pointer ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <p className="text-center text-gray-500">
        {isDragging
          ? "Drop the image here..."
          : "Drag & Drop an image or click to upload"}
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-4 p-2 border rounded"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="block mt-2 text-center text-blue-600 cursor-pointer"
      >
        Upload Image
      </label>
    </div>
    </div>
  );
}
