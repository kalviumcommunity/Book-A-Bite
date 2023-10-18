const express = require("express")
const Bcrypt = require("../services/bcrypt")
const Validation = require("../services/validation")
const UserDB = require("../database/user")
const jwt = require("jsonwebtoken")

const router = express.Router()

require("dotenv").config();

router.post('/signup', async (req, res) => {
    try{
        const {username, email, password} = req.body
        
        if(!username || !email || !password){
            return res.status(422).json({ message: "Please fill all the required details"})
        }

        const isExisting = await UserDB.CheckExistingUser(username, email);

        if(isExisting){
            return res.status(409).json({ message: "User with this name or email already exists"})
        }

        const validateEmail = Validation.emailRegex.test(email);
        if(!validateEmail){
          return res.status(422).json({ message: "Invalid Email Format"})
        }


        const validatePass = Validation.passwordRegex.test(password)
        if(!validatePass){
          return res
            .status(422)
            .json({
              message:
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long"
            });
        }

        const hash = new Bcrypt(password)
        const hashedPassword = await hash.hash()
        const newUser = await UserDB.createUser(
          username,
          email,
          hashedPassword
        );  
        if(newUser){
          return res.status(201).json({ message: 'User registered successfully', user: newUser });
        }
    } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ message: 'Internal Server Error'})
    }

})

router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res
        .status(422)
        .json({ message: "Please fill all the required details" });
    }

    const user = await UserDB.CheckExistingUser(username, email);

    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    const bcrypt = new Bcrypt(password);
    const verify = await bcrypt.verify(user.password);

    if (!verify) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "1h"
    });

    res
      .status(200)
      .json({
        message: "User logged in successfully",
        token: token,
        user: user
      });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
});


module.exports = router;