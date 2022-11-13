const router = require("express").Router();
const categoryController = require("../controllers/category");

router.get("/", categoryController.getAllCategory);
router.post("/", categoryController.createNewCategory);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
