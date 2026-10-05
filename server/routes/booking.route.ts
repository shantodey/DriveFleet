import { Router } from "express";
import { createBooking, listUserBookings, deleteBooking } from "../controllers/booking.controller.js";

const router = Router();
router.post("/", createBooking);
router.get("/:userId", listUserBookings);
router.delete("/:id", deleteBooking);

export default router;