// utils/customError.js

class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    // Maintains proper stack trace (only in V8 environments like Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
