import React, { useState, useEffect } from "react";
import AddProduct from "./components/AddProduct";
import Products from "./components/Products";
import Filter from "./components/Filter";
import "./App.css";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://almashines-task-j4xu.onrender.com/api/v1/products/all"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const result = await response.json();
      setAllProducts(result.data || []);
      setFilteredProducts(result.data || []);
      setError(null);
    } catch (error) {
      setError(error.message);
      setAllProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    setAllProducts((prevProducts) => [newProduct, ...prevProducts]);
    setFilteredProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const handleFilterApplied = (filteredProducts) => {
    setFilteredProducts(filteredProducts || []);
  };

  const handleFilterCleared = () => {
    setFilteredProducts(allProducts);
  };

  return (
    <div className="app">
      <div className="left-section">
        <AddProduct onProductAdded={handleProductAdded} />
      </div>
      <div className="middle-section">
        <Products products={filteredProducts} loading={loading} error={error} />
      </div>
      <div className="right-section">
        <Filter
          onFilterApplied={handleFilterApplied}
          onFilterCleared={handleFilterCleared}
        />
      </div>
    </div>
  );
}

export default App;
