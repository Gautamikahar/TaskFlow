const mongoose = require("mongoose");
console.log("User model loaded");
const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});
//model uses the schema and gives us functions to interact with mongoDB
//model knows how to communicate with mongodb
const User = mongoose.model("User", userSchema);
module.exports = User;