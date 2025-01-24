import Product from "../models/ProductModel";
import { Request, Response } from "express";
import { checkCateById, checkProductById } from "../service";
import { ResponseConfig } from "../config/response";

export const getListProduct = async (req: Request, res: Response) => {
  try {
    const result = await Product.find().where({ is_delete: false });
    return ResponseConfig(res, {
      statusCode: 200,
      data: result
    })
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const getProductID = async (req: Request, res: Response) => {
  try {
    const proId = req.params.proId;
    if (!proId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter: ${proId}`
      })
    }

    const result = await checkProductById(proId);

    if (!result) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found product with id: ${proId}`
      })
    }

    return ResponseConfig(res, {
      statusCode: 200,
      data: result
    })

  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500,
    })
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
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    if (pro_discount > 1) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Discount must be greater or equal 0 and lester or equal 1`,
      });
    }

    const checkCateId = await checkCateById(req, res, cate_id);

    if (!checkCateId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found category with id: ${cate_id}`,
      });
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
    return ResponseConfig(res, {
      statusCode: 201,
      message: `Create Successfully`,
      data: result
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const proId = req.params.proId;
    if (!proId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter product id!`,
      });
    }

    const checkProId = await checkProductById(proId);

    if (!checkProId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found product with id: ${proId}`
      });
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
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    if (pro_discount > 1) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Discount must be greater or equal 0 and lester or equal 1`
      });
    }

    const checkCateId = await checkCateById(req, res, cate_id);

    if (!checkCateId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not category with id: ${cate_id}`
      });
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

    return ResponseConfig(res, {
      statusCode: 200,
      message: `Update Successfully`,
      data: result
    })
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const proId = req.params.proId;
    if (!proId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required parameter proId"
      });
    }

    const checkProId = await checkProductById(proId);

    if (!checkProId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found product with id: ${proId}`
      });
    }

    await Product.findByIdAndUpdate(proId, { is_delete: true });

    return ResponseConfig(res, {
      statusCode: 200,
      message: "Delete Successfully"
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};
