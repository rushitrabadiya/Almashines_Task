const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routers/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/flipkart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/v1/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
