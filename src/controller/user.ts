import e, {Request, Response, NextFunction} from 'express';
import BaseClass from './baseController';
import {UserData} from '../modals/auth.modal';
import Encryption from '../utils/commonFunctions/Encryption';
import {createToken} from '../services/middleware/session.middleware';
import {updateTokeniv} from '../utils/commonFunctions/commonFunctions';
import {v4 as uuidv4} from 'uuid';

class UserClass extends BaseClass {
  async userSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      let {name, email, password, employeeId, accountType, companyName} =
        req.body;
      if (accountType === 1) {
        if (!employeeId) {
          res.status(400).json({
            message: 'Employee Id Require',
          });
        }
      }
      let dbResponse = await UserData.findOne({email, employeeId});
      if (!dbResponse) {
        let hashPassword: any = await Encryption.HashEncryption(password);
        const userId = uuidv4();
        let authToken = Encryption.Encrypt(await createToken(req, res, userId));
        const user = new UserData({
          userId,
          name,
          email,
          password: hashPassword,
          employeeId,
          accountType,
          companyName,
          tokeniv: authToken.iv,
        });
        await user.save();
        const resp = {
          name,
          email,
          employeeId,
          accountType,
          companyName,
          userId,
          authToken: authToken.encryptedData,
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
      const resp = await UserData.findOne({email});
      if (resp) {
        let decryptPass = await Encryption.HashCompare(
          password,
          resp?.password,
        );
        if (decryptPass) {
          const authToken = Encryption.Encrypt(await createToken(req, res));
          updateTokeniv(UserData, resp?._id, authToken.iv);
          const {
            userId,
            name,
            email,
            password,
            employeeId,
            accountType,
            companyName,
          } = resp;
          // const responseData = {...resp};
          // console.log('resp', resp);
          const responseData = {
            userId,
            name,
            email,
            password,
            employeeId,
            accountType,
            companyName,
          };

          res.status(200).json({
            successCode: 200,
            status: 'success',
            data: {
              data: responseData,
              token: authToken.encryptedData,
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
      res.status(400).json({
        successCode: 500,
        status: 'failed',
        message: `Something went wrong`,
      });
    }
  }
}

export default new UserClass();
