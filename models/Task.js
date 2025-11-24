// Import Packages
const mongoose = require("mongoose");

// Task Schema definition
const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: 200
    },
    status: {
        type: String,
        enum: ["to do", "in progress", "done"],
        default: "to do"
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function (value) {
                // Only validate if a date is provided
                if (!value) return true;

                // Accept the date if value is in the present or future
                return value >= new Date();
            },
            message: "Due date must be in the future!"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},
{timestamps: true});

module.exports = mongoose.model("Task", TaskSchema);