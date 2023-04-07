import {Joi, Segments, celebrate} from 'celebrate';
import VALIDATION from '../../../utils/commonFunctions/validation';
import BaseRoute from '../../baseRoutes';
import {Router, Request, Response, NextFunction} from 'express';
import Middleware from '../../../services/middleware';
import {Jwt} from 'jsonwebtoken';

class UserRoutes {
  // public authSession = new Middleware.authenticateToken;
  router = Router();
  constructor() {
    this.initRoutes();
  }

  get instance(): Router {
    return this.router;
  }

  initRoutes() {
    this.router.post(
      '/login',
      celebrate({
        headers: VALIDATION.authorizationHeaderObj,
        body: {
          email: VALIDATION.USER.EMAIL.required(),
          password: VALIDATION.USER.PASSWORD.required(),
        },
      }),
      (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({...req.body});
      },
    );

    this.router.post(
      '/signup',
      celebrate({
        headers: VALIDATION.authorizationHeaderObj,
        body: {
          name: VALIDATION.USER.NAME.trim().required(),
          email: VALIDATION.USER.EMAIL.required(),
          password: VALIDATION.USER.PASSWORD.required(),
          phoneNo: VALIDATION.USER.PHONE.optional(),
          employeeId: VALIDATION.USER.EMPLOYEEID.required(),
          accountType: VALIDATION.USER.ACCOUNTTYPE.required(),
        },
      }),
      (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({...req.body});
      },
    );
  }
}

export default new UserRoutes();
