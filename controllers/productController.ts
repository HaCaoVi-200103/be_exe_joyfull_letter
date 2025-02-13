import Product from "../models/ProductModel";
import { Request, Response } from "express";
import { checkCateById, checkProductById, checkStockProIdExist } from "../service";
import { ResponseConfig } from "../config/response";
import mongoose, { Types } from "mongoose";
import Stock from "../models/StockModel";

export const getListProduct = async (req: Request, res: Response) => {
  try {
    let { current, pageSize } = req.query
    if (!current) current = "1";
    if (!pageSize) pageSize = "10";

    const totalItems = (await Product.find({ is_deleted: false })).length
    const totalPages = Math.ceil(totalItems / +pageSize);

    const skip = (+current - 1) * +pageSize;

    const result = await Product
      .find({ is_deleted: false })
      .limit(+pageSize)
      .skip(skip)
      .populate("cate_id", 'cate_name')
      .sort({ _id: -1 });

    const data = []

    for (const element of result) {
      const check = await checkStockProIdExist(element._id)

      if (check) {
        const quantity = {
          pro_quantity: +check.stock_import! - +check.stock_export!
        }
        const config = {
          ...element.toObject(), ...quantity
        }
        data.push(config)
      } else {
        data.push(element)
      }
    }

    return ResponseConfig(res, {
      statusCode: 200,
      data: {
        meta: {
          current: +current,
          pageSize: +pageSize,
          pages: totalPages,
          total: totalItems,
        },
        result: data,
      }
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
      pro_quantity
    } = req.body;

    if (
      !cate_id ||
      !pro_name ||
      !pro_price ||
      pro_discount === null ||
      !pro_size ||
      !pro_picture ||
      !pro_description ||
      !pro_quantity
    ) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    if (!Array.isArray(pro_size) || !pro_size.every((item) => typeof item === "string")) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Product size must be array string!"
      })
    }

    if (typeof pro_price !== "number" || typeof pro_discount !== "number" || typeof pro_quantity !== "number") {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Price & Discount must be number!"
      })
    }

    if (pro_discount < 0 || pro_price < 0 || pro_discount > pro_price) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Price & Discount must be greater or equal 0. Price must be greater than discount!`
      });
    }

    if (pro_quantity < 0) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Quantity must be greater or equal 0`,
      });
    }

    const checkCateId = await checkCateById(cate_id);

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

    await Stock.create({ pro_id: result._id, stock_import: pro_quantity, stock_export: 0 })
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
      pro_quantity,
      pro_size,
      pro_picture,
      pro_description,
    } = req.body;

    if (
      !cate_id ||
      !pro_name ||
      !pro_price ||
      !pro_discount ||
      !pro_size ||
      !pro_picture === null ||
      !pro_description ||
      !pro_quantity
    ) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    if (typeof pro_price !== "number" || typeof pro_discount !== "number" || typeof pro_quantity !== "number") {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Price & Discount must be number!"
      })
    }

    if (pro_discount < 0 || pro_price < 0 || pro_discount > pro_price) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Price & Discount must be greater or equal 0. Price must be greater than discount!`
      });
    }

    if (pro_quantity < 0) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Quantity must be greater or equal 0`,
      });
    }

    const checkCateId = await checkCateById(cate_id);

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
      },
      { new: true }
    );

    await Stock.findOneAndUpdate({ pro_id: new Types.ObjectId(proId), stock_import: pro_quantity })

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

    await Product.findByIdAndUpdate(proId, { is_deleted: true });

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

export const checkFilterAction = async (filter: string) => {
  const checkCate = await checkCateById(filter)

  if (checkCate === true) {
    return { cate_id: new mongoose.Types.ObjectId(filter) }
  } else {
    return {}
  }
}

export const handleFilterAndSearch = async (req: Request, res: Response) => {
  try {
    let { current, pageSize, search, filterReq } = req.query

    if (!current) current = "1";
    if (!pageSize) pageSize = "10";
    if (!search) search = ""
    if (!filterReq) filterReq = ""
    const totalItems = (await Product.find({ is_deleted: false })).length
    const totalPages = Math.ceil(totalItems / +pageSize);

    const skip = (+current - 1) * +pageSize;
    const searchRegex = new RegExp(`^${search}`, 'i');

    const handleFilter = await checkFilterAction(filterReq + "")

    let handleSearch: any = [];
    if (search.toString().length > 0) {
      handleSearch = [
        // { _id: new mongoose.Types.ObjectId(searchRegex + "") },
        { pro_name: searchRegex },
      ]
    }

    const result = await Product
      .find({
        ...handleFilter,
        $or: handleSearch,
      })
      .limit(+pageSize)
      .skip(skip)
      .populate("cate_id", 'cate_name')
      .sort({ _id: -1 })
      .where({ is_deleted: false });


    return ResponseConfig(res, {
      statusCode: 200,
      data: {
        meta: {
          current: +current,
          pageSize: +pageSize,
          pages: totalPages,
          total: totalItems,
        },
        result: result,
      }
    })
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
}