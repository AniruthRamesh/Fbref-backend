// @ts-check

/**
 * Custom Error class for handling HTTP errors with status codes.
 * @class CError
 * @extends {Error}
 */
class CError extends Error{
  /**
   * 
   * @param {number} statusCode - HTTP status code of the error.
   * @param {string} message - Error message for the error.
   */
  constructor(statusCode, message) {
    super(message); // Add a "message" property
    this.statusCode = statusCode; // Add a "statusCode" property
  }
};

export default CError;