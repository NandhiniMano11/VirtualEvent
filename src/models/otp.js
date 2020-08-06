const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Otp = new Schema(
    {
        userid: {
            type: String,
            required: true
        },
        otp: {
            type: Number,
            required: true
        },
        expires: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        }

    },
    { timestamps: true },
)

module.exports = mongoose.model('otp', Otp)