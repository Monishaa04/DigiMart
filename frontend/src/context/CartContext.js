// context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/cart', {
        headers: { Authorization: token },
      });
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/api/cart/add',
        { productId, quantity },
        { headers: { Authorization: token } }
      );
      fetchCartItems();  // Refresh cart after adding item
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, fetchCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
