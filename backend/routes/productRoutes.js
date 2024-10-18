const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

const router = express.Router();



// Search Products by Keyword
router.get('/search', async (req, res) => {
  const searchQuery = req.query.query; 

  if (!searchQuery) {
      return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
      const products = await Product.find({
          name: { $regex: searchQuery, $options: 'i' } 
      });
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
  }
});


// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

// @route   POST /api/products
// @desc    Create a product (Admin only)
// @access  Private/Admin
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, description, price, category, brand, stock, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      imageUrl,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);


// @route   PUT /api/products/:id
// @desc    Update a product (Admin only)
// @access  Private/Admin
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { name, description, price, category, brand, stock, imageUrl } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.stock = stock || product.stock;
      product.imageUrl = imageUrl || product.imageUrl;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
// @access  Private/Admin
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error('Products not found');
  }
}));



module.exports = router;
