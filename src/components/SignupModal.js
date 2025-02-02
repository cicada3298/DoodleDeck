"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { signUp } from "@/lib/authService";

const SignupModal = ({ closeModal, switchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await signUp(email, password);
    //   alert("Signup successful!");
      closeModal(); // Close modal
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-lg w-96 border border-white/30"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
        >
          ❌
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold mb-4 text-white">Sign Up</h2>

        {/* Username Input */}
        <input
          type="email"
          placeholder="E-mail"
          className="w-full bg-white bg-opacity-30 border-none rounded-md p-2 mb-3 text-white placeholder-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-white bg-opacity-30 border-none rounded-md p-2 mb-3 text-white placeholder-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full bg-white bg-opacity-30 border-none rounded-md p-2 mb-4 text-white placeholder-white outline-none"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-between">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleSignup}>
            Sign Up
          </button>
          <button
            onClick={switchToLogin}
            className="text-gray-300 hover:text-white"
          >
            Already have an account?
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupModal;
