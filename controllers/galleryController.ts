import { Request, Response } from "express";
import Gallery from "../models/GalleryModel";
import { checkImagesGalleryByProId } from "../service";
import { ResponseConfig } from "../config/response";

export const getAllGallaryOfProduct = async (req: Request, res: Response) => {
  try {
    const { proId } = req.params;
    if (!proId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Missing required parameter product id!`,
      });
    }

    const check = await checkImagesGalleryByProId(proId);

    if (!check) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Product ID not found with id ${proId}`
      })
    }

    const list = await Gallery.find({ pro_id: proId });
    return ResponseConfig(res, {
      statusCode: 200,
      data: list
    })
  } catch (error) {
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const createGallery = async (req: Request, res: Response) => {
  try {
    const { proId, images } = req.body;
    if (!proId || !images || !Array.isArray(images)) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required field or field images not array!"
      })
    }

    for (const item of images) {
      if (typeof item !== "string") {
        return ResponseConfig(res, {
          statusCode: 400,
          message: "Images not array contains string!"
        })
      }
    }

    for (const item of images) {
      await Gallery.create({ pro_id: proId, gal_picture: item });
    }

    return ResponseConfig(res, {
      statusCode: 201,
      message: "Created Successfully"
    })
  } catch (error) {
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};
