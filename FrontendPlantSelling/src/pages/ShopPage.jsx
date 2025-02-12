import React, { useState,useEffect } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import FloatingCart from "../Components/FloatingCart";

const products = [
  { id: 1, category: "Beginner Pack", image: "/snake plant.jpeg", title: "Snake Plant", description: "Low-maintenance, air-purifying plant.", price: 350 },
  { id: 2, category: "Beginner Pack", image: "/Aloe Vera.jpeg", title: "Aloe Vera", description: "Easy to care for, healing properties.", price: 450 },
  { id: 3, category: "Beginner Pack", image: "/pothos.jpeg", title: "Golden Pothos", description: "Thrives in low light, beginner-friendly.", price: 300 },
  { id: 4, category: "Pet Friendly", image: "/parlor-palm.jpeg", title: "Parlor Palm", description: "Pet-friendly, air-purifying.", price: 500 },
  { id: 5, category: "Pet Friendly", image: "/Calathea.jpeg", title: "Calathea", description: "Safe for pets, unique foliage.", price: 600 },
  { id: 6, category: "Pet Friendly", image: "/Boston-fern.jpeg", title: "Boston Fern", description: "Humidity-loving, pet-friendly.", price: 550 },
  { id: 7, category: "Super Pack", image: "/Peace Lily.jpeg", title: "Peace Lily", description: "Air-purifying and elegant.", price: 750 },
  { id: 8, category: "Super Pack", image: "/Bamboo Palm.jpeg", title: "Bamboo Palm", description: "Tropical and air-purifying.", price: 850 },
  { id: 9, category: "Super Pack", image: "/Fiddle-leaf.jpeg", title: "Fiddle Leaf Fig", description: "Large, stylish indoor plant.", price: 950 },
  { id: 10, category: "Beginner Pack", image: "/ZZ Plant.jpeg", title: "ZZ Plant", description: "Thrives in low light, easy care.", price: 400 },
  { id: 11, category: "Beginner Pack", image: "/rubber plant.jpeg", title: "Rubber Plant", description: "Resilient and air-purifying.", price: 500 },
  { id: 12, category: "Pet Friendly", image: "/areca palm.jpeg", title: "Areca Palm", description: "Pet-friendly and lush.", price: 700 },
  { id: 13, category: "Pet Friendly", image: "/chinese money.jpeg", title: "Chinese Money Plant", description: "Safe for pets, unique round leaves.", price: 450 },
  { id: 14, category: "Super Pack", image: "/monstera.jpeg", title: "Monstera", description: "Trendy, big-leaf plant.", price: 900 },
  { id: 15, category: "Super Pack", image: "/dragon-tree.jpeg", title: "Dragon Tree", description: "Low-maintenance, stylish.", price: 800 }
];

const ShopPage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

    
// Scroll to top on page render
useEffect(() => {
	window.scrollTo(0, 0);
}, []); 
    
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
      <div className="container mx-auto px-4 py-10 mt-28 mb-24">
          <Navbar/>
      <h1 className="text-4xl font-semibold text-center">Shop Plants</h1>
      <div className="w-3/4 h-0.5 mx-auto bg-black mt-2 mb-6"></div>

      <div className="flex justify-center space-x-4 mb-6">
        {['All', 'Beginner Pack', 'Pet Friendly', 'Super Pack'].map((category) => (
          <button 
            key={category}
            className={`px-4 py-2 rounded-full border-2 ${selectedCategory === category ? 'bg-green-700 text-white' : 'border-black'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={product.image} alt={product.title} className="w-full h-56 object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg text-green-700 font-semibold mt-2">₹ {product.price}</p>
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
      <FloatingCart/>
    </div>
  );
};

export default ShopPage;
