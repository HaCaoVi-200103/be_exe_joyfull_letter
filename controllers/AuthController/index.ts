import { Request, Response } from "express";
import { checkEmail } from "../../service";
import jwt from "jsonwebtoken"
import { compare } from "bcrypt"
import mongoose from "mongoose";
const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (res: Response, email: string, userId: mongoose.Types.ObjectId) => {
    try {
        if (!process.env.JWT_KEY) {
            console.log("JWT_KEY is undefined");
            return res.status(500).send("Internal Server Error")
        }
        return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Missing required fields")
        }

        const staff = await checkEmail(req, res, email)

        if (!staff) {
            return res.status(404).send("Email not exist!!!")
        }

        const auth = await compare(password, staff.staff_password);

        if (!auth) {
            return res.status(400).send("Password is incorrect!!")
        }

        // const token = res.cookie("jwt", createToken(res, email, staff._id), {
        //     maxAge,
        //     secure: true,
        //     sameSite: "none"
        // })

        const token = createToken(res, email, staff._id);

        return res.status(200).json({
            message: "Login Successfull",
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}