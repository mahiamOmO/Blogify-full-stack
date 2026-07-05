const express = require('express');

const userRouter = express.Router();

//Register
userRouter.post('/api/v1/users/register', register);
//Login
userRouter.post('/api/v1/users/login', login);

// Export
module.exports = userRouter;