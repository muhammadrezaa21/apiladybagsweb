const router = require("express").Router();
const catalogController = require("../controllers/catalog");

router.get("/", catalogController.getAllCatalog);
router.post("/", catalogController.createNewCatalog);
router.get("/:id", catalogController.getCatalogById);
router.put("/:id", catalogController.updateCatalog);
router.delete("/:id", catalogController.deleteCatalog);

module.exports = router;
