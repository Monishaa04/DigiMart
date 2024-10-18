// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';
import Payment from './components/Payment';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
      <AuthProvider>
      <CartProvider>
        <Router>
            <div>
                <Routes>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment" element={<Payment />} />
                </Routes>
            </div>
        </Router>
      </CartProvider>
      </AuthProvider>
    );
};

export default App;
