import express, { Express } from "express";
const route = express.Router();

/* GET home page. */

const authApiRoutes = (app: Express) => {
    route.post('/login',);


    return app.use('/api/v1/auth', route);;
}

export default authApiRoutes;
