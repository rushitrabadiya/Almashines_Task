import React, { useEffect, useState } from "react";
import { getAllProducts, filterByPrice } from "../api/productAPI";
// import { getAllProducts, filterByPrice } from '../api/productAPI';
import ProductList from "./../components/Product/ProductList";
import FilterByPrice from "./../components/Filters/FilterByPrice";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products on mount
  useEffect(() => {
    getAllProducts()
      .then((data) => {
        console.log("Fetched Products:", data); // Add this line
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error); // Add this line
      });
  }, []);

  // Handle filtering by price
  const handlePriceFilter = (minPrice, maxPrice) => {
    filterByPrice(minPrice, maxPrice)
      .then((data) => {
        console.log("Filtered Products:", data); // Add this line
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error filtering products by price:", error); // Add this line
      });
  };

  return (
    <div className="home-page">
      <h1>Flipkart Price Tracker</h1>

      {/* Use the correct FilterByPrice component */}
      <FilterByPrice onFilter={handlePriceFilter} />

      {/* Pass the filtered or fetched products to the ProductList */}
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
