import express from "express";
import { submitBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", submitBooking);

export default router;
