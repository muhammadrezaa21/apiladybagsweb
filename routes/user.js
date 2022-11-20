const router = require("express").Router();
const userController = require("../controllers/user");

router.get("/", userController.getAllUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
