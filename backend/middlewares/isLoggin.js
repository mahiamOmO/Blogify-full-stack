const jwt = require('jsonwebtoken');
const isLoggin = (req, res, next) => {
    console.log(req.headers);
    // Get token from header
   const token = req.headers.authorization?.split(" ")[1];
   console.log(token);
    // Verify the token
    if (!token) {
        return res.status(401).json({
            status: 'failed',
            message: 'No token provided',
        });
    }

    jwt.verify(token, 'anykey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid token',
            });
        }

        console.log(decoded);
        req.user = decoded.user;
        console.log(req.user);
        next();
    });
    
    // Save the user
    // Send the user
};

module.exports = isLoggin;