import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, image: "/snake plant.jpeg", title: "Snake Plant", description: "Air-purifying indoor plant, perfect for home decor.", price: 350 },
  { id: 2, image: "/Aloe Vera.jpeg", title: "Aloe Vera", description: "Low-maintenance succulent with healing properties.", price: 550 },
  { id: 3, image: "/Peace Lily.jpeg", title: "Peace Lily", description: "Beautiful flowering plant that improves air quality.", price: 650 },
  { id: 4, image: "/Bamboo Palm1.jpeg", title: "Bamboo Palm", description: "Brings a tropical vibe and fresh air to your space.", price: 850 },
];

const ShopBundle = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-semibold text-center">Shop Bundles</h1>
      <div className="w-3/4 h-0.5 mx-auto bg-black mt-2"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-lg text-green-700 font-semibold">₹ {product.price}</p>
              <button 
                onClick={() => addToCart(product, 1)} 
                className="mt-2 border-2 border-black px-6 py-2 rounded-3xl hover:bg-[#0f352e] hover:text-white"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopBundle;
