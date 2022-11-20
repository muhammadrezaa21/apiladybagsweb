const router = require("express").Router();
const bannerController = require("../controllers/banner");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/banners");
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

router.get("/", bannerController.getAllBanner);
router.post(
  "/",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  bannerController.createNewBanner
);
router.get("/:id", bannerController.getBannerById);
router.put(
  "/:id",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  bannerController.updateBanner
);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
