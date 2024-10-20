import React from "react";
import { Link } from "react-router-dom";

import "./css/Navbar.css";
import "./css/home.css";
import "./css/AddProduct.css";
import "./css/ProductDetails.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
