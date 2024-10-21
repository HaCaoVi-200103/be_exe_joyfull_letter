import express, { Express } from "express";
const route = express.Router();

/* GET home page. */

const initApiRoutes = (app: Express) => {
    route.get('/', (req, res) => {
        res.status(200);
        res.end("Project EXE")
    });

    return app.use('/', route);;
}

export default initApiRoutes;
