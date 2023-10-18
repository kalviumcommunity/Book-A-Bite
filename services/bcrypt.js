const bcrypt = require('bcrypt')
const e = require('express')

class Bcrypt {
    #password = ''

    constructor(password){
        this.#password = password
    }

    async hash() {
        const hashedPassword = await bcrypt.hash(this.#password, 10)
        return hashedPassword
    }

    async verify(userPassword) {
        const verifyPassword = await bcrypt.compare(this.#password, userPassword)
        if(!verifyPassword){
            return false
        }
        else{
            return true
        }
    }
}

module.exports = Bcrypt;