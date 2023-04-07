import {Response} from 'express';

export default class BaseClass {
  /** dispatches response from the server */
  async sendResponse(req: Response, res: any, next: any) {
    res.data = next;
    req.status(res.httpCode).json(res);
  }

  async sendResponseNull(r: Response, res: any, next: any) {
    res.data = next;
    r.status(res.httpCode).json(res);
  }
}
