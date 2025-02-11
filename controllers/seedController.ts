import { Request, Response } from "express";
import Seed from "../models/SeedModel";
import { checkSeedById } from "../service";
import { ResponseConfig } from "../config/response";

export const getAllSeed = async (req: Request, res: Response) => {
  try {
    const result = await Seed.find();
    return ResponseConfig(res, {
      statusCode: 200,
      data: result
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const getSeedById = async (req: Request, res: Response) => {
  try {
    const seedId = req.params.seedId;
    if (!seedId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter: ${seedId}`
      });
    }

    const checkSeedId = await checkSeedById(seedId);

    if (!checkSeedId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found category with id: ${seedId}`
      });
    }
    const result = await Seed.findById(seedId);
    return ResponseConfig(res, {
      statusCode: 200,
      data: result
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const createSeed = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    await Seed.create({ seed_name: name, is_deleted: false });
    return ResponseConfig(res, {
      statusCode: 200,
      message: `Created Successfully`
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const updateSeed = async (req: Request, res: Response) => {
  try {
    const seedId = req.params.seedId;
    if (!seedId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter seed id!`,
      });
    }

    const checkSeedId = await checkSeedById(seedId);

    if (!checkSeedId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found seed with id: ${seedId}`,
      });
    }

    const { name } = req.body;
    if (!name) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: "Missing required fields"
      })
    }

    await Seed.findByIdAndUpdate(seedId, { seed_name: name });

    return ResponseConfig(res, {
      statusCode: 200,
      message: `Updated Successfully`
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};

export const deleteSeed = async (req: Request, res: Response) => {
  try {
    const seedId = req.params.seedId;
    if (!seedId) {
      return ResponseConfig(res, {
        statusCode: 400,
        message: `Missing required parameter seed id!`,
      });
    }

    const checkSeedId = await checkSeedById(seedId);

    if (!checkSeedId) {
      return ResponseConfig(res, {
        statusCode: 404,
        message: `Not found seed with id: ${seedId}`,
      });
    }

    await Seed.findByIdAndUpdate(seedId, { is_deleted: true });

    return ResponseConfig(res, {
      statusCode: 200,
      message: `Deleted Successfully`
    });
  } catch (error) {
    console.log(error);
    return ResponseConfig(res, {
      statusCode: 500
    });
  }
};
