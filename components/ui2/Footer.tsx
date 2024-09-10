import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start lg:space-x-12">
        
        <div className="flex-1 mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold mb-2">YoomMeet</h2>
          <p className="text-gray-400">Connecting people effortlessly through video conferencing.</p>
        </div>

        
        <div className="flex flex-col lg:flex-row lg:space-x-12 mb-8 lg:mb-0 flex-1">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p className="flex items-center mb-2">
              <FaEnvelope className="mr-2" /> support@yoommeet.com
            </p>
            <p className="flex items-center mb-2">
              <FaPhone className="mr-2" /> +1 (800) 123-4567
            </p>
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> 5678 Conference Ave, Suite 100, Tech City, 98765
            </p>
          </div>

          
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-blue-300">About Us</a></li>
              <li><a href="/features" className="hover:text-blue-300">Features</a></li>
              <li><a href="/pricing" className="hover:text-blue-300">Pricing</a></li>
              <li><a href="/contact" className="hover:text-blue-300">Contact</a></li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        
        <div className="text-center lg:text-right flex-1">
          <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
          <p className="text-gray-400 mb-4">Subscribe to receive the latest updates and news.</p>
          <form className="flex flex-col lg:flex-row items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 mb-4 lg:mb-0 lg:mr-4 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      
      <div className="mt-6 border-t border-gray-700 pt-2 text-center">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} YoomMeet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
