// // import React from "react";

// // const Home = () => {
// //   return (
// //     <div className="home-container">
// //       <h2>Welcome to Flipkart Price Tracker</h2>
// //       <p>Use the navigation to track prices, add new products, and more!</p>
// //     </div>
// //   );
// // };

// // export default Home;

// import React, { useState } from "react";
// import { getProducts } from "./../services/api";

// const Home = () => {
//   const [products, setProducts] = useState([]); // Initialize products as an empty array
//   const [error, setError] = useState(null);

//   const fetchAllProducts = async () => {
//     try {
//       const data = await getProducts();
//       if (data && data.products) {
//         setProducts(data.products); // Check if the data contains the products array
//       } else {
//         setProducts([]); // Set empty array if no products are returned
//       }
//       setError(null);
//     } catch (err) {
//       setProducts([]); // Ensure products is still an array in case of error
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="home-container">
//       <h2>Flipkart Price Tracker</h2>

//       {/* All Products */}
//       <div className="form-container">
//         <h3>All Products</h3>
//         <button onClick={fetchAllProducts}>Fetch All Products</button>
//         {error && <p className="error-message">{error}</p>}

//         <div className="product-list">
//           {products.length > 0 ? ( // Check if products array has any elements
//             products.map((product) => (
//               <div className="product-item" key={product.id}>
//                 <p>
//                   <strong>Name:</strong> {product.name}
//                 </p>
//                 <p>
//                   <strong>Price:</strong> ₹{product.price}
//                 </p>
//                 <p>
//                   <strong>URL:</strong>{" "}
//                   <a
//                     href={product.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {product.url}
//                   </a>
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No products available.</p> // Display message if products array is empty
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// src/components/Home.js
import React, { useEffect, useState } from "react";
import { getProducts } from "./../services/api"; // Adjust the import based on your folder structure
// src/components/Home.js

import { Link } from "react-router-dom"; // For navigation

const Home = () => {
  const [products, setProducts] = useState([]); // State to hold the product list
  const [error, setError] = useState(null); // State to hold any error messages

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(); // Fetch the products
        console.log("Fetched products:", response.data); // Log the fetched products
        setProducts(response.data); // Set the products state
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message || "An error occurred while fetching products"); // Set error state if there’s an error
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div>
      <h1>Home</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display any error messages */}
      <h2>Product List:</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>{product.title}</Link>{" "}
              {/* Link to product details */}
            </li>
          ))
        ) : (
          <p>No products available.</p> // Message when no products are found
        )}
      </ul>
    </div>
  );
};

export default Home;
