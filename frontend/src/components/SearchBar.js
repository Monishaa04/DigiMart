// src/components/SearchBar.js

import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products/search', { params: { query } });
      onSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="flex-1 p-2 border-none focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
