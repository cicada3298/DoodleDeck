import { auth } from "./firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";

const API_URL = "http://localhost:5000/api/auth"; // Backend URL

// 🔹 Helper function: Send Firebase ID token to backend
const sendTokenToBackend = async (idToken, router) => {
  try {
    const response = await fetch(`${API_URL}/firebase-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    let data;
    try {
      data = await response.json(); // Handle non-JSON responses
    } catch (jsonError) {
      throw new Error("Invalid response from server");
    }

    if (!response.ok) throw new Error(data.message || "Backend authentication failed");

    console.log("Received JWT:", data.token);

    localStorage.setItem("jwtToken", data.token);
    const { setUser } = useAuth();
    setUser(data.user);
    await router.push('/dashboard'); // Ensure JWT is stored before redirecting
    console.log("Hello");

    return data.user;
  } catch (error) {
    console.error("Backend authentication error:", error.message);
    throw error;
  }
};


// 🔹 Google Sign-In
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    return sendTokenToBackend(idToken); // Send to backend
  } catch (error) {
    console.log(error);
    throw new Error("Google login failed");
  }
};

// 🔹 GitHub Sign-In
export const githubSignIn = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    return sendTokenToBackend(idToken); // Send to backend
  } catch (error) {
    console.error("GitHub login error:", error.message);
    throw error;
  }
};

// 🔹 Email/Password Sign-Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    return sendTokenToBackend(idToken);
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// 🔹 Email/Password Login
export const logIn = async (email, password, router) => {
  try {
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    return sendTokenToBackend(idToken,router);
  } catch (error) {
    if (error.message !== "Firebase: Error (auth/invalid-email).") {
      console.error("Login error:", error.message);
    }
    throw error;
  }
};

// 🔹 Log Out
export const logOut = async () => {
  try {
    const token = localStorage.getItem("jwtToken"); // Get JWT from storage

    if (token) {
      // 🔹 Send logout request to backend to remove session
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send JWT
        },
      });
    }

    // 🔹 Remove token from localStorage and Firebase logout
    await signOut(auth);
    localStorage.removeItem("jwtToken");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};
