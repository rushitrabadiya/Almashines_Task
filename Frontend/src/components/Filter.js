import React, { useState } from "react";
import "./css/Filter.css";

const Filter = ({ onFilterApplied, onFilterCleared }) => {
  const [title, setTitle] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortRating, setSortRating] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    const queryParams = [];

    if (title) queryParams.push(`title=${encodeURIComponent(title)}`);
    if (minPrice) queryParams.push(`minPrice=${minPrice}`);
    if (maxPrice) queryParams.push(`maxPrice=${maxPrice}`);
    if (sortRating) queryParams.push(`sortRating=${sortRating}`);
    if (sortPrice) queryParams.push(`sortPrice=${sortPrice}`);

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

    try {
      const response = await fetch(
        `https://almashines-task-j4xu.onrender.com/api/v1/products/search${queryString}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch filtered products");
      }

      const result = await response.json();
      onFilterApplied(result.data);
    } catch (error) {
      console.error(error.message);
      onFilterApplied([]);
    }
  };

  const handleClearFilters = () => {
    setTitle("");
    setMinPrice("");
    setMaxPrice("");
    setSortRating("");
    setSortPrice("");
    onFilterCleared();
  };

  return (
    <div className="filter">
      <h2>Filter Products</h2>
      <form onSubmit={handleFilterSubmit}>
        <label>
          Search by Title:
          <input
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Minimum Price:
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>
        <label>
          Maximum Price:
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
        <label>
          Sort by Rating:
          <select
            value={sortRating}
            onChange={(e) => setSortRating(e.target.value)}
          >
            <option value="">Select Rating Sort Order</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </label>
        <br></br>
        <label>
          Sort by Price:
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
          >
            <option value="">Select Price Sort Order</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </label>
        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </form>
    </div>
  );
};

export default Filter;
