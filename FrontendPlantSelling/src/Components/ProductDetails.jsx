import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="text-center text-red-500">Product not found!</div>;
  }

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-black shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6">
        <button className="absolute top-4 right-4 text-black text-xl" onClick={() => navigate(-1)}>✖</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-md" />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-xl font-semibold text-green-600 mt-2">₹ {product.price}</p>
            </div>

            <div className="mt-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center mt-2">
                <button className="px-3 py-1 border rounded-lg text-lg" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="px-4 items-center">{quantity}</span>
                <button className="px-3 py-1 border rounded-lg text-lg" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button 
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
