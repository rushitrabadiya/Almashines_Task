import React, { useState } from "react";
import { addProduct } from "./../services/api"; // Adjust the import based on your folder
const AddProduct = () => {
  const [url, setUrl] = useState(""); // State for the URL input
  const [addedProduct, setAddedProduct] = useState(null); // State to hold the added product data
  const [error, setError] = useState(null); // State to hold any error messages

  const handleChange = (e) => {
    setUrl(e.target.value); // Update the URL state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setAddedProduct(null); // Reset added product state before adding a new product

    try {
      // Call the addProduct function and set the added product state
      const response = await addProduct({ url }); // Await the response
      console.log("Product added:", response.data); // Log the added product data
      setAddedProduct(response.data); // Set the added product data directly from the response
      setUrl(""); // Reset the input field after submission
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.message || "An error occurred"); // Set error state if there’s an error
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          name="url"
          placeholder="Product URL"
          value={url}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display any error messages */}
      {addedProduct && (
        <div>
          <h2>Product Added:</h2>
          <p>
            <strong>Title:</strong> {addedProduct.title}
          </p>{" "}
          {/* Display the product title */}
          <p>
            <strong>Description:</strong> {addedProduct.description}
          </p>{" "}
          {/* Display the product description */}
          <p>
            <strong>Price:</strong> ₹{addedProduct.price}
          </p>{" "}
          {/* Display the product price */}
          <p>
            <strong>Rating:</strong> {addedProduct.rating}
          </p>{" "}
          {/* Display the product rating */}
          <p>
            <strong>URL:</strong>{" "}
            <a
              href={addedProduct.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {addedProduct.url}
            </a>
          </p>{" "}
          {/* Display the product URL */}
          {/* Add more fields as necessary based on the product structure */}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
