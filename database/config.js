const Sequelize = require("sequelize");

const db_name = process.env.DATABASE_NAME
const username = process.env.DATABASE_USER
const pass = process.env.DATABASE_PASS

const sequelize = new Sequelize(db_name, username, pass, {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
