// /src/pages/ProductPage.js
import React, { useState } from "react";
import ProductList from "../components/Product/ProductList";
import FilterByTitle from "../components/Filters/FilterByTitle";
import FilterByPrice from "../components/Filters/FilterByPrice";
import FilterByRating from "../components/Filters/FilterByRating";

const ProductPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(null);

  return (
    <div>
      <h1>Product Page</h1>
      <div className="filters">
        <FilterByTitle setFilteredProducts={setFilteredProducts} />
        <FilterByPrice setFilteredProducts={setFilteredProducts} />
        <FilterByRating setFilteredProducts={setFilteredProducts} />
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductPage;
