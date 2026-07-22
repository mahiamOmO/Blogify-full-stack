const express = require('express');
const { register, login, getProfile } = require('../../controllers/users/usersCtrls');

const userRouter = express.Router();

// Register
userRouter.post('/register', register);
userRouter.post('/api/v1/users/register', register);

// Login
userRouter.post('/login', login);
userRouter.post('/api/v1/users/login', login);

// Profile
userRouter.get('/profile', getProfile);
userRouter.get('/api/v1/users/profile/:id', getProfile);

module.exports = userRouter;