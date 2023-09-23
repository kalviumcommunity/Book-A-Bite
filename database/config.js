const Sequelize = require("sequelize");

const sequelize = new Sequelize("bookabite", "root", "password@03K", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
