"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../backend/lib/firebaseConfig";
import { usePathname, useRouter } from "next/navigation"; // Import Firebase config

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const jwt = localStorage.getItem("jwtToken");

      if (firebaseUser) {
        setUser(firebaseUser);
      } else if (jwt) {
        // Assuming user session exists if JWT is present
        setUser({ jwt });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== "/") {
      router.push("/");
    }
  }, [loading, user, pathname]);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
