// /src/components/Product/ProductList.js
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../api/productAPI";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNumber) => {
    setLoading(true);
    try {
      const data = await getAllProducts(pageNumber);
      setProducts((prev) => [...prev, ...data.products]);
      setHasMore(data.products.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const loadMore = () => {
    if (hasMore) setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {loading && <div>Loading...</div>}
      {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default ProductList;
