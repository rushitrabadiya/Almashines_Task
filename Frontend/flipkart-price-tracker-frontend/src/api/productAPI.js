// /src/api/productAPI.js

const BASE_URL = "http://localhost:5000/api/v1/products";

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Filter by title
export const filterByTitle = async (title) => {
  try {
    const response = await fetch(`${BASE_URL}/search?title=${title}`);
    return await response.json();
  } catch (error) {
    console.error("Error filtering by title:", error);
    throw error;
  }
};

// Filter by price range
export const filterByPrice = async (minPrice, maxPrice) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error filtering by price:", error);
    throw error;
  }
};

// Sort by rating (low to high or high to low)
export const sortByRating = async (sortOrder) => {
  try {
    const response = await fetch(`${BASE_URL}/search?sortRating=${sortOrder}`);
    return await response.json();
  } catch (error) {
    console.error(`Error sorting by rating (${sortOrder}):`, error);
    throw error;
  }
};

// Sort by price (low to high or high to low)
export const sortByPrice = async (sortOrder) => {
  try {
    const response = await fetch(`${BASE_URL}/search?sortPrice=${sortOrder}`);
    return await response.json();
  } catch (error) {
    console.error(`Error sorting by price (${sortOrder}):`, error);
    throw error;
  }
};

// Add a new product link
export const addProductLink = async (productUrl) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: productUrl }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding product link:", error);
    throw error;
  }
};

// Check price of a product
export const checkPrice = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/check-price`);
    return await response.json();
  } catch (error) {
    console.error(`Error checking price for product with ID ${id}:`, error);
    throw error;
  }
};

// Check description of a product
export const checkDescription = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/check-description`);
    return await response.json();
  } catch (error) {
    console.error(
      `Error checking description for product with ID ${id}:`,
      error
    );
    throw error;
  }
};
