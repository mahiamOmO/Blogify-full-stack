const express = require('express');
const { register } = require('../../controllers/users/usersCtrls');

const userRouter = express.Router();

// Register
userRouter.post('/register', register);

module.exports = userRouter;