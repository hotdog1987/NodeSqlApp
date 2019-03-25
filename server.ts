import express from "express";
// import path from 'path';
// import favicon = require('serve-favicon');
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import APIRoute from './routes/index';
// const index = require('./routes/index');

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
    //create expressjs application
    this.app = express();
    // this.router = new Router();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    // this.api();
  }

  private config(): void {
    // view engine setup
    // app.set('views', path.join(__dirname, 'public/views'));
    // app.engine('html', require('ejs').renderFile);
    // app.set('view engine', 'html');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    // app.use(express.static(path.join(__dirname, 'public')));

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.setHeader('Content-Type', 'application/json');
      next();
    });

    // catch 404 and forward to error handler
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      const err: any = new Error('Not Found');
      err['status'] = 404;
      next(err);
    });

    // error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      //res.render('error');
    });
  }

  private routes(): void {
    let router: express.Router;
    router = express.Router();
    APIRoute.create(router);
    this.app.use(router);
  }
}