
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user-route');
const postRouter = require('./routes/post-route');
const errorHandler = require('./middleware/error-hanlder');
var cors = require('cors')

const app = express();
// Middleware to Parse JSON request bodies
app.use(bodyParser.json());

app.use(cors())
// Define routes
app.use('/api/v1/user', userRouter);

app.use('/api/v1/post',postRouter)

// Error handling middleware
app.use(errorHandler);

module.exports = app;
