const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add the user name"]
    },
    email: {
        type: String,
        required: [true,"Please ass the user name"],
        unique: [true,"Email address already taken"]

    },
    password: {
        type: String,
        required: [true,"Please enter a password"]
    }
},{timestamps: true})
module.exports = mongoose.model("User", userschema);