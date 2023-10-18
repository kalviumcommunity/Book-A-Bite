const mysql = require("mysql2");
const connection = require("./config");

let counter = 0;

const generateID = () => {
  counter++
  return counter
}

function CheckExistingUser(username, email) {
  const existingUserQuery =
    "SELECT * FROM users WHERE email = ? OR username = ?";

  return new Promise((resolve, reject) => {
    connection.query(existingUserQuery, [email, username], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        reject(err);
      } else {
        resolve(results.length > 0 && results[0]);
      }
    });
  });
}

function createUser(username, email, password) {
  const createUserQuery =
    "INSERT INTO users (id, username, email, password) VALUES (?,?, ?, ?)";

  return new Promise((resolve, reject) => {
    connection.query(
      createUserQuery,
      [generateID(),username, email, password],
      (err, result) => {
        if (err) {
          console.error("Error inserting into database:", err);
          reject(err);
        } else {
          resolve("account created successfully");
        }
      }
    );
  });
}

module.exports = {
  CheckExistingUser,
  createUser
};
