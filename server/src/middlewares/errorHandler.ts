import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

// TODO : implement errors for both Prod : dev mode here

const ErrorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const e = err as Error;
  console.log(e);
  console.log(e.message);

  res.status(500).json({
    status: "error",
    message: e.message || "server error",
  });
};

export default ErrorHandler;
