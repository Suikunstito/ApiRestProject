import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  // Log the error stack trace for debugging
  console.error(err.stack);

  // Send a clean error response to the client
  res.status(500).json({
    message: err.message,
    // Only show stack trace in development environment
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export default errorHandler;