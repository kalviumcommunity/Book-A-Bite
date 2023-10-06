const mysql = require('mysql2')
require('dotenv').config()

const db_name = process.env.DATABASE_NAME
const username = process.env.DATABASE_USER
const pass = process.env.DATABASE_PASS

var connection = mysql.createConnection({
  host: "localhost",
  user: username,
  password: pass,
  database: db_name
})

module.exports = connection;
