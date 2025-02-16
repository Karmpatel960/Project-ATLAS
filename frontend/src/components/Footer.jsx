import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">StreamLine</h3>
          <p className="text-gray-400">
            Simplify your workflow and boost productivity with our powerful SaaS platform.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li>
              <a href="#features" className="text-gray-400 hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-400 hover:text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Integrations
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} StreamLine. All rights reserved.</p>
      </div>
    </footer>
  );
}
