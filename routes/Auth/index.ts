import { login } from "../../controllers/AuthController";
import express, { Express } from "express";
const route = express.Router();

/* GET home page. */

const authApiRoutes = (app: Express) => {
    route.post('/login', login);

    return app.use('/api/v1/auth', route);
}

export default authApiRoutes;
