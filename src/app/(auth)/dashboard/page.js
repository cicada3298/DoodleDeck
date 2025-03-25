"use client";

import CustomTemplates from "@/components/CustomTemplates";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FileUploader from "@/components/FileUploader";

export default function Dashboard() {
  const router = useRouter();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
      <div className="my-6 flex justify-center">
        <button
          onClick={() => router.push("/editor")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
        >
          Create Design
        </button>
      </div>
      <CustomTemplates />
    </div>
  );
}
