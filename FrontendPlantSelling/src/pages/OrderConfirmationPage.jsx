import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { customer = {}, paymentMode} = location.state || {};

  const handleNewOrder = () => {
    navigate("/");
  };

  return (
    <div className="p-4 sm:p-8 mt-80 lg:mt-24 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
      {/* Fallback for customer name if it's missing */}
      <p>Thank you, {customer.name || "Customer"}!</p>
      <p>
        Your order has been confirmed with{" "}
        {paymentMode === "Online" ? "Online Payment" : "Cash on Delivery"}.
      </p>
      <button
        className="bg-green-500 text-white mt-6 px-4 py-2 rounded-lg w-full"
        onClick={handleNewOrder}
      >
        Shop More
      </button>
    </div>
  );
};

export default OrderConfirmationPage;
