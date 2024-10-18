// src/components/ProductCard.js
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate=useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to Cart');
    navigate("/cart");
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="h-56 w-full object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-500 mb-4">{product.description.substring(0, 60)}...</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">Rs.{product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white py-1 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


