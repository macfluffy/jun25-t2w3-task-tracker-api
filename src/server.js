// Import Packages
//const mongoose = require("mongoose");
const app = require("./index");

// Setup server port
const PORT = process.env.PORT || 5000;

// Port Listening
app.listen("/", () => {
    console.log(`Server is running on PORT: ${PORT}`);
})