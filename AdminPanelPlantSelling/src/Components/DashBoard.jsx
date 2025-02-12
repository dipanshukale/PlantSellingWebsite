import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

const DashBoard = () => {
	const [onlineOrders, setOnlineOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	// Fetch online orders using axios
	useEffect(() => {
		const fetchOnlineOrders = async () => {
			try {
				const response = await axios.get("http://localhost:8000/Online-orders");
				setOnlineOrders(response.data.data);
			} catch (error) {
				console.error("Error fetching online orders:", error);
			}
		};
		fetchOnlineOrders();
	}, []);

	// Handle clicking on an order to show details in a modal
	const handleOrderClick = (order) => {
		setSelectedOrder(order);
		setModalOpen(true);
	};

	// Close the modal
	const closeModal = () => {
		setModalOpen(false);
		setSelectedOrder(null);
	};

	// Print order details
	const printOrderDetails = () => {
		const printArea = document.getElementById("printable-area");
		if (printArea) {
			const printContents = printArea.innerHTML;
			const originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;
			window.print();
			document.body.innerHTML = originalContents;
			window.location.reload();
		} else {
			console.error("Printable area not found.");
		}
	};

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold">Online Orders</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full table-auto bg-white rounded-lg shadow-lg">
					<thead>
						<tr className="bg-blue-700 text-white">
							<th className="px-4 py-2 text-left">Order ID</th>
							<th className="px-4 py-2 text-left">Customer</th>
							<th className="px-4 py-2 text-left">Total</th>
							<th className="px-4 py-2 text-left">Status</th>
						</tr>
					</thead>
					<tbody>
						{onlineOrders.map((order) => (
							<tr
								key={order._id}
								className="border-t cursor-pointer hover:bg-gray-100"
								onClick={() => handleOrderClick(order)}
							>
								<td className="px-4 py-2">{order._id}</td>
								<td className="px-4 py-2">{order.customer.name}</td>
								<td className="px-4 py-2">{order.totalAmount.toFixed(2)} ₹</td>
								<td className="px-4 py-2">
									<span
										className={`px-2 py-1 rounded-full text-white text-sm ${
											order.orderStatus === "paid"
												? "bg-green-500"
												: order.orderStatus === "Shipped"
												? "bg-yellow-500"
												: "bg-gray-500"
										}`}
									>
										{order.orderStatus}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal for showing order details */}
			{modalOpen && selectedOrder && (
				<div id="printable-area" className="fixed inset-0 bg-opacity-0 backdrop-blur-sm flex justify-center items-center z-50">
					<div className="bg-white p-6 text-center rounded-lg shadow-2xl max-w-md w-full relative">
						<button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={closeModal}>
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
						<hr className="mt-8 mb-8"></hr>
						<p className="text-center mb-2"><strong>Total Amount:</strong> {selectedOrder.totalAmount.toFixed(2)} ₹</p>

						<button onClick={printOrderDetails} className="bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-lg mt-4">
							Print
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashBoard;
