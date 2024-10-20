const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routers/productRoutes");
const { DB, PORT } = require("./config/config");

const app = express();
app.use(express.json());

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use("/api/v1/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
