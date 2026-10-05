import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { createCar, listCars, getCarById } from "../controllers/car.controller.js";

const router = Router();
router.post("/", createCar);
router.get("/", listCars);
router.get("/:id", verifyToken, getCarById);   

export default router;