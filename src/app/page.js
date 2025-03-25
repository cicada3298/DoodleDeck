"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Assuming you have an AuthContext
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const { user } = useAuth(); // Get the authenticated user
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [user]);
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      {/* <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-blue-600">DoodleDeck 🎨</h1>
          <div>
            <a href="#" className="px-4 text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="px-4 text-gray-700 hover:text-blue-600">Features</a>
            <a href="#" className="px-4 text-gray-700 hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <header className="bg-gray-700 text-white text-center py-20">
        <h2 className="text-4xl font-bold">Create Stunning Campus Designs</h2>
        <p className="mt-4 text-lg">Design posters, social media graphics, and more with ease.</p>
        <a href="/dashboard" className="mt-6 inline-block px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md font-semibold">Get Started</a>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800">Features</h3>
        <div className="mt-10 space-y-12">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center md:space-x-10">
            <Image src="/draganddrop.png" alt="Drag and Drop Editor" width={500} height={300} className="h-[300px] rounded-lg shadow-lg" />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">Drag & Drop Editor</h4>
              <p className="text-gray-600 mt-2">Easily create posters and designs using our intuitive drag-and-drop interface.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center md:space-x-10">
            <Image src="/template.jpg" alt="Customizable Templates" width={500} height={300} className="h-[300px] rounded-lg shadow-lg" />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">Customizable Templates</h4>
              <p className="text-gray-600 mt-2">Choose from a variety of pre-made templates and customize them to match your event or club theme.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center md:space-x-10">
            <Image src="/formats.png" alt="Export in Multiple Formats" width={500} height={300} className="h-[300px] rounded-lg shadow-lg" />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">Export in Multiple Formats</h4>
              <p className="text-gray-600 mt-2">Download your designs as PNG, JPG, or PDF for easy sharing and printing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
    <Footer />
    </>
  );
}
