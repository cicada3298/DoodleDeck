"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const [modalType, setModalType] = useState(null); // 'login' or 'signup'

  return (
    <>
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-gray-700 text-2xl font-semibold">
            DoodleDeck 🎨
          </Link>

          {/* Navigation Links */}
          <div className="space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/features" className="text-gray-700 hover:text-blue-600">
              Features
            </Link>
            <button
              onClick={() => setModalType("login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Login / Signup Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-96 border border-white/30"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalType(null)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
            >
              ❌
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-semibold mb-4 text-white">
              {modalType === "login" ? "Login" : "Sign Up"}
            </h2>

            {/* Username Input */}
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-white bg-opacity-30 border-none rounded-md p-2 mb-3 text-white placeholder-white outline-none"
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white bg-opacity-30 border-none rounded-md p-2 mb-3 text-white placeholder-white outline-none"
            />

            {/* Confirm Password (Only for Signup) */}
            {modalType === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-white bg-opacity-30 border-none rounded-md p-2 mb-4 text-white placeholder-white outline-none"
              />
            )}

            {/* Buttons */}
            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                {modalType === "login" ? "Login" : "Sign Up"}
              </button>
              <button
                onClick={() => setModalType(modalType === "login" ? "signup" : "login")}
                className="text-gray-300 hover:text-white"
              >
                {modalType === "login" ? "New member?" : "Already have an account?"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Navbar;
