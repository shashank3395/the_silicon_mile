import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange">Corporate Wellness</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering organizations to prioritize employee health and well-being
              through comprehensive wellness programs and initiatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-orange transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-orange transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-300 hover:text-orange transition-colors text-sm">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3 text-gray-300">
                <Mail size={18} className="text-orange" />
                <a href="mailto:info@corporatewellness.com" className="hover:text-orange transition-colors">
                  info@corporatewellness.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-300">
                <Phone size={18} className="text-orange" />
                <a href="tel:+1234567890" className="hover:text-orange transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start space-x-3 text-gray-300">
                <MapPin size={18} className="text-orange mt-1" />
                <span>123 Wellness Avenue<br />Suite 100<br />City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-light mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Corporate Wellness. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-orange transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


