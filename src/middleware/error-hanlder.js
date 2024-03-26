// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default status code and message for internal server errors
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Set status code and message based on error type
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON';
  } else if (err.name === 'ValidationError') {
    statusCode = 422;
    message = err.message;
  } // Add more conditions for specific error types as needed

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    errStack:err.stack
  });
};

// Register error handling middleware

module.exports=errorHandler