// components/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is saved in local storage
      await axios.post(
        '/api/cart/add',
        { productId, quantity: 1 },  // Set quantity as needed
        { headers: { Authorization: token } }
      );
      alert('Product added to cart!');
      navigate('/cart');  // Redirect to the cart page
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding product to cart');
    }
  };

  return (
    <div>
      {/* Assume product details display here */}
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
