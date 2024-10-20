import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/products"; // Replace with your backend API URL

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const checkProductPrice = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/check-price`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const searchAndFilterProducts = async (params) => {
  return await axios.get("/api/products/search", { params }); // Adjust the endpoint as needed
};

export const getShowcaseProductsFiled = async (fields) => {
  return await axios.get(`/api/products/showcase`, { params: { fields } }); // Adjust the endpoint as needed
};
