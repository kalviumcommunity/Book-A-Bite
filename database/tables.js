const mysql = require("mysql2");
const connection = require("./config");

let counter = 0;

const generateID = () => {
  counter++;
  return counter;
}

function CreateTable(capacity, restaurant_id, type) {
  const createTableQuery = "INSERT INTO tables (table_id, status, capacity, restaurant_id, type) VALUES (?,?,?,?,?)"

  return new Promise((resolve, reject) => {
    connection.query(createTableQuery, [generateID(), false,capacity, restaurant_id, type], (err, result) => {
      if (err) {
        console.error("Error inserting into database:", err)
        reject(err)
      } else {
        resolve("table created successfully")
      }
    })
  })
}

module.exports = { CreateTable }