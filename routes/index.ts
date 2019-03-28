import { NextFunction, Request, Response, Router } from 'express';
import { Connection } from '../db';

export default class APIRoute {

  constructor() {}

  private static index(req: Request, res: Response, next: NextFunction): void {
    let mysqlConnection: any = new Connection().initDbConnection();
    mysqlConnection.query(`SELECT * from users`, function (error: any, results: any, fields: any){
      if (error) throw error;
      res.json(results);
    });
  }

  public static create(router: Router): void {
    //add home page route
    router.route('/user')
      .get((req: Request, res: Response, next: NextFunction) => {
        this.index(req, res, next);
      });
  }
}
