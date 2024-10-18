import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have this context
import '../styles/Cart.css'; // Import the CSS file
import { motion } from 'framer-motion';

const Cart = () => {
  const { getCartItems, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, [getCartItems]);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProceedToPay = () => {
    if (isAuthenticated) {
      navigate('/payment'); // Redirect to payment page if authenticated
    } else {
      navigate('/register'); // Redirect to registration page if not authenticated
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cartItems.map(item => (
              <motion.div
                key={item._id}
                className="cart-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={item.imageUrl} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price * item.quantity}</p>
                <motion.button
                  onClick={() => handleRemove(item._id)}
                  className="remove-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="summary-item">
              <span>Total Quantity:</span>
              <span>{getTotalQuantity()}</span>
            </div>
            <div className="summary-item">
              <span>Total Amount:</span>
              <span>{getTotalAmount()}</span>
            </div>
            <motion.button
              className="proceed-button"
              onClick={handleProceedToPay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Pay
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Cart;
