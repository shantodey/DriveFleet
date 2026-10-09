import type { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { carsCollection } from "../config/db.js";
import { updateCarInfoSchema } from "../config/update.car.js";

export const getMyCars: RequestHandler = async (req, res, next) => {
  try {
    const ownerId = String(req.params.ownerId);
    const result = await carsCollection.find({ ownerId }).toArray();
    res.json(result);
  } catch (error) { next(error); }
};

export const updateMyCar: RequestHandler = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid car id" });
      return;
    }
    const validatedData = updateCarInfoSchema.parse(req.body)
    const result = await carsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: validatedData }
    );
    res.json(result);
  } catch (error) { next(error); }
};

export const deleteMyCar: RequestHandler = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid car id" });
      return;
    }
    const result = await carsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) { next(error); }
};