import mongoose from "mongoose";

// defining the schema for storing the information
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean, required: true },
  date: { type: Number, required: true },
});

// creating the model
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
