// controllers/cartController.js
const Cart = require('../models/cart');
const Product = require('../models/productModel.js');

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Assuming you have user info in the request from some form of auth

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    
    if (existingItemIndex !== -1) {
      // Product exists in the cart, update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  const userId = req.user.id; // Assuming user info is in request after auth

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
