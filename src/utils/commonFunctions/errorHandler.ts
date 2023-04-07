import {isCelebrateError} from 'celebrate';
import {NextFunction, Request, Response} from 'express';

export const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (isCelebrateError(err)) {
    next();
  } else {
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
};
