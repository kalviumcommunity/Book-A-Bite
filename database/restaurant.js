const mysql = require("mysql2")
const connection = require("./config")

let counter = 0

const generateID = () => {
  counter++
  return counter
}

function CreateRestaurant(name, address, phone) {
  const createRestaurantQuery = "INSERT INTO restaurant (restaurant_id, name, address, phone_number) VALUES (?,?,?,?)"

  return new Promise((resolve, reject) => {
    connection.query(createRestaurantQuery, [generateID(), name, address, phone], (err, result) => {
      if (err) {
        console.error("Error inserting into database:", err)
        reject(err)
      } else {
        resolve("restaurant created successfully")
      }
    })
  })
}

function GetAllRestaurant() {
  const getAllRestaurantQuery = "SELECT * FROM restaurant"

  return new Promise((resolve, reject) => {
    connection.query(getAllRestaurantQuery, (err, result) => {
      if (err) {
        console.error("Error querying database:", err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = { CreateRestaurant, GetAllRestaurant }