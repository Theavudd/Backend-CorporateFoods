import {Request, Response, NextFunction} from 'express';
import BaseClass from './baseController';
import {UserData} from '../modals/auth.modal';
import {Config} from '../utils/commonFunctions';
var jwt = require('jsonwebtoken');
import crypto from 'crypto';
import {decrypt, encrypt} from '../utils/commonFunctions/Encryption';
import {createSession} from '../services/middleware/session.middleware';

class UserClass extends BaseClass {
  async userSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      let {name, email, password, phoneNo, employeeId, accountType} = req.body;
      if (!(await UserData.findOne({emailId: email}))) {
        if (!(await UserData.findOne({employeeId}))) {
          let token = await createSession(req, res);
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
            name,
            email,
            phoneNo,
            employeeId,
            accountType,
            token,
          };
          res
            .status(200)
            .json({success: true, statusCode: 200, body: {...resp}});
        } else {
          res.status(400).json({
            message: 'Employee Id Already Exists',
          });
        }
      } else {
        res.status(400).json({
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
      const resp = await UserData.findOne({emailId: email});
      // password = decrypt(password);
      // console.log('decryptedText', decrypt(resp.password));
      console.log('res', {...resp});
      if (resp) {
        const token = await createSession(req, res);
        res.status(200).json({
          successCode: 200,
          status: 'success',
          body: {body: resp, token},
        });
      } else {
        res.status(400).json({
          successCode: 400,
          status: 'failed',
          message: `User doesn't Exists`,
        });
      }
    } catch (error) {
      res.status(500).json({
        successCode: 500,
        status: 'failed',
        message: `Something went wrong`,
      });
    }
  }
}

export default new UserClass();
