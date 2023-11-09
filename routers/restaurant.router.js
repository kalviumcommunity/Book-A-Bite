const express = require("express");
const router = express.Router();
const restController = require("../controllers/restController");

router.post("/create", restController.createRestaurant);

router.get("/all", restController.getAllRestaurant);

module.exports = router;