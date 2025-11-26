const express = require('express');
const Task = require("../models/Task");

const router = express.Router();

const auth = require('../middlewares/auth');
router.use(auth);

router.post("/", async (request, response) => {
    try {
        const {title, status, dueDate} = response.body;

        // Build new Task object
        const task = new Task({
            title,
            status,
            dueDate,
            user: request.user.userId   // Link the task to the current user
        });

        // Save the task
        console.log(task);
        await task.save();
        reponse.status(201).json({
            message: "New task added",
            body: task
        })
    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
});