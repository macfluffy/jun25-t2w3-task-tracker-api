// Import Packages
// Application Framework
const express = require("express");
const mongoose = require("mongoose");

// Security Middlewares
const helmet = require("helmet");
const cors = require("cors");

// Create an instance of the application server
const app = express();

const authRoutes = require("./routes/auth");
app.use("/api/v1/auth", authRoutes);

// Configure security settings
const corsOptions = {
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200
};

// Apply security middlewares to the application
app.use(helmet());
app.use(cors(corsOptions));

// Setup server responses
app.use(express.json());


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
app.get(/.*/, (request, response) => {
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    });
});

module.exports = app;