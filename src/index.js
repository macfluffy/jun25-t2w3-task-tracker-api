// Import Packages
// Application Framework
const express = require("express");
const mongoose = require("mongoose");

// Create an instance of the application server
const app = express();

// Security Middlewares
const helmet = require("helmet");
const cors = require("cors");

// Configure security settings
const corsOptions = {
    origin: ["http://localhost:5000", "http://localhost:5137"],
    optionsSuccessStatus: 200
};

// Apply security middlewares to the application
app.use(helmet());
app.use(cors(corsOptions));

// Setup server responses
app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api/v1/auth", authRoutes);

const taskRoutes = require("./routes/tasks");
app.use("/api/v1/tasks", taskRoutes);

// Server Responses
// Default Home Route
app.get("/", (request, response) => {
    response.json({
        message: "Hello from Task Tracker"
    });
});

app.get("/databaseHealth", (request, response) => {
    response.json({
        models: mongoose.connection.modelNames(),
        host: mongoose.connection.host
    });
});

// If a route/path is requested, something that doesn't exist, run this:
app.all(/.*/, (request, response) => {
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    });
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
    // Extract status from error, default to 500
    const status = error.status || 500;
    
    // Log server-side errors for debugging (only for dev)
    if (status === 500) {
        console.error(error.stack || error);
    }

    // Send JSON error with message
    response
    .status(status)
    .json({
        error: error.message || "Internal Server Error",
        name: error.name
    });
});

module.exports = app;