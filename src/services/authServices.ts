import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {Config} from '../utils/commonFunctions';

export const Auth = {
  /** verifies the authenticity of the JWT token */
  verifyToken(token: string) {
    try {
      let payload = jwt.verify(token, Config.JWT_PASSWORD, {
        algorithms: ['HS256'],
      });
      if (payload) {
        return {success: true, data: payload};
      } else return {success: false};
    } catch (error) {
      throw error;
    }
  },
};
