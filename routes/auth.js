const router = require("express").Router();
const authController = require("../controllers/auth");

router.get("/", (req, res) => {
  console.log("masuk");
  res.send("Masuk");
});

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

module.exports = router;
