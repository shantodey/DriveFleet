import type { Request, RequestHandler, Response } from "express";
import { ObjectId } from "mongodb";
import { carsCollection } from "../config/db.js";
import { addCarDataDchema } from "../config/add.car.js";

export const createCar: RequestHandler = async (req:Request, res:Response, next) => {
  const addCars=addCarDataDchema.safeParse(req.body)
  if(addCars.success){
    try {
      const result = await carsCollection.insertOne(addCars.data);
      res.json(result);
    } catch (error) { next(error); }
  }else{
    res.status(400).send("the input was not valid")
  }
};

export const listCars: RequestHandler = async (req:Request, res:Response, next) => {
  try {
    const { q, t } = req.query;
    const filter: Record<string, unknown> = {};
    if (typeof q === "string" && q) filter.carName = { $regex: q, $options: "i" };
    if (typeof t === "string" && t) filter.carType = { $regex: t, $options: "i" };
    const result = await carsCollection.find(filter).toArray();
    res.json(result);
  } catch (error) { next(error); }
};

export const getCarById: RequestHandler = async (req:Request, res:Response, next) => {
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