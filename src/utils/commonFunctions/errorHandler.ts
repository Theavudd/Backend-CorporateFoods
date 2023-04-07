import {NextFunction, Request, Response} from 'express';

export const errorHandling = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('IS ERR', err);
  if (err.isJoi) {
    const errorDetails = err.details
      .map((item: any) => item.message)
      .join(', ');
    res.status(400).json({error: errorDetails});
  } else {
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
};
