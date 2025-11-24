// Import Packages
const mongoose = require("mongoose");
const validator = require("validator");

// Define the Schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email is required"],
        unique: [true, "This email is already registered to an account"],
        // Regex method: Validating email format
        //match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
        validate: {
            validator: validator.isEmail,
            message: "Please use a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password needs to be minimum 6 characters long"]
    },
    role: {
        type: String,
        enum: ["user", "admin"]
    },
},
{timestamps: true});

module.exports = mongoose.model("User", UserSchema);