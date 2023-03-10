const mongoose = require('mongoose')
const Users = require('../models/Users.js')
const bcript = require('bcryptjs')

module.exports = class dataUser {
    constructor(url) {
        this.url = url
    }

    connectDatabase() {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        try {
            mongoose.connect(this.url, connectionParams)
        } catch (error) {
            console.log(error)
        }
    }

    async saveUser(email, password) {
        this.connectDatabase()
        const user = await this.findUserByMail(email)
        if (user) {
            return null
        } else {
            var newUser = new Users
            newUser.email = email
            const pass = await bcript.hash(password, 15)
            newUser.password = pass
            newUser.save((error) => {
                if (error) {
                    console.error(error)
                }
            })
        }
    }

    async findUserByMail(email) {
        this.connectDatabase()
        const response = await Users.findOne({ email: email })
        return response
    }

    async findUserById(id) {
        this.connectDatabase()
        const response = await Users.findOne({ id: id })
        return response
    }

}