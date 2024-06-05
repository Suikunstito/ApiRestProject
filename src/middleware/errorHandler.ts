import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // Log the error stack trace for debugging
  console.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  switch (err.name) {
    case 'ValidationError':
      statusCode = 400;
      message = 'Validation Error';
      break;
    case 'MongoServerError':
      if (err.code === 11000) {
        statusCode = 409;
        message = 'Email already exists';
      }
      break;
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    // Only show stack trace in development environment
    stack: process.env.NODE_ENV === 'development'? err.stack : undefined,
  });
};

export default errorHandler;