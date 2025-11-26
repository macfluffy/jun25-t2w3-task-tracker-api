const express = require('express');
const Task = require("../models/Task");

const router = express.Router();

const auth = require('../middlewares/auth');
router.use(auth);

router.post("/", async (request, response, next) => {
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
        response.status(201).json({
            message: "New task added",
            body: task
        })
    } catch (error) {
        /*response.status(400).json({
            error: error.message
        });*/
        if (error.name === "ValidationError") {
            error.status = 400;
        }
        next(error);
    }
});

router.get('/', async (request, response, next) => {
    try {
        const filter = request.user.role === 'admin' ? {} : { user: request.user.userId };

        const tasks = await Task.find(filter).sort({ dueDate: 1 }); // 1 for ascending, -1 for descending
        response.status(200).json(tasks);
    } catch (error) {
        next (error);
    }
});

router.get("/:id", async (request, response, next) => {
    try {
        const filter = {_id: request.params.id};
        if (request.user.role != "admin") {
            filter.user = request.user.userId;
        }

        const task = await Task.findOne(filter);
        if (!task) {
            const error = new Error("Task not found");
            error.status(404);
            return next(error);
        }
        response.status(200).json(task);
    } catch (error) {
        next(error);
    }
});

module.exports = router;