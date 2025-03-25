import Navbar from "@/components/Navbar";
import DebugPath from "@/components/DebugPath";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DebugPath>
            <Navbar />
            {children}
          </DebugPath>
        </AuthProvider>
      </body>
    </html>
  );
}
