import express, { Express } from "express";
const route = express.Router();

/* GET home page. */

const staffApiRoutes = (app: Express) => {
    route.post('/staff',);

    return app.use('/api/v1/', route);
}

export default staffApiRoutes;
