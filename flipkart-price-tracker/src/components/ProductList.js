import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setProducts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.title} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
