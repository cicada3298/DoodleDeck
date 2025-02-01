// src/components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
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
          <Link href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
