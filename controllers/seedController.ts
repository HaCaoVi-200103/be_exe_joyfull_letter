import { Request, Response } from "express";
import Seed from "../models/SeedModel";
import { checkSeedById } from "../service";

export const getAllSeed = async (req: Request, res: Response) => {
  try {
    const result = await Seed.find();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getSeedById = async (req: Request, res: Response) => {
  try {
    const seedId = req.params.seedId;
    if (!seedId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: seedId" });
    }

    const checkSeedId = await checkSeedById(req, res, seedId);

    if (!checkSeedId) {
      return res
        .status(404)
        .json({ message: `No data with seed id with ${seedId}` });
    }
    const result = await Seed.findById(seedId);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const createSeed = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Missing required fields");
    }

    await Seed.create({ seed_name: name, is_delete: false });
    return res.status(200).send("Create success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const updateSeed = async (req: Request, res: Response) => {
  try {
    const seedId = req.params.seedId;
    if (!seedId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: seedId" });
    }

    const checkSeedId = await checkSeedById(req, res, seedId);

    if (!checkSeedId) {
      return res
        .status(404)
        .json({ message: `No data with seed id with ${seedId}` });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Missing required fields");
    }

    await Seed.findByIdAndUpdate(seedId, { seed_name: name });

    return res.status(201).send("Update success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const deleteSeed = async (req: Request, res: Response) => {
  try {
    const seedId = req.params.seedId;
    if (!seedId) {
      return res
        .status(400)
        .json({ message: "Missing required parameter: seedId" });
    }

    const checkSeedId = await checkSeedById(req, res, seedId);

    if (!checkSeedId) {
      return res
        .status(404)
        .json({ message: `No data with seed id with ${seedId}` });
    }

    await Seed.findByIdAndUpdate(seedId, { is_delete: true });

    return res.status(200).send("Delete success");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
