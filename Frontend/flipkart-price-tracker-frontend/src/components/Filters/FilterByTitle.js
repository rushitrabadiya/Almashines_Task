// /src/components/Filters/FilterByTitle.js
import React, { useState } from "react";
import { filterByTitle } from "../../api/productAPI";
import { debounce } from "../../utils/debounce";

const FilterByTitle = ({ setFilteredProducts }) => {
  const [title, setTitle] = useState("");

  const handleFilter = debounce(async () => {
    if (title) {
      const filtered = await filterByTitle(title);
      setFilteredProducts(filtered);
    }
  }, 500); // Debouncing by 500ms

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          handleFilter();
        }}
        placeholder="Search by title"
      />
    </div>
  );
};

export default FilterByTitle;
