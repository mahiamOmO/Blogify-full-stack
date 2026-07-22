const express = require('express');
const { register, login, getProfile } = require('../../controllers/users/usersCtrls');

const userRouter = express.Router();

// Register
userRouter.post('/register', register);
userRouter.post('/register', register);

// Login
userRouter.post('/login', login);
userRouter.post('/login', login);

// Profile
userRouter.get('/profile', getProfile);
userRouter.get('/profile/:id', getProfile);

module.exports = userRouter;