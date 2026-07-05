const express = require('express');

const userRouter = express.Router();

// Register
userRouter.post('/api/v1/users/register', register);

// Export
module.exports = userRouter;