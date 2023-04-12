import e, {Request, Response} from 'express';
import BaseClass from './baseController';
import {UserData} from '../modals/auth.modal';
import Encryption from '../utils/commonFunctions/Encryption';
import {createToken} from '../services/middleware/session.middleware';
import {
  formatEmail,
  updateTokeniv,
} from '../utils/commonFunctions/commonFunctions';
import {v4 as uuidv4} from 'uuid';

class UserClass extends BaseClass {
  async userSignUp(req: Request, res: Response) {
    try {
      let {name, email, password, employeeId, accountType, companyName} =
        req.body;
      if (accountType == 1) {
        if (!employeeId) {
          res.status(400).json({
            message: 'Employee Id Required',
          });
        }
      }
      let dbResponse = await UserData.findOne({email, employeeId});
      if (!dbResponse) {
        let hashPassword: any = await Encryption.HashEncryption(password);
        const userId = uuidv4();
        let authToken = Encryption.Encrypt(await createToken(req, res, userId));
        let newEmail = formatEmail(email);
        const user = new UserData({
          userId,
          name,
          email: newEmail,
          password: hashPassword,
          employeeId,
          accountType,
          companyName,
          tokeniv: authToken.iv,
        });
        await user.save();
        const resp = {
          name,
          email: newEmail,
          employeeId,
          accountType,
          companyName,
          userId,
          authToken: authToken.encryptedData,
        };
        res.statusMessage = 'Signup Successful';
        res.status(200).json({
          success: true,
          statusCode: 200,
          data: {...resp},
        });
      } else {
        res.status(400).statusMessage = 'User Already Exists';
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      let {email, password} = req.body;
      let newEmail = formatEmail(email);
      const resp = await UserData.findOne({email: newEmail});
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
          const responseData = {
            userId,
            name,
            email,
            password,
            employeeId,
            accountType,
            companyName,
          };
          res.statusMessage = 'Login Successful';
          res.status(200).json({
            successCode: 200,
            status: 'success',
            data: {
              data: responseData,
              token: authToken.encryptedData,
            },
          });
        } else {
          res.statusMessage = `Incorrect Password`;
          res.status(400).json({
            successCode: 400,
            status: 'failed',
          });
        }
      } else {
        res.statusMessage = `User doesn't Exists`;
        res.status(400).json({
          successCode: 400,
          status: 'failed',
        });
      }
    } catch (error) {
      res.statusMessage = `Something went wrong`;
      res.status(400).json({
        successCode: 500,
        status: 'failed',
      });
    }
  }
}

export default new UserClass();
