import {Request, Response, NextFunction} from 'express';
import BaseClass from './baseController';
import {UserData} from '../modals/authModal';
import {Config} from '../utils/commonFunctions';
var jwt = require('jsonwebtoken');
import crypto from 'crypto';
import {decrypt, encrypt} from '../utils/commonFunctions/Encryption';

class UserClass extends BaseClass {
  async userSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      let {name, email, password, phoneNo, employeeId, accountType} = req.body;
      if (!(await UserData.findOne({emailId: email}))) {
        if (!(await UserData.findOne({employeeId}))) {
          // let newPassword = encrypt(password);
          const user = new UserData({
            fullName: name,
            emailId: email,
            password,
            employeeId,
            accountType,
            phoneNo,
          });
          await user.save();
          const resp = {
            successCode: 200,
            status: 'success',
            body: {
              name,
              email,
              phoneNo,
              employeeId,
              accountType,
            },
          };
          console.log();
          res
            .status(200)
            .json({success: true, statusCode: 200, body: {...resp}});
        } else {
          res.status(400).json({
            successCode: 400,
            status: 'failed',
            message: 'Employee Id Already Exists',
          });
        }
      } else {
        res.status(400).json({
          successCode: 400,
          status: 'failed',
          message: 'User Already Exists',
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async getUserDetails(req: Request, res: Response, next: NextFunction) {
    try {
      let {email, password} = req.body;
      UserData.findOne({emailId: email}).then((resp: any) => {
        // password = decrypt(password);
        // console.log('decryptedText', decrypt(resp.password));
        if (resp) {
          res.status(200).json({
            successCode: 200,
            status: 'success',
            body: {
              ...resp,
            },
          });
        } else {
          res.status(400).json({
            successCode: 400,
            status: 'failed',
            message: `User doesn't Exists`,
          });
        }
      });
    } catch (error) {
      res.status(400).json({
        successCode: 500,
        status: 'failed',
        message: `Something went wrong`,
      });
    }
  }
}

export default new UserClass();
