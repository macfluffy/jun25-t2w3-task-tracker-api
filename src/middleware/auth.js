// Import Packages
const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    // Get the auth header values
    const header = request.headers["authorization"];
    // If the header doesn't have anything
        // Send an error message
    if (!header) return response.status(401).json({
        error: "Missing token"
    });
    // Get the token from the header
    const token = header.split (" ")[1];
    // Fetch the payload data from the token
    try {
        request.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } 
    catch {
        response.status(401).json({
            error: "Invalid token!"
        });
    }
    // Pass on to the next middleware/function
};