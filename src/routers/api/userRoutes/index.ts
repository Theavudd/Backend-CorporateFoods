import {celebrate} from 'celebrate';
import VALIDATION from '../../../utils/commonFunctions/validation';
import UserClass from '../../../controller/user';
import {Router} from 'express';

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
      UserClass.userLogin,
    );

    this.router.route('/signup').post(
      celebrate({
        headers: VALIDATION.authorizationHeaderObj,
        body: {
          name: VALIDATION.USER.NAME.trim().required(),
          email: VALIDATION.USER.EMAIL.required(),
          password: VALIDATION.USER.PASSWORD.required(),
          employeeId: VALIDATION.USER.EMPLOYEEID.trim().optional(),
          companyName: VALIDATION.USER.COMPANYNAME.required(),
          accountType: VALIDATION.USER.ACCOUNTTYPE.required(),
        },
      }),
      UserClass.userSignUp,
    );
  }
}

export default new UserRoutes('/api/users');
