const mongoose = require('mongoose')
const axios = require('axios')

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, required: true, default: false },
    userstatus: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    resetToken: { type: String },
    expireToken: { type: Date },
},

{collection: 'user-data'}

)

const model = mongoose.model('UserData', User)

module.exports = model