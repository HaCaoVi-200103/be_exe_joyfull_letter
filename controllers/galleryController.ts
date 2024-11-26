import { Request, Response } from "express";
import Gallery from "../models/GalleryModel";
import { checkImagesGalleryByProId } from "../service";

export const getAllGallaryOfProduct = async (req: Request, res: Response) => {
  try {
    const { proId } = req.params;
    if (!proId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: proId" });
    }

    const check = await checkImagesGalleryByProId(proId);

    if (!check) {
      return res.status(200).json({ message: "Not found any proId in have" });
    }

    const list = await Gallery.find({ pro_id: proId });
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).send("Server Internal Error");
  }
};

export const createGallery = async (req: Request, res: Response) => {
  try {
    const { proId, images } = req.body;
    console.log(Array.isArray(images));

    if (!proId || !images || !Array.isArray(images)) {
      return res.status(400).json({
        message: "Missing required field or field images not array!!",
      });
    }

    for (const item of images) {
      console.log(typeof item);

      if (typeof item !== "string") {
        return res.status(400).json({
          message: "Images not array contains string",
        });
      }
    }

    for (const item of images) {
      await Gallery.create({ pro_id: proId, gal_picture: item });
    }

    return res.status(201).json({ message: "Successful" });
  } catch (error) {
    return res.status(500).send("Server Internal Error");
  }
};
