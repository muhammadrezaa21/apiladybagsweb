const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalog", CatalogSchema);
