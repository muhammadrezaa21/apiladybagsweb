const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    promoPrice: { type: Number, default: 0 },
    colors: { type: Array },
    category: { type: String },
    type: { type: String },
  },
  { timestamps: true }
);

ProductSchema.index({
  name: "text",
  desc: "text",
  price: "text",
  promoPrice: "text",
  type: "text",
  category: "text",
  colors: "text",
});

module.exports = mongoose.model("Product", ProductSchema);
