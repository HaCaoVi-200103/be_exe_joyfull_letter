import { Request, Response } from "express"
import Product from "../models/ProductModel"
import Category from "../models/CategoryModel"
import Staff from "../models/StaffModel"

export const checkProductById = async (req: Request, res: Response, proId: string) => {
    try {
        const checkProId = await Product.findOne({ _id: proId }).where({ is_delete: false })
        if (!checkProId) {
            console.log("Not found product with id: ", proId)
            return false
        }
        return true
    } catch (error) {
        console.log("Not found product with id: ", proId)
        return false
    }
}

export const checkCateById = async (req: Request, res: Response, cateId: string) => {
    try {
        const checkCateId = await Category.findOne({ _id: cateId }).where({ is_delete: false })
        if (!checkCateId) {
            console.log("Not found category with id: ", cateId)
            return false
        }
        return true
    } catch (error) {
        console.log("Not found category with id: ", cateId)
        return false
    }
}

export const checkEmail = async (req: Request, res: Response, email: string) => {
    try {
        const emailCheck = await Staff.findOne({ staff_email: email })
        if (!emailCheck) {
            console.log("Email not exist")
            return null
        }
        return emailCheck;
    } catch (error) {
        console.log("Email not exist")
        return null
    }
}