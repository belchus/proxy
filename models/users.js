const mongoose = require ('mongoose')


const userSession = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Users = mongoose.model('usuarios', userSession)

module.exports = Users