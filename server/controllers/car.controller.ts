import type { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { carsCollection } from "../config/db.js";

export const createCar: RequestHandler = async (req, res, next) => {
  try {
    const result = await carsCollection.insertOne(req.body);
    res.json(result);
  } catch (error) { next(error); }
};

export const listCars: RequestHandler = async (req, res, next) => {
  try {
    const { q, t } = req.query;
    const filter: Record<string, unknown> = {};
    if (typeof q === "string" && q) filter.carName = { $regex: q, $options: "i" };
    if (typeof t === "string" && t) filter.carType = { $regex: t, $options: "i" };
    const result = await carsCollection.find(filter).toArray();
    res.json(result);
  } catch (error) { next(error); }
};

export const getCarById: RequestHandler = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid car id" });
      return;
    }
    const result = await carsCollection.findOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) { next(error); }
};