"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).send("You are not authenticted!");
        }
        console.log(auth);
        const headerAuth = auth.split(" ");
        if (headerAuth.length !== 2 || headerAuth[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid Authorization format" });
        }
        const token = headerAuth[1];
        if (!process.env.JWT_KEY) {
            const error = new Error("JWT_KEY not exist in .env");
            console.log(error);
            return res.status(500).send("Internal server error");
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        console.log(payload);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).send("Token is not valid");
    }
};
exports.default = verifyToken;
