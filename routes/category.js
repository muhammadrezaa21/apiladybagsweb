const router = require("express").Router();
const categoryController = require("../controllers/category");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/categories");
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

router.get("/", categoryController.getAllCategory);
router.post(
  "/",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  categoryController.createNewCategory
);
router.get("/:id", categoryController.getCategoryById);
router.put(
  "/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  categoryController.updateCategory
);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
