const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Role = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        number: { 
            type: Number,
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

module.exports = mongoose.model('role', Role)