import { Request, Response } from "express";
import Category from "../models/CategoryModel";
import { checkCategoryById } from "../service";
import { ResponseConfig } from "../config/response";

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await Category.find();
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

    await Category.findByIdAndUpdate(categoryId, { is_delete: true });

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
