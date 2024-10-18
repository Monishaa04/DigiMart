import React from 'react';
import './Payment.css';

const Payment = () => {
  const handlePayment = () => {
    alert('Payment process initiated');
    // Implement payment processing logic here
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment</h2>
      <button onClick={handlePayment} className="payment-button">Proceed to Pay</button>
    </div>
  );
};

export default Payment;
