"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const mongoose_1 = __importDefault(require("mongoose"));
const connectionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.MONGO_URL) {
            const conn = yield mongoose_1.default.connect(process.env.MONGO_URL);
            console.log(`Mongo db connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
        }
        else {
            console.log("MONGO_URL Is Undefined");
        }
    }
    catch (error) {
        console.log("Connect Fail With Error: \n", error);
    }
});
exports.default = connectionDB;
