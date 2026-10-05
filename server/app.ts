import express from "express";
import type { ErrorRequestHandler } from "express";
import cors from "cors";
import carRoutes from "./routes/car.route.js";
import bookingRoutes from "./routes/booking.route.js";
import ownerCarRoutes from "./routes/owner-car.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => { res.send("server is running fine"); });
app.use("/cars", carRoutes);
app.use("/booking", bookingRoutes);
app.use("/my-added-cars", ownerCarRoutes);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
};
app.use(errorHandler);   // সবার শেষে

export default app;