import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const FloatingCart = () => {
  // Ensure useCart is always called the same way, and handle cart null/undefined later
  const cartContext = useCart();
  const cart = cartContext?.cart || [];

  const navigate = useNavigate();

  if (cart.length === 0) return null; // Safely handle empty cart

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/orderSummary"); // Navigate to the checkout page
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 flex justify-between items-center z-10">
      <div>
        <p className="text-lg font-semibold">🛒 {cart.length} Items in Cart</p>
        <ul className="text-white space-y-1">
          {cart.map((item, index) => (
            <li key={index} className="text-lg">
              {item.title} - ₹{item.price} ( {item.quantity} )
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold mt-2">Subtotal : ₹{subtotal} </p>
      </div>
      <button className="bg-green-500 px-4 py-2 rounded-lg" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default FloatingCart;
