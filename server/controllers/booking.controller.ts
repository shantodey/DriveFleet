import type { RequestHandler } from "express";
import { ObjectId } from "mongodb";
import { bookingsCollection } from "../config/db.js";

export const createBooking: RequestHandler = async (req, res, next) => {
  try {
    const result = await bookingsCollection.insertOne(req.body);
    res.json(result);
  } catch (error) { next(error); }
};

export const listUserBookings: RequestHandler = async (req, res, next) => {
  try {
    const userId = String(req.params.userId);
    const result = await bookingsCollection.find({ userId }).toArray();
    res.json(result);
  } catch (error) { next(error); }
};

export const deleteBooking: RequestHandler = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid booking id" });
      return;
    }
    const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (error) { next(error); }
};