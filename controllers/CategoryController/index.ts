import { Request, Response } from "express";
import Category from "../../models/CategoryModel";
import mongoose from "mongoose";

export const getCategoryID = async (cateId: mongoose.Schema.Types.ObjectId) => {
    try {
        const result = await Category.findOne({ _id: cateId })
        if (result === null) {
            return false
        }
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}