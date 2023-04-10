import {Request, Response, NextFunction} from 'express';
import {Config} from '../../utils/commonFunctions';
const jwt = require('jsonwebtoken');

export const createToken = async (
  req: Request,
  res: Response,
  userId = '',
): Promise<void> => {
  try {
    const {email, employeeId} = req.body;
    if (!userId) {
    }
    let data = {
      email,
      employeeId,
      userId,
    };
    const token = jwt.sign(data, Config.accessTokenSecret, {expiresIn: '100d'});
    return token;
  } catch (error) {
    console.log('error', error);
    res.status(401).json({message: 'Something went wrong'});
  }
};
