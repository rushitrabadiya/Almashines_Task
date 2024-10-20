// src/components/SearchFilter.js
import React, { useState } from "react";
import { searchAndFilterProducts } from "../services/api"; // Import the API function

const SearchFilter = () => {
  const [title, setTitle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortRating, setSortRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const params = { title, minPrice, maxPrice, sortRating, sortPrice };
      const response = await searchAndFilterProducts(params);
      setProducts(response.data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching products");
    }
  };

  return (
    <div>
      <h1>Search and Filter Products</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <select onChange={(e) => setSortRating(e.target.value)} defaultValue="">
        <option value="">Sort by Rating</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>
      <select onChange={(e) => setSortPrice(e.target.value)} defaultValue="">
        <option value="">Sort by Price</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>

      {/* Filter Button */}
      <button onClick={handleSearch}>Filter Products</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.title} - ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;
