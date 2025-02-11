import { Request, Response } from "express";
import Category from "../models/CategoryModel";
import { checkCategoryById } from "../service";
import { ResponseConfig } from "../config/response";

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await Category.find({ is_deleted: false });
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

export const getListCategory = async (req: Request, res: Response) => {
  try {
    let { current, pageSize } = req.query
    if (!current) current = "1";
    if (!pageSize) pageSize = "10";

    const totalItems = (await Category.find({ is_deleted: false })).length
    const totalPages = Math.ceil(totalItems / +pageSize);

    const skip = (+current - 1) * +pageSize;

    const result = await Category.aggregate([
      { $match: { is_deleted: false } },
      {
        $lookup: {
          from: "products", // Tên collection của Product (viết đúng theo DB)
          localField: "_id",
          foreignField: "cate_id",
          as: "products"
        }
      },
      {
        $addFields: {
          product_count: { $size: "$products" }
        }
      },
      {
        $project: {
          products: 0 // Ẩn danh sách sản phẩm để giảm dữ liệu trả về
        }
      },
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: +pageSize }
    ]);

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
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter: ${categoryId}`,
      });
    }

    const checkCategoryId = await checkCategoryById(categoryId);

    if (!checkCategoryId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `No data seed with category id: ${categoryId}`,
      });
    }
    const result = await Category.findById(categoryId);
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

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    await Category.create({ cate_name: name });
    return ResponseConfig(res, {
      statusCode: 201,
      message: "Created Successfully"
    })
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter category id`,
      });
    }

    const checkCategoryId = await checkCategoryById(categoryId);

    if (!checkCategoryId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found category with id: ${categoryId}`,
      });
    }

    const { name } = req.body;
    if (!name) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    await Category.findByIdAndUpdate(categoryId, { cate_name: name });

    return ResponseConfig(res, {
      statusCode: 200,
      message: "Updated Successfully"
    })
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter category id`,
      });
    }

    const checkCategoryId = await checkCategoryById(categoryId);

    if (!checkCategoryId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found category with id: ${categoryId}`,
      });
    }

    await Category.findByIdAndUpdate(categoryId, { is_deleted: true });

    return ResponseConfig(res, {
      statusCode: 200,
      message: "Deleted Successfully"
    })
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};
