import {Request, Response, NextFunction} from 'express';
import {Config} from '../../utils/commonFunctions';
const jwt = require('jsonwebtoken');

export const createSession = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {email, password} = req.body;
    const token = jwt.sign(
      {emailId: email, password},
      Config.accessTokenSecret,
      {expiresIn: '100m'},
    );
    return token;
  } catch (error) {
    console.log('error', error);
    res.status(401).json({message: 'Something went wrong'});
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
