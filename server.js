const http = require('http');
const express = require('express');


//!server

const app = express();

// Routes
app.use('/',userRouter);

const server = http.createServer(app);
//? Start the server

const PORT = process.env.PORT ||3000
server.listen(PORT,console.log(`Server is running on port ${PORT}`));