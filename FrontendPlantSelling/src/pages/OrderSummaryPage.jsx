import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const OrderSummaryPage = () => {
  const { cart, removeFromCart } = useCart() || { cart: [] };
  const navigate = useNavigate();

  if (!cart || cart.length === 0) return <p className="flex justify-center mt-96 font-extrabold font-serif " >Your cart is empty !</p>;

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const deliveryCharge = 50;
  const total = subtotal + tax + deliveryCharge;

  const handlePlaceOrder = () => {
    navigate("/customerdetials", { state: { total, cart }});
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId); // Calls the remove function to update the cart
  };

  return (
    <div className="p-4 sm:p-8 mt-24 bg-gray-100 max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Left Side - Order Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-bold mb-4">Order Summary</h2>
        {/* Order Details */}
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li
              key={index}
              className="flex flex-row items-center bg-white shadow-lg rounded-lg p-4"
            >
              {/* Product Image */}
              <div className="w-1/3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="w-2/3 flex-1 pl-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-sm font-semibold mt-1">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>

              {/* Total Price and Remove Button */}
              <div className="flex flex-col items-center space-y-2 ml-2">
                <p className="font-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="text-red-500 underline text-sm"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate("/shopNow")}
          className="bg-blue-500 w-full px-4 py-2 rounded-lg shadow-md mt-6 text-white"
        >
          Shop More
        </button>
      </div>

      {/* Right Side - Payment Summary (for large screens) */}
      <div className="mt-6 lg:mt-0 space-y-2 bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>

        {/* Summary Section */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <p>Subtotal:</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax (5%):</p>
            <p>₹{tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charge:</p>
            <p>₹{deliveryCharge}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold">
            <p>Total:</p>
            <p>₹{total.toFixed(2)}</p>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          className="bg-green-500 text-white font-bold mt-12 px-4 py-2 rounded-lg w-full shadow-md"
          onClick={handlePlaceOrder}
        >
          Place Order (₹{total.toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryPage;
