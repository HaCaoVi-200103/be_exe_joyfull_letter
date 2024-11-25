import { Request, Response } from "express";
import Product from "../models/ProductModel";
import Category from "../models/CategoryModel";
import Staff from "../models/StaffModel";
import Seed from "../models/SeedModel";
import Gallery from "../models/GalleryModel";

export const checkProductById = async (
  req: Request,
  res: Response,
  proId: string
) => {
  try {
    const checkProId = await Product.findOne({ _id: proId }).where({
      is_delete: false,
    });
    if (!checkProId) {
      console.log("Not found product with id: ", proId);
      return false;
    }
    return true;
  } catch (error) {
    console.log("Not found product with id: ", proId);
    return false;
  }
};

export const checkCateById = async (
  req: Request,
  res: Response,
  cateId: string
) => {
  try {
    const checkCateId = await Category.findOne({ _id: cateId }).where({
      is_delete: false,
    });
    if (!checkCateId) {
      console.log("Not found category with id: ", cateId);
      return false;
    }
    return true;
  } catch (error) {
    console.log("Not found category with id: ", cateId);
    return false;
  }
};

export const checkSeedById = async (
  req: Request,
  res: Response,
  seedId: string
) => {
  try {
    const checkSeedId = await Seed.findOne({ _id: seedId }).where({
      is_delete: false,
    });
    if (!checkSeedId) {
      console.log("Not found seed with id: ", seedId);
      return false;
    }
    return true;
  } catch (error) {
    console.log("Not found seed with id: ", seedId);
    return false;
  }
};

export const checkCategoryById = async (categoryId: string) => {
  try {
    const check = await Category.findOne({ _id: categoryId }).where({
      is_delete: false,
    });
    if (!check) {
      console.log("Not found seed with id: ", categoryId);
      return false;
    }
    return true;
  } catch (error) {
    console.log("Not found seed with id: ", categoryId);
    return false;
  }
};

export const checkEmail = async (
  req: Request,
  res: Response,
  email: string
) => {
  try {
    const emailCheck = await Staff.findOne({ staff_email: email });
    if (!emailCheck) {
      console.log("Email not exist");
      return null;
    }
    return emailCheck;
  } catch (error) {
    console.log("Email not exist");
    return null;
  }
};

export const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

export const checkImagesGalleryByProId = async (proId: string) => {
  try {
    const check = await Gallery.findOne({ pro_id: proId });
    if (!check) {
      console.log("Not found seed with id: ", proId);
      return false;
    }
    return true;
  } catch (error) {
    console.log("Not found seed with id: ", proId);
    return false;
  }
};
