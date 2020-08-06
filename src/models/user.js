const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        emailId: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        role: {
            type: Number,
            required: true,
            default:2
        },
        status: {
            type: Boolean,
            required: false,
            default: true
        }       
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)