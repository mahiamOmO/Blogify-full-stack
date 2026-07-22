require('dotenv').config({ path: './utils/.env' });

const http = require('http');
const express = require('express');

const connectDB = require('./config/database');
const userRouter = require('./routes/users/userRouter');

const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectDB();

// Routes
app.use('/api/v1/users', userRouter);

// Test Route
app.get('/', (req, res) => {
    res.send('Blogify API is running...');
});

// Create Server
const server = http.createServer(app);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});