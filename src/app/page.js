import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-blue-600">DoodleDeck 🎨</h1>
          <div>
            <a href="#" className="px-4 text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="px-4 text-gray-700 hover:text-blue-600">Features</a>
            <a href="#" className="px-4 text-gray-700 hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-600 text-white text-center py-20">
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
            <Image src="/feature1.jpg" alt="Drag and Drop Editor" width={500} height={300} className="rounded-lg shadow-lg" />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">Drag & Drop Editor</h4>
              <p className="text-gray-600 mt-2">Easily create posters and designs using our intuitive drag-and-drop interface.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center md:space-x-10">
            <Image src="/feature2.jpg" alt="Customizable Templates" width={500} height={300} className="rounded-lg shadow-lg" />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">Customizable Templates</h4>
              <p className="text-gray-600 mt-2">Choose from a variety of pre-made templates and customize them to match your event or club theme.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row items-center md:space-x-10">
            <Image src="/feature3.jpg" alt="Export in Multiple Formats" width={500} height={300} className="rounded-lg shadow-lg" />
            <div>
              <h4 className="text-2xl font-semibold text-gray-800">Export in Multiple Formats</h4>
              <p className="text-gray-600 mt-2">Download your designs as PNG, JPG, or PDF for easy sharing and printing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>© {new Date().getFullYear()} DoodleDeck. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
