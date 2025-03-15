"use client";

import CustomTemplates from "@/components/CustomTemplates";
import FileUploader from "@/components/FileUploader";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
      <FileUploader />
      <CustomTemplates />
    </div>
  );
}
