const express = require("express");
const { validateAuth } = require("../middleware/auth");
const UserService = require("../services/users");
const {googlelogin} = require("../services/userController");
const router = express.Router();

router.get("/", UserService.getAllUser);
router.post("/register", UserService.createUser);
router.delete("/:id", UserService.deleteUSer);
router.put("/:id", UserService.modifyUser);
router.post("/login", UserService.userLogin);
router.get("/me", validateAuth, UserService.userMe);
router.post("/logout", UserService.userLogout);
router.post("/google/googlelogin", googlelogin);

module.exports = router;
