const router = require("express").Router();
const User = require("../models/User");
const userController = require("../controllers/user");

router.put("/:id", userController.updateUser);

module.exports = router;
