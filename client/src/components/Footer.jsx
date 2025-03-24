import { SiEthereum } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <SiEthereum className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">CertifyMe</span>
            </div>
            <p className="text-gray-400">Blockchain-powered certificate generation and verification platform.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} CertifyMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}