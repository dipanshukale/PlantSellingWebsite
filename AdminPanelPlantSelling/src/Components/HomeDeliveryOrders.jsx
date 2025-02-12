import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from 'lucide-react'; 

const HomeDeliveryOrders = () => {
	const [homeOrders, setHomeOrders] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	// Fetch customer orders from the API
	useEffect(() => {
		const fetchHomeOrders = async () => {
			try {
				const response = await axios.get("https://plantsellingwebsite-backend.onrender.com/Cash-on-delivery-orders");
				setHomeOrders(response.data.data);
			} catch (error) {
				console.error("Error fetching home delivery orders:", error);
			}
		};
		fetchHomeOrders();
	}, []);

	// Update order status
	const updateOrderStatus = async (orderId, status) => {
		try {
			await axios.put(`https://plantsellingwebsite-backend.onrender.com/Cash-on-delivery-orders/${orderId}`, {
				orderStatus: status,
			});
			setHomeOrders((prevOrders) =>
				prevOrders.map((order) =>
					order._id === orderId ? { ...order, orderStatus: status } : order
				)
			);
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	};

	// Update payment status
	const updatePaymentStatus = async (orderId, status) => {
		try {
			await axios.put(`https://plantsellingwebsite-backend.onrender.com/Cash-on-delivery-orders/${orderId}/payment`, {
				paymentStatus: status,
			});
			setHomeOrders((prevOrders) =>
				prevOrders.map((order) =>
					order._id === orderId ? { ...order, paymentStatus: status } : order
				)
			);
		} catch (error) {
			console.error("Error updating payment status:", error);
		}
	};

	// Open modal with order details
	const openModal = (order) => {
		setSelectedOrder(order);
		setModalOpen(true);
	};

	// Close modal
	const closeModal = () => {
		setModalOpen(false);
		setSelectedOrder(null);
	};

	// Print order details
	const printOrderDetails = () => {
		const printableArea = document.getElementById("printable-area");
		if (printableArea) {
			const printContents = printableArea.innerHTML;
			const originalContents = document.body.innerHTML;
			document.body.innerHTML = printContents;
			window.print();
			document.body.innerHTML = originalContents;
			window.location.reload();
		}
	};

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold">Home Delivery Orders</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
					<thead>
						<tr className="bg-blue-700 text-white">
							<th className="px-4 py-2 text-left">Order ID</th>
							<th className="px-4 py-2 text-left">Customer</th>
							<th className="px-4 py-2 text-left">Total</th>
							<th className="px-4 py-2 text-left">Status</th>
							<th className="px-4 py-2 text-left">Payment Status</th>
						</tr>
					</thead>
					<tbody>
						{homeOrders.map((order) => (
							<tr  key={order._id} className="cursor-pointer border-t hover:bg-gray-100">
								<td onClick={() => openModal(order)} className="px-4 py-2">{order._id}</td>
								<td className="px-4 py-2">{order.customer.name}</td>
								<td className="px-4 py-2">{order.totalAmount.toFixed(2)} ₹</td>
								<td className="px-4 py-2">
									<button
										className={`px-2 py-1 rounded-full cursor-pointer text-white text-sm ${
											order.orderStatus === "Delivered" ? "bg-green-500" : "bg-yellow-500"
										}`}
										onClick={() =>
											updateOrderStatus(order._id, order.orderStatus === "Not Delivered" ? "Delivered" : "Not Delivered")
										}
									>
										{order.orderStatus === "Delivered" ? "Delivered" : "Mark as Delivered"}
									</button>
								</td>
								<td className="px-4 py-2">
									<button
										className={`px-2 py-1 cursor-pointer rounded-full text-white text-sm ${
											order.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
										}`}
										onClick={() =>
											updatePaymentStatus(order._id, order.paymentStatus === "unpaid" ? "paid" : "unpaid")
										}
									>
										{order.paymentStatus === "unpaid" ? "Mark as Paid" : "Paid"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal for displaying order details */}
			{modalOpen && selectedOrder && (
				<div
					id="printable-area"
					className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
				>
					<div className="bg-white p-6 text-center rounded-lg shadow-2xl max-w-md w-full relative">
						<button
							className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
							onClick={closeModal}
						>
							<X className="cursor-pointer h-8 w-8 text-white bg-red-500 rounded-full" />
						</button>
						<h2 className="text-xl font-bold mb-4">Order Details</h2>
						<p><strong>Order ID:</strong> {selectedOrder._id}</p>
						<p><strong>Customer Name:</strong> {selectedOrder.customer.name}</p>
						<p><strong>Customer Address:</strong> {selectedOrder.customer.address}</p>
						<hr className="my-6" />
						<h3 className="text-lg font-bold">Cart Items</h3>
						<ul className="text-center space-y-2">
							{selectedOrder.cart.map((item, index) => (
								<li key={index} className="bg-gray-100 p-2 rounded-lg">
									<strong>{item.title}</strong><br />
									Quantity: {item.quantity}<br />
									Price: {item.price.toFixed(2)}
								</li>
							))}
						</ul>
						<hr className="mt-8 mb-8" />
						<p className="text-center mb-2"><strong>Total Amount:</strong> {selectedOrder.totalAmount.toFixed(2)} ₹</p>
						<button
							onClick={printOrderDetails}
							className="bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg mt-4"
						>
							Print
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default HomeDeliveryOrders;
