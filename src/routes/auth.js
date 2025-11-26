// Import Packages
const express= require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (request, response, next) => {
    try {
        const {email, password, role} = request.body;
        const user = new User({email, password, role});
        await user.save();
        response.status(201).json({
            message: "User registered!"
        })
    } catch (error) {
        /*response.status(400).json({
            error: error.message
        });*/
        // User error handling middleware
        error.status = 400;
        next(error);
    }
});

router.post("/login", async (request, response, next) => {
    try {
        const {email, password} = request.body;
        const user = await User.findOne({email});
        /*if (!user) return response.status(400).json({
            error: "Invalid credentials"
        });*/
        if (!user) {
            const error = new Error("Invalid email");
            error.status = 400;
            return next(error);
        }

        const match = await bcrypt.compare(password, user.password);
        /*if (!match) return response.status(400).json({
            error: "Invalid password"
        });*/
        if (!match) {
            const error = new Error("Invalid password");
            error.status = 400;
            return next(error);
        }

        const token = jwt.sign({
            userId: user._id,
            role: user.role
        },
        //eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        {expiresIn: "1h"});
        response.json({token});
    } catch (error) {
        /*response.status(400).json({
            error: error.message
        });*/
        error.status = 400;
        next(error);
    }
});

module.exports = router;