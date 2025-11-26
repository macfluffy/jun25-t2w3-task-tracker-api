const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

router.use(auth);

router.post("/", (request, response) => {
    try {
        const {title, status, dueDate} = response.body;

        // Build new Task object
        const task = new Task({
            title,
            status,
            dueDate,
            user: request.user.userId   // Link the task to the current user
        });
    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
});