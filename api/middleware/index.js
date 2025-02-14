"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../config/response");
const verifyToken = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 401,
                message: `You are not authenticated!`,
            });
        }
        const headerAuth = auth.split(" ");
        if (headerAuth.length !== 2 || headerAuth[0] !== "Bearer") {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 401,
                message: `Invalid authorization format!`,
            });
        }
        const token = headerAuth[1];
        if (!process.env.JWT_KEY) {
            const error = new Error("JWT_KEY not exist in .env");
            console.log(error);
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 500
            });
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        console.log(payload);
        next();
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 403,
            message: `Token is not valid!`,
        });
    }
};
exports.verifyToken = verifyToken;
const isAdmin = (req, res, next) => {
};
exports.isAdmin = isAdmin;
