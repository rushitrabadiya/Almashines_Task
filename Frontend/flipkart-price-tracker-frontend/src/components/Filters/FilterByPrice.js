// /src/components/Filters/FilterByPrice.js
import React, { useState } from "react";

const FilterByPrice = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = () => {
    onFilter(minPrice, maxPrice);
  };

  return (
    <div>
      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min Price"
      />
      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max Price"
      />
      <button onClick={handleSubmit}>Filter</button>
    </div>
  );
};

export default FilterByPrice;
