const mongoose = require("mongoose");

// Schema for user..
const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    
    phone: {
        type: Number,
        required: true,
        unique: true
    },
})
// creating model/collection/table from above userSchema..
const User = mongoose.model("User", userSchema);

module.exports = User;