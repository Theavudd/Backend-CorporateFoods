import {Request, Response, NextFunction} from 'express';
const jwt = require('jsonwebtoken');

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers['authorization']) {
    const authHeader: string | undefined = req.headers['authorization'];
    const authMethod: string = authHeader && authHeader.split(' ')[0];
    const authToken = authHeader && authHeader.split(' ')[1];
    if (authToken == null) return res.sendStatus(401);
    if (authMethod === 'Bearer' && authToken) {
      jwt.verify(
        authToken,
        process.env.TOKEN_SECRET as string,
        (err: any, user: any) => {
          console.log(err);
          if (err) return res.sendStatus(401);
          req.body = user;
          next();
        },
      );
    }
  }
};
