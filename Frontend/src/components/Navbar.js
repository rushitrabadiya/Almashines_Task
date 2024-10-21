import React from "react";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Options</h2>
      <ul>
        <li>
          <button>Filter Products</button>
        </li>
        <li>
          <button>Add Product</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
