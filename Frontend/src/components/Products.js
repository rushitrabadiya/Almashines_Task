import React, { useState } from "react";
import axios from "axios";

const Products = ({ products, loading, error }) => {
  const [activeProduct, setActiveProduct] = useState(null);
  const [priceData, setPriceData] = useState({});
  const [loadingPrice, setLoadingPrice] = useState({});

  if (loading) {
    return <div className="loading-message">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="error-message-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  if (!products) {
    return <div className="loading-message">Waiting for products data...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="no-data-message">
        No products found for the given filters.
      </div>
    );
  }

  const handlePriceCheck = async (id) => {
    if (loadingPrice[id]) return;

    setLoadingPrice((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await axios.get(
        `https://almashines-task-j4xu.onrender.com/api/v1/products/${id}/check-price`
      );
      setPriceData((prevData) => ({
        ...prevData,
        [id]: response.data.data,
      }));
    } catch (err) {
      console.error("Error fetching price data", err);
    } finally {
      setLoadingPrice((prev) => ({ ...prev, [id]: false }));
    }
  };

  const toggleDetails = (id) => {
    setActiveProduct((prev) => (prev === id ? null : id));
  };

  return (
    <div className="products">
      <h1>All Products</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-card">
            <div className="product-info">
              <div className="product-image-container">
                <img
                  src={product.imgUrl}
                  alt={product.title}
                  className="product-image"
                />
              </div>

              <div className="product-text">
                <h3>{product.title}</h3>
                <p>Price: ₹{product.price}</p>
                <p>Rating: {product.rating}</p>

                {activeProduct === product._id && (
                  <div className="product-details">
                    <p>{product.description}</p>

                    <button
                      onClick={() => handlePriceCheck(product._id)}
                      disabled={loadingPrice[product._id]}
                    >
                      {loadingPrice[product._id] ? "Loading..." : "Check Price"}
                    </button>

                    {priceData[product._id] && (
                      <div>
                        <p>Old Price: ₹{priceData[product._id].oldPrice}</p>
                        <p>New Price: ₹{priceData[product._id].newPrice}</p>
                      </div>
                    )}
                  </div>
                )}

                <button onClick={() => toggleDetails(product._id)}>
                  {activeProduct === product._id
                    ? "Hide Details"
                    : "Show Details"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .product-list {
          list-style: none;
          padding: 0;
        }
        .product-card {
          border: 1px solid #ddd;
          padding: 20px;
          margin: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex; /* Display items in a row */
        }
        .product-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .product-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .product-image-container {
          flex-shrink: 0;
          margin-right: 20px;
        }
        .product-image {
          max-width: 120px;
          height: auto;
          border-radius: 8px;
        }
        .product-text {
          flex: 1;
        }
        .product-details {
          margin-top: 10px;
        }
        .loading-message,
        .error-message-container,
        .no-data-message {
          text-align: center;
        }
        button {
          margin-top: 10px;
          padding: 8px 16px;
          cursor: pointer;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
        }
        button:disabled {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
};

export default Products;
