const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());  // This is crucial to parse JSON bodies
app.use(cookieParser());
app.use(cors());

// Import and use user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const productRoutes = require('./routes/productRoutes');

// Use the product routes
app.use('/api/products', productRoutes);


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
