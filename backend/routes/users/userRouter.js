const express = require('express');
const { register, login } = require('../../controllers/users/usersCtrls');

const userRouter = express.Router();

// Register
userRouter.post('/register', register);
userRouter.post('/api/v1/users/register', register);

// Login
userRouter.post('/login', login);
userRouter.post('/api/v1/users/login', login);

module.exports = userRouter;