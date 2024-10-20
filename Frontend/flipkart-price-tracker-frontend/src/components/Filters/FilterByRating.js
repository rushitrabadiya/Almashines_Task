// /src/components/Filters/FilterByRating.js
import React from "react";
import { sortByRating } from "../../api/productAPI";

const FilterByRating = ({ setFilteredProducts }) => {
  const handleSort = async (sortOrder) => {
    const sorted = await sortByRating(sortOrder);
    setFilteredProducts(sorted);
  };

  return (
    <div>
      <button onClick={() => handleSort("lowToHigh")}>
        Rating: Low to High
      </button>
      <button onClick={() => handleSort("HightToLow")}>
        Rating: High to Low
      </button>
    </div>
  );
};

export default FilterByRating;
