// src/components/ShowcaseProducts.js
import React, { useEffect, useState } from "react";
import { getShowcaseProductsFiled } from "../services/api"; // Import the API function

const ShowcaseProducts = () => {
  const [products, setProducts] = useState([]);
  const [fields, setFields] = useState("title,price"); // Example fields
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowcaseProducts = async () => {
      try {
        const response = await getShowcaseProductsFiled(fields);
        setProducts(response.data);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching showcase products"
        );
      }
    };

    fetchShowcaseProducts();
  }, [fields]); // Fetch products when fields change

  return (
    <div>
      <h1>Showcase Products</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.title} - ₹{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowcaseProducts;
