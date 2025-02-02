"use client";
import { useState } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuth } from "@/context/AuthContext";
import { logOut } from "@/lib/authService";

const Navbar = () => {
  const {user} = useAuth();
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
            {user ? (
            <>
              <span className="text-gray-700">Welcome, {user.email}</span>
              <button onClick={logOut} className="bg-red-600 text-white px-4 py-2 rounded-md">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setModalType("login")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
            {/*  */}
          </div>
        </div>
      </nav>

      {/* Modals */}
      {modalType === "login" && (
        <LoginModal closeModal={() => setModalType(null)} switchToSignup={() => setModalType("signup")} />
      )}
      {modalType === "signup" && (
        <SignupModal closeModal={() => setModalType(null)} switchToLogin={() => setModalType("login")} />
      )}
    </>
  );
};

export default Navbar;
