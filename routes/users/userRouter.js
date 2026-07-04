const express = require('express');
const { register } = require('../../controllers/users/usersCtrls');

const userRouter = express.Router();

// Register
userRouter.post('/api/v1/users/register', register);

module.exports = userRouter;