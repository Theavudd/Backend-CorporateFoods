import {Joi, Segments, celebrate} from 'celebrate';
import VALIDATION from '../../../utils/commonFunctions/validation';
import BaseRoute from '../../baseRoutes';
import UserClass from '../../../controller/user';
import {Router, Request, Response, NextFunction} from 'express';
import {verifyToken} from '../../../services/middleware/session.middleware';

class UserRoutes {
  // public authSession = new Middleware.authenticateToken;
  public path: string;
  private router = Router();
  constructor(path: string) {
    this.initRoutes();
    this.path = path;
  }

  get instance(): Router {
    return this.router;
  }

  initRoutes() {
    this.router.route('/login').post(
      celebrate({
        headers: VALIDATION.authorizationHeaderObj,
        body: {
          email: VALIDATION.USER.EMAIL.required(),
          password: VALIDATION.USER.PASSWORD.required(),
        },
      }),
      (req: Request, res: Response, next: NextFunction) => {
        UserClass.getUserDetails(req, res, next);
      },
    );

    this.router.route('/signup').post(
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
        UserClass.userSignUp(req, res, next);
      },
    );
  }
}

export default new UserRoutes('/api');
