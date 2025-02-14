import { Request, Response } from "express";
import { ResponseConfig } from "../config/response";
import Blog from "../models/BlogModel";
import { checkBlogIdExist } from "../service";

export const getAllBlog = async (req: Request, res: Response) => {
    try {
        let { current, pageSize } = req.query
        if (!current) current = "1";
        if (!pageSize) pageSize = "10";

        const totalItems = (await Blog.find({})).length
        const totalPages = Math.ceil(totalItems / +pageSize);

        const skip = (+current - 1) * +pageSize;

        const result = await Blog
            .find({})
            .limit(+pageSize)
            .skip(skip)
            .sort({ _id: -1 });

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

export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, images, description } = req.body

        if (!title || !images || !description) {
            return ResponseConfig(res, {
                statusCode: 404,
                message: `Missing field required!`,
            });
        }

        if (!Array.isArray(images)) {
            return ResponseConfig(res, {
                statusCode: 400,
                message: "Field images not array!"
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

        const result = await Blog.create({ title, images, description })
        return ResponseConfig(res, {
            statusCode: 201,
            message: "Created Successfully",
            data: result
        })
    } catch (error) {
        console.log(error);
        return ResponseConfig(res, {
            statusCode: 500
        });
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const { title, images, description } = req.body;
        if (!blogId) {
            return ResponseConfig(res, {
                statusCode: 400,
                message: `Missing required parameter category id`,
            });
        }

        const checkBlogId = await checkBlogIdExist(blogId);

        if (!checkBlogId) {
            return ResponseConfig(res, {
                statusCode: 404,
                message: `Not found blog with id: ${blogId}`,
            });
        }

        if (!title || !images || !description) {
            return ResponseConfig(res, {
                statusCode: 404,
                message: `Missing field required!`,
            });
        }

        if (!Array.isArray(images)) {
            return ResponseConfig(res, {
                statusCode: 400,
                message: "Field images not array!"
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

        await Blog.findByIdAndUpdate(blogId, { title, images, description });

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

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        if (!blogId) {
            return ResponseConfig(res, {
                statusCode: 400,
                message: `Missing required parameter category id`,
            });
        }

        const checkBlogId = await checkBlogIdExist(blogId);

        if (!checkBlogId) {
            return ResponseConfig(res, {
                statusCode: 404,
                message: `Not found blog with id: ${blogId}`,
            });
        }

        await Blog.findByIdAndDelete(blogId);

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
