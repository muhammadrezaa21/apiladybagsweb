const router = require("express").Router();
const bannerController = require("../controllers/banner");

router.get("/", bannerController.getAllBanner);
router.post("/", bannerController.createNewBanner);
router.get("/:id", bannerController.getBannerById);
router.put("/:id", bannerController.updateBanner);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
