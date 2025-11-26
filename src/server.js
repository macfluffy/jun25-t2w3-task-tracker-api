// Import Packages
const mongoose = require("mongoose");
const app = require("./index");

// Setup server port
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/task_scheduler";

// Boot up the server
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Database Connected!");
        app.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB: ", err);
    });

