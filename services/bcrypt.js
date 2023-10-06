const bcrypt = require('bcrypt')

class Bcrypt {
    #password = ''

    constructor(password){
        this.#password = password
    }

    async hash() {
        const hashedPassword = await bcrypt.hash(this.#password, 10)
        return hashedPassword
    }

    async verify() {
        const verifyPassword = await bcrypt.verify(this.#password)
        return verifyPassword
    }
}

module.exports = Bcrypt;