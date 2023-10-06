const express = require("express");
const cors = require("cors");
const connection = require("./database/config");
const userRoutes = require("./controllers/userController");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/user", userRoutes);

// Start the Express server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});

// Hanling mysql connections here
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database successfully");
});
