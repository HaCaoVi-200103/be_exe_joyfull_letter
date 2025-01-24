import { Response } from "express"
import { IResponse } from "../types/type"

export const ResponseConfig = (res: Response, responseConfig: IResponse) => {
    let config: IResponse = {
        statusCode: responseConfig.statusCode,
    }

    if (responseConfig.message) {
        config = { ...config, message: responseConfig.message }
    }

    if (responseConfig.data) {
        config = { ...config, data: responseConfig.data }
    }
    switch (responseConfig.statusCode) {
        case 200:
            return res.status(responseConfig.statusCode).json(config)
        case 201:
            return res.status(responseConfig.statusCode).json(config)
        case 400:
            config = { ...config, error: "Bad Request" }
            return res.status(responseConfig.statusCode).json(config)
        case 401:
            config = { ...config, error: "Unauthorized" }
            return res.status(responseConfig.statusCode).json(config)
        case 403:
            config = { ...config, error: "Forbidden" }
            return res.status(responseConfig.statusCode).json(config)
        case 404:
            config = { ...config, error: "Not Found" }
            return res.status(responseConfig.statusCode).json(config)
        case 500:
            config = { ...config, error: "Internal Server Error" }
            return res.status(responseConfig.statusCode).json(config)
        default:
            return res.status(responseConfig.statusCode).json(config)
    }
}