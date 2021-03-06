const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Product Schema
// ProdcuctId iss automatically generated by MongoDB as _id
const ProductSchema = Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  qtyPerUnit: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  unitInStock: {
    type: Number,
    required: true,
  },
  disContinued: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category", // Reference to Category Collection
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
