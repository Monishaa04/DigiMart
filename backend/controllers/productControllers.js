const Product = require('../models/productModel');

// Fetch all products or search products by keyword
const getProducts = async (req, res) => {
    try {
        // Log the incoming request
        console.log('Fetching products with keyword:', req.query.keyword);

        // Get the search keyword from query parameters (if any)
        const keyword = req.query.keyword
            ? {
                  name: {
                      $regex: req.query.keyword,
                      $options: 'i', // Case-insensitive search
                  },
              }
            : {};  // No keyword, fetch all products

        // Fetch products based on the search criteria
        const products = await Product.find({ ...keyword });

        // Log fetched products
        console.log('Fetched products:', products);

        // If no products found, send appropriate response
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No products found' });
        }
    } catch (error) {
        console.error('Error fetching products:', error); // Log error for debugging
        res.status(500).json({ message: 'Internal server error' });
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
        console.error('Error fetching product by ID:', error); // Log error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetch products by category
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log('Fetching products for category:', category);
        const products = await Product.find({ category });

        // Log fetched products
        console.log('Fetched products by category:', products);

        // If no products found in the category, send an appropriate response
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No products found in this category' });
        }
    } catch (error) {
        console.error('Error fetching products by category:', error); // Log error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getProducts, getProductById, getProductsByCategory };
