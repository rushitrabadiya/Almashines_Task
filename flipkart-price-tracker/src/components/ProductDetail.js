// src/components/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the product ID from the URL
import { getProductById, checkProductPrice } from "./../services/api"; // Import your API functions

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL parameters
  const [product, setProduct] = useState(null); // State to hold the product data
  const [error, setError] = useState(null); // State to hold any error messages
  const [priceCheckResult, setPriceCheckResult] = useState(null); // State for price check result

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(id); // Fetch product details
        setProduct(fetchedProduct.data); // Set the product data
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(
          error.message || "An error occurred while fetching the product"
        );
      }
    };

    fetchProduct(); // Call the fetch function
  }, [id]); // Run this effect when the product ID changes

  const handleCheckPrice = async () => {
    try {
      const result = await checkProductPrice(id); // Call the check price API
      setPriceCheckResult(result.data); // Set the price check result
    } catch (error) {
      console.error("Error checking price:", error);
      setError(error.message || "An error occurred while checking the price");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display any error messages */}
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Rating:</strong> {product.rating}
          </p>

          <a href target="_blank" rel="noopener noreferrer"></a>

          <button onClick={handleCheckPrice}>Check Current Price</button>

          {priceCheckResult && (
            <div>
              <h2>Price Check Result:</h2>
              <p>
                <strong>Old Price:</strong> ₹{priceCheckResult.oldPrice}
              </p>
              <p>
                <strong>New Price:</strong> ₹{priceCheckResult.newPrice}
              </p>
              <p>{priceCheckResult.message}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
