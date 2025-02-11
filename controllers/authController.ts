import { Request, Response } from "express";
import { checkEmail } from "../service";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import mongoose from "mongoose";
import { ResponseConfig } from "../config/response";
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (
  res: Response,
  email: string,
  userId: mongoose.Types.ObjectId
) => {
  try {
    if (!process.env.JWT_KEY) {
      console.log("JWT_KEY is undefined");
      return ResponseConfig(res, { statusCode: 500 });
    }
    return jwt.sign({ email, userId }, process.env.JWT_KEY, {
      expiresIn: maxAge,
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    const staff = await checkEmail(req, res, email);

    if (!staff) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: "Email address does not exist in the system"
      })
    }

    const auth = await compare(password, staff.staff_password);
    console.log(staff);

    if (!auth) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Password is incorrect!!"
      })
    }

    const token = createToken(res, staff.staff_email, staff._id);

    res.cookie(
      'token',
      token,
      {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
        // secure: true,
        sameSite: "none",
      }
    );

    return ResponseConfig(res, {
      statusCode: 200,
      message: "Login Successfully",
      data: {
        token: token
      }
    })
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};
