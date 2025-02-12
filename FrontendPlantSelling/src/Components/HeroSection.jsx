import React, {useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
	const navigate = useNavigate();

	// Scroll to top on page render
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div
			className="relative p-4 w-full h-screen bg-cover bg-center"
			style={{ backgroundImage: "url('/Hero3.jpg')" }}
		>
			{/* Overlay for readability */}
			<div className="absolute inset-0 bg-black bg-opacity-30"></div>

			{/* Content Box */}
			<div
				className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
                      bg-[#d4e3d3]  px-6 lg:px-12 rounded-2xl shadow-lg w-80 lg:h-1/2 lg:w-1/3
                      lg:left-24 lg:translate-x-0 text-left p-20"
			>
				<h1 className="text-3xl font-bold text-gray-800">Secret Garden</h1>
				<p className="text-gray-700 mt-2">
					Explore our exclusive collection of fresh plants and flowers to
					brighten your space. Our new collection of plants delivered to your
					door
				</p>
				<button
					onClick={() => navigate("/shopNow")}
					className="mt-4 bg-[#0f352e] text-white px-6 py-2 rounded-3xl hover:bg-green-700 transition"
				>
					Shop Now
				</button>
			</div>
		</div>
	);
};

export default HeroSection;
