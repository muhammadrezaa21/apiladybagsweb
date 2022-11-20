const router = require("express").Router();
const productController = require("../controllers/product");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.post(
  "/",
  multer({ storage: fileStorage, fileFilter: fileFilter }).any("image"),
  productController.createNewProduct
);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).any("image"),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
