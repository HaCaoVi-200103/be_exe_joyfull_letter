import { connection } from "../../config"
import { Request, Response } from "express";

export const getListProduct = async (req: Request, res: Response) => {
    try {
        const result = await connection.execute("select * from Product")
        if (!result) {
            return res.status(400).send("No Data")
        }
        return res.status(200).json(result[0])
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}