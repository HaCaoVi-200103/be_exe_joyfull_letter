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
exports.login = void 0;
const service_1 = require("../service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const response_1 = require("../config/response");
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (res, email, userId) => {
    try {
        if (!process.env.JWT_KEY) {
            console.log("JWT_KEY is undefined");
            return (0, response_1.ResponseConfig)(res, { statusCode: 500 });
        }
        return jsonwebtoken_1.default.sign({ email, userId }, process.env.JWT_KEY, {
            expiresIn: maxAge,
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Missing required fields"
            });
        }
        const staff = yield (0, service_1.checkEmail)(req, res, email);
        if (!staff) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 404,
                message: "Email address does not exist in the system"
            });
        }
        const auth = yield (0, bcrypt_1.compare)(password, staff.staff_password);
        console.log(staff);
        if (!auth) {
            return (0, response_1.ResponseConfig)(res, {
                statusCode: 400,
                message: "Password is incorrect!!"
            });
        }
        const token = createToken(res, staff.staff_email, staff._id);
        // res.cookie(
        //   'token',
        //   token,
        //   {
        //     maxAge: 1000 * 60 * 60 * 24 * 3,
        //     httpOnly: true,
        //     // secure: true,
        //     sameSite: "none",
        //   }
        // );
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 200,
            message: "Login Successfully",
            data: {
                token: token
            }
        });
    }
    catch (error) {
        console.log(error);
        return (0, response_1.ResponseConfig)(res, {
            statusCode: 500
        });
    }
});
exports.login = login;
