require("dotenv").config

const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../database/User")

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

        const existingName = await User.findOne({ where: {username}})
        const existingEmail = await User.findOne({ where: {email}})

        if(existingName || existingEmail){
            return res.status(409).json({ message: "User with this name or email already exists"})
        }

        const newUser = new UserClass(username, email, password)

        const savedUser = await newUser.save()

        return res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error('Error:', error)
        return res.status(500).json({ message: 'Internal Server Error'})
    }

})

module.exports = router;