import {verify} from 'jsonwebtoken';
import {Config} from '.';

export const verifyToken = (token: string) => {
  const tokenData: any = verify(token, <string>Config.accessTokenSecret);
  return tokenData;
};
