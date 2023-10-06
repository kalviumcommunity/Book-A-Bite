const express = require("express")
const Bcrypt = require("../services/bcrypt")
const Validation = require("../services/validation")
const UserDB = require("../database/user")


const router = express.Router()

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

        const validate =  new Validation(email, password)
        const validateEmail =  validate.testEmailRegex()
        if(validateEmail){
          return res.status(422).json({ message: "Invalid Email Format"})
        }


        const validatePass = validate.testPasswordRegex()
        if(validatePass){
          return res
            .status(422)
            .json({
              message:
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long"
            });
        }

        const hash = new Bcrypt(password)
        const hashedPassword = await hash.hash()
        console.log(hashedPassword)
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

module.exports = router;