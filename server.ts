

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import initApiRoutes from './routes/index';
import { connection } from './config';
dotenv.config();
const hostName = process.env.HOST_NAME || 'localhost';
const port = process.env.PORT || "8000";

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initApiRoutes(app);

app.use((next: NextFunction) => {
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

(async () => {
    try {
        const conn = await connection.getConnection();
        console.log('Connected to the MySQL database.');
        conn.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
})();

app.listen(parseInt(port), hostName, () => {
    console.log(`Example app listening on http://${hostName}:${port}/api/v1`);
});

export default app;
