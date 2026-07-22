const isLoggin = (req, res, next) => {
    console.log("isloggin middleware");
    // Get token from header
    // Verify the token
    // Save the user
    // Send the user
    next();
};

module.exports = isLoggin;