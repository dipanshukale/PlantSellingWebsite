import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Import axios to make API requests

const PaymentOptionsPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { customer, total, cart } = location.state || {};

	const handleOnlinePayment = () => {
		// Navigate to Razorpay payment page
		navigate("/razorpay", { state: { customer, total, cart } });
	};

	const handleCashOnDelivery = async () => {

		try {
			// Send the COD order details to the backend
			const response = await axios.post(
				"http://localhost:8000/cash-on-delivery",
				{
					customer,
					cart,
          total,
				},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
				}
			);

			navigate("/order-confirmation", {
				state: {
					customer,
					paymentMode: "COD",
					total,
					orderId: response.data.orderId, // Order ID returned from the backend
				},
			});
		} catch (error) {
			alert("Failed to create Cash on Delivery order.");
		}
	};

	return (
		<div className="p-4 sm:p-8 bg-gray-100  mt-80 shadow-2xl lg:mt-24 max-w-lg mx-auto">
			<h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
			<p className="mb-4">Order for: {customer.name}</p>
			<button
				className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-4"
				onClick={handleOnlinePayment}
			>
				Pay Online (Razorpay)
			</button>
			<button
				className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full"
				onClick={handleCashOnDelivery}
			>
				Cash on Delivery
			</button>
		</div>
	);
};

export default PaymentOptionsPage;
