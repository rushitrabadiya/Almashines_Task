// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import SearchFilter from "./components/SearchFilter"; // Import the SearchFilter component
import ShowcaseProducts from "./components/ShowcaseProducts"; // Import the ShowcaseProducts component

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/search-filter" element={<SearchFilter />} />{" "}
        {/* Route for search and filter */}
        <Route path="/showcase-products" element={<ShowcaseProducts />} />{" "}
        {/* Route for showcase products */}
      </Routes>
    </Router>
  );
};

export default App;
