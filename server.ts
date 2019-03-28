import express from 'express';
// import path from 'path';
// import favicon = require('serve-favicon');
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import APIRoute from './routes/index';

export class Server {
  public app: express.Application;
  // public router: Router;
  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    this.routes();

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      next();
    });

    // catch 404 and forward to error handler
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      const err: any = new Error('Not Found');
      err['status'] = 404;
      // next(err);
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 404).send({
        error: true,
        message: err.message
      });
    });

    // error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500).send({
        error: true,
        message: err.message
      });
    });
  }

  private routes(): void {
    let router: express.Router;
    router = express.Router();
    APIRoute.create(router);
    this.app.use('/api', router);
  }
}