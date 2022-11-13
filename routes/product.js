const router = require("express").Router();
const productController = require("../controllers/product");

router.post("/", productController.createNewProduct);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
