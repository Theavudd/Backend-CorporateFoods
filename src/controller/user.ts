import {Request, Response, NextFunction} from 'express';
import BaseClass from './baseController';
import {UserData} from '../modals/auth.modal';
import Encryption from '../utils/commonFunctions/Encryption';
import {createSession} from '../services/middleware/session.middleware';
import {updateTokeniv} from '../utils/commonFunctions/commonFunctions';
import {v4 as uuidv4} from 'uuid';

class UserClass extends BaseClass {
  async userSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        name,
        email,
        password,
        phoneNo,
        employeeId,
        accountType,
        companyName,
      } = req.body;
      if (!(await UserData.findOne({emailId: email, employeeId}))) {
        let hashPassword: any = await Encryption.HashEncryption(password);
        const userId = uuidv4();
        let token = Encryption.Encrypt(await createSession(req, res, userId));
        const user = new UserData({
          userId,
          fullName: name,
          emailId: email,
          password: hashPassword,
          employeeId,
          accountType,
          phoneNo,
          companyName,
          tokeniv: token.iv,
        });
        await user.save();
        const resp = {
          name,
          email,
          phoneNo,
          employeeId,
          accountType,
          companyName,
          userId,
          token: token.encryptedData,
        };
        res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'Signup Successful',
          data: {...resp},
        });
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
      let decryptPass = Encryption.HashCompare(resp?.password, password);
      if (resp) {
        if (decryptPass === password) {
          const token = Encryption.Encrypt(await createSession(req, res));
          updateTokeniv(UserData, resp?._id, token.iv);
          res.status(200).json({
            successCode: 200,
            status: 'success',
            data: {
              data: resp,
              token: token.encryptedData,
              message: 'Login Successful',
            },
          });
        } else {
          res.status(400).json({
            successCode: 400,
            status: 'failed',
            message: `Incorrect Password`,
          });
        }
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
