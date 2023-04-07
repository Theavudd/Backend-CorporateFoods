import {Request, Response, NextFunction} from 'express';
import BaseClass from './baseController';
import {UserData} from '../modals/authModal';

class UserClass extends BaseClass {
  async userSignUp(req: Request, res: Response, next: NextFunction) {
    const {name, email, password, phoneNo, employeeId, accountType} = req.body;
    console.log('userD', UserData);
  }
}

export default UserClass;
