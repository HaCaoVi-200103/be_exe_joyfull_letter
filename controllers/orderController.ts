import { Request, Response } from "express";
import Order from "../models/OrderModel";
import { ResponseConfig } from "../config/response";
import OrderDetail from "../models/OrderDetailModel";
import { Types } from "mongoose";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { fullname, phone, address, pay_status } = req.body;
        if (!fullname || !phone || !address || !pay_status) {
            return ResponseConfig(res, {
                statusCode: 400,
                message: "Missing required field!"
            })
        }
        const result = await Order.create({ fullname, phone, address, pay_status })

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

export const createOrderDetail = async (req: Request, res: Response) => {
    try {
        const { order_id, pro_id, quantity, size, price } = req.body
        if (!order_id || !pro_id || !quantity || !size || !price) {
            return ResponseConfig(res, {
                statusCode: 400,
                message: "Missing required field!"
            })
        }

        const result = await OrderDetail.create({ order_id, pro_id, quantity, size, price })

        await Order.findByIdAndUpdate(order_id, {
            total_price: price * quantity
        })
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

export const getAllOrder = async (req: Request, res: Response) => {
    try {
        let { current, pageSize } = req.query
        if (!current) current = "1";
        if (!pageSize) pageSize = "10";

        const totalItems = (await Order.find({})).length
        const totalPages = Math.ceil(totalItems / +pageSize);

        const skip = (+current - 1) * +pageSize;

        const result = await Order
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

export const getAllOrderDetails = async (req: Request, res: Response) => {
    try {
        let { current, pageSize } = req.query
        const { orderId } = req.params
        if (!current) current = "1";
        if (!pageSize) pageSize = "10";

        if (!orderId) {
            return ResponseConfig(res, {
                statusCode: 400,
                message: "Missing required param!"
            })
        }

        const filter = {
            order_id: new Types.ObjectId(orderId)
        }

        const totalItems = (await OrderDetail.find(filter)).length
        const totalPages = Math.ceil(totalItems / +pageSize);

        const skip = (+current - 1) * +pageSize;

        const result = await OrderDetail
            .find(filter)
            .limit(+pageSize)
            .populate("pro_id")
            .select("-pro_size -pro_description")
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