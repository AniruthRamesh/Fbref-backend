// @ts-check
/**
 * Error handling middleware for Express. Logs error stack, sends JSON response with status code
 * and error message. Defaults to 500/Internal Server Error if not specified by the error.
 * 
 * @memberof module:Middlewares
 * 
 * @function errorHandler
 * @param {Error} err - The error object that was thrown.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object. This method sets the response
 * status code and sends a JSON object containing the error details.
 * @param {Object} next - The Express next middleware function in the stack. Not
 * used in this function, but required by Express for error handling middleware.
 */
const errorHandler = (err,req,res,next) => {
  console.error(err.stack);
  
  // @ts-ignore
  const statusCode = err.statusCode || 500; 
  const errorMessage = err.message || 'An unexpected error occurred';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: errorMessage
  });
}

export default errorHandler;