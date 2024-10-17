

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'dotenv/config';
import initApiRoutes from './routes/index';
import connectionDB from './config';
import productApiRoutes from './routes/ProductRoute';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initApiRoutes(app);
productApiRoutes(app);



app.use((__, _, next: NextFunction) => {
    next(createError(404));
});

app.use((err: any, req: Request, res: Response) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

connectionDB();

export default app;
