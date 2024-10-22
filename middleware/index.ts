import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

interface CustomJwtPayload extends JwtPayload {
    userId: string; // Hoặc số, tùy thuộc vào kiểu của userId
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).send("You are not authenticted!")
        }

        const headerAuth = auth.split(" ");
        if (headerAuth.length !== 2 || headerAuth[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid Authorization format" });
        }

        const token = headerAuth[1];

        if (!process.env.JWT_KEY) {
            const error = new Error("JWT_KEY not exist in .env")
            console.log(error);
            return res.status(500).send("Internal server error");
        }

        const payload = jwt.verify(token, process.env.JWT_KEY) as CustomJwtPayload
        // req.session. = payload.userId
        console.log(payload);

        next();
    } catch (error) {
        console.log(error);
        return res.status(403).send("Token is not valid")
    }
}

export default verifyToken;