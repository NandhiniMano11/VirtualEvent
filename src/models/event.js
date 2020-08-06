const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        link: {
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

module.exports = mongoose.model('event', Event)