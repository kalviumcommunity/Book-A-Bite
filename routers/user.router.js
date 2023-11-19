const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    await userController.loginUser(req, res);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
