const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../database/User")

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-./:;<=>?@[\]^_`{|}~])(?=.{8,})/;

class UserClass {
    constructor(username, email, password) {
        this.username = username
        this.email = email
        this.password = password
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        const newUser = await User.create({username: this.username, email: this.email, password: hashedPassword})

        return newUser
    }
}

const router = express.Router()

router.post('/signup', async (req, res) => {
    try{
        const {username, email, password} = req.body
        
        if(!username || !email || !password){
            return res.status(422).json({ message: "Please fill all the required details"})
        }
        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim();

        if (!emailRegex.test(sanitizedEmail)) {
          return res.status(422).json({ message: "Invalid email format" });
        }

        if (!passwordRegex.test(password)) {
          return res
            .status(422)
            .json({
              message:
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long"
            });
        }

        const existingName = await User.findOne({ where: {sanitizedUsername}})
        const existingEmail = await User.findOne({ where: {sanitizedEmail}})

        if(existingName || existingEmail){
            return res.status(409).json({ message: "User with this name or email already exists"})
        }

        const newUser = new UserClass(sanitizedUsername, sanitizedEmail, password)

        const savedUser = await newUser.save()

        return res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ message: 'Internal Server Error'})
    }

})

module.exports = router;