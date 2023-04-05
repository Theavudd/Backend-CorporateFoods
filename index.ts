import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const dbURL: any = process.env.MONGO_URI;
mongoose.connect(dbURL);
import {mongoDOA} from './src/services/databases/mongoDB.js';
import {Config} from './src/commonFunctions/Environment.js';

class Application {
  private app = express();

  constructor() {
    this.app = express();
    this.init();
  }

  isAuth(req: any, res: any, next: any) {
    const auth = req.headers.basicauth;
    if (auth === process.env.basicauth || process.env?.PORT === '3000') {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
  }

  async init() {
    console.log('config', Config);
    mongoDOA.connectDatabase(Config.MONGO_URI);
    this.app.listen(process.env.PORT, () => {
      console.log('au', process.env.NODE_ENV);
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
    this.app.use(
      '/api/login',
      this.isAuth,
      require('./src/routers/api/login/index.ts'),
    );
    // app.use("/api/users", require("./routers/api/user"));
  };
}

export default new Application();
