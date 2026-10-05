import { Router } from "express";
import { getMyCars, updateMyCar, deleteMyCar } from "../controllers/owner-car.controller.js";

const router = Router();
router.get("/:ownerId", getMyCars);
router.patch("/:id", updateMyCar);
router.delete("/:id", deleteMyCar);

export default router;