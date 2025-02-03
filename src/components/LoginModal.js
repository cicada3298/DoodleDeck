"use client";
import { useState } from "react";
import { logIn } from "@/lib/authService";
import { motion } from "framer-motion";
import { googleSignIn } from "@/lib/authService";

const LoginModal = ({ closeModal, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await logIn(email, password);
      //   alert("Login successful!");
      closeModal(); // Close modal
    } catch (error) {
      setErrorMessage("Invalid email or password");
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
        <h2 className="text-2xl font-semibold mb-4 text-white">Login</h2>

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
          className="w-full bg-white bg-opacity-30 border-none rounded-md p-2 mb-4 text-white placeholder-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </button>
          
          <button
            onClick={switchToSignup}
            className="text-gray-300 hover:text-white"
          >
            New member?
          </button>
        </div>
        <button
        onClick={async () => {
          try {
            await googleSignIn();
            closeModal();
          } catch (error) {
            setErrorMessage("Google login failed"); // Show error below inputs
          }
        }}
        className="bg-red-500 text-white p-2 rounded-md w-full"
      >
        Sign in with Google
      </button>
      </motion.div>
    </div>
  );
};

export default LoginModal;
