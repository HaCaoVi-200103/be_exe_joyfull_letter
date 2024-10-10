"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
require("dotenv/config");
const promise_1 = __importDefault(require("mysql2/promise"));
exports.connection = promise_1.default.createPool({
    host: process.env.DB_HOST,
    port: parseInt(`${process.env.DB_PORT}`),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
