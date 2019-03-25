import { NextFunction, Request, Response, Router } from "express";

export default class APIRoute {
  // private router: express.Router;

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/hello", (req: Request, res: Response, next: NextFunction) => {
      console.log('/api got called')
      new APIRoute().index(req, res, next);
    });
  }

  constructor() {}

  // public route(req: any, res: any, next: any): any {
  //   console.log(req);
  //   return this.router.get('/hello', (req, res, next) => {
  //     res.json('respond with a resource');
  //   });
  // }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    res.json('respond with a resource');
  }
}
