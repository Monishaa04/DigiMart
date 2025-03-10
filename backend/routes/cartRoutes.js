// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

// Use the `authenticateUser` middleware on protected routes
router.post('/add', authenticateUser, addToCart);
//router.get('/', authenticateUser, getCart);
router.get('/', async (req, res) => {
    // Assume you have a cart in your database or session
    try {
        // Replace with logic to fetch cart items from your DB or session
        const cartItems = [];  // Example, replace with actual cart fetching logic
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items' });
    }
});



module.exports = router;
