export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} Xavvi.fans — Influencer Directory
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-pink-600">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 