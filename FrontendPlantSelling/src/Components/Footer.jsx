import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#292929] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center mb-24 lg:mb-12">
        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition">
            <FaLinkedinIn size={20} />
          </a>
        </div>

        {/* Footer Links */}
        <ul className="flex justify-center flex-wrap gap-6 text-gray-400 text-sm mb-6">
          <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
        </ul>

        {/* Copyright & Credits */}
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        <p className="text-gray-500 text-sm mt-1">
          Developed by Dipanshu Dilip Kale
        </p>
      </div>
    </footer>
  );
};

export default Footer;
