import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const dbURL: any = process.env.MONGO_URI;
mongoose.connect(dbURL);
import {mongoDOA} from './src/services/databases/mongoDB';
import {Config} from './src/utils/commonFunctions/Environment';
import userRoutes from './src/routers/api/userRoutes';
import {errorHandling} from './src/utils/commonFunctions/errorHandler';
import {isCelebrateError, errors} from 'celebrate';
var jwt = require('jsonwebtoken');

class Application {
  private app = express();

  constructor() {
    this.app = express();
    this.init();
    this.useMiddleware();
  }

  isAuth(req: any, res: any, next: any) {
    const auth = req.headers.basicauth;
    if (auth === process.env.basicauth || process.env?.PORT === '8089') {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
  }

  async init() {
    mongoDOA.connectDatabase(Config.MONGO_URI);
    this.app.listen(process.env.PORT, () => {
      // console.log('Server started at port 3000');
    });
  }

  useMiddleware = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
    this.app.get('/', this.isAuth, (req: any, res: any) => {
      res.send('Welcome to Corporate Foods');
    });

    this.app.use('/api', this.isAuth, userRoutes.instance);

    // Validation error handling
    this.app.use(errors());
  };
}

export default new Application();
