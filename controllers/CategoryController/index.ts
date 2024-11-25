import { Request, Response } from "express";
import Category from "../../models/CategoryModel";
import { checkCategoryById } from "../../service";

// export const getCategoryID = async (cateId: mongoose.Schema.Types.ObjectId) => {
//   try {
//     const result = await Category.findOne({ _id: cateId });
//     if (result === null) {
//       return false;
//     }
//     return true;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// };

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await Category.find();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: categoryId" });
    }

    const checkCategoryId = await checkCategoryById(categoryId);

    if (!checkCategoryId) {
      return res
        .status(404)
        .json({ message: `No data with seed id with ${categoryId}` });
    }
    const result = await Category.findById(categoryId);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Missing required fields");
    }

    await Category.create({ cate_name: name });
    return res.status(201).send("Create success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: seedId" });
    }

    const checkCategoryId = await checkCategoryById(categoryId);

    if (!checkCategoryId) {
      return res
        .status(404)
        .json({ message: `No data with seed id with ${categoryId}` });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Missing required fields");
    }

    await Category.findByIdAndUpdate(categoryId, { cate_name: name });

    return res.status(200).send("Update success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: categoryId" });
    }

    const checkCategoryId = await checkCategoryById(categoryId);

    if (!checkCategoryId) {
      return res
        .status(404)
        .json({ message: `No data with seed id with ${categoryId}` });
    }

    await Category.findByIdAndUpdate(categoryId, { is_delete: true });

    return res.status(200).send("Delete success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
