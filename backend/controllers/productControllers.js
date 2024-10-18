// controllers/productControllers.js
const Product = require('../models/productModel.js');

// Fetch all products or search products by keyword
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: 'i',
                  },
              }
            : {};

        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(404).json({ message: 'Products not found' });
    }
};

// Fetch single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
};

// Fetch products by category
const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });

        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No products found in this category' });
        }
    } catch (error) {
        res.status(404).json({ message: 'Products not found' });
    }
};

module.exports = { getProducts, getProductById, getProductsByCategory };
