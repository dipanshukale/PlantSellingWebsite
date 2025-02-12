import React from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu
import { useState } from "react";

const DashboardLayout = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	// Toggle the sidebar for mobile view
	const toggleSidebar = () => setIsOpen(!isOpen);

	// Close the sidebar when a NavLink is clicked on mobile view
	const handleNavLinkClick = () => {
		if (isOpen) {
			toggleSidebar();
		}
	};

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Sidebar */}
			<div
				className={`fixed lg:relative lg:inset-y-0 left-0 w-64 h-screen bg-blue-700 text-white shadow-3xl lg:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} lg:transform-none transition-transform duration-300 z-10`}
			>
				<div className="flex items-center justify-between p-4 lg:hidden">
					<button
						onClick={toggleSidebar}
						className="text-white cursor-pointer mt-5"
					>
						{isOpen ? <X size={30} /> : <Menu size={30} />}
					</button>
				</div>
				<nav className="p-6">
					<h2 className="text-xl font-bold mb-16">Dashboard</h2>
					<ul className="space-y-8">
						<li>
							<NavLink
								to="/"
								onClick={handleNavLinkClick}
								className={({ isActive }) =>
									isActive ? "text-yellow-300" : "text-white"
								}
							>
								Online Orders
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/home-delivery-orders"
								onClick={handleNavLinkClick}
								className={({ isActive }) =>
									isActive ? "text-yellow-300" : "text-white"
								}
							>
								Home Delivery Orders
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/contact-queries"
								onClick={handleNavLinkClick}
								className={({ isActive }) =>
									isActive ? "text-yellow-300" : "text-white"
								}
							>
								Customer Query
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/orders-data"
								onClick={handleNavLinkClick}
								className={({ isActive }) =>
									isActive ? "text-yellow-300" : "text-white"
								}
							>
								Cash-On-Delivery Orders Analysis
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/online-data"
								onClick={handleNavLinkClick}
								className={({ isActive }) =>
									isActive ? "text-yellow-300" : "text-white"
								}
							>
								Online Orders Analysis
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>

			{/* Page Content */}
			<div className="flex-1 ml-0 lg:ml-64 bg-gray-100 p-8 overflow-auto">
				{/* Toggle Button for Mobile View */}
				<div className="lg:hidden">
					<button
						onClick={toggleSidebar}
						className="bg-blue-700 text-white p-2 rounded-lg cursor-pointer"
					>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
