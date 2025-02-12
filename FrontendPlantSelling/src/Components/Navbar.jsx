import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../public/logo.jpeg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

    return (
      <div className="flex justify-center ">
    <nav className="bg-[#f1eeda] shadow-md fixed top-6 lg:w-[90%] rounded-3xl z-50 p-6">
      <div className="container mx-auto gap-6 flex justify-between items-center">
        {/* Logo and Title */}
            <div className="flex items-center">
              <img className="size-10 rounded-full lg:mr-2" src={logo}  alt="logo" />
          <h1 className="text-4xl font-serif text-orange-500">Secret Garden</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 mr-2 text-2xl gap-2.5 text-[#0f352e] font-bold">
          <p onClick={()=> navigate("/")} className="cursor-pointer hover:text-green-600">Home</p>
          <p onClick={()=> navigate("/shopNow")} className="cursor-pointer hover:text-green-600">Shop</p>
          <p className="cursor-pointer hover:text-green-600">Cart</p>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-800 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          className="fixed inset-0 bg-[#f1eeda] h-screen w-full flex flex-col items-center justify-center space-y-6 text-green-800 text-lg font-medium"
        >
          <button
            className="absolute top-12 right-4 text-[#0f352e] focus:outline-none"
            onClick={toggleMenu}
          >
            <X size={32} />
          </button>
          <p onClick={()=> navigate("/")} className="cursor-pointer text-2xl font-bold text-[#0f352e] ">Home</p>
          <p onClick={()=> navigate("/shopNow")} className="cursor-pointer text-2xl font-bold  text-[#0f352e] ">Shop</p>
          <p onClick={()=> navigate("/orderSummary")} className="cursor-pointer text-2xl font-bold text-[#0f352e] ">Cart</p>
        </motion.div>
      )}
      </nav>
    </div>
  );
};

export default Navbar;
