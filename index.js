const express = require("express")
const cors = require("cors")
const sequelize = require("./database/config")
const Sequelize = require("sequelize")
const userRoutes = require("./routes/userRoutes")

const app = express()

require("dotenv").config()

app.use(express.json());
app.use(cors())
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/user", userRoutes)

sequelize
  .sync() // Sync the database
  .then(() => {
    // Start the Express server after syncing the database
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
