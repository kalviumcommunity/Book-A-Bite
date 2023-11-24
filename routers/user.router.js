const express = require("express");
const router = express.Router();
const {
  UserCreationService,
  UserLoginService
} = require("../controllers/userController");

router.post("/signup", async (req, res) => {
  try {
    await UserCreationService.createUser(req, res);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    await UserLoginService.loginUser(req, res);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
