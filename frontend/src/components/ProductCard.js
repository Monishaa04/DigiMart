// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product._id}`);  // Navigate to the product details page
  };

  return (
    <div
      onClick={handleProductClick}  // Set click handler to navigate to details
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      <img src={product.imageUrl} alt={product.name} className="h-56 w-full object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">Rs.{product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
