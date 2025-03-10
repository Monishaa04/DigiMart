// components/Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/cart', {
          headers: { Authorization: token }
        });
        setCartItems(response.data.items);  // Update state with cart items
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Assumes token is stored in local storage
      await axios.delete(`/api/cart/remove/${productId}`, {
        headers: { Authorization: token },
      });
      
      // Update cartItems in state after successful removal
      setCartItems((prevItems) => prevItems.filter((item) => item.productId._id !== productId));
      alert('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.productId.price * item.quantity, 0).toFixed(2);
  };

  const handleProceedToPay = () => {
    navigate('/payment');  // Redirect to payment page
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.productId._id} className="cart-item">
              <img src={item.productId.imageUrl} alt={item.productId.name} />
              <h2>{item.productId.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.productId.price * item.quantity}</p>
              <button onClick={() => handleRemove(item.productId._id)}>Remove</button>
            </div>
          ))}
          <div className="summary">
            <div className="summary-item">
              <span>Total Amount:</span>
              <span>{getTotalAmount()}</span>
            </div>
            <button onClick={handleProceedToPay}>Proceed to Pay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
