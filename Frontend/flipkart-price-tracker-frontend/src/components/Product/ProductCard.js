// /src/components/Product/ProductCard.js
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      {/* Add more product details as needed */}
    </div>
  );
};

export default ProductCard;
