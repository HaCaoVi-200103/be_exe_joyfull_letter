import Product from "../models/ProductModel";
import { Request, Response } from "express";
import { checkCateById, checkProductById } from "../service";

export const getListProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.find().where({ is_delete: false });
    if (!result) {
      return res.status(400).send("No Data");
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getProductID = async (req: Request, res: Response) => {
  try {
    const proId = req.params.proId;
    if (!proId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: proId" });
    }

    const checkProId = await checkProductById(req, res, proId);

    if (!checkProId) {
      return res
        .status(404)
        .json({ message: `No data with pro id with ${proId}` });
    }

    const result = await Product.findOne({ _id: proId }).where({
      is_delete: false,
    });

    if (!result) {
      return res.status(404).json({ message: "Data Not found", data: null });
    }
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Data Not found", data: null });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      cate_id,
      pro_name,
      pro_price,
      pro_discount,
      pro_size,
      pro_picture,
      pro_description,
    } = req.body;

    if (
      !cate_id ||
      !pro_name ||
      !pro_price ||
      pro_discount === null ||
      !pro_size ||
      !pro_picture ||
      !pro_description
    ) {
      return res.status(400).send("Missing required fields");
    }

    if (pro_discount > 1) {
      return res
        .status(400)
        .send("Discount must be greather or equal 0 and lesster or equal 1");
    }

    const checkCateId = await checkCateById(req, res, cate_id);

    if (!checkCateId) {
      return res
        .status(404)
        .json({ message: `No data with cate id with ${cate_id}` });
    }

    const result = await Product.create({
      cate_id,
      pro_name,
      pro_price,
      pro_discount,
      pro_size,
      pro_picture,
      pro_description,
    });
    return res
      .status(201)
      .send({ message: "Create successfull", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const proId = req.params.proId;
    if (!proId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: proId" });
    }

    const checkProId = await checkProductById(req, res, proId);

    if (!checkProId) {
      return res
        .status(404)
        .json({ message: `No data with pro id with ${proId}` });
    }

    const {
      cate_id,
      pro_name,
      pro_price,
      pro_discount,
      pro_size,
      pro_picture,
      pro_description,
      is_delete,
    } = req.body;

    if (
      !cate_id ||
      !pro_name ||
      !pro_price ||
      pro_discount === null ||
      !pro_size ||
      !pro_picture ||
      !pro_description ||
      is_delete === undefined
    ) {
      return res.status(400).send("Missing required fields");
    }

    if (pro_discount > 1) {
      return res
        .status(400)
        .send("Discount must be greather or equal 0 and lesster or equal 1");
    }

    const checkCateId = await checkCateById(req, res, cate_id);

    if (!checkCateId) {
      return res
        .status(404)
        .json({ message: `No data with cate id with ${cate_id}` });
    }

    const result = await Product.findByIdAndUpdate(
      proId,
      {
        cate_id: cate_id,
        pro_name: pro_name,
        pro_price: pro_price,
        pro_discount: pro_discount,
        pro_size: pro_size,
        pro_picture: pro_picture,
        pro_description: pro_description,
        update_at: new Date(),
        is_delete: is_delete,
      },
      { new: true }
    );

    if (!result) {
      return res.status(200).json({ message: "Update fails" });
    }

    return res
      .status(200)
      .json({ message: "Update Successfull", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const proId = req.params.proId;
    if (!proId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter proId" });
    }

    const checkProId = await checkProductById(req, res, proId);

    if (!checkProId) {
      return res
        .status(404)
        .json({ message: `No data with pro id with ${proId}` });
    }

    const result = await Product.findByIdAndUpdate(proId, { is_delete: true });
    res.status(200).json({ message: "Delete Successfull", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
